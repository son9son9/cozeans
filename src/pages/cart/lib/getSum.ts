import { useEffect, useState } from "react";
import { ItemModel } from "../../../models/ItemModel";
import { useCartActions } from "../../../entities/cart";

export const useSum = (itemList: Array<ItemModel>) => {
  const [sum, setSum] = useState(0);
  const { myCart } = useCartActions();

  const getSum = () => {
    let total = 0;
    itemList.map((item: ItemModel) => {
      if (item.discountedPrice) {
        total += +item.discountedPrice * +item.quantity;
      } else if (item.price) {
        total += +item.price * +item.quantity;
      }
    });

    return total;
  };

  useEffect(() => {
    setSum(getSum());
  }, [myCart, sum]);

  return { sum };
};
