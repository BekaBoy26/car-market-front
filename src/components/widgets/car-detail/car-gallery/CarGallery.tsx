"use client";

import { useState } from "react";

import scss from "./carGallery.module.scss";
import { getImageUrl } from "@/utils/getImageUrl";

interface ICarGalleryProps {
  images: string[];
  model: string;
}

const CarGallery = ({ images, model }: ICarGalleryProps) => {
  const [selected, setSelected] = useState(0);
  const uniqueImages = [...new Set(images)];

  return (
    <div className={scss.gallery}>
      <div className={scss.mainImage}>
        <img
          src={`http://localhost:5000/uploads/${uniqueImages[selected]}`}
          alt={model}
        />
      </div>

      <div className={scss.thumbnails}>
        {uniqueImages.map((image, index) => (
          <button
            key={image}
            className={index === selected ? scss.active : ""}
            onClick={() => setSelected(index)}
          >
            <img src={getImageUrl(image)} alt="" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default CarGallery;
