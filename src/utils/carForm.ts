export const makeCarForm = (
  form: {
    model: string;
    price: string;
    brand_id: string;
    year: string;
    mileage: string;
    description: string;
  },
  condition: string,
  images: File[],
  existingImages?: string[],
) => {
  const formData = new FormData();

  formData.append("model", form.model);
  formData.append("price", form.price);
  formData.append("brand_id", form.brand_id);
  formData.append("year", form.year);
  formData.append("mileage", form.mileage);
  formData.append("description", form.description);
  formData.append("condition", condition);

  if (existingImages) {
    formData.append("existingImages", JSON.stringify(existingImages));
  }

  images.forEach((image) => {
    formData.append("images", image);
  });

  return formData;
};
