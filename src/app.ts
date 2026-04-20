import express, { Application, Request, Response } from "express";
import { IndexRoutes } from "./app/routes/index.js";
import { globalErrorHandler } from "./app/middlewares/errors/globalErrorHandler.js";
import { notFound } from "./app/middlewares/errors/notFound.js";
import cors from "cors";
import { envVars } from "./config/env.js";

const app: Application = express();

// Express middleware
app.use(
  cors({
    origin: envVars.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

// All router
app.use("/api/v1", IndexRoutes);

// Root Route
app.get("/", (req: Request, res: Response) => {
  res.send("Quran backend server is running...");
});

// Error handling routes
app.use(globalErrorHandler);
app.use(notFound);

export default app;
