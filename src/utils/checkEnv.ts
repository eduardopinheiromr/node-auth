import * as dotenv from "dotenv";
dotenv.config({
  path: `.env.${process.env.NODE_ENV}`,
});

const {
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  AUTH_SECRET,
} = process.env;

export const checkEnv = () => {
  const requiredEnv = [
    { CLOUDINARY_CLOUD_NAME },
    { CLOUDINARY_API_KEY },
    { CLOUDINARY_API_SECRET },
    { AUTH_SECRET },
  ];

  const checks = [];

  requiredEnv.forEach((env, index) => {
    const envName = Object.keys(env)[0];
    const envValue = Object.values(env)[0];
    if (!envValue) {
      checks.push(`${envName} is not defined`);
    }
  });

  if (checks.length) {
    throw new Error(checks.join("\n"));
  }
};
