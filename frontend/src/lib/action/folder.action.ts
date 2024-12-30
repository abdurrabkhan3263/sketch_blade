import { Folders } from "../types/index";
import axios, { AxiosError } from "axios";

export const getFolders = async ({
  userId,
}: {
  userId: string;
}): Promise<Folders[] | undefined> => {
  try {
    const response = await axios.get("/api/folder", {
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

export const deleteFolder = async ({
  folderIds,
  userId,
}: {
  folderIds: string;
  userId: string;
}) => {
  try {
    const response = await axios.delete(`/api/folder/${folderIds}`, {
      headers: {
        Authorization: `Bearer ${userId}`,
      },
    });
    if (response.status === 200) {
      return response.data?.data;
    }
    return [];
  } catch (err) {
    const error = err as AxiosError;
    throw new Error(error?.response?.data?.message || "An Error Occurred");
  }
};
