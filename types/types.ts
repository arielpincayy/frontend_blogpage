export type TypeUser = {
  firstName:string,
  lastName:string,
  username:string,
  email:string,
  password:string
}

export type SignProps = {
    handleFormType: () => void;
    authentication: (route: string, data: TypeUser) => Promise<void>;

};