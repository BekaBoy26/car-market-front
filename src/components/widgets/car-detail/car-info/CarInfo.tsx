"use client";

import { Heart, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

import { ICarDetails } from "@/types/carTypes";
import { useGetProfile } from "@/hooks/profile/useGetProfile";
import { useGetFavorites } from "@/hooks/favorites/useGetFavorites";
import { useCreateFavorite } from "@/hooks/favorites/useCreateFavorite";
import { useDeleteFavorite } from "@/hooks/favorites/useDeleteFavorite";
import { useDeleteCar } from "@/hooks/cars/useDeleteCar";
import { formatPrice } from "@/utils/formatPrice";

import SellerCard from "../seller-card/SellerCard";
import scss from "./carInfo.module.scss";

interface ICarInfoProps {
  car: ICarDetails;
}

const CarInfo = ({ car }: ICarInfoProps) => {
  const router = useRouter();

  const { data: profile } = useGetProfile(true);
  const { data: favorites } = useGetFavorites();

  const createFavorite = useCreateFavorite();
  const deleteFavorite = useDeleteFavorite();
  const deleteCar = useDeleteCar();

  const isFavorite = favorites?.some((favorite) => favorite.id === car.id);

  const isOwner = profile?.name === car.owner;

  const toggleFavorite = () => {
    if (isFavorite) {
      deleteFavorite.mutate(car.id);
    } else {
      createFavorite.mutate(car.id);
    }
  };

  const handleDelete = () => {
    deleteCar.mutate(car.id, {
      onSuccess: () => router.push("/"),
    });
  };

  return (
    <section className={scss.info}>
      <div className={scss.title}>
        <div className={scss.tags}>
          <span>{car.brand}</span>
          <span>{car.year}</span>
        </div>

        <h1>{car.model}</h1>

        <div className={scss.price}>{formatPrice(car.price)}</div>
      </div>

      <div className={scss.specs}>
        <div>
          <span>YEAR</span>
          <strong>{car.year}</strong>
        </div>

        <div>
          <span>MILEAGE</span>
          <strong>{car.mileage.toLocaleString()} mi</strong>
        </div>

        <div>
          <span>BRAND</span>
          <strong>{car.brand}</strong>
        </div>

        <div>
          <span>CONDITION</span>
          <strong>{car.condition}</strong>
        </div>
      </div>

      {isOwner ? (
        <div className={scss.ownerActions}>
          <button
            className={scss.edit}
            onClick={() => router.push(`/cars/${car.id}/edit`)}
          >
            <Pencil size={14} />
            Edit
          </button>

          <button
            className={scss.delete}
            onClick={handleDelete}
            aria-label="Delete car"
          >
            <Trash2 size={18} />
          </button>
        </div>
      ) : (
        <button className={scss.favorite} onClick={toggleFavorite}>
          <Heart
            size={16}
            fill={isFavorite ? "#2563eb" : "none"}
            stroke={isFavorite ? "#2563eb" : "#ffffff"}
          />

          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      )}

      <SellerCard
        owner={car.owner}
        avatar={car.ownerAvatar}
        isOwner={isOwner}
        sellerEmail={car.ownerEmail}
        clientEmail={profile?.email || ""}
      />

      <div className={scss.description}>
        <span className={scss.label}>DESCRIPTION</span>
        <p>{car.description}</p>
      </div>
    </section>
  );
};

export default CarInfo;
