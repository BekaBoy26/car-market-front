"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCreateCar } from "@/hooks/cars/useCreateCar";
import { useGetBrands } from "@/hooks/brands/useGetBrands";
import scss from "./addCar.module.scss";
import { makeCarForm } from "@/utils/carForm";
import { ICarForm } from "@/types/carTypes";
import AuthGuard from "@/components/protect/authGuard";
import { carSchema } from "@/schemas/carsSchema";

const AddCarPage = () => {
  const router = useRouter();

  const { data: brands } = useGetBrands();
  const createCar = useCreateCar();

  const [form, setForm] = useState<ICarForm>({
    model: "",
    price: "",
    brand_id: "",
    year: "",
    mileage: "",
    description: "",
  });

  const [images, setImages] = useState<File[]>([]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = carSchema.safeParse(form);

    if (!result.success) {
      alert(result.error.issues[0].message);
      return;
    }

    const formData = makeCarForm(form, "used", images);

    createCar.mutate(formData, {
      onSuccess: () => {
        router.push("/");
      },
    });
  };

  return (
    <AuthGuard>
      <main className={scss.addPage}>
        <div className="container">
          <div className={scss.back} onClick={() => router.back()}>
            ‹ &nbsp; Back
          </div>

          <div className={scss.title}>
            <h1>List your car</h1>
            <p>Fill in the details to create a new listing.</p>
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
                <label>Brand</label>

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

            <div className={scss.field}>
              <label>Images</label>

              <label className={scss.upload}>
                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  multiple
                  onChange={(e) => {
                    setImages(Array.from(e.target.files || []));
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
              <button type="submit" disabled={createCar.isPending}>
                {createCar.isPending ? "Publishing..." : "Publish listing"}
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

export default AddCarPage;
