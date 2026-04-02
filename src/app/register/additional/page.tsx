"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

const SOURCES = [
  "Реклама в соцмережах",
  "Пост або сторіз",
  "Розсилка",
  "Ваш варіант",
];

export default function AdditionalInfoPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [sources, setSources] = useState<string[]>([]);
  const [customSource, setCustomSource] = useState("");

  useEffect(() => {
    const stored = sessionStorage.getItem("registration");
    if (stored) {
      const data = JSON.parse(stored);
      setName(data.name || "");
    }
  }, []);

  const toggleSource = (source: string) => {
    setSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    );
  };

  const handleSubmit = () => {
    sessionStorage.setItem(
      "additional",
      JSON.stringify({
        name,
        company,
        position,
        sources: sources.includes("Ваш варіант")
          ? [...sources.filter((s) => s !== "Ваш варіант"), customSource || "Ваш варіант"]
          : sources,
      })
    );
    router.push("/register/payment");
  };

  return (
    <div className="flex w-full max-w-[641px] flex-col items-center gap-12 pt-8 pb-8">
      {/* Header */}
      <div className="flex w-full max-w-[572px] flex-col items-center gap-5 text-center">
        <h1 className="text-[52px] font-bold italic uppercase leading-tight text-text">
          Вас зареєстровано
        </h1>
        <p className="text-[22px] text-text/60">
          Заповніть додаткову інформацію
        </p>
      </div>

      {/* Fields */}
      <div className="flex w-full max-w-[600px] flex-col gap-8">
        <Input
          label="Олена Денисенко"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          label="Компанія"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <Input
          label="Посада"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />

        {/* How did you learn about the course? */}
        <div className="rounded-[20px] bg-bg-input p-6">
          <p className="mb-5 text-[22px] font-medium text-text">
            Як ви дізналися про курс?
          </p>
          <div className="flex flex-col gap-4">
            {SOURCES.map((source) => (
              <label
                key={source}
                className="flex cursor-pointer items-center gap-4"
              >
                <div className="relative flex-shrink-0">
                  <input
                    type="checkbox"
                    checked={sources.includes(source)}
                    onChange={() => toggleSource(source)}
                    className="peer sr-only"
                  />
                  <div className="size-[22px] rounded-[4px] border border-accent bg-bg-input peer-checked:bg-accent transition-colors" />
                  <svg
                    className="absolute inset-0 m-auto hidden size-3.5 peer-checked:block"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 8l3.5 3.5L13 5" />
                  </svg>
                </div>
                <span className="text-[22px] text-text">{source}</span>
              </label>
            ))}
            {sources.includes("Ваш варіант") && (
              <input
                value={customSource}
                onChange={(e) => setCustomSource(e.target.value)}
                placeholder="Вкажіть ваш варіант"
                className="ml-[38px] w-full bg-transparent text-[18px] text-text placeholder:text-text/40 outline-none border-b border-text/20 pb-1"
                autoFocus
              />
            )}
          </div>
        </div>
      </div>

      <Button onClick={handleSubmit}>Надіслати</Button>
    </div>
  );
}
