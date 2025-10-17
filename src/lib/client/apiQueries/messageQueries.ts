import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { createMessage, getMessages } from "../apiEndpoints/messageEndpoints";
import { Message } from "@/types/message";
import { useMemo } from "react";

export function useCreateMessageMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (param: { message: Message }) => {
      const response = await createMessage(param.message);
      return response;
    },
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}

export function useInfiniteMessageQuery() {
  const { data, ...rest } = useInfiniteQuery<Message[], Error>({
    queryKey: ["messages"],
    queryFn: async ({ pageParam }) => {
      return getMessages(10, pageParam as string | undefined);
    },
    initialPageParam: null,
    getNextPageParam: (lastPage): string | undefined => {
      if (!lastPage || lastPage.length === 0) return undefined;
      console.log(lastPage[lastPage.length - 1].id);
      return lastPage[lastPage.length - 1].id;
    },
  });

  const messages = useMemo(
    () => data?.pages.flatMap((page) => page) ?? [],
    [data]
  );

  return { messages, ...rest };
}
