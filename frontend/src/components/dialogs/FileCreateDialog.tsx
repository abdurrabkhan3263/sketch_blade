import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import AddCollaboratorInput from "../AddCollaboratorInput.tsx";
import axios, {AxiosError} from "axios";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import useMutate from "../../hooks/useMutate.ts";
import {CollaboratorData, CreateFile, Files} from "../../lib/types";

const formSchema = z.object({
  file_name: z
    .string()
    .min(3, "File name must be at least 3 characters long")
    .max(50, "File name must not exceed 50 characters")
    .nonempty("File name is required")
    .refine((value) => /^[a-zA-Z0-9_-]+$/.test(value), {
      message:
        "File name can only contain letters, numbers, underscores, and hyphens",
    }),
  description: z.string().optional(),
  collaborators: z
    .array(
      z.object({
        _id: z.string(),
        full_name: z.string(),
        profile_url: z.string(),
        email: z.string().email(),
        actions:z.enum(["edit","view"])
      }),
    )
    .optional(),
});

interface FileCreateDialogProps {
  children: React.ReactNode;
  _id?: string;
  fileData?: Files;
}

export function FileCreateDialog({
  children,
  _id,
  fileData,
}: FileCreateDialogProps) {
  const [collaborators, setCollaborators] = useState<CollaboratorData[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file_name: fileData?.file_name ?? "",
      collaborators: [],
      description: fileData?.description ?? "",
    },
  });

  const createMutationFun = async (clerkId:string,data:CreateFile):Promise<void> => {
    try {
      const response = await axios.post("/api/file", data, {
        headers: {
          Authorization: `Bearer ${clerkId}`,
        },
      });
      return response.data
    } catch (e) {
      const error = e as AxiosError;
      throw new Error((error.response?.data as { message: string })?.message || "An error occurred");
    }finally {
        form.reset();
        setCollaborators([]);
    }
  };

  const updateMutationFun = async (clerkId:string,data:CreateFile):Promise<void> => {
    try {
      const response = await axios.put(`/api/file/${_id}`, data, {
        headers: {
            Authorization: `Bearer ${clerkId}`,
        }
        });
      return response.data;
    } catch (e) {
        const error = e as AxiosError;
        throw new Error((error.response?.data as { message: string })?.message || "An error occurred");
    }finally {
        form.reset();
        setCollaborators([]);
    }
  };

  const createMutation = useMutate(createMutationFun,{queryKey:["getFiles"]},setIsOpen)
    const updateMutation = useMutate(updateMutationFun,{queryKey:["getFiles"]},setIsOpen)

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    data["collaborators"] = collaborators ?? [];
    if (fileData) {
        updateMutation.mutate(data);
    } else {
      createMutation.mutate(data);
    }
  };

  useEffect(() => {
    if (fileData?.collaborators) {
      setCollaborators(fileData.collaborators);
    }
  }, [fileData]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="dark-container sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Create New File</DialogTitle>
          <DialogDescription>
            Enter file details and add collaborators.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="file_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter file name"
                      {...field}
                      className="dark-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <AddCollaboratorInput
              setCollaborators={setCollaborators}
              collaborators={collaborators}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter file description"
                      {...field}
                      className="dark-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" variant={"app"} className={"w-full"}>
                {createMutation.isPending || updateMutation.isPending ? (
                  <>
                    {fileData ? "Updating..." : "Creating..."}
                    <Loader2 className="mr-3 h-8 w-8 animate-spin" />
                  </>
                ) : !fileData ? (
                  "Create File"
                ) : (
                  "Update File"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
