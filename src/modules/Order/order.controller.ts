

import { Request, Response } from "express";
import { OrderService } from "./order.service";


const AddOrder = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    if (!user) {
      return res.status(401).json({
        message: "you are not Autorized! please check your profile info ",
      });
    }
    const { shippingAddress } = req.body;
    if (!shippingAddress) {
      return res.status(400).json({
         message:"please send your shipping Address "
      })
    }
    const result = await OrderService.AddOrder(user.id, shippingAddress);

    res.status(200).json({
      result
    })

  } catch (error) {
    
  }
}
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


 export  const OrderController = {
   AddOrder,
   GettOrder,
   OrderCancle
}