"use client";

import { CldImage, CldImageProps } from "next-cloudinary";
import { useState } from "react";

interface CloudinaryImageProps extends Omit<CldImageProps, "src"> {
  src: string;
  alt: string;
  fallbackSrc?: string;
}

export default function CloudinaryImage({ src, alt, fallbackSrc = "/images/placeholder.jpg", ...props }: CloudinaryImageProps) {
  const [error, setError] = useState(false);

  if (error || !src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={fallbackSrc} alt={alt} className={props.className} />;
  }

  return (
    <CldImage
      src={src}
      alt={alt}
      format="auto"
      quality="auto"
      dpr="auto"
      onError={() => setError(true)}
      {...props}
    />
  );
}
