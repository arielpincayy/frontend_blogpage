export type TypeUser = {
  firstName:string,
  lastName:string,
  username:string,
  email:string,
  password:string
}

export type SignProps = {
    handleFormType: () => void;
};

export type AuthContextType = {
  username:string,
  token:string
}

export type BlogSectionType = "subtitle" | "text" | "latex" | "image" | "pdf";

export type HeaderContentType = {
  title:string,
  keywords:string[]
}

export type ContentType = {
  typeContent:BlogSectionType,
  content:string | File,
  id:string
}
