"use client";

import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { useGetOneCar } from "@/hooks/cars/useGetOneCar";

import CarGallery from "@/components/widgets/car-detail/car-gallery/CarGallery";
import CarInfo from "@/components/widgets/car-detail/car-info/CarInfo";

import scss from "./detail.module.scss";

const DetailPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data: car, isLoading } = useGetOneCar(Number(id));

  if (isLoading) {
    return <p className={scss.loading}>Loading...</p>;
  }

  if (!car) {
    return <p className={scss.loading}>Car not found.</p>;
  }

  return (
    <main className={scss.page}>
      <div className="container">
        <button className={scss.back} onClick={() => router.push("/")}>
          <ArrowLeft size={14} />
          Back to listings
        </button>

        <div className={scss.content}>
          <CarGallery images={car.images} model={car.model} />
          <CarInfo car={car} />
        </div>
      </div>
    </main>
  );
};

export default DetailPage;
