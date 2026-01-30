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
  const resut = mediceneService.addMedicine(data ,user.id as string)
  res.status(200).json({resut})
}

export const medicineController = {
  addMedicine
}