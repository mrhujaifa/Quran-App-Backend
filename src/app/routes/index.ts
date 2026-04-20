import { Router } from "express";
import { QuranRoutes } from "../modules/quran/quran.route.js";

const router = Router();
// root routes

router.use("/quran", QuranRoutes);

export const IndexRoutes = router;
