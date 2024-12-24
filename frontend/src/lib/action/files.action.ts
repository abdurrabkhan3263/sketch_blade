import { Files, Folders } from "../Types/index";
import axios, { AxiosError } from "axios";

export const getFiles = async ({
  user,
}: {
  user: string;
}): Promise<Files[] | undefined> => {
  try {
    const response = await axios.get("/api/file", {
      headers: {
        Authorization: `Bearer ${user}`,
      },
    });

    if (response.status === 200) {
      return response.data.data;
    }
  } catch (err) {
    throw new Error(
      (err as AxiosError)
        ? err?.response.data?.message || "An Error Occurred"
        : err?.message,
    );
  }
};

export const getFolders = async (): Promise<Folders[]> => {
  return [] as Folders[];
};
