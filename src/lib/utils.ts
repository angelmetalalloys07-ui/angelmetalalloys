import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).replace(/\s+\S*$/, "") + "…";
}

export function getCloudinaryUrl(
  publicId: string,
  width?: number,
  height?: number
): string {
  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  if (!cloud) return "/images/placeholder-product.jpg";
  const transforms = [
    "f_auto",
    "q_auto",
    width ? `w_${width}` : "",
    height ? `h_${height}` : "",
    "c_fill",
  ]
    .filter(Boolean)
    .join(",");
  return `https://res.cloudinary.com/${cloud}/image/upload/${transforms}/${publicId}`;
}

export function categoryLabel(slug: string): string {
  const map: Record<string, string> = {
    "butt-weld-fittings": "Butt Weld Fittings",
    flanges: "Flanges",
    "forged-fittings": "Forged Fittings",
    "pipe-nipples": "Pipe Nipples",
    "stub-ends": "Stub Ends",
    olets: "Olets / Branch Connections",
  };
  return map[slug] ?? slug;
}
