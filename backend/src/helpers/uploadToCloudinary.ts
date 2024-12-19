import { UploadedFile } from "express-fileupload";

import cloudinary from "../lib/cloudinary.ts";

export const uploadToCloudinary = async (file: UploadedFile) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (error) {
    console.log("Error uploading file to Cloudinary", error);
    throw new Error("Error uploading file to Cloudinary");
  }
};
