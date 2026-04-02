"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RadioCard } from "@/components/ui/RadioCard";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/Footer";
import { PAYMENT_OPTIONS, type PaymentMethodId } from "@/lib/constants";

export default function PaymentPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<PaymentMethodId>("full");
  const [showPromo, setShowPromo] = useState(false);
  const [promoCode, setPromoCode] = useState("");

  const handleSubmit = () => {
    sessionStorage.setItem(
      "payment",
      JSON.stringify({ method: selected, promoCode })
    );
    if (selected === "invoice") {
      router.push("/register/invoice");
    } else {
      router.push("/register/checkout");
    }
  };

  return (
    <div className="flex w-full max-w-[641px] flex-col items-center gap-8 pt-8 pb-8">
      <h1 className="text-center text-[28px] font-bold italic uppercase leading-tight text-text">
        Оберіть спосіб оплати
      </h1>

      <div className="flex w-full flex-col gap-8">
        {PAYMENT_OPTIONS.map((option) => (
          <RadioCard
            key={option.id}
            selected={selected === option.id}
            onSelect={() => setSelected(option.id)}
            title={option.title}
            price={option.price}
            oldPrice={option.oldPrice}
            description={option.description}
          />
        ))}
      </div>

      {/* Promo code */}
      <div className="w-full">
        {!showPromo ? (
          <button
            type="button"
            onClick={() => setShowPromo(true)}
            className="w-full rounded-xl bg-bg-input px-4 py-3 text-left text-[14px] text-text/50 transition-colors hover:bg-bg-input/80"
          >
            У мене є промокод
          </button>
        ) : (
          <div className="flex h-20 items-center rounded-[20px] bg-bg-input px-6">
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Введіть промокод"
              className="w-full bg-transparent text-[14px] text-text placeholder:text-text/30 outline-none"
              autoFocus
            />
          </div>
        )}
      </div>

      <Button onClick={handleSubmit}>
        {selected === "invoice" ? "Створити рахунок" : "Оплатити"}
      </Button>

      <Footer />
    </div>
  );
}
