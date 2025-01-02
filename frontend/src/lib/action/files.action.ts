import { Files } from "../types/index";
import axios, { AxiosError } from "axios";

export const getFiles = async ({
  clerkId,
}: {
  clerkId: string;
}): Promise<Files[]> => {
  try {
    const response = await axios.get("/api/file", {
      headers: {
        Authorization: `Bearer ${clerkId}`,
      },
    });

    if (response.status === 200) {
      return response.data.data || [];
    }
    return [];
  } catch (err) {
    throw new Error(
      (err as AxiosError)
        ? err?.response.data?.message || "An Error Occurred"
        : err?.message,
    );
  }
};

export const getFolderFiles = async ({
  folderId,
  userId,
}: {
  folderId: string;
  userId: string;
}): Promise<Files[] | undefined> => {
  try {
    const response = await axios.get(`/api/file/${folderId}/folder`, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    if (response.status === 200) {
      return response.data.data;
    }
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error?.response?.data?.message || "An Error Occurred");
  }
};
