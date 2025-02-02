import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import { getEnvVar } from "./getEnvVar.js";
// import { CLOUDINARY } from '../constants/index.js';


const cloud_name = getEnvVar("CLOUD_NAME");
const api_key = getEnvVar("API_KEY");
const api_secret = getEnvVar("API_SECRET");
cloudinary.v2.config({
  secure: true,
  cloud_name,
    api_key,
    api_secret,
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path, {folder: 'photos'});
  await fs.unlink(file.path);
  return response.secure_url;
};

//============================


export const saveAvatarToCloudinary = async (file) => {
  const response = await cloudinary.v2.uploader.upload(file.path, {
    folder: 'avatars',
    transformation: [
      { width: 250, height: 250, crop: 'fill' },
      { quality: 'auto' }
    ]
  });
  await fs.unlink(file.path);
  return {
    url: response.secure_url,
    public_id: response.public_id
  };
};

export const deleteFileFromCloudinary = async (public_id) => {
  if (!public_id) return;
  return await cloudinary.v2.uploader.destroy(public_id);
};







