import { Request, Response } from "express";
import { mediceneService } from "./medicine.service";



const addMedicine = async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(400).json({
      error:"Unauthorized !"
    })
  }
  const data = await req.body
  const resut = await mediceneService.addMedicine(data ,user.id as string)
  res.status(200).json({resut})
}

const GetAllMedicine = async (req: Request, res: Response) => {
  try {
    const data =await mediceneService.getAllMedicine();
 
    return res.status(200).send({
      data
    })
  } catch (error) {
    return res.status(400).json({
      message: "forbidden access",
      error:error
    })
  }
}
const GetSpecificMedicine = async (req: Request, res: Response) => {
  const medicineId = req.params.id;
  if (!medicineId) {
    res.status(500).json({
      message:"please try again"
    })
  }
  const data = await mediceneService.getSpecificMedicine(medicineId as string)
  return res.status(200).json(data)
}
const GetMedicineWithCategory = async (req: Request, res: Response) => {
  const { category } = req.query;
  const result = await mediceneService.GetMedicineWithCategory(category as string)
  if (!result.length) {
    return res.status(401).json({
      message:"this category medicine does not exist here !"
    })
  }
  return res.status(200).json(result);

}
export const medicineController = {
  addMedicine,
  GetAllMedicine,
  GetSpecificMedicine,
  GetMedicineWithCategory,
}