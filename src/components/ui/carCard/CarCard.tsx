import { ICar } from "@/types/carTypes";
import scss from "./carCard.module.scss";
import FavoriteButton from "../favoriteBtn/FavoriteBtn";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/formatPrice";
import { getImageUrl } from "@/utils/getImageUrl";

interface ICarCardProps {
  car: ICar;
}

const CarCard = ({ car }: ICarCardProps) => {
  const router = useRouter();
  return (
    <div className={scss.card}>
      <div className={scss.image}>
        <img src={getImageUrl(car.images[0])} alt={car.model} />

        <span className={scss.brand}>{car.brand}</span>

        <FavoriteButton car={car} className={scss.favorite} />
      </div>

      <div className={scss.info}>
        <h2>{car.model}</h2>

        <div className={scss.price}>{formatPrice(car.price)}</div>
        <div className={scss.details}>
          <div>
            <span>YEAR</span>
            <strong>{car.year}</strong>
          </div>

          <div>
            <span>MILEAGE</span>
            <strong>{car.mileage.toLocaleString()} mi</strong>
          </div>
        </div>

        <button
          onClick={() => router.push(`cars/${car.id}`)}
          className={scss.detailsButton}
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default CarCard;
