import { useQuery } from "@tanstack/react-query";
import { requestItems } from "../api/requestItems";

export const useItems = () =>
  useQuery({
    queryKey: ["items"],
    queryFn: requestItems,
  });
