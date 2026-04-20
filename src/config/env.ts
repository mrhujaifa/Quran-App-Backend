import dotenv from "dotenv";

dotenv.config();

// interface
interface EnvConfig {
  DATABASE_URL: string;
  NODE_ENV: string;
  PORT: string;
  FRONTEND_URL: string;
  QURAN_API_BASE_URL: string;
}

// Required Env Variable Function
const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables = [
    "NODE_ENV",
    "PORT",
    "DATABASE_URL",
    "FRONTEND_URL",
    "QURAN_API_BASE_URL",
  ];

  requiredEnvVariables.forEach((envVar) => {
    if (!process.env[envVar]) {
      throw new Error(`Missing required environment variable: ${envVar} `);
    }
  });

  return {
    DATABASE_URL: process.env.DATABASE_URL as string,
    NODE_ENV: process.env.NODE_ENV as string,
    PORT: process.env.PORT as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
    QURAN_API_BASE_URL: process.env.QURAN_API_BASE_URL as string,
  };
};

export const envVars = loadEnvVariables();
