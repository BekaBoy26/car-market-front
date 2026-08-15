"use client";

import { useState } from "react";
import { useGetCars } from "@/hooks/cars/useGetCars";
import { IGetCarsParams } from "@/types/carTypes";
import CarList from "@/components/widgets/carsList/CarsList";
import Pagination from "@/components/widgets/pagination/Pagination";
import Search from "@/components/widgets/searchWidget/SearchWidget";
import scss from "./home.module.scss";

const cpp = 6;

const HomePage = () => {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<IGetCarsParams>({});

  const { data: cars = [], isLoading } = useGetCars(filters);

  const handleFiltersChange = (newFilters: IGetCarsParams) => {
    setFilters(newFilters);
    setPage(1);
  };

  const totalPages = Math.ceil(cars.length / cpp);

  const startIndex = (page - 1) * cpp;

  const currentCars = cars.slice(startIndex, startIndex + cpp);

  return (
    <main className={scss.homePage}>
      <Search onFiltersChange={handleFiltersChange} />

      <div className="container">
        <>
          <CarList cars={currentCars} />

          {totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={totalPages}
              onChange={setPage}
            />
          )}
        </>
      </div>
    </main>
  );
};

export default HomePage;
