export type OrderInfo = {
  orderId: string;
  amount: number;
  orderDate: number;
  status: string;
  customerInfo: {
    name: string;
    addressZonecode: string;
    address: string;
    addressDetail: string;
    phoneFirstNumber: string;
    phoneMiddleNumber: string;
    phoneLastNumber: string;
    email: string;
    message: string;
  };
};
