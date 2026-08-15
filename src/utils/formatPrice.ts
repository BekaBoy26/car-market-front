export const formatPrice = (price: number) =>
  `$${Number(price).toLocaleString("en-US", {
    maximumFractionDigits: 0,
  })}`;
