import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { BlogSectionType, StatusType } from "@/types/types";

// Base API URL loaded from environment variable
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const blogSectionOptions: { label: string; value: BlogSectionType }[] = [
  { label: "Subtitle", value: "subtitle" },
  { label: "Text", value: "text" },
  { label: "Code", value: "code" },
  { label: "Latex", value: "latex" },
  { label: "Image", value: "image" },
  { label: "PDF", value: "pdf" },
];

export const Status = {
  PUBLISHED:"PUBLISHED",
  DRAFT:"DRAFT",
  WAITING:"WAITING",
  REFUSED:"REFUSED"
} as const;

export const randomID =()=> Date.now().toString(36) + Math.random().toString(36).substring(2, 10);

export async function fetchUserPosts(user_id: number) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/blog/users/${user_id}/posts`);

  if (!res.ok) {
    const errData = await res.json().catch(() => ({
      error: "Unknown error",
      details: "No details provided"
    }));

    const message = `${errData.error || "Error"}: ${errData.details || "No details"}`;
    throw new Error(message);
  }

  return res.json(); // esto también debe ir con `await` si estás usando el resultado directamente
}
