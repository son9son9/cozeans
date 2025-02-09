import { sortByNew } from "../../../common";
import { ItemModel } from "../../../models/ItemModel";
import { decidedPrice } from "./decidedPrice";

export const sortItems = (itemList: Array<ItemModel>, sortMode: string) => {
  if (!itemList.length) return [];
  const arr = [...itemList];

  if (sortMode === "new") {
    return sortByNew(arr);
  } else if (sortMode === "price-desc") {
    return arr.sort((a, b) => decidedPrice(b) - decidedPrice(a));
  } else if (sortMode === "price-asc") {
    return arr.sort((a, b) => decidedPrice(a) - decidedPrice(b));
  } else if (sortMode === "name-asc") {
    return arr.sort((a, b) => a.name.localeCompare(b.name));
  }

  return arr;
};
