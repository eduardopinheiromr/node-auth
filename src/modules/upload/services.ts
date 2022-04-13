import cloudinary from "@config/cloudinary";
import { UploadApiResponse } from "cloudinary";
import path from "path";
import fs from "fs";

const UPLOADS_FOLDER_NAME = "uploads";

const cleanDiskUpload = (filename: string) => {
  const filepath = path.resolve(
    __dirname,
    "../../../",
    UPLOADS_FOLDER_NAME,
    filename
  );

  if (fs.existsSync(filepath)) {
    fs.unlinkSync(filepath);
  }
};

export const uploadImage = (filename: string): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      `${UPLOADS_FOLDER_NAME}\\${filename}`,
      { resource_type: "image" },
      (error, result) => {
        if (result) {
          cleanDiskUpload(filename);
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
  });
};
