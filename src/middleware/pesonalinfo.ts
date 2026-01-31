
import express, { Request, Response, Router } from "express"
import UserAuth from "./userAuthRole";
import { auth } from "../lib/auth";

const router = express.Router();

router.get("/me", async (req: Request, res: Response) => {

  const session = await auth.api.getSession({
    headers: { cookie: req.headers.cookie || "" },
  });

  if (!session) {
    res.status(400).json({
      message:"please log in sir"
    })
  }

  res.status(200).json(session)
})

export const Userinformation :Router = router;