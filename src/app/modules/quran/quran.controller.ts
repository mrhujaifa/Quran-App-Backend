import status from "http-status";
import { catchAsync } from "../../shared/catchAsync.js";
import { sendResponse } from "../../shared/sendResponse.js";
import { QuranServices } from "./quran.service.js";

//* Retrieve all surahs
const getAllSurahs = catchAsync(async (req, res) => {
  const surahs = await QuranServices.getAllSurahs();

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "All surahs retrieved successfully",
    data: surahs,
  });
});

//* Retrieve a single surah by ID with Arabic ayahs and English translation
const getSurahById = catchAsync(async (req, res) => {
  const { id } = req.params;
  const surahDetail = await QuranServices.getSurahById(Number(id));
  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Surah detail retrieved successfully",
    data: surahDetail,
  });
});

//* Search ayahs by translation text
const searchAyahs = catchAsync(async (req, res) => {
  // payload: search query in req.query.query
  const { query } = req.query;
  const result = await QuranServices.searchAyahs(query as string);

  sendResponse(res, {
    httpStatusCode: status.OK,
    success: true,
    message: "Ayahs search results retrieved successfully",
    data: result,
  });
});

export const QuranControllers = {
  getAllSurahs,
  getSurahById,
  searchAyahs,
};
