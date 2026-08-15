"use client";

import { Heart, Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import scss from "./header.module.scss";
import { useRouter } from "next/navigation";
import { useGetProfile } from "@/hooks/profile/useGetProfile";
import { useGetFavorites } from "@/hooks/favorites/useGetFavorites";

const Header = () => {
  const router = useRouter();

  const [token, setToken] = useState<string | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  const { data: favorites } = useGetFavorites();
  const { data: profile, error } = useGetProfile(!!token);

  const favoritesCount = favorites?.length ?? 0;

  useEffect(() => {
    if (error) {
      const status = (error as any)?.response?.status;

      if (status === 401) {
        localStorage.removeItem("token");
        setToken(null);
      }
    }
  }, [error]);

  const getInitials = () => {
    if (!profile?.name) return "?";

    return profile.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const goTo = (path: string) => {
    setIsMenuOpen(false);
    router.push(path);
  };

  const avatar = profile?.avatar ? (
    <img
      src={`http://localhost:5000/uploads/${profile.avatar}`}
      alt="Profile"
    />
  ) : (
    <div className={scss.avatarFallback}>{getInitials()}</div>
  );

  return (
    <header id={scss.header}>
      <div className="container">
        <div className={scss.header}>
          <div className={scss.logo} onClick={() => goTo("/")}>
            <div className={scss.svg}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>

            <h1>AutoMark</h1>
          </div>

          {token ? (
            <>
              {/* Desktop navigation */}
              <div className={scss.nav}>
                <button className={scss.navLink} onClick={() => goTo("/")}>
                  Home
                </button>

                <button
                  className={scss.navLink}
                  onClick={() => goTo("/favorites")}
                >
                  <Heart
                    size={18}
                    className={favoritesCount > 0 ? scss.favoriteActive : ""}
                    fill={favoritesCount > 0 ? "currentColor" : "none"}
                  />
                  Favorites
                  {favoritesCount > 0 && ` ( ${favoritesCount} )`}
                </button>

                <button className={scss.addButton} onClick={() => goTo("/add")}>
                  + Add Car
                </button>

                <button
                  className={scss.profile}
                  onClick={() => goTo("/profile")}
                  aria-label="Open profile"
                >
                  {avatar}
                </button>
              </div>

              {/* Mobile actions */}
              <div className={scss.mobileActions}>
                <button
                  className={scss.mobileProfile}
                  onClick={() => goTo("/profile")}
                  aria-label="Open profile"
                >
                  {avatar}
                </button>

                <button
                  className={scss.menuButton}
                  onClick={() => setIsMenuOpen((prev) => !prev)}
                  aria-label="Open menu"
                  aria-expanded={isMenuOpen}
                >
                  {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
              </div>

              {/* Mobile menu */}
              {isMenuOpen && (
                <div className={scss.mobileMenu}>
                  <button
                    className={scss.mobileNavLink}
                    onClick={() => goTo("/")}
                  >
                    Home
                  </button>

                  <button
                    className={scss.mobileNavLink}
                    onClick={() => goTo("/favorites")}
                  >
                    <Heart
                      size={19}
                      className={favoritesCount > 0 ? scss.favoriteActive : ""}
                      fill={favoritesCount > 0 ? "currentColor" : "none"}
                    />

                    <span>Favorites</span>

                    {favoritesCount > 0 && (
                      <span className={scss.favoriteCount}>
                        {favoritesCount}
                      </span>
                    )}
                  </button>

                  <button
                    className={scss.mobileNavLink}
                    onClick={() => goTo("/add")}
                  >
                    <span className={scss.addIcon}>+</span>
                    <span>Add Car</span>
                  </button>

                  <button
                    className={scss.mobileNavLink}
                    onClick={() => goTo("/profile")}
                  >
                    <span>Profile</span>
                  </button>
                </div>
              )}
            </>
          ) : (
            <button
              className={scss.signIn}
              onClick={() => router.push("/login")}
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
