const api = "http://localhost:5000";

export const getImageUrl = (image: string) => {
  if (image.startsWith("http")) {
    return image;
  }

  const normalized = image.replace(/^\/+/, "");

  if (normalized.startsWith("uploads/")) {
    return `${api}/${normalized}`;
  }

  return `${api}/uploads/${normalized}`;
};
