import { wrappedFetch } from "@/lib/client/utils";
import { Message } from "@/types/message";

export const createMessage = async (message: Message): Promise<Message> => {
  const res = await wrappedFetch(`/api/messages`, {
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

export const getMessages = async (limit: number, lastCreatedAt?: string) => {
  const res = await wrappedFetch(
    `/api/messages?limit=${limit}&last=${lastCreatedAt}`,
    {
      method: "GET",
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  console.log(data);
  return data;
};

export const doneMessage = async (id: string): Promise<null> => {
  const res = await wrappedFetch(`/api/messages/${id}/done`, {
    method: "PUT",
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw new Error(data.error);
  }

  return null;
};

export const deleteMessage = async (id: string): Promise<null> => {
  const res = await wrappedFetch(`/api/messages/${id}/delete`, {
    method: "DELETE",
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw new Error(data.error);
  }

  return null;
};

export const notDoneMessage = async (id: string): Promise<null> => {
  const res = await wrappedFetch(`/api/messages/${id}/notDone`, {
    method: "PUT",
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw new Error(data.error);
  }

  return null;
};
