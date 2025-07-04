'use client';

import { useState } from "react";
import {toast} from "react-toastify";
import SignUp from "@/components/SignUp";
import SignIn from "@/components/SingIn";

import { TypeUser } from "@/types/types";


export default function SignUpPage() {

  const [formtype, setFormtype] = useState<boolean>(true)

  function handleFormType(){
    setFormtype(!formtype);
  }
  
  async function authentication(route:string, data:TypeUser){
    try{
      let send_data;
      if(route=='register'){
        send_data = {
          name:data.firstName,
          last_name:data.lastName,
          username:data.username,
          email:data.email,
          password_hash:data.password
        }
      }else{
        send_data = {
          username:data.username,
          password_hash:data.password
        }
      }

      console.log(send_data);

      const res = await fetch(`http://localhost:5000/auth/${route}`,{

        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify(send_data)
      })

      if(!res.ok){
        const err_message = await res.json();
        toast.error(err_message.message || "Wrong credentials or user already exists");
      }else{

        toast.success("Authentication successful!");
        setTimeout(() => {
          window.location.href = '/';
        },1500);
      }

    }catch(err){
      toast.error("An error occurred during authentication. Please try again.");
      console.error("Authentication error:", err);
    }
  }

  return (
    <>
      {/* Sign Up Form */}
      <main className="container mx-auto px-6 py-16 flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
              </svg>
            </div>
          </div>
          {formtype ? <SignIn handleFormType={handleFormType} authentication={authentication} />  : <SignUp handleFormType={handleFormType} authentication={authentication} />}
        </div>
      </main>
    </>
  )
}