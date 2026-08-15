import { IGetCarsParams } from "./carTypes";

export interface ISearchProps {
  onFiltersChange: (filters: IGetCarsParams) => void;
}