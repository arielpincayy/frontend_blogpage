import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { BlogSectionType } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const blogSectionOptions: { label: string; value: BlogSectionType }[] = [
  { label: "Subtitle", value: "subtitle" },
  { label: "Text", value: "text" },
  { label: "Latex", value: "latex" },
  { label: "Image", value: "image" },
  { label: "PDF", value: "pdf" },
];

