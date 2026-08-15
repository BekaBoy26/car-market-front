

export interface ILoginBody {
  email: string
  password: string
}

export interface IRegBody {
  name: string;
  email: string;
  password: string;
  avatar: FileList;
}

export interface IAuthReturn {
  token: string;
}


export interface ILoginReturn {
    id: number
    name: string
    email: string
    token: string
}