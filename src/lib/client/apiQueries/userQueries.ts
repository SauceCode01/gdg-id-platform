import { useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";
import { getUser } from "../apiEndpoints/userEndpoints";

export function useUserQuery(uid?: string) {
  const { data: user, ...rest } = useQuery<User>({
    queryKey: ["coupons", uid],
    queryFn: async () => {
      if (!uid) throw new Error("Project ID and Item ID are required");
      const response = await getUser(uid);
      return response;
    },
    enabled: !!uid,
  });

  return { user, ...rest };
}
