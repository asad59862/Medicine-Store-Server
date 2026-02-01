

import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const enum OrderStatus {
  PLACED = "PLACED",
  PROCESSING = "PROCESSING",
  SHIPPED = "SHIPPED",
  DELIVERED = "DELIVERED",
  CANCELLED = "CANCELLED",
}
export type OrderItemInput = {
  medicineId: string;
  quantity: number;
  price: number;
  shippingAddress: string;
};

const AddOrder = async (CustomerId: string, payload: OrderItemInput) => {
  console.log(CustomerId, payload);

  const OrderItems = await prisma.orderItem.create({
    data: {
      customerId: CustomerId,
      medicineId: payload.medicineId,
      quantity: payload.quantity,
      price: payload.price,
      shippingAddress: payload.shippingAddress,
    },
  });

  return OrderItems;
};

const GetMyAllOrder = async (CustomerId: string) => {
  try {
    const Myorder = await prisma.orderItem.findMany({
      where: {
        customerId: CustomerId,
      },
      orderBy: {
        createdAt:"desc"
      }
      
    });
    return Myorder;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Orders");
  }
};
// seller end order
const GetAllOrderFromSeller = async () => {
  try {
    const Myorder = await prisma.orderItem.findMany({
      include: {
        customer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return Myorder;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch Orders");
  }
};
const OrderCancle = async (orderId: string, customerId: string) => {
  const findOrder = await prisma.orderItem.findFirstOrThrow({
    where: {
      customerId,
    },
  });
  if (!findOrder) {
    return "you have no Order";
  }
  const cancleOreder = await prisma.orderItem.update({
    where: {
      id: orderId,
    },
    data: {
      status: OrderStatus.CANCELLED,
    },
  });
  return cancleOreder;
};
const OrderExicutionFromSeller = async (
  orderId: string,
  data: Prisma.orderItemUpdateInput,
) => {
  const order = await prisma.orderItem.findFirst({
    where: {
      id: orderId,
      
    },
  });

  if (!order) {
    throw new Error("You are not allowed to update this order");
  }

  return prisma.orderItem.update({
    where: { id: orderId },
    data,
  });
};


export const OrderService = {
  AddOrder,
  GetMyAllOrder,
  OrderCancle,
  GetAllOrderFromSeller,
  OrderExicutionFromSeller
};
