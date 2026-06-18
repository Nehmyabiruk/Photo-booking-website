import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload a file buffer to Cloudinary
 * @param {Buffer} buffer — file buffer
 * @param {string} folder — e.g. 'amen-pictures/portfolio/weddings'
 * @param {string} publicId — optional custom public ID
 */
export async function uploadImage(buffer, folder = 'amen-pictures', publicId) {
  return new Promise((resolve, reject) => {
    const options = {
      folder,
      resource_type: 'image',
      quality: 'auto',
      fetch_format: 'auto',
      ...(publicId && { public_id: publicId }),
    };

    cloudinary.uploader.upload_stream(options, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    }).end(buffer);
  });
}

/**
 * Delete an image from Cloudinary
 * @param {string} publicId — Cloudinary public ID
 */
export async function deleteImage(publicId) {
  return cloudinary.uploader.destroy(publicId);
}

/**
 * Get optimized URL for an image
 */
export function getOptimizedUrl(publicId, { width, height, quality = 'auto' } = {}) {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality,
    ...(width && { width }),
    ...(height && { height }),
    crop: 'fill',
  });
}

export default cloudinary;
