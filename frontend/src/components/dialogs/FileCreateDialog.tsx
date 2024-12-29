import { useState } from "react";
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
import { CollaboratorData } from "../../lib/types";
import AddCollaboratorInput from "../AddCollaboratorInput.tsx";
import { useMutation } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store.ts";
import { Textarea } from "../ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "../../hooks/use-toast.ts";

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
        user: z.string(),
        full_name: z.string(),
        profile_url: z.string(),
        actions: z.enum(["view", "edit"]),
      }),
    )
    .optional(),
});

interface FileCreateDialogProps {
  children: React.ReactNode;
}

export function FileCreateDialog({ children }: FileCreateDialogProps) {
  const [collaborators, setCollaborators] = useState<CollaboratorData[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { clerkId } = useSelector((state: RootState) => state.auth);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file_name: "",
      collaborators: [],
      description: "",
    },
  });

  const createMutation = useMutation({
    mutationKey: ["createFile"],
    mutationFn: (data: CollaboratorData) => {
      return axios.post("/api/file", data, {
        headers: {
          Authorization: `Bearer ${clerkId}`,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getFiles"] });
      setIsOpen(false);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description:
          error.response.data.message ?? error.message ?? "An error occurred",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    data["collaborators"] = collaborators;
    createMutation.mutate(data);
  };

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
                {createMutation.isPending ? (
                  <>
                    Creating...
                    <Loader2 className="mr-3 h-8 w-8 animate-spin" />
                  </>
                ) : (
                  "Create File"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
