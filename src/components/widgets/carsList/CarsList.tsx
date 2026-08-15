import { ICar } from "@/types/carTypes";
import CarCard from "@/components/ui/carCard/CarCard";
import scss from "./carsList.module.scss";

interface ICarListProps {
  cars: ICar[];
}

const CarList = ({ cars }: ICarListProps) => {
  return (
    <div className={scss.cars}>
      {cars.map((car) => (
        <CarCard key={car.id} car={car} />
      ))}
    </div>
  );
};

export default CarList;