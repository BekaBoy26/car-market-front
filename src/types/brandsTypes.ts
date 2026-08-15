export interface IBrand {
  id: number;
  brand: string;
}

export interface IBrandsRes {
  message: string;
  data: IBrand[];
}
