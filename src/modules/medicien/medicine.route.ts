
import express, { Router } from "express";
import { medicineController } from "./medicine.controller";
import UserAuth, { UserRole } from "../../middleware/userAuthRole";


const router = express.Router();

// this is  public route 
router.get("/medicine", medicineController.GetAllMedicine);
router.get("/medicine/:id", medicineController.GetSpecificMedicine);
router.get("/categories", medicineController.GetMedicineWithCategory);
// this is Seller specific medicine route 

router.post("/seller/medicine",UserAuth( UserRole.SELLER),medicineController.addMedicine);
router.put("/seller/medicine/:id",UserAuth( UserRole.SELLER),medicineController.UpdateMedicine);
router.delete("/seller/medicine/:id",UserAuth( UserRole.SELLER),medicineController.DeleteMedicine);

export const medicineRouter: Router = router;