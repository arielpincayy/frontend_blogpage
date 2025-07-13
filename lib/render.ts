import { ContentType, HeaderContentType, PostType, StatusType } from "@/types/types";
import { Dispatch, SetStateAction } from "react";

// Base API URL loaded from environment variable
const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

// Uploads a single asset (image or PDF) and replaces the file content with its URL after upload
async function uploadAsset(blogTitle: string, number: string, content: ContentType) {
  const file = content.content as File;
  const type = content.typeContent;

  const formData = new FormData();
  formData.append("blog_name", blogTitle);
  formData.append("number", number);
  formData.append(type, file); // Field name corresponds to type: "image" or "pdf"

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/upload/${type}`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user_stored") as string).token}`
    }
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`${err.error}:${err.details}`);
  }

  // Save the uploaded asset URL into the content field
  const result = await response.json();
  content.content = result.url;
}

// Converts blog content and metadata into MDX format string
function contentToMDX(content: ContentType[], header: HeaderContentType) {
  const frontmatter = `---
# ${header.title}
keywords: ${header.keywords.map(k => `"${k}"`).join(", ")}
---`;

  const body = content.map((section) => {
    if (section.typeContent === 'image' || section.typeContent === 'pdf') {
      // Handle file-based content with MDX-compatible syntax
      if (section.typeContent === "image") return `![imagen](${section.content})`;
      if (section.typeContent === "pdf") return `<PDF src="${section.content}" />`;
    } else {
      // Handle textual content (subtitle, paragraph, LaTeX math)
      switch (section.typeContent) {
        case "subtitle": return `## ${section.content}`;
        case "text": return section.content;
        case "latex": return `$$${section.content}$$`;
        default: return "";
      }
    }
    return "";
  }).join("\n\n");

  return `${frontmatter}\n\n${body}`;
}

// Sends blog metadata (title and tags) to the backend to create a new post record
async function PostInfoBlog(header: HeaderContentType, url:string, status:StatusType) {
  const body = {
    title: header.title,
    tags: header.keywords,
    status:status,
    url:url
  }

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/blog/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user_stored") as string).token}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`${err.error}:${err.details}`);
  }
}

// Uploads the generated MDX file to the server
async function UploadMDX(content: ContentType[], header: HeaderContentType) {
  const mdxContent = contentToMDX(content, header);

  const file = new File([mdxContent], "blog.mdx", { type: "text/mdx" });

  const formData = new FormData();
  formData.append("blog_name", header.title);
  formData.append("mdx", file);

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/upload/mdx`, {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user_stored") as string).token}`
    }
  });

  if (!response.ok) {
    const err = await response.json();
    throw new Error(`${err.error}:${err.details}`);
  }

  return response.json()
}

// Master function that uploads all assets, the MDX file, and registers the blog post
export async function uploadBlog(content: ContentType[], header: HeaderContentType, status:StatusType) {
  try {
    let i = 1;
    for (const e of content) {
      if (e.typeContent === "image" || e.typeContent === "pdf") {
        await uploadAsset(header.title, i.toString(), e);
        i++;
      }
    }

    const response = await UploadMDX(content, header); // Upload MDX file with final links
    await PostInfoBlog(header, response.url, status);          // Register blog post in database
  } catch (err) {
    console.error(err); // Capture and show any error in the whole process
  }
}

// Remove Blog
export async function removeBlog(id: number, setPosts:Dispatch<SetStateAction<PostType[]>>) {
  const stored = sessionStorage.getItem("user_stored");
  if (!stored) throw new Error("No user in session");

  const user = JSON.parse(stored);
  
  if (!user.token) throw new Error("No token found in user object");

  const res = await fetch(`${NEXT_PUBLIC_API_URL}/blog/posts/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${user.token}`,
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err?.error || `Failed to delete blog (status ${res.status})`);
  }

  setPosts(prev=>prev.filter(post=>post.id!==id));

}
