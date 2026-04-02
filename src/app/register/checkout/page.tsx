"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const isFilled = cardNumber.length > 0 && expiry.length > 0 && cvc.length > 0;

  const formatCard = (v: string) => {
    const nums = v.replace(/\D/g, "").slice(0, 16);
    return nums.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (v: string) => {
    const nums = v.replace(/\D/g, "").slice(0, 4);
    if (nums.length > 2) return nums.slice(0, 2) + "/" + nums.slice(2);
    return nums;
  };

  const fillCard = () => {
    setCardNumber("5375 4141 2345 2528");
    setExpiry("09/27");
    setCvc("841");
  };

  const handlePay = () => {
    sessionStorage.setItem(
      "checkout",
      JSON.stringify({ cardNumber, expiry, last4: cardNumber.slice(-4) })
    );
    router.push("/register/success?type=payment");
  };

  return (
    <div className="flex w-full max-w-[641px] flex-col items-center gap-8 pt-8 pb-8">
      {/* White card modal */}
      <div className="relative w-full max-w-[520px] rounded-[20px] bg-white p-8">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="absolute left-6 top-6 text-gray-400 transition hover:text-gray-600"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M15 10H5M5 10L10 5M5 10L10 15" />
          </svg>
        </button>

        {/* Header: icon + name + price */}
        <div className="mb-6 flex flex-col items-center">
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="5" width="20" height="14" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </div>
          <p className="text-sm text-gray-500">Reiseplan</p>
          <p className="mt-1 text-[32px] font-bold text-black">27 500 ₴</p>
        </div>

        {/* QR code section */}
        <div className="mb-5 flex items-center gap-4 rounded-xl border border-gray-200 p-4">
          <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center rounded-lg bg-black">
            <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
              <rect width="56" height="56" fill="black" />
              <rect x="0" y="0" width="6" height="6" fill="white" rx="1" />
              <rect x="8" y="0" width="6" height="6" fill="white" rx="1" />
              <rect x="24" y="0" width="6" height="6" fill="white" rx="1" />
              <rect x="32" y="8" width="6" height="6" fill="white" rx="1" />
              <rect x="24" y="16" width="6" height="6" fill="white" rx="1" />
              <rect x="0" y="24" width="6" height="6" fill="white" rx="1" />
              <rect x="16" y="24" width="6" height="6" fill="white" rx="1" />
              <rect x="32" y="24" width="6" height="6" fill="white" rx="1" />
              <rect x="48" y="24" width="6" height="6" fill="white" rx="1" />
              <rect x="8" y="32" width="6" height="6" fill="white" rx="1" />
              <rect x="24" y="32" width="6" height="6" fill="white" rx="1" />
              <rect x="40" y="32" width="6" height="6" fill="white" rx="1" />
              <rect x="16" y="40" width="6" height="6" fill="white" rx="1" />
              <rect x="32" y="40" width="6" height="6" fill="white" rx="1" />
              <rect x="48" y="40" width="6" height="6" fill="white" rx="1" />
              <rect x="0" y="48" width="6" height="6" fill="white" rx="1" />
              <rect x="24" y="48" width="6" height="6" fill="white" rx="1" />
              <rect x="40" y="48" width="6" height="6" fill="white" rx="1" />
              <rect x="2" y="2" width="16" height="16" rx="2" fill="white" />
              <rect x="4" y="4" width="12" height="12" rx="1" fill="black" />
              <rect x="6" y="6" width="8" height="8" rx="1" fill="white" />
              <rect x="38" y="2" width="16" height="16" rx="2" fill="white" />
              <rect x="40" y="4" width="12" height="12" rx="1" fill="black" />
              <rect x="42" y="6" width="8" height="8" rx="1" fill="white" />
              <rect x="2" y="38" width="16" height="16" rx="2" fill="white" />
              <rect x="4" y="40" width="12" height="12" rx="1" fill="black" />
              <rect x="6" y="42" width="8" height="8" rx="1" fill="white" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-black">
              Оплатити <span className="inline-block h-4 w-4 rounded-full bg-black align-middle" /> mono
            </p>
            <p className="mt-1 text-[13px] text-gray-500">
              Відскануйте QR-код для оплати платежу у додатку{" "}
              <span className="cursor-pointer text-blue-500 underline">monobank</span>
            </p>
          </div>
        </div>

        {/* Apple Pay */}
        <button className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3.5 text-[15px] text-white transition hover:bg-gray-900">
          <span>Оплата через</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
            <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
          </svg>
          <span className="font-semibold">Pay</span>
        </button>

        {/* Google Pay / saved card — clicking this fills all fields */}
        <button
          onClick={fillCard}
          className="mb-5 flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3.5 text-white transition hover:bg-gray-900"
        >
          <span className="text-sm font-medium tracking-tight">G Pay</span>
          <span className="mx-1 text-white/30">|</span>
          <div className="flex items-center gap-1.5">
            <div className="h-4 w-6 rounded-sm bg-gradient-to-r from-red-500 to-yellow-400" />
            <span className="text-sm text-white/70">&bull;&bull;&bull;&bull; 2528</span>
          </div>
        </button>

        {/* Divider */}
        <p className="mb-5 text-center text-sm text-gray-400">Або оплатити карткою</p>

        {/* Card fields */}
        <div className="mb-5 flex flex-col gap-3">
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCard(e.target.value))}
            placeholder="Номер картки"
            className="w-full rounded-lg border border-gray-200 px-4 py-3.5 text-[15px] text-black placeholder-gray-400 outline-none transition focus:border-gray-400"
          />
          <div className="flex gap-3">
            <input
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="Строк дії"
              className="flex-1 rounded-lg border border-gray-200 px-4 py-3.5 text-[15px] text-black placeholder-gray-400 outline-none transition focus:border-gray-400"
            />
            <input
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
              placeholder="CVC2"
              className="flex-1 rounded-lg border border-gray-200 px-4 py-3.5 text-[15px] text-black placeholder-gray-400 outline-none transition focus:border-gray-400"
            />
          </div>
        </div>

        {/* Pay button — bright when filled */}
        <button
          onClick={handlePay}
          disabled={!isFilled}
          className={`w-full rounded-lg py-3.5 text-[15px] font-semibold transition ${
            isFilled
              ? "bg-[#7B61FF] text-white shadow-lg shadow-[#7B61FF]/30 hover:bg-[#6B4FE8]"
              : "cursor-not-allowed bg-gray-200 text-gray-400"
          }`}
        >
          Оплатити 27 500 ₴ →
        </button>
      </div>
    </div>
  );
}
