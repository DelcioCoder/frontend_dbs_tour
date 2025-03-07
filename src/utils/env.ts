export const getCloudinaryName = () => {
    const name = process.env.CLOUDINARY_CLOUD_NAME;
    if(!name) throw new Error("CLOUDINARY_CLOUD_NAME não está definido.");
    return name;
}