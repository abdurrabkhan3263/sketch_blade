import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import {useToast} from "./use-toast.ts";
import {AxiosError, AxiosResponse} from "axios";

interface type {
  queryKeys: string[];
  queryFn: ({
    _id,
    clerkId,
  }: {
    _id: string;
    clerkId: string;
  }) => Promise<AxiosResponse>;
}

export const useResponse = ({ queryFn, queryKeys }: type) => {
  const { _id, clerkId } = useSelector((state: RootState) => state.auth);
  const {toast} = useToast();

  const { data, isPending,isError,error } = useQuery({
    queryKey: [...queryKeys],
    queryFn: async () => {
      try {
        const response =  await queryFn({ _id, clerkId });
        return response.data?.data || []
      }catch (e) {
        const Error = e as AxiosError;
        toast({
          title: "Error",
          description: Error.response?.data?.message || Error?.message || "An Error Occurred",
          variant: "destructive",
        });
        return []
      }
    },
    retry: 2,
    retryDelay: 1000,
    refetchOnReconnect: true,
    enabled: !!clerkId && !!_id,
  });

  return { data, isPending,isError,error };
};
