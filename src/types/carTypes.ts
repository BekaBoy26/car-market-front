export interface ICar {
  id: number;
  model: string;
  year: string;
  mileage: number;
  price: number;
  description: string;
  condition: "new" | "used";
  brand: string;
  images: string[];
}

export interface ICarDetails extends ICar {
  owner: string;
  ownerAvatar: string | null;
  ownerEmail: string;
}

export interface IGetCarsResponse {
  message: string;
  data: ICar[];
}

export interface IGetOneCarResponse {
  message: string;
  data: ICarDetails;
}

export interface ICreateCarBody {
  brand_id: number;
  model: string;
  year: string;
  mileage: string;
  price: string;
  description: string;
  condition: "new" | "used";
  images: File[];
}

export interface IGetCarsParams {
  search?: string;
  brandId?: number;
  minPrice?: number;
  maxPrice?: number;
  maxMileage?: number;
  minYear?: number;
  maxYear?: number;
  sort?: "price_asc" | "price_desc";
}

export interface ICarForm {
  model: string;
  price: string;
  brand_id: string;
  year: string;
  mileage: string;
  description: string;
}
