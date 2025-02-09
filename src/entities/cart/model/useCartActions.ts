import { useDispatch, useSelector } from "react-redux";
import { ItemModel } from "../../../models/ItemModel";
import { cartActions } from "./slice";

export const useCartActions = () => {
  const dispatch = useDispatch();
  const loginSession = useSelector((state: any) => state.loginSession.value);
  const cart = useSelector((state: any) => state.cart.value);

  const checkItemInCart = (item: ItemModel): boolean => {
    return cart.some(
      (cartItem: ItemModel) => cartItem.id === item.id && cartItem.color === item.color && cartItem.size === item.size && cartItem.user === item.user
    );
  };

  const addToCart = (item: ItemModel) => {
    // 새로운 카트 데이터 추가 후 stringify하여 로컬스토리지 및 state 업데이트
    // quantity 한개 추가
    // user 키 추가
    const newCartInfo = {
      ...item,
      quantity: (item.quantity ? Number(item.quantity) : 0) + 1,
      user: loginSession?.userId || "",
    };
    dispatch(cartActions.addItem(newCartInfo));
  };

  return { checkItemInCart, addToCart };
};
