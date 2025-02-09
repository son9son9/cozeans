import { ItemModel } from "../../../models/ItemModel";

// 할인 중이면 할인가 반환, 아니면 정가 반환하는 함수
export const decidedPrice = (item: ItemModel) => {
  if (item.discountedPrice) return item.discountedPrice;
  else return item.price;
};
