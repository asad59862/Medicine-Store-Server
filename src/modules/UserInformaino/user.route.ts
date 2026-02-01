import express, { Router } from "express";
import { UserContorller } from "./user.controller";
import UserAuth, { UserRole } from "../../middleware/userAuthRole";
const router = express.Router();

router.get("/admin/users",UserAuth(UserRole.ADMIN),UserContorller.AllUser)
router.put("/admin/user/:id",UserAuth(UserRole.ADMIN),UserContorller.UpdateUserStatus)

export const userRouter: Router = router;
