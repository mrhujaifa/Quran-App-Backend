import status from "http-status";
import { envVars } from "../../../config/env";
import AppError from "../../errors/AppError";
import {
  ICombinedAyah,
  ISurah,
  ISurahDetail,
  ISurahWithAyahs,
  TSearchApiResponse,
  TSearchMatch,
  TSearchResult,
} from "./quran.interface";

//* Retrieve all surahs
const getAllSurahs = async (): Promise<ISurah[]> => {
  const response = await fetch(`${envVars.QURAN_API_BASE_URL}/surah`);

  if (!response.ok) {
    throw new Error("Failed to fetch surahs");
  }

  const result = await response.json();

  return result.data;
};

//* Retrieve a single surah by ID and combine Arabic ayahs with English translation
const getSurahById = async (id: number): Promise<ISurahDetail> => {
  const response = await fetch(
    `${envVars.QURAN_API_BASE_URL}/surah/${id}/editions/quran-uthmani,en.asad`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch surah with ID ${id}`);
  }

  const result = await response.json();

  const arabicData: ISurahWithAyahs = result.data[0];
  const englishData: ISurahWithAyahs = result.data[1];

  const combinedData: ICombinedAyah[] = arabicData.ayahs.map((ayah, index) => ({
    ...ayah,
    englishText: englishData.ayahs[index]?.text || "",
  }));

  return {
    surah: {
      number: arabicData.number,
      name: arabicData.name,
      englishName: arabicData.englishName,
      englishNameTranslation: arabicData.englishNameTranslation,
      revelationType: arabicData.revelationType,
      numberOfAyahs: arabicData.numberOfAyahs,
    },
    ayahs: combinedData,
  };
};

//* Search ayahs by translation text
const searchAyahs = async (query: string): Promise<TSearchResult[]> => {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    throw new AppError(400, "Search query is required");
  }

  const encodedQuery = encodeURIComponent(trimmedQuery);

  const response = await fetch(
    `${envVars.QURAN_API_BASE_URL}/search/${encodedQuery}/all/en`,
  );

  const result = await response.json();

  if (!response.ok) {
    if (response.status === 404) {
      return [];
    }

    throw new AppError(
      response.status || 500,
      result?.data || result?.message || "Failed to search ayahs",
    );
  }

  const matches: TSearchMatch[] = result?.data?.matches || [];

  return matches.map((item) => ({
    surahNumber: item.surah.number,
    surahName: item.surah.name,
    surahEnglishName: item.surah.englishName,
    ayahNumber: item.numberInSurah,
    text: item.text,
  }));
};

export const QuranServices = {
  getAllSurahs,
  getSurahById,
  searchAyahs,
};
