export function getCloudinaryName() {
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
      throw new Error("CLOUDINARY_CLOUD_NAME não configurado no .env.local");
    }
    return process.env.CLOUDINARY_CLOUD_NAME;
  }