import { useDispatch, useSelector } from "react-redux";
import { ItemModel } from "../../../models/ItemModel";
import { cartActions } from "./slice";

export const useCartActions = () => {
  const dispatch = useDispatch();
  const loginSession = useSelector((state: any) => state.loginSession.value);
  const cart = useSelector((state: any) => state.cart.value);

  const myCart = (): Array<ItemModel> => cart.filter((item: ItemModel) => item.user === loginSession?.userId);

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

  const decItemQuantity = (i: number) => {
    dispatch(cartActions.decreaseQuantity(i));
  };
  const incItemQuantity = (i: number) => {
    dispatch(cartActions.increaseQuantity(i));
  };

  const removeItem = (i: number) => {
    if (confirm("장바구니에서 삭제하시겠습니까?")) {
      dispatch(cartActions.removeItem(i));
      // 엘리먼트 리렌더링 이슈 미해결, 따라서 일단 페이지 리로드로 대체
      // window.location.reload();
    } else {
      return false;
    }
  };

  return { checkItemInCart, addToCart, removeItem, decItemQuantity, incItemQuantity, myCart };
};
