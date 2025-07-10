import { ContentType, HeaderContentType } from "@/types/types";

const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL

async function uploadAsset(blogTitle: string, number: string, content:ContentType) {

  const file = content.content as File;
  const type = content.typeContent;

  const formData = new FormData();
  formData.append("blog_name", blogTitle);
  formData.append("number", number);
  formData.append(type, file);

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

  const result = await response.json();
  content.content = result.url;
}


function contentToMDX(content: ContentType[], header: HeaderContentType) {
  const frontmatter = `---
title: "${header.title}"
keywords: [${header.keywords.map(k => `"${k}"`).join(", ")}]
---`;

  const body = content.map((section) => {
    if(section.typeContent === 'image' || section.typeContent === 'pdf'){
      if (section.typeContent === "image") return `![imagen](${section.content})`;
      if (section.typeContent === "pdf") return `<PDF src="${section.content}" />`;
    }else{
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

async function PostInfoBlog(header: HeaderContentType){
  const body = {
    title:header.title,
    tags:header.keywords
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

async function UploadMDX(content:ContentType[], header:HeaderContentType){
    const mdxContent = contentToMDX(content, header);

    const file = new File([mdxContent], "blog.mdx", { type: "text/mdx" });
  
    // FormData para enviarlo como multipart/form-data
    const formData = new FormData();
    formData.append("blog_name", header.title);
    formData.append("mdx", file);
  
    // Enviar a tu API
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/upload/mdx`, {
      method: "POST",
      body: formData,
      headers:{
        Authorization: `Bearer ${JSON.parse(sessionStorage.getItem("user_stored") as string).token}`
      }
    });
  
    if (!response.ok) {
    const err = await response.json();
    throw new Error(`${err.error}:${err.details}`);
  }
}


export function downloadMDXFile(content: ContentType[], header: HeaderContentType) {
  const mdxContent = contentToMDX(content, header);

  const blob = new Blob([mdxContent], { type: "text/mdx" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "blog.mdx"; // nombre del archivo
  link.click();

  URL.revokeObjectURL(url); // liberar memoria
}

export async function uploadBlog(content: ContentType[], header: HeaderContentType) {
  try{
        let i = 1;
    for(const e of content){
      if(e.typeContent === "image" || e.typeContent === "pdf"){
        await uploadAsset(header.title, i.toString(), e);
        i++;
      }
    }
  
    await UploadMDX(content, header);
    await PostInfoBlog(header);
  }catch(err){
    console.error(err);
  }

}
