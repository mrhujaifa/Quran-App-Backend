export interface ISurah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
}

export interface IAyah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
}

export interface ISurahDetail {
  surah: ISurah;
  ayahs: IAyah[];
}

export interface ISurahWithAyahs {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  ayahs: IAyah[];
}

export interface ICombinedAyah {
  number: number;
  text: string;
  numberInSurah: number;
  juz: number;
  manzil: number;
  page: number;
  ruku: number;
  hizbQuarter: number;
  sajda: boolean;
  englishText: string;
}

export interface TSearchResult {
  surahNumber: number;
  surahName: string;
  surahEnglishName: string;
  ayahNumber: number;
  text: string;
}

export type TSearchMatch = {
  numberInSurah: number;
  text: string;
  surah: {
    number: number;
    name: string;
    englishName: string;
  };
};

export type TSearchApiResponse = {
  data?: {
    matches?: TSearchMatch[];
  };
};
