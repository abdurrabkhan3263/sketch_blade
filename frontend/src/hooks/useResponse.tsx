import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";
import {useToast} from "./use-toast.ts";
import {AxiosError, AxiosResponse} from "axios";
import {useEffect} from "react";

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
        const response =  await queryFn({ _id, clerkId });
        return response.data?.data || []
      },
        retry: 2,
        retryDelay: 1000,
        refetchOnReconnect: true,
        enabled: !!clerkId && !!_id,
    }
    );

  useEffect(() => {
    if(isError){
        const axiosError = error as AxiosError;
        toast({
            title: "Error",
            description: axiosError.response?.data?.message || axiosError.message || "An error occurred",
            variant:"destructive"
        });
    }
  }, [isError]);

  return { data, isPending,isError,error };
};
