import { Request, Response } from "express";
import { Webhook } from "svix";

// Add Clerk webhook event types
type ClerkWebhookEvent = {
  data: {
    id: string;
    first_name?: string;
    last_name?: string;
    email_addresses?: Array<{ email_address: string }>;
  };
  type: string;
  object: "event";
};

export const svixController = async (
  req: Request,
  res: Response
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
    }) as ClerkWebhookEvent;

    // Handle Clerk specific events
    switch (evt.type) {
      case "user.created":
        console.log(evt);
        console.log(`User created: ${evt.data.id}`);
        break;
      case "user.updated":
        console.log(`User updated: ${evt.data.id}`);
        break;
      case "user.deleted":
        console.log(`User deleted: ${evt.data.id}`);
        break;
      default:
        console.log(
          `Unhandled event type: ${evt.type} for user: ${evt.data.id}`
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
