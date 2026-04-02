"use client";

import { useState } from "react";
import { Menu, MessageCircle, Mail, ArrowLeft, CreditCard, Apple } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function Header() {
  return (
    <header className="flex items-center justify-between px-10 py-6">
      <div className="text-[#E85B5B] text-[28px] italic" style={{ fontWeight: 800 }}>
        РУУУШ
      </div>
      <div className="flex items-center gap-4">
        <button className="border border-white/20 rounded-full px-6 py-2 text-white text-[14px] hover:bg-white/5 transition">
          Увійти
        </button>
        <button className="text-white">
          <Menu size={24} />
        </button>
      </div>
    </header>
  );
}

function StepRegistration({ onNext }: { onNext: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [errors, setErrors] = useState<{ phone?: string; email?: string }>({});
  const [touched, setTouched] = useState<{ phone?: boolean; email?: boolean }>({});

  const formatPhone = (value: string) => {
    const digits = value.replace(/\D/g, "");
    let d = digits;
    if (d.startsWith("380")) d = d.slice(3);
    else if (d.startsWith("38")) d = d.slice(2);
    else if (d.startsWith("0")) d = d.slice(1);
    d = d.slice(0, 9);

    let result = "+ 38";
    if (d.length > 0) result += ` (0${d.slice(0, 2)}`;
    if (d.length >= 2) result += `)`;
    if (d.length > 2) result += ` ${d.slice(2, 5)}`;
    if (d.length > 5) result += ` ${d.slice(5, 7)}`;
    if (d.length > 7) result += ` ${d.slice(7, 9)}`;
    return result;
  };

  const getPhoneDigits = (formatted: string) => {
    const digits = formatted.replace(/\D/g, "");
    if (digits.startsWith("380")) return digits.slice(3);
    if (digits.startsWith("38")) return digits.slice(2);
    return digits;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setPhone(formatted);
    const digits = getPhoneDigits(formatted);
    if (touched.phone) {
      if (digits.length < 9) {
        setErrors((prev) => ({ ...prev, phone: "Введіть коректний номер телефону" }));
      } else {
        setErrors((prev) => ({ ...prev, phone: undefined }));
      }
    }
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (touched.email) {
      validateEmail(e.target.value);
    }
  };

  const validateEmail = (val: string) => {
    if (!val.includes("@") || !val.split("@")[1]?.includes(".")) {
      setErrors((prev) => ({ ...prev, email: "Введіть коректний email" }));
    } else {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  const handleSubmit = () => {
    const phoneDigits = getPhoneDigits(phone);
    const newErrors: { phone?: string; email?: string } = {};
    if (phoneDigits.length < 9) newErrors.phone = "Введіть коректний номер телефону";
    if (!email.includes("@") || !email.split("@")[1]?.includes(".")) newErrors.email = "Введіть коректний email";
    setErrors(newErrors);
    setTouched({ phone: true, email: true });
    if (!newErrors.phone && !newErrors.email && name && agreed) {
      onNext();
    }
  };

  const phoneDigits = getPhoneDigits(phone);
  const isValid = name && phoneDigits.length === 9 && email.includes("@") && email.split("@")[1]?.includes(".") && agreed;

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[32px] text-white italic uppercase" style={{ fontWeight: 800 }}>
        РЕЄСТРАЦІЯ
      </h1>
      <p className="text-white/60 text-[14px]">
        Курс &ldquo;Як використовувати поведінкову науку, щоб змінювати поведінку людей&rdquo;
      </p>
      <div className="flex flex-col gap-4">
        <div>
          <div className="relative">
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Марія"
              className="w-full bg-[#1E1E1E] border border-white/10 rounded-[20px] px-7 py-5 text-[#d0cac3] text-[18px] placeholder-white/20 outline-none focus:border-[#E85B5B]/50 transition pr-12"
            />
            <span className="absolute right-5 top-2 text-[#E85B5B] text-[18px]">*</span>
          </div>
        </div>
        <div>
          <div className="relative">
            <input
              value={phone}
              onChange={handlePhoneChange}
              onBlur={() => {
                setTouched((p) => ({ ...p, phone: true }));
                if (phoneDigits.length < 9) setErrors((p) => ({ ...p, phone: "Введіть коректний номер телефону" }));
              }}
              placeholder="+ 38 (050) 123 12 12"
              className={`w-full bg-[#1E1E1E] border rounded-[20px] px-7 py-5 text-[#d0cac3] text-[18px] placeholder-white/20 outline-none transition pr-12 ${
                errors.phone ? "border-[#E85B5B]" : "border-white/10 focus:border-[#E85B5B]/50"
              }`}
            />
            <span className="absolute right-5 top-2 text-[#E85B5B] text-[18px]">*</span>
          </div>
          {errors.phone && (
            <p className="text-[#E85B5B] text-[12px] mt-1.5 ml-2">{errors.phone}</p>
          )}
        </div>
        <div>
          <div className="relative">
            <input
              value={email}
              onChange={handleEmailChange}
              onBlur={() => {
                setTouched((p) => ({ ...p, email: true }));
                validateEmail(email);
              }}
              type="email"
              placeholder="test@gmail.com"
              className={`w-full bg-[#1E1E1E] border rounded-[20px] px-7 py-5 text-[#d0cac3] text-[18px] placeholder-white/20 outline-none transition pr-12 ${
                errors.email ? "border-[#E85B5B]" : "border-white/10 focus:border-[#E85B5B]/50"
              }`}
            />
            <span className="absolute right-5 top-2 text-[#E85B5B] text-[18px]">*</span>
          </div>
          {errors.email && (
            <p className="text-[#E85B5B] text-[12px] mt-1.5 ml-2">{errors.email}</p>
          )}
        </div>
      </div>
      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-1 accent-[#E85B5B] w-4 h-4"
        />
        <span className="text-white/50 text-[12px]">
          Погоджуюсь з{" "}
          <span className="text-white underline">Умовами конфіденційності</span> та{" "}
          <span className="text-white underline">Правилами сервісу</span> та{" "}
          <span className="text-white underline">Підпискою на новини</span>
        </span>
      </label>
      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className="w-full bg-[#E85B5B] text-white py-5 rounded-full uppercase text-[18px] tracking-wider hover:bg-[#d14e4e] transition disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ fontWeight: 500 }}
      >
        ЗАРЕЄСТРУВАТИСЬ
      </button>
    </div>
  );
}

function StepThankYou({ onPay, onContact }: { onPay: () => void; onContact: () => void }) {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <h1 className="text-[28px] text-white italic uppercase" style={{ fontWeight: 800 }}>
        ДЯКУЄМО ЗА РЕЄСТРАЦІЮ
      </h1>
      <p className="text-white/60 text-[14px]">Оберіть наступний крок</p>
      <div className="flex flex-col gap-4 w-full">
        <button
          onClick={onPay}
          className="w-full bg-[#E85B5B] text-white py-4 rounded-xl uppercase italic text-[15px] tracking-wider hover:bg-[#d14e4e] transition"
          style={{ fontWeight: 700 }}
        >
          ОПЛАТИТИ КУРС
        </button>
        <button
          onClick={onContact}
          className="w-full bg-[#E85B5B] text-white py-4 rounded-xl uppercase italic text-[15px] tracking-wider hover:bg-[#d14e4e] transition"
          style={{ fontWeight: 700 }}
        >
          ЗВ&apos;ЯЗАТИСЯ ЗІ МНОЮ
        </button>
      </div>
    </div>
  );
}

const paymentOptions = [
  {
    id: "full",
    title: "Оплата за увесь курс",
    oldPrice: "30 500 грн",
    newPrice: "27 500 грн",
    note: "за раннім бронюванням до 16.03.2025",
  },
  {
    id: "mono",
    title: "Оплата частинами від Mono",
    oldPrice: null,
    newPrice: "30 500 грн",
    note: "розстрочка до 6 місяців",
  },
  {
    id: "split",
    title: "Оплата частинами від РУУУШ",
    oldPrice: null,
    newPrice: "30 500 грн",
    note: "поділ на 2 платежі",
  },
  {
    id: "invoice",
    title: "Безготівковий розрахунок для юридичних осіб",
    oldPrice: "30 500 грн",
    newPrice: "27 500 грн",
    note: null,
  },
];

function StepPayment({ onNext }: { onNext: () => void }) {
  const [selected, setSelected] = useState("full");
  const [promoOpen, setPromoOpen] = useState(false);
  const [promo, setPromo] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-[28px] text-white italic uppercase" style={{ fontWeight: 800 }}>
        ОБЕРІТЬ СПОСІБ ОПЛАТИ
      </h1>
      <div className="flex flex-col gap-3">
        {paymentOptions.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`w-full text-left bg-[#1E1E1E] rounded-xl p-4 border-2 transition ${
              selected === opt.id ? "border-[#E85B5B]" : "border-transparent"
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                  selected === opt.id ? "border-[#E85B5B]" : "border-white/30"
                }`}
              >
                {selected === opt.id && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#E85B5B]" />
                )}
              </div>
              <div>
                <div className="text-white text-[14px]">{opt.title}</div>
                <div className="flex items-center gap-2 mt-1">
                  {opt.oldPrice && (
                    <span className="text-white/40 line-through text-[13px]">{opt.oldPrice}</span>
                  )}
                  <span className="text-white text-[16px]" style={{ fontWeight: 700 }}>
                    {opt.newPrice}
                  </span>
                </div>
                {opt.note && <div className="text-white/40 text-[12px] mt-0.5">{opt.note}</div>}
              </div>
            </div>
          </button>
        ))}
      </div>

      <button
        onClick={() => setPromoOpen(!promoOpen)}
        className="text-white/50 text-[14px] text-left hover:text-white/70 transition"
      >
        {promoOpen ? "\u25BE" : "\u25B8"} У мене є промокод
      </button>
      {promoOpen && (
        <input
          value={promo}
          onChange={(e) => setPromo(e.target.value)}
          placeholder="Введіть промокод"
          className="w-full bg-[#1E1E1E] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 outline-none focus:border-[#E85B5B]/50 transition"
        />
      )}

      <button
        onClick={onNext}
        className="w-full bg-[#E85B5B] text-white py-4 rounded-xl uppercase italic text-[15px] tracking-wider hover:bg-[#d14e4e] transition"
        style={{ fontWeight: 700 }}
      >
        ОПЛАТИТИ
      </button>

      <div className="text-center text-white/40 text-[13px] mt-2">
        Маєте запитання? Будемо раді поспілкуватися
      </div>
      <div className="flex justify-center gap-4">
        <button className="text-white/50 hover:text-white transition">
          <MessageCircle size={20} />
        </button>
        <button className="text-white/50 hover:text-white transition">
          <Mail size={20} />
        </button>
      </div>
    </div>
  );
}

function StepMonoCheckout({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");

  const formatCard = (v: string) => {
    const nums = v.replace(/\D/g, "").slice(0, 16);
    return nums.replace(/(.{4})/g, "$1 ").trim();
  };

  const formatExpiry = (v: string) => {
    const nums = v.replace(/\D/g, "").slice(0, 4);
    if (nums.length > 2) return nums.slice(0, 2) + "/" + nums.slice(2);
    return nums;
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-white rounded-[20px] w-full max-w-[520px] p-8 relative">
        <button
          onClick={onBack}
          className="absolute left-6 top-6 text-gray-400 hover:text-gray-600 transition"
        >
          <ArrowLeft size={20} />
        </button>

        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
            <CreditCard size={24} className="text-gray-500" />
          </div>
          <p className="text-gray-500 text-[14px]">Reiseplan</p>
          <p className="text-black text-[32px] mt-1" style={{ fontWeight: 700 }}>
            27 500 ₴
          </p>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 flex items-center gap-4 mb-5">
          <div className="w-[72px] h-[72px] bg-black rounded-lg flex items-center justify-center shrink-0">
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
            <p className="text-black text-[14px]" style={{ fontWeight: 600 }}>
              Оплатити mono
            </p>
            <p className="text-gray-500 text-[13px] mt-1">
              Відскануйте QR-код для оплати платежу у додатку{" "}
              <span className="text-blue-500 underline cursor-pointer">monobank</span>
            </p>
          </div>
        </div>

        <button className="w-full bg-black text-white py-3.5 rounded-lg flex items-center justify-center gap-2 mb-3 hover:bg-gray-900 transition">
          <span className="text-[15px]">Оплата через</span>
          <Apple size={16} fill="white" />
          <span className="text-[15px]" style={{ fontWeight: 600 }}>Pay</span>
        </button>

        <button
          onClick={() => {
            setCardNumber("5375 4141 2345 2528");
            setExpiry("09/27");
            setCvc("841");
          }}
          className="w-full bg-black text-white py-3.5 rounded-lg flex items-center justify-center gap-2 mb-5 hover:bg-gray-900 transition"
        >
          <span className="text-[14px] tracking-tight" style={{ fontWeight: 500 }}>G Pay</span>
          <span className="mx-1 text-white/30">|</span>
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-4 bg-gradient-to-r from-red-500 to-yellow-400 rounded-sm" />
            <span className="text-[14px] text-white/70">&bull;&bull;&bull;&bull; 2528</span>
          </div>
        </button>

        <p className="text-center text-gray-400 text-[14px] mb-5">Або оплатити карткою</p>

        <div className="flex flex-col gap-3 mb-5">
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(formatCard(e.target.value))}
            placeholder="Номер картки"
            className="w-full border border-gray-200 rounded-lg px-4 py-3.5 text-black text-[15px] placeholder-gray-400 outline-none focus:border-gray-400 transition"
          />
          <div className="flex gap-3">
            <input
              value={expiry}
              onChange={(e) => setExpiry(formatExpiry(e.target.value))}
              placeholder="Строк дії"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-3.5 text-black text-[15px] placeholder-gray-400 outline-none focus:border-gray-400 transition"
            />
            <input
              value={cvc}
              onChange={(e) => setCvc(e.target.value.replace(/\D/g, "").slice(0, 3))}
              placeholder="CVC2"
              className="flex-1 border border-gray-200 rounded-lg px-4 py-3.5 text-black text-[15px] placeholder-gray-400 outline-none focus:border-gray-400 transition"
            />
          </div>
        </div>

        <button
          onClick={onNext}
          disabled={!cardNumber || !expiry || !cvc}
          className={`w-full py-3.5 rounded-lg text-[15px] flex items-center justify-center gap-2 transition ${
            cardNumber && expiry && cvc
              ? "bg-[#B8A5E3] hover:bg-[#a893d6] text-white"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          style={{ fontWeight: 600 }}
        >
          Оплатити 27 500 ₴ <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}

function StepSuccess() {
  return (
    <div className="flex flex-col gap-6 items-center text-center">
      <h1 className="text-[32px] text-white italic uppercase" style={{ fontWeight: 800 }}>
        ДЯКУЄМО
      </h1>
      <p className="text-white/60 text-[14px]">
        Ваші дані збережено, очікуйте старту курсу
      </p>
      <button
        onClick={() => window.location.reload()}
        className="w-full bg-[#E85B5B] text-white py-4 rounded-xl uppercase italic text-[15px] tracking-wider hover:bg-[#d14e4e] transition"
        style={{ fontWeight: 700 }}
      >
        НА ГОЛОВНУ
      </button>
    </div>
  );
}

export default function FormB2Page() {
  const [step, setStep] = useState(0);

  const steps = [
    <StepRegistration key="reg" onNext={() => setStep(1)} />,
    <StepThankYou key="thanks" onPay={() => setStep(2)} onContact={() => setStep(4)} />,
    <StepPayment key="pay" onNext={() => setStep(3)} />,
    <StepMonoCheckout key="mono" onBack={() => setStep(2)} onNext={() => setStep(4)} />,
    <StepSuccess key="success" />,
  ];

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col font-[family-name:var(--font-roboto-mono)]">
      <Header />
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
