"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { useGetProfile } from "@/hooks/profile/useGetProfile";
import { useGetMyCars } from "@/hooks/cars/useGetMyCars";
import { useGetFavorites } from "@/hooks/favorites/useGetFavorites";
import { getImageUrl } from "@/utils/getImageUrl";

import scss from "./profile.module.scss";
import AuthGuard from "@/components/protect/authGuard";

const ProfilePage = () => {
  const router = useRouter();

  const { data: profile } = useGetProfile(true);
  const { data: myCars = [] } = useGetMyCars();
  const { data: favorites = [] } = useGetFavorites();

  const [activeTab, setActiveTab] = useState<"cars" | "favorites">("cars");

  const activeCars = activeTab === "cars" ? myCars : favorites;

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <AuthGuard>
      <main className={scss.profilePage}>
        <div className="container">
          <div className={scss.profileLayout}>
            <aside className={scss.profileCard}>
              <div className={scss.avatar}>
                {profile?.avatar && (
                  <img src={getImageUrl(profile.avatar)} alt="Profile" />
                )}
              </div>

              <h2>{profile?.name}</h2>

              <p className={scss.email}>{profile?.email}</p>

              <div className={scss.divider} />

              <div className={scss.stat}>
                <span>Listings</span>
                <span>{myCars.length}</span>
              </div>

              <div className={scss.stat}>
                <span>Favorites</span>
                <span>{favorites.length}</span>
              </div>

              <div className={scss.stat}>
                <span>Member since</span>
                <span>
                  {profile?.created_at
                    ? new Date(profile.created_at).getFullYear()
                    : ""}
                </span>
              </div>

              <div className={scss.divider} />

              <button
                className={scss.listButton}
                onClick={() => router.push("/add")}
              >
                + List a Car
              </button>

              <button className={scss.logoutButton} onClick={handleLogout}>
                Sign out
              </button>
            </aside>

            <section className={scss.content}>
              <div className={scss.tabs}>
                <button
                  className={`${scss.tab} ${
                    activeTab === "cars" ? scss.active : ""
                  }`}
                  onClick={() => setActiveTab("cars")}
                >
                  My Cars ({myCars.length})
                </button>

                <button
                  className={`${scss.tab} ${
                    activeTab === "favorites" ? scss.active : ""
                  }`}
                  onClick={() => setActiveTab("favorites")}
                >
                  Favorites ({favorites.length})
                </button>
              </div>

              <div className={scss.list}>
                {activeCars.length > 0 ? (
                  activeCars.map((car) => (
                    <div
                      className={scss.carCard}
                      key={car.id}
                      onClick={() => router.push(`/cars/${car.id}`)}
                    >
                      <div className={scss.image}>
                        {car.images?.[0] ? (
                          <img
                            src={getImageUrl(car.images[0])}
                            alt={car.model}
                          />
                        ) : (
                          <div className={scss.noImage}>No image</div>
                        )}
                      </div>

                      <div className={scss.carInfo}>
                        <div className={scss.carDetails}>
                          <h3>{car.model}</h3>

                          <div className={scss.carTop}>
                            <span>{car.brand}</span>
                            <span>·</span>
                            <span>{car.year}</span>
                            <span>·</span>
                            <span>{car.mileage.toLocaleString()} mi</span>
                          </div>
                        </div>

                        <div className={scss.price}>
                          ${car.price.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className={scss.empty}>
                    <h3>
                      {activeTab === "cars"
                        ? "No cars yet"
                        : "No favorites yet"}
                    </h3>

                    <p>
                      {activeTab === "cars"
                        ? "List your first car to see it here."
                        : "Cars you save will appear here."}
                    </p>

                    <button
                      onClick={() =>
                        router.push(activeTab === "cars" ? "/add" : "/")
                      }
                    >
                      {activeTab === "cars" ? "+ List a Car" : "Browse cars"}
                    </button>
                  </div>
                )}
              </div>
            </section>
          </div>
        </div>
      </main>
    </AuthGuard>
  );
};

export default ProfilePage;
