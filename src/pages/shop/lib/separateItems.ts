import { ItemModel } from "../../../models/ItemModel";

// chunkUnit만큼 itemList를 잘라 chunkedList에 저장
export const separateItems = (items: Array<ItemModel>, itemsPerPage: number): any => {
  let arr = [];
  for (let i = 0; i < items.length; i += itemsPerPage) {
    arr.push(items.slice(i, i + itemsPerPage));
  }
  return arr;
};
