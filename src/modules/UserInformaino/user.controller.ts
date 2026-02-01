
import { Request, Response } from "express";
import { userService } from "./user.service";

const AllUser = async (req: Request, res: Response) => {
  const result =await userService.AllUser()
  return res.status(200).json(result)
}
const UpdateUserStatus = async (req: Request, res: Response) => {
  const { id } = req.params
  const data = req.body
  const result = await userService.UserStatusUpdate(id as string, data)
  return res.status(200).json(result)
}

export const UserContorller = {
  AllUser,
  UpdateUserStatus
}