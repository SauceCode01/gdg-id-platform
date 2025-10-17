import { wrappedFetch } from "@/lib/client/utils";
import { Member } from "@/types/member";

export const getMember = async (email: string): Promise<Member> => { 
  const res = await wrappedFetch(`/api/members?email=${email}`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error);
  }

  return data;
};
