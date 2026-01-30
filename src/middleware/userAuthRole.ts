
import { betterAuth, success } from "better-auth";
import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";

export const enum UserRole {
  CUSTOMER = "CUSTOMER",
  ADMIN = "ADMIN",
  SELLER = "SELLER",
}

// TYPE DECLERATION FOR GLOBEL MEDICINE
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        role: string;
        emailVerifide: boolean;
      };
    }
  }
}

const UserAuth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // get user session
      const session = await auth.api.getSession({
        headers: { cookie: req.headers.cookie || "" },
      });

      if (!session) {
        return res.status(401).json({
          success: false,
          message:"You are Not Authorized!"
        })
      }

      req.user = {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
        role: session.user.role as string,
        emailVerifide:session.user.emailVerified
        
      }

      if (roles.length && !roles.includes(req.user.role as UserRole)) {
        return res.status(403).json({
          success: false,
          message:"Forbidden ! You dont have permission to access this resources !"
        })
      }
       next() 
    } catch (error) {
      next(error)
    }
  } 
}

export default UserAuth;