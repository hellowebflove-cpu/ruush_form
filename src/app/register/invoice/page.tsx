"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/Footer";

function InvoiceDocument({
  companyName,
  userName,
  userEmail,
  userPhone,
  invoiceRef,
}: {
  companyName: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  invoiceRef: React.RefObject<HTMLDivElement | null>;
}) {
  const today = new Date();
  const invoiceNumber = `INV-${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-001`;
  const dueDate = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  const formatDate = (d: Date) =>
    `${String(d.getDate()).padStart(2, "0")}.${String(d.getMonth() + 1).padStart(2, "0")}.${d.getFullYear()}`;

  return (
    <div
      ref={invoiceRef}
      className="w-full max-w-[500px] rounded-[16px] bg-white p-8 text-black"
    >
      {/* Header */}
      <div className="mb-6 flex items-start justify-between">
        <div>
          <p className="text-[24px] font-bold italic text-[#E74C41]">РУУУШ</p>
          <p className="mt-1 text-[11px] text-gray-500">ruuush.marketing</p>
        </div>
        <div className="text-right">
          <p className="text-[18px] font-bold">РАХУНОК</p>
          <p className="text-[12px] text-gray-500">{invoiceNumber}</p>
        </div>
      </div>

      {/* Dates */}
      <div className="mb-6 flex gap-8 text-[12px]">
        <div>
          <p className="text-gray-400">Дата</p>
          <p className="font-medium">{formatDate(today)}</p>
        </div>
        <div>
          <p className="text-gray-400">Оплатити до</p>
          <p className="font-medium">{formatDate(dueDate)}</p>
        </div>
      </div>

      {/* Bill to */}
      <div className="mb-6 rounded-lg bg-gray-50 p-4">
        <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-gray-400">
          Платник
        </p>
        <p className="text-[14px] font-semibold">{companyName}</p>
        <p className="text-[12px] text-gray-600">{userName}</p>
        <p className="text-[12px] text-gray-600">{userEmail}</p>
        <p className="text-[12px] text-gray-600">{userPhone}</p>
      </div>

      {/* Line items */}
      <table className="mb-6 w-full text-[12px]">
        <thead>
          <tr className="border-b border-gray-200 text-left text-gray-400">
            <th className="pb-2 font-medium">Послуга</th>
            <th className="pb-2 text-right font-medium">К-сть</th>
            <th className="pb-2 text-right font-medium">Сума</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="py-3">
              <p className="font-medium">Онлайн-курс</p>
              <p className="text-[11px] text-gray-500">
                Як використовувати поведінкову науку, щоб змінювати поведінку
                людей
              </p>
            </td>
            <td className="py-3 text-right align-top">1</td>
            <td className="py-3 text-right align-top font-medium">
              27 500,00 ₴
            </td>
          </tr>
        </tbody>
      </table>

      {/* Total */}
      <div className="flex items-center justify-between border-t-2 border-black pt-3">
        <p className="text-[14px] font-bold">До сплати</p>
        <p className="text-[20px] font-bold">27 500,00 ₴</p>
      </div>

      {/* Payment details */}
      <div className="mt-6 rounded-lg bg-gray-50 p-4 text-[11px] text-gray-500">
        <p className="mb-1 font-medium text-gray-700">Реквізити для оплати:</p>
        <p>IBAN: UA12 3456 7890 1234 5678 9012 3456 7</p>
        <p>ЄДРПОУ: 12345678</p>
        <p>Отримувач: ТОВ &ldquo;РУУУШ&rdquo;</p>
        <p>
          Призначення: Оплата за онлайн-курс згідно рахунку {invoiceNumber}
        </p>
      </div>
    </div>
  );
}

export default function InvoicePage() {
  const [step, setStep] = useState<"form" | "success">("form");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");
  const [userData, setUserData] = useState({ name: "", email: "", phone: "" });
  const invoiceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("registration");
    if (stored) {
      const data = JSON.parse(stored);
      setUserData({
        name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
      });
    }
  }, []);

  const handleSubmit = () => {
    if (!companyName.trim()) {
      setError("Вкажіть назву юридичної особи");
      return;
    }
    setError("");
    sessionStorage.setItem("invoice", JSON.stringify({ companyName }));
    setStep("success");
  };

  const handleDownloadPDF = async () => {
    const el = invoiceRef.current;
    if (!el) return;

    const html2canvas = (await import("html2canvas")).default;
    const { jsPDF } = await import("jspdf");

    const canvas = await html2canvas(el, {
      scale: 2,
      backgroundColor: "#ffffff",
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.save(`invoice-ruuush-${companyName.replace(/\s+/g, "-")}.pdf`);
  };

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: "Рахунок РУУУШ",
        text: `Рахунок для ${companyName} на суму 27 500 грн за онлайн-курс РУУУШ`,
      });
    } else {
      await navigator.clipboard.writeText(
        `Рахунок для ${companyName} на суму 27 500 грн за онлайн-курс РУУУШ. Деталі: finance@ruuush.marketing`
      );
      alert("Скопійовано в буфер обміну");
    }
  };

  if (step === "success") {
    return (
      <div className="flex w-full max-w-[641px] flex-col items-center gap-12 pt-8 pb-8">
        <div className="flex w-full max-w-[572px] flex-col items-center gap-5 text-center">
          <h1 className="text-[28px] font-bold italic uppercase leading-tight text-text">
            Рахунок створено
          </h1>
          <p className="text-[14px] text-text/60">
            Завантажте рахунок або поділіться ним
          </p>
        </div>

        <InvoiceDocument
          companyName={companyName}
          userName={userData.name}
          userEmail={userData.email}
          userPhone={userData.phone}
          invoiceRef={invoiceRef}
        />

        <Button onClick={handleDownloadPDF}>
          <span className="flex items-center justify-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10 3v10M10 13l-4-4M10 13l4-4M3 17h14" />
            </svg>
            Завантажити
          </span>
        </Button>

        <Button variant="outline" onClick={handleShare}>
          <span className="flex items-center justify-center gap-3">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="15" cy="4" r="2.5" />
              <circle cx="5" cy="10" r="2.5" />
              <circle cx="15" cy="16" r="2.5" />
              <path d="M7.5 11l5 3.5M12.5 5.5l-5 3" />
            </svg>
            Поділитись
          </span>
        </Button>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-[641px] flex-col items-center gap-12 pt-8 pb-8">
      <div className="flex w-full max-w-[572px] flex-col items-center gap-5 text-center">
        <h1 className="text-[28px] font-bold italic uppercase leading-tight text-text">
          Створення рахунку
        </h1>
        <p className="text-[14px] text-text/60">
          Вкажіть назву юридичної особи, на яку необхідно створити рахунок
        </p>
      </div>

      <div className="w-full max-w-[600px]">
        <Input
          label="Юр. особа"
          value={companyName}
          onChange={(e) => {
            setCompanyName(e.target.value);
            if (error) setError("");
          }}
          error={error}
        />
      </div>

      <p className="max-w-[600px] text-center text-[13px] text-text/60">
        Якщо вам необхідно створити договір, або індивідуалізувати рахунок
        напишіть нам на пошту{" "}
        <span className="text-accent">finance@ruuush.marketing</span>
      </p>

      <Button onClick={handleSubmit}>Створити рахунок</Button>

      <Footer />
    </div>
  );
}
