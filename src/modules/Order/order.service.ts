

import { prisma } from "../../lib/prisma"

 export const enum OrderStatus {
  PLACED ="PLACED",
  PROCESSING="PROCESSING",
  SHIPPED="SHIPPED",
   DELIVERED = "DELIVERED",
   CANCELLED = "CANCELLED"
}

const AddOrder = async (CustomerId: string, ShippingAddress: string) => {
  
try {
    const CreateOrder = await prisma.order.create({
      data: {
        customerId: CustomerId,
        shippingAddress: ShippingAddress,
      },
    });
  return CreateOrder;
} catch (error) {
  console.error(error)
}

}
const GetMyAllOrder = async (CustomerId: string) => {
try {
    const Myorder = await prisma.order.findMany({
      where: {
        customerId: CustomerId,
      },
    });
  return Myorder
} catch (error) {
  console.error(error);
  throw new Error("Failed to fetch Orders")
}
}
const OrderCancle = async (orderId: string, customerId: string) => {
  const findOrder = await prisma.order.findFirstOrThrow({
    where: {
      customerId,
    },
  });
  if (!findOrder) {
    return "you have no Order";
  }
  const cancleOreder = await prisma.order.update({
    where: {
      id: orderId,
    },
    data: {
      status: OrderStatus.CANCELLED,
    },
  });
  return cancleOreder;
};
export const OrderService = {
  AddOrder,
  GetMyAllOrder,
  OrderCancle
}