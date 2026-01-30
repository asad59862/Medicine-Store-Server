
import express, { Router } from "express";
import { medicineController } from "./medicine.controller";
import UserAuth, { UserRole } from "../../middleware/userAuthRole";


const router = express.Router();

router.post("/",UserAuth(UserRole.ADMIN , UserRole.SELLER),medicineController.addMedicine );


export const medicineRouter: Router = router;