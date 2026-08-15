import { ICar } from "./carTypes";

export interface IGetFavoritesResponse {
  message: string;
  data: ICar[];
}