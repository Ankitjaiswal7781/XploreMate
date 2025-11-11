import { z } from "zod";

export const guideFormSchema = z.object({
  guideName: z.string().nonempty({ message: "Guide name is required" }),
  city: z.string().nonempty({ message: "City is required" }),
  country: z.string().nonempty({ message: "Country is required" }),
  tourDuration: z
    .number()
    .min(0, { message: "Tour duration cannot be negative" }),
  servicesTypes: z.array(z.string()),
  imageFile: z
    .instanceof(File)
    .optional()
    .refine((file) => file?.size !== 0, { message: "Image file is required" }),
});

export type GuideFormSchema = z.infer<typeof guideFormSchema>;
