export interface IProfileRes {
  message: string;
  data: IProfileData;
}

export interface IProfileData {
  id: number;
  name: string;
  email: string;
  avatar: string;
  created_at: number
}