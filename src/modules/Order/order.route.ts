
import express, { Router } from "express"
import { OrderController } from "./order.controller";
import UserAuth, { UserRole } from "../../middleware/userAuthRole";
const router = express.Router();

router.post("/order", UserAuth(), OrderController.AddOrder);
router.get("/order", UserAuth(), OrderController.GettOrder);
router.put("/order/:id", UserAuth(), OrderController.OrderCancle);

// seller ends
router.get("/seller/orders",UserAuth(UserRole.SELLER, UserRole.ADMIN),OrderController.GetAllOrderFeomSeller);
router.put("/seller/order/:id",UserAuth(UserRole.SELLER, UserRole.ADMIN),OrderController.OrderExicutionFromSeller);

export const  OrderRouter :Router =router