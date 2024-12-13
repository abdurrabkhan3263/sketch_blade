import { Request, Response } from "express";
import { User } from "../models/user.model";
import { CreateUserRequest, Id } from "../types/appType";
import { Webhook, WebhookRequiredHeaders } from "svix";
import { WebhookEvent, clerkClient } from "@clerk/clerk-sdk-node";

export type ClerkEvent = WebhookEvent;

const createUser = async ({
   id,
   email,
   first_name,
   last_name,
   profile_url,
}: CreateUserRequest) => {
   if (!email || !first_name) {
      throw new Error("Email and first name are required");
   }

   try {
      const newUser = await User.create({
         email,
         first_name,
         last_name,
         profile_url,
         userId: id,
      });

      if (!newUser) throw new Error("Failed to create user");

      return newUser;
   } catch (error) {
      const errorMessage =
         error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Create user failed: ${errorMessage}`);
   }
};

const updateUser = async (id: Id, data: CreateUserRequest) => {
   try {
      const userExists = await User.exists({ userId: id });

      if (!userExists) {
         throw new Error("User not found");
      }

      const updatedUser = await User.findOneAndUpdate(
         { userId: id },
         {
            $set: {
               email: data.email,
               first_name: data.first_name,
               last_name: data.last_name,
               profile_url: data.profile_url,
            },
         },
         { new: true },
      );

      if (!updatedUser) {
         throw new Error("Failed to update user");
      }

      return updatedUser;
   } catch (error) {
      const errorMessage =
         error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Create user failed: ${errorMessage}`);
   }
};

const deleteUser = async (id: Id) => {
   try {
      const userExists = await User.exists({ userId: id });

      if (!userExists) {
         throw new Error("User not found");
      }

      const deletedUser = await User.findOneAndDelete({ userId: id });

      if (!deletedUser) {
         throw new Error("Failed to delete user");
      }
   } catch (error) {
      const errorMessage =
         error instanceof Error ? error.message : "Unknown error";
      throw new Error(`Create user failed: ${errorMessage}`);
   }
};

export const svixController = async (
   req: Request,
   res: Response,
): Promise<any> => {
   try {
      const CLERK_SIGNING_SECRET = process.env.CLERK_SIGNING_SECRET;

      if (!CLERK_SIGNING_SECRET) {
         throw new Error("Missing CLERK_SIGNING_SECRET");
      }

      const wh = new Webhook(CLERK_SIGNING_SECRET);
      const headers = req.headers;
      const payload = Buffer.isBuffer(req.body)
         ? req.body
         : Buffer.from(JSON.stringify(req.body));

      const svix_id = headers["svix-id"] as string;
      const svix_timestamp = headers["svix-timestamp"] as string;
      const svix_signature = headers["svix-signature"] as string;

      if (!svix_id || !svix_timestamp || !svix_signature) {
         return res.status(400).json({
            success: false,
            message: "Missing required Svix headers",
         });
      }

      const evt = wh.verify(payload, {
         "svix-id": svix_id,
         "svix-timestamp": svix_timestamp,
         "svix-signature": svix_signature,
      } as WebhookRequiredHeaders) as ClerkEvent;

      // Handle Clerk specific events
      switch (evt.type) {
         case "user.created":
         case "user.updated": {
            const {
               id,
               first_name,
               last_name,
               image_url = "",
               email_addresses = [],
            } = evt.data;

            const userData = {
               id: evt.type === "user.created" ? id : id,
               email: email_addresses[0]?.email_address,
               first_name,
               last_name,
               profile_url: image_url,
            } as CreateUserRequest;

            try {
               let user;

               if (evt.type === "user.created") {
                  user = await createUser(userData);
               } else {
                  user = await updateUser(id, userData);
               }

               await clerkClient.users.updateUser(id, {
                  publicMetadata: {
                     user_id: user._id,
                  },
               });
            } catch (error) {
               console.error(`Failed to ${evt.type} user:`, error);
               throw error;
            }
            break;
         }

         case "user.deleted": {
            try {
               await deleteUser(evt.data.id as Id);
            } catch (error) {
               console.error("Failed to delete user:", error);
               throw error;
            }
            break;
         }

         default:
            console.warn(
               `Unhandled event type: ${evt.type} for user: ${evt.data.id}`,
            );
      }

      return res.status(200).json({
         success: true,
         message: "Webhook processed successfully",
         eventType: evt.type,
         userId: evt.data.id,
      });
   } catch (err) {
      console.error("Webhook Error:", err);
      return res.status(400).json({
         success: false,
         message:
            err instanceof Error ? err.message : "Webhook verification failed",
      });
   }
};
