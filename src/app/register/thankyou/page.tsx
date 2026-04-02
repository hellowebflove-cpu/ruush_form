"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

export default function ThankYouPage() {
  const router = useRouter();

  return (
    <div className="flex w-full max-w-[600px] flex-col items-center justify-center gap-12 pt-32 pb-16">
      <div className="flex flex-col items-center gap-5 text-center">
        <h1 className="text-[28px] font-bold italic uppercase leading-tight text-text">
          Дякуємо за реєстрацію
        </h1>
        <p className="text-[14px] text-text/60">Оберіть наступний крок</p>
      </div>

      <div className="flex w-full flex-col items-center gap-6">
        <Button onClick={() => router.push("/register/additional")}>
          Оплатити курс
        </Button>
        <Button
          variant="outline"
          onClick={() => router.push("/register/success?type=contact")}
        >
          Зв&apos;язатися зі мною
        </Button>
      </div>
    </div>
  );
}
