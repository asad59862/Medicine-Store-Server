
import { Request, Response } from "express";
import { OrderItemInput, OrderService } from "./order.service";



const AddOrder = async (req: Request, res: Response) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const body = req.body as OrderItemInput;
    if (!body.shippingAddress ) {
      return res.status(400).json({
        message: "Invalid order data",
      });
    }
    console.log(user,body)
    const result = await OrderService.AddOrder( user.id,body);
     
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to create order",
    });
  }
};
const GettOrder = async (req: Request, res: Response) => {
 const user = req.user;

 if (!user) {
   return res.status(401).json({
     message: "You are not authorized. Please login first.",
   });
 }

 const myOrders = await OrderService.GetMyAllOrder(user.id);

 return res.status(200).json({
   success: true,
   data: myOrders,
 });

}
const GetAllOrderFeomSeller = async (req: Request, res: Response) => {
 const user = req.user;

 if (!user) {
   return res.status(401).json({
     message: "You are not authorized. Please login first.",
   });
 }

 const myOrders = await OrderService.GetAllOrderFromSeller();

 return res.status(200).json({
   success: true,
   data: myOrders,
 });

}

const OrderCancle = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    const { id : orderid } = req.params;
    
    if (!user) {
      return res.status(401).json({
        message: "You are not authorized. Please login first.",
      });
    }

    if (!orderid || typeof orderid !== "string") {
      return res.status(400).json({
        message: "orderId is required",
      });
    }
     console.log(orderid);
    const result = await OrderService.OrderCancle(orderid, user.id);

    return res.status(200).json({
      message: "Order cancelled successfully",
      data: result,
    });
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Failed to cancel order",
    });
  }
};

const OrderExicutionFromSeller = async (req: Request, res: Response) => {
  const data = req.body
  const {id} = req.params;
  const UpdatedOrderstatus =await OrderService.OrderExicutionFromSeller(id as string, data)
  return res.status(200).json(UpdatedOrderstatus)

}


export const OrderController = {
  AddOrder,
  GettOrder,
  GetAllOrderFeomSeller,
  OrderCancle,
  OrderExicutionFromSeller
}