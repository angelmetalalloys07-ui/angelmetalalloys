import cloudinary from './cloudinary';

export async function uploadProductImage(fileBuffer: string | Buffer, productSlug: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      `data:image/png;base64,${fileBuffer.toString('base64')}`, // Adjust for actual buffer handling
      {
        folder: `angel-metal/products/${productSlug}`,
        use_filename: true,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve({
          secure_url: result?.secure_url,
          public_id: result?.public_id,
          width: result?.width,
          height: result?.height,
        });
      }
    );
  });
}

export async function deleteImage(publicId: string) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) reject(error);
      else resolve(result);
    });
  });
}

export function getOptimizedUrl(publicId: string, options: { width?: number; height?: number; quality?: string | number } = {}) {
  return cloudinary.url(publicId, {
    fetch_format: 'auto',
    quality: options.quality || 'auto',
    width: options.width,
    height: options.height,
    crop: 'fill',
  });
}
