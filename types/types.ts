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
