"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { Button } from "@/components/ui/Button";

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");
  const isContact = type === "contact";

  return (
    <div className="flex w-full max-w-[600px] flex-col items-center justify-center gap-12 pt-32 pb-16">
      <div className="flex flex-col items-center gap-5 text-center">
        <h1 className="text-[32px] font-bold italic uppercase leading-tight text-text">
          Дякуємо
        </h1>
        <p className="text-[14px] text-text/60">
          {isContact
            ? "Ми зв\u2019яжемось з вами найближчим часом"
            : "Ваші дані збережено, очікуйте старту курсу"}
        </p>
      </div>

      <Button onClick={() => router.push("/")}>На головну</Button>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessContent />
    </Suspense>
  );
}
