import { v2 as cloudinary } from "cloudinary";

(async function () {
  // Configuration
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;
  if (!cloudName) {
    throw new Error(
      "CLOUDINARY_CLOUD_NAME environment variable is not defined."
    );
  }
  if (!apiKey) {
    throw new Error("CLOUDINARY_API_KEY environment variable is not defined.");
  }
  if (!apiSecret) {
    throw new Error(
      "CLOUDINARY_API_SECRET environment variable is not defined."
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
})();

export default cloudinary;
