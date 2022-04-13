import { Express } from "express";
import { jwt } from "@utils/token";
import { db } from "src/db";
import { uploadImage } from "./services";
import { nanoid } from "nanoid";

import {
  auth,
  authUploadMultipleFiles,
  authUploadSingleFile,
  upload,
} from "./middleware";

export const uploadRoutes = (app: Express) => {
  app.post(
    "/upload/auth/single/image",
    authUploadSingleFile,
    async (req, res) => {
      const token = jwt.decode(req);

      const { url } = await uploadImage(req.file.filename);

      const user_image = db.create("user_images", {
        id: nanoid(),
        user_id: token.id,
        url,
        createdAt: new Date().toISOString(),
      });
      res.json(user_image);
    }
  );

  app.post(
    "/upload/auth/multiple/image",
    authUploadMultipleFiles,
    async (req, res) => {
      const token = jwt.decode(req);

      const images = await Promise.all(
        req.files.map(async file => {
          const { url } = await uploadImage(file.filename);

          return url;
        })
      );

      const user_images = db.create("user_images", {
        id: nanoid(),
        user_id: token.id,
        images,
        createdAt: new Date().toISOString(),
      });
      res.json(user_images);
    }
  );

  app.post("/upload/single/image", upload.single("file"), async (req, res) => {
    const { url } = await uploadImage(req.file.filename);
    const image = db.create("images", {
      id: nanoid(),
      url,
      createdAt: new Date().toISOString(),
    });
    res.json(image);
  });

  app.post(
    "/upload/multiple/image",
    upload.array("files"),
    async (req, res) => {
      const images = await Promise.all(
        (req.files as Express.Multer.File[]).map(async file => {
          const { url } = await uploadImage(file.filename);

          return url;
        })
      );

      const createdImages = db.create("images", {
        id: nanoid(),
        images,
        createdAt: new Date().toISOString(),
      });
      res.json(createdImages);
    }
  );

  app.delete("/remove/image/:id", auth.authenticate(), (req, res) => {
    const imageExists = db.findById("user_images", req.params.id);
    if (imageExists) {
      db.remove("user_images", req.params.id);
      return res.json({ message: "Image was deleted" });
    }

    res.status(404).json({ message: "Image not found" });
  });
};
