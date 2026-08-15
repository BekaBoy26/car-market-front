"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useGetOneCar } from "@/hooks/cars/useGetOneCar";
import { useUpdateCar } from "@/hooks/cars/useUpdateCar";
import { useGetBrands } from "@/hooks/brands/useGetBrands";
import { getImageUrl } from "@/utils/getImageUrl";

import scss from "./edit.module.scss";
import { makeCarForm } from "@/utils/carForm";
import { ICarForm } from "@/types/carTypes";
import AuthGuard from "@/components/protect/authGuard";
import { carSchema } from "@/schemas/carsSchema";

const EditCarPage = () => {
  const router = useRouter();
  const params = useParams();

  const id = Number(params.id);

  const { data: car, isLoading } = useGetOneCar(id);
  const { data: brands } = useGetBrands();
  const updateCar = useUpdateCar();

  const [form, setForm] = useState<ICarForm>({
    model: "",
    price: "",
    brand_id: "",
    year: "",
    mileage: "",
    description: "",
  });

  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);

  useEffect(() => {
    if (!car) return;

    const brand = brands?.find((item) => item.brand === car.brand);

    setForm({
      model: car.model,
      price: String(car.price),
      brand_id: brand ? String(brand.id) : "",
      year: String(car.year),
      mileage: String(car.mileage),
      description: car.description || "",
    });

    setExistingImages(car.images || []);
  }, [car, brands]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = carSchema.safeParse(form);

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    const formData = makeCarForm(
      form,
      car?.condition || "used",
      images,
      existingImages,
    );

    updateCar.mutate(
      {
        id,
        formData,
      },
      {
        onSuccess: () => {
          router.push(`/cars/${id}`);
        },
      },
    );
  };

  if (isLoading) {
    return (
      <main className={scss.editPage}>
        <div className="container">
          <div className={scss.loading}>Loading...</div>
        </div>
      </main>
    );
  }

  if (!car) {
    return (
      <main className={scss.editPage}>
        <div className="container">
          <div className={scss.error}>Car not found.</div>
        </div>
      </main>
    );
  }

  return (
    <AuthGuard>
      <main className={scss.editPage}>
        <div className="container">
          <div className={scss.back} onClick={() => router.back()}>
            ‹ &nbsp; Back
          </div>

          <div className={scss.title}>
            <h1>Edit your car</h1>
            <p>Update the details of your listing.</p>
          </div>

          <form className={scss.form} onSubmit={handleSubmit}>
            <div className={scss.field}>
              <label>
                Title<span>*</span>
              </label>

              <input
                type="text"
                name="model"
                placeholder="e.g. Toyota Camry XSE"
                value={form.model}
                onChange={handleChange}
                required
              />
            </div>

            <div className={scss.row}>
              <div className={scss.field}>
                <label>
                  Price (USD)<span>*</span>
                </label>

                <input
                  type="number"
                  name="price"
                  placeholder="25000"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={scss.field}>
                <label>
                  Brand<span>*</span>
                </label>

                <select
                  name="brand_id"
                  value={form.brand_id}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>
                    Select brand
                  </option>

                  {brands?.map((brand) => (
                    <option key={brand.id} value={brand.id}>
                      {brand.brand}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={scss.row}>
              <div className={scss.field}>
                <label>
                  Year<span>*</span>
                </label>

                <input
                  type="number"
                  name="year"
                  placeholder="2021"
                  value={form.year}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className={scss.field}>
                <label>
                  Mileage (mi)<span>*</span>
                </label>

                <input
                  type="number"
                  name="mileage"
                  placeholder="30000"
                  value={form.mileage}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className={scss.field}>
              <label>Description</label>

              <textarea
                name="description"
                placeholder="Describe the car's condition, history, features..."
                value={form.description}
                onChange={handleChange}
              />
            </div>

            {existingImages.length > 0 && (
              <div className={scss.field}>
                <label>Existing images</label>

                <div className={scss.selectedImages}>
                  {existingImages.map((image, index) => (
                    <div className={scss.imageItem} key={`${image}-${index}`}>
                      <img
                        src={getImageUrl(image)}
                        alt={`Car image ${index + 1}`}
                      />

                      <button
                        type="button"
                        className={scss.removeImage}
                        onClick={() => {
                          setExistingImages((prev) =>
                            prev.filter((_, i) => i !== index),
                          );
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className={scss.field}>
              <label>Images</label>

              <label className={scss.upload}>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  onChange={(e) => {
                    const selected = Array.from(e.target.files || []);

                    setImages((prev) => [...prev, ...selected]);

                    e.target.value = "";
                  }}
                />

                <span className={scss.uploadIcon}>↑</span>
                <span>Click to upload or drag & drop</span>
                <small>PNG, JPG, WebP up to 10MB</small>
              </label>

              {images.length > 0 && (
                <div className={scss.selectedImages}>
                  {images.map((image, index) => (
                    <div
                      className={scss.imageItem}
                      key={`${image.name}-${index}`}
                    >
                      <img src={URL.createObjectURL(image)} alt={image.name} />

                      <button
                        type="button"
                        className={scss.removeImage}
                        onClick={() => {
                          setImages((prev) =>
                            prev.filter((_, i) => i !== index),
                          );
                        }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={scss.actions}>
              <button type="submit" disabled={updateCar.isPending}>
                {updateCar.isPending ? "Saving..." : "Save changes"}
              </button>

              <button
                type="button"
                className={scss.cancel}
                onClick={() => router.back()}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </AuthGuard>
  );
};

export default EditCarPage;
