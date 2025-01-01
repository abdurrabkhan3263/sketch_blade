import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast.ts";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import {useNavigate} from "react-router";

const useMutate = (
  mutation: (clerkId: string,data?:any) => Promise<void>,
  options: { [key: string]: string[] },
  setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>,
): { mutate: any; isPending: boolean; isError: boolean } => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const clerkId = useSelector((state: RootState) => state.auth.clerkId);
  const navigate = useNavigate();

  const { mutate, isPending, isError } = useMutation({
    mutationKey: ["deleteFile"],
    mutationFn: (data) => {
      return mutation(clerkId,data ?? {});
    },
    onSuccess: () => {
      if (setDialogOpen) {
        setDialogOpen(false);
      }
      queryClient.invalidateQueries(options);
    },
    onError: (err) => {
      if (setDialogOpen) {
        setDialogOpen(false);
      }
      toast({
        title: "Error",
        description: err.message || "An error occurred",
        variant: "destructive",
      });
    },
    networkMode: "online",
    retry: 1,
    retryDelay: 1000,
  });

  if (!clerkId) {
    toast({
      title: "Error",
      description: "Clerk ID not found",
      variant: "destructive",
    });
    navigate("/sign-in");
  }

  return {
    mutate,
    isPending,
    isError,
  };
};

export default useMutate;
