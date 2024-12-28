import { useQuery } from "@tanstack/react-query";
import { Files, Folder } from "../lib/types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store.ts";

interface type {
  queryKeys: string[];
  queryFn: ({
    _id,
    clerkId,
  }: {
    _id: string;
    clerkId: string;
  }) => Promise<Files[] | Folder[] | undefined>;
}

export const useResponse = ({ queryFn, queryKeys }: type) => {
  const { _id, clerkId } = useSelector((state: RootState) => state.auth);
  const { data, isPending } = useQuery({
    queryKey: [...queryKeys],
    queryFn: async () => await queryFn({ _id, clerkId }),
    retry: 2,
    retryDelay: 1000,
    refetchOnReconnect: true,
    enabled: !!clerkId && !!_id,
  });

  return { data, isPending };
};
