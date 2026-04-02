import { z } from "zod";

export const registrationSchema = z.object({
  name: z
    .string()
    .min(1, "Ви не заповнили обов'язкове поле")
    .min(2, "Мінімум 2 символи"),
  phone: z
    .string()
    .min(1, "Ви не заповнили обов'язкове поле")
    .refine(
      (val) => val.replace(/\D/g, "").length >= 12,
      "Введіть повний номер телефону"
    ),
  email: z
    .string()
    .min(1, "Ви не заповнили обов'язкове поле")
    .email("Невірний формат"),
  consent: z.literal(true, { message: "Потрібна ваша згода" }),
});

export type RegistrationData = z.infer<typeof registrationSchema>;
