import express, { Application, Request, Response } from "express";
import cors from "cors";
import { medicineRouter } from "./modules/medicien/medicine.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

 // fixed folder name

const app: Application = express();

// Enable CORS


app.use(
  cors({
    origin:"http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.all("/api/auth/*splat", toNodeHandler(auth));
// Enable JSON body parsing


// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("This is Medi-Store Server ✅");
});


// Medicine routes
app.use("/api/medicine", medicineRouter);

export default app;
