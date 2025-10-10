import { Message } from "@/types/message";

 

export const createMessage = async (message: Message) : Promise<Message> => {
  const res = await fetch(`/api/messages`, {
    method: "POST",
    body: JSON.stringify(message),
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};
