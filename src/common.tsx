import { ItemModel } from "./models/ItemModel";

// 아이템 리스트를 새상품 순으로 정렬하고 반환
export const sortByNew = (list: ItemModel[]) => {
  return list.sort((a, b): any => {
    // 날짜가 클수록 최신 상품이기 때문에 앞순서에 정렬
    if (a.registrationDate > b.registrationDate) return -1;
    // 등록날짜가 같다면 id가 뒷순서인 상품이 최신이기 때문에 id값이 큰 상품을 앞순서로 정렬
    else if (a.registrationDate == b.registrationDate) {
      if (a.id > b.id) return -1;
      else if (a.id < b.id) return 1;
    } else if (a.registrationDate < b.registrationDate) return 1;
    else return 0;
  });
};

// 정수 또는 문자열을 가격표 형식의 문자열로 변환 후 반환
export function formatNumberToCurrency(number: number) {
  return number.toLocaleString();
}

// 아이템 가격 표시 로직
export const displayPriceHandler = (item: ItemModel) => {
  if (item.discountedPrice) {
    return (
      <p>
        <span>{formatNumberToCurrency(item.price)} KRW</span>
        <br />
        <span>{formatNumberToCurrency(item.discountedPrice)} KRW</span>
      </p>
    );
  } else {
    return (
      <p>
        <span></span>
        <span>{formatNumberToCurrency(item.price)} KRW</span>
      </p>
    );
  }
};
