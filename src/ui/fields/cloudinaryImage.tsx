'use client'
import { CldImage, getCldImageUrl } from 'next-cloudinary';

const CloudinaryImage = ({ publicId }) => {
  const imageUrl = getCldImageUrl({
    width: 960,
    height: 600,
    src: publicId,
  });

  return (
    <CldImage
      width="960"
      height="600"
      src={imageUrl}
      sizes="100vw"
      alt="Imagen from Cloudinary"
    />
  );
};

export default CloudinaryImage;
