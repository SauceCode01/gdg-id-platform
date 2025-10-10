import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createMessage } from "../endpoints/messageEndpoints";
import { Message } from "@/types/message";

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
