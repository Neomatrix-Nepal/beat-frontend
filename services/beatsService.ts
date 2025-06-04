import useApi from "@/hooks/useApi";
import { beatsRequest, beatsResponse } from "../types/beats";

export const beatService = () => {
  const { sendRequest } = useApi();

  return {
    getAll: () =>
      sendRequest<beatsResponse[]>(
        { url: "/beats", method: "GET" },
        { cache: true }
      ),

    create: (beat: beatsRequest) =>
      sendRequest<beatsResponse>({
        url: "/beats",
        method: "POST",
        data: beat,
      }),

    update: (id: number, beat: beatsRequest) =>
      sendRequest<beatsResponse>({
        url: `/beats/${id}`,
        method: "PUT",
        data: beat,
      }),

    delete: (id: number) =>
      sendRequest<void>({
        url: `/beats/${id}`,
        method: "DELETE",
      }),
  };
};
