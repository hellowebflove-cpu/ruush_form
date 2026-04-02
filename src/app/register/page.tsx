"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";
import { registrationSchema, type RegistrationData } from "@/lib/validations";

function formatPhone(value: string): string {
  const digits = value.replace(/\D/g, "");
  let d = digits;
  if (d.startsWith("380")) d = d.slice(3);
  else if (d.startsWith("38")) d = d.slice(2);
  else if (d.startsWith("0")) d = d.slice(1);
  d = d.slice(0, 9);

  let result = "+38";
  if (d.length > 0) result += ` (0${d.slice(0, 2)}`;
  if (d.length >= 2) result += `)`;
  if (d.length > 2) result += ` ${d.slice(2, 5)}`;
  if (d.length > 5) result += ` ${d.slice(5, 7)}`;
  if (d.length > 7) result += ` ${d.slice(7, 9)}`;
  return result;
}

export default function RegisterPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegistrationData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: { phone: "+38" },
  });

  const onSubmit = (data: RegistrationData) => {
    sessionStorage.setItem("registration", JSON.stringify(data));
    router.push("/register/thankyou");
  };

  return (
    <div className="flex w-full max-w-[600px] flex-col items-center gap-12 pt-8 pb-16">
      {/* Heading */}
      <div className="flex flex-col items-center gap-5 text-center">
        <h1 className="text-[52px] font-bold italic uppercase leading-tight text-text">
          Реєстрація
        </h1>
        <p className="max-w-[572px] text-[22px] text-text">
          Курс &ldquo;Як використовувати поведінкову науку, щоб змінювати
          поведінку людей&rdquo;
        </p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex w-full flex-col items-center gap-8"
      >
        <div className="flex w-full flex-col gap-8">
          <Input
            label="Ім'я"
            {...register("name")}
            error={errors.name?.message}
          />
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                label="+ 38 (050) 123 12 12"
                type="tel"
                value={field.value}
                onChange={(e) => field.onChange(formatPhone(e.target.value))}
                onBlur={field.onBlur}
                error={errors.phone?.message}
              />
            )}
          />
          <Input
            label="Email"
            type="email"
            {...register("email")}
            error={errors.email?.message}
          />
        </div>

        <Checkbox
          {...register("consent")}
          error={errors.consent?.message}
          label={
            <>
              Погоджуюсь з{" "}
              <span className="underline">Умовами конфіденційності</span> та{" "}
              <span className="underline">Правилами сервісу</span> та{" "}
              <span className="underline">Підпискою на новини</span>
            </>
          }
        />

        <Button type="submit">Зареєструватись</Button>
      </form>
    </div>
  );
}
