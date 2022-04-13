import authMiddleware from "../auth";
import multer from "multer";
import { multerConfig } from "@config/multer";

export const auth = authMiddleware();

export const upload = multer(multerConfig);

export const authUploadSingleFile = [
  auth.authenticate(),
  upload.single("file"),
];

export const authUploadMultipleFiles = [
  auth.authenticate(),
  upload.array("files"),
];
