import { z } from "zod";

export const carSchema = z.object({
  model: z.string().min(2, "Model must be at least 2 characters"),
  price: z.string().min(1, "Price is required"),
  brand_id: z.string().min(1, "Brand is required"),
  year: z.string().min(4, "Year is required"),
  mileage: z.string().min(1, "Mileage is required"),
  description: z.string().optional(),
});
