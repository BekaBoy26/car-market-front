"use client";

import { Heart, HeartIcon, HeartOff, HeartPlus } from "lucide-react";
import { ICar } from "@/types/carTypes";
import { useCreateFavorite } from "@/hooks/favorites/useCreateFavorite";
import { useDeleteFavorite } from "@/hooks/favorites/useDeleteFavorite";
import { useGetFavorites } from "@/hooks/favorites/useGetFavorites";

interface IFavoriteButtonProps {
  car: ICar;
  className?: string;
}

const FavoriteButton = ({ car, className }: IFavoriteButtonProps) => {
  const { data } = useGetFavorites();

  const { mutate: createFavorite, isPending } = useCreateFavorite();
  const { mutate: deleteFavorite } = useDeleteFavorite();

  const isFavorite =
    data?.some((favorite) => favorite.id === car.id) ?? false;

  const handleFavorite = () => {
    if (isFavorite) {
      deleteFavorite(car.id);
    } else {
      createFavorite(car.id);
    }
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleFavorite}
      disabled={isPending || isPending}
    >
      <Heart
        size={17}
        color={isFavorite ? "#2563eb" : "currentColor"}
        fill={isFavorite ? "#2563eb" : "none"}
      />
    </button>
  );
};

export default FavoriteButton;
