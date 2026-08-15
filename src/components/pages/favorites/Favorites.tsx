"use client";

import CarCard from "@/components/ui/carCard/CarCard";
import { useGetFavorites } from "@/hooks/favorites/useGetFavorites";
import scss from "./favorites.module.scss";

const FavoritesPage = () => {
  const { data: favorites, isLoading, error } = useGetFavorites();

  if (isLoading) {
    return (
      <main className={scss.page}>
        <div className="container">
          <p className={scss.message}>Loading...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className={scss.page}>
        <div className="container">
          <p className={scss.message}>Failed to load favorites.</p>
        </div>
      </main>
    );
  }

  const favoritesCount = favorites?.length ?? 0;

  return (
    <main className={scss.page}>
      <div className="container">
        <div className={scss.header}>
          <h1>Your Favorites</h1>
          <p>{favoritesCount} saved listings</p>
        </div>

        {favoritesCount > 0 ? (
          <div className={scss.grid}>
            {favorites!.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className={scss.empty}>
            <h2>No favorites yet</h2>
            <p>Cars you save will appear here.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default FavoritesPage;