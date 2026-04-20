import { Router } from "express";
import { QuranControllers } from "./quran.controller";

const router = Router();

router.get("/surahs", QuranControllers.getAllSurahs);
router.get("/surahs/:id", QuranControllers.getSurahById);
router.get("/search", QuranControllers.searchAyahs);

export const QuranRoutes = router;
