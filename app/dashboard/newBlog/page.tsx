"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Minus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { blogSectionOptions } from "@/lib/utils";

import { BlogSectionType, ContentType, HeaderContentType } from "@/types/types";

const defaultValue:BlogSectionType = blogSectionOptions[1].value;

export default function NewBlog(){
    const [headerContent, setHeaderContent] = useState<HeaderContentType>(
        {
            title:"",
            keywords:[]
        }
    );
    const [content, setContent] = useState<ContentType[]>(
        [{
            typeContent:defaultValue,
            content:"",
            id:crypto.randomUUID()
        }]
    );

    const onRender=()=>console.log({headerContent, content});
    

    return(
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="w-full text-center">
                <h1 className="text-5xl font-bold mb-3">Start writing your blog</h1>
                <h2>If you don't know how to start I recommend you read <span className="text-blue-600 underline hover:text-blue-800"><Link href="/">Get Started</Link></span></h2>
            </div>
            <div className="w-full flex flex-col mt-10 gap-2">
                <div className="w-[90%] mx-auto">
                    <h3 className="font-bold text-red-700 text-3xl mb-4">Title</h3>
                    <Textarea onChange={e=>setHeaderContent(prev=>({...prev, title:e.target.value}))}/>
                </div>
                <div className="w-[90%] mx-auto">
                    <h3 className="font-bold text-black text-xl mb-2">Keywords</h3>
                    <Textarea onChange={e=>setHeaderContent(prev=>({...prev, keywords:e.target.value.split(",").map(k=>k.trim())}))}/>
                </div>
            </div>
            {
                content.map((e)=>{
                    return(
                        <SectionWrite key={e.id} id={e.id} content={content} setContent={setContent}/>
                    )
                })
            }
            <div className="w-[90%] mx-auto flex flex-row gap-4 items-center justify-center md:items-start md:justify-start">
                <Button onClick={onRender}>Render</Button>
                <Button className="bg-green-600">Upload</Button>
            </div>
        </main>
    );
}

function SectionWrite({content, setContent, id}:
    {content:ContentType[], setContent:React.Dispatch<React.SetStateAction<ContentType[]>>, id:string}){

    const cont = content.find((e)=>e.id===id);
    const index = content.findIndex((e)=>e.id===id);

    const addSectionContent=(sel:BlogSectionType)=>{
        setContent((prev)=>[
            ...prev.slice(0, index + 1),
            {typeContent:sel,content:"",id:crypto.randomUUID()},
            ...prev.slice(index+1)
        ]);
    }

    const modifySelectionContent=(sel:BlogSectionType)=>{
        setContent((prev)=>
            prev.map(section=>
                section.id === id? 
                {...section, typeContent:sel}:section
            )
        );
    }

    const removeSectionContent=()=>{
        setContent((prev)=>{
            if(prev.length == 1) return prev;
            return  prev.filter((e)=>e.id !== id);
        });
    }

    return(
        <div className="flex flex-col w-full my-10">
            <div className="w-[90%] mx-auto flex flex-col gap-2">
                <Select defaultValue={cont?.typeContent} value={cont?.typeContent} onValueChange={(value)=>modifySelectionContent(value as BlogSectionType)}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {blogSectionOptions.map((e)=>{
                        return(
                            <SelectItem value={e.value} key={e.value}>{e.label}</SelectItem>
                        )
                    })}
                  </SelectContent>
                </Select>
                <RenderSection sel={cont?.typeContent as BlogSectionType} cont={cont} setContent={setContent}/>
            </div>
            <div className="w-[90%] flex flex-row gap-2 mt-5 mx-auto justify-center">
                <Button onClick={()=>addSectionContent(defaultValue)}>
                    <Plus/>
                </Button>
                {content.length > 1 &&
                <Button variant="destructive" onClick={removeSectionContent}>
                    <Minus/>
                </Button>
                }
            </div>
        </div>
    );
}

// Render the input according to the type selected
function RenderSection({sel, cont, setContent}:{sel:BlogSectionType, cont:ContentType|undefined, setContent:React.Dispatch<React.SetStateAction<ContentType[]>>}) {
    // Manging URL for files
    const [previewURL, setPreviewURL] = useState<string| null>(null);

    // Function for modify no file content
    const handleChangeContent=(value:string)=>{
        setContent((prev)=>
            prev.map(section=>
                section.id === cont?.id ? {...section, content:value, typeContent:sel}:section
            )
        )
    }

    // Function for modify file content
    const handleChangeFile=(file:File|undefined)=>{
        if (!file) return;
        setContent((prev) =>
          prev.map((section) =>
            section.id === cont?.id ? { ...section, content: file, typeContent:sel } : section
          )
        );
    }

    // Creating URL
    useEffect(() => {
      if (!cont?.content || !(cont.content instanceof File)) return;
    
      const url = URL.createObjectURL(cont.content);
      setPreviewURL(url);
    
      // Free memory
      return () => URL.revokeObjectURL(url);
    }, [cont?.content]);


    switch (sel) {
      case "subtitle":
        return <Textarea className="h-40" placeholder="Subtitle" onChange={(e)=>handleChangeContent(e.target.value)} value={cont?.content as string}/>;

      case "text":
        return <Textarea className="h-40" placeholder="Text" onChange={(e)=>handleChangeContent(e.target.value)} value={cont?.content as string}/>;

      case "latex":
        return <Textarea className="h-40" placeholder="Write an Latex equation here..." onChange={(e)=>handleChangeContent(e.target.value)} value={cont?.content as string}/>;

      case "image":
      return (
        <>
        <Input
          type="file"
          accept="image/*"
          onChange={(e) => handleChangeFile(e.target.files?.[0])}
        />
        {cont?.content instanceof File && cont.typeContent === "image" && (
          <img
            src={previewURL as string}
            alt="preview"
            className="mt-4 max-h-64 object-contain"
          />
        )}
        </>
      );
    
    case "pdf":
      return (
        <>
        <Input
          type="file"
          accept="application/pdf"
          onChange={(e) => handleChangeFile(e.target.files?.[0])}
        />
        {cont?.content instanceof File && cont.typeContent === "pdf" && (
          <iframe
            src={previewURL as string}
            className="mt-4 w-full h-[500px] border rounded"
            title="PDF preview"
          />
        )}
        </>
      );


      default:
        return null;
    }
}
