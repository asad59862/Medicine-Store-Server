
import express, { Router } from "express";
import { medicineController } from "./medicine.controller";
import UserAuth, { UserRole } from "../../middleware/userAuthRole";


const router = express.Router();

router.post("/medicine", UserAuth(UserRole.ADMIN, UserRole.SELLER), medicineController.addMedicine,);
router.get("/medicine", medicineController.GetAllMedicine);
router.get("/medicine/:id", medicineController.GetSpecificMedicine);
router.get("/categories", medicineController.GetMedicineWithCategory);


export const medicineRouter: Router = router;