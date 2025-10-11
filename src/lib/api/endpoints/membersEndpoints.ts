


import { wrappedFetch } from "@/lib/utils"; 
import { Member } from "@/types/member";

 
 


export const getMember = async (email: string) : Promise<Member> => {
  console.log("getting member")
  const res = await wrappedFetch(`/api/members?email=${email}`, {
    method: "GET",
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error)
  }

  console.log(data);
  return data;
}