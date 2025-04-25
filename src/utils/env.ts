export function getCloudinaryName() {
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      throw new Error("CLOUDINARY_CLOUD_NAME não configurado no .env.local");
    }
    return process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  }