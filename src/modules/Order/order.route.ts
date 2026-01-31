
import express, { Router } from "express"
import { OrderController } from "./order.controller";
import UserAuth from "../../middleware/userAuthRole";
const router = express.Router();

router.post("/",UserAuth() ,OrderController.AddOrder)
router.get("/", UserAuth(), OrderController.GettOrder)
router.put("/:id",UserAuth(),OrderController.OrderCancle)

export const  OrderRouter :Router =router