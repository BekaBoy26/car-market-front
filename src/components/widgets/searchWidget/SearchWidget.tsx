"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Filter, Search as SearchIcon } from "lucide-react";
import { useGetBrands } from "@/hooks/brands/useGetBrands";
import scss from "./searchWidget.module.scss";
import { ISearchProps } from "@/types/searchTypes";

const Search = ({ onFiltersChange }: ISearchProps) => {
  const { data: brands = [] } = useGetBrands();

  const [open, setOpen] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [year, setYear] = useState("");
  const [maxMileage, setMaxMileage] = useState("");
  const [sort, setSort] = useState<"" | "price_asc" | "price_desc">("");
  const [search, setSearch] = useState("");
  const [brandId, setBrandId] = useState("");

  const applyFilters = (
    values: Partial<{
      search: string;
      brandId: string;
      minPrice: string;
      maxPrice: string;
      year: string;
      maxMileage: string;
      sort: "" | "price_asc" | "price_desc";
    }> = {},
  ) => {
    const newSearch = values.search ?? search;
    const newBrandId = values.brandId ?? brandId;
    const newMinPrice = values.minPrice ?? minPrice;
    const newMaxPrice = values.maxPrice ?? maxPrice;
    const newYear = values.year ?? year;
    const newMaxMileage = values.maxMileage ?? maxMileage;
    const newSort = values.sort ?? sort;

    onFiltersChange({
      search: newSearch || undefined,
      brandId: newBrandId ? Number(newBrandId) : undefined,
      minPrice: newMinPrice ? Number(newMinPrice) : undefined,
      maxPrice: newMaxPrice ? Number(newMaxPrice) : undefined,
      maxMileage: newMaxMileage ? Number(newMaxMileage) : undefined,
      minYear: newYear ? Number(newYear) : undefined,
      maxYear: newYear ? Number(newYear) : undefined,
      sort: newSort || undefined,
    });
  };

  useEffect(() => {
    onFiltersChange({
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      maxMileage: maxMileage ? Number(maxMileage) : undefined,
      minYear: year ? Number(year) : undefined,
      maxYear: year ? Number(year) : undefined,
      sort: sort || undefined,
    });
  }, [minPrice, maxPrice, year, maxMileage, sort]);

  const clear = () => {
    setMinPrice("");
    setMaxPrice("");
    setYear("");
    setMaxMileage("");
    setSort("");
  };

  return (
    <section id={scss.search}>
      <div className={scss.search}>
        <div className={scss.topRow}>
          <div className={scss.searchInput}>
            <SearchIcon size={17} />

            <input
              value={search}
              onChange={(e) => {
                const value = e.target.value;

                setSearch(value);
                applyFilters({ search: value });
              }}
              placeholder="Search by make or model..."
            />
          </div>

          <div className={scss.selectWrapper}>
            <select
              value={brandId}
              onChange={(e) => {
                const value = e.target.value;

                setBrandId(value);
                applyFilters({ brandId: value });
              }}
            >
              <option value="">All brands</option>

              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.brand}
                </option>
              ))}
            </select>

            <ChevronDown size={16} />
          </div>

          <div className={scss.selectWrapper}>
            <select
              value={sort}
              onChange={(e) => {
                const value = e.target.value as "" | "price_asc" | "price_desc";

                setSort(value);
                applyFilters({ sort: value });
              }}
            >
              <option value="">Sort by</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>

            <ChevronDown size={16} />
          </div>

          <button
            type="button"
            className={`${scss.filterButton} ${open ? scss.active : ""}`}
            onClick={() => setOpen(!open)}
          >
            <Filter size={15} />
            Filters
          </button>
        </div>

        {open && (
          <div className={scss.filters}>
            <div className={scss.filterItem}>
              <label>Min price ($)</label>

              <input
                type="number"
                placeholder="0"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>

            <div className={scss.filterItem}>
              <label>Max price ($)</label>

              <input
                type="number"
                placeholder="Any"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>

            <div className={scss.filterItem}>
              <label>Year</label>

              <input
                type="number"
                placeholder="e.g. 2021"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>

            <div className={scss.filterItem}>
              <label>Max mileage (mi)</label>

              <input
                type="number"
                placeholder="Any"
                value={maxMileage}
                onChange={(e) => setMaxMileage(e.target.value)}
              />
            </div>

            <button type="button" className={scss.clearButton} onClick={clear}>
              Clear all
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Search;
