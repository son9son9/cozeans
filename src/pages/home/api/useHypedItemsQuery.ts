import { useQuery } from "@tanstack/react-query";
import { ItemModel } from "../../../models/ItemModel";
import { sortByNew } from "../../../common";
import { requestItems } from "../../../entities/items";

export const useHypedItemsQuery = () =>
  useQuery({
    queryKey: ["hypedItems"],
    queryFn: requestItems,
    select: (data: ItemModel[]) => sortByNew([...data]).slice(0, 5),
    retry: false,
  });
