import { wrappedFetch } from "@/lib/client/utils";
import { User } from "@/types/user";

export const getUser = async (uid: string) : Promise<User> => {
  const res = await wrappedFetch(`/api/users/${uid}`, {
    method: "GET",
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};
 

