import { useState } from "react";
import { Menu, MessageCircle, Mail, ArrowLeft, CreditCard, Apple, Download, Share2, Check, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import jsPDF from "jspdf";

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
    // Remove leading 38 if user types it (we add it automatically)
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
        Курс "Як використовувати поведінкову науку, щоб змінювати поведінку людей"
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
          ЗВ'ЯЗАТИСЯ ЗІ МНОЮ
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

function StepPayment({ onNext, onInvoice }: { onNext: () => void; onInvoice: () => void }) {
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
        {promoOpen ? "▾" : "▸"} У мене є промокод
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
        onClick={selected === "invoice" ? onInvoice : onNext}
        className="w-full bg-[#E85B5B] text-white py-4 rounded-xl uppercase italic text-[15px] tracking-wider hover:bg-[#d14e4e] transition"
        style={{ fontWeight: 700 }}
      >
        {selected === "invoice" ? "СТВОРИТИ РАХУНОК" : "ОПЛАТИТИ"}
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
        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute left-6 top-6 text-gray-400 hover:text-gray-600 transition"
        >
          <ArrowLeft size={20} />
        </button>

        {/* Merchant info */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mb-3">
            <CreditCard size={24} className="text-gray-500" />
          </div>
          <p className="text-gray-500 text-[14px]">Reiseplan</p>
          <p className="text-black text-[32px] mt-1" style={{ fontWeight: 700 }}>
            27 500 ₴
          </p>
        </div>

        {/* Mono QR section */}
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
              {/* QR corner markers */}
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
              Оплатити 🐱‍⬛ mono
            </p>
            <p className="text-gray-500 text-[13px] mt-1">
              Відскануйте QR-код для оплати платежу у додатку{" "}
              <span className="text-blue-500 underline cursor-pointer">monobank</span>
            </p>
          </div>
        </div>

        {/* Apple Pay */}
        <button className="w-full bg-black text-white py-3.5 rounded-lg flex items-center justify-center gap-2 mb-3 hover:bg-gray-900 transition">
          <span className="text-[15px]">Оплата через</span>
          <Apple size={16} fill="white" />
          <span className="text-[15px]" style={{ fontWeight: 600 }}>Pay</span>
        </button>

        {/* Google Pay */}
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
            <span className="text-[14px] text-white/70">•••• 2528</span>
          </div>
        </button>

        {/* Divider */}
        <p className="text-center text-gray-400 text-[14px] mb-5">Або оплатити карткою</p>

        {/* Card inputs */}
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

        {/* Pay button */}
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
          Оплатити 27 500 ₴ <span>→</span>
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

// === Invoice Flow: 3 sub-steps ===

const sourceOptions = [
  "Реклама в соцмережах",
  "Пост або сторіз",
  "Розсилка",
  "Ваш варіант",
];

function StepInvoiceCompany({ onNext }: { onNext: () => void }) {
  const [company, setCompany] = useState("");

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="text-center">
        <h1 className="text-[28px] text-[#d0cac3] italic uppercase" style={{ fontWeight: 800 }}>
          СТВОРЕННЯ РАХУНКУ
        </h1>
        <p className="text-[#d0cac3]/60 text-[14px] mt-3">
          Вкажіть назву юридичної особи, на яку необхідно створити рахунок
        </p>
      </div>
      <div className="w-full relative">
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Юр. особа"
          className="w-full bg-[#1E1E1E] border border-white/10 rounded-[20px] px-7 py-5 text-[#d0cac3] text-[18px] placeholder-[#d0cac3]/60 outline-none focus:border-[#E85B5B]/50 transition pr-12"
        />
        <span className="absolute right-5 top-2 text-[#E85B5B] text-[18px]">*</span>
      </div>
      <button
        onClick={onNext}
        disabled={!company}
        className="w-full bg-[#E85B5B] text-white py-5 rounded-full uppercase text-[18px] tracking-wider hover:bg-[#d14e4e] transition disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ fontWeight: 500 }}
      >
        СТВОРИТИ РАХУНОК
      </button>
      <p className="text-[#d0cac3] text-[13px] text-left w-full">
        Якщо вам необхідно створити договір, або індивідуалізувати рахунок напишіть нам на пошту{" "}
        <span className="text-[#E85B5B]">finance@ruuush.marketing</span>
      </p>
      <div className="text-center text-[#d0cac3]/60 text-[13px] mt-4">
        Маєте запитання? Будемо раді поспілкуватися
      </div>
      <div className="flex justify-center gap-6">
        <div className="w-12 h-12 bg-[#1E1E1E] rounded-full flex items-center justify-center">
          <MessageCircle size={20} className="text-[#E85B5B]" />
        </div>
        <div className="w-12 h-12 bg-[#1E1E1E] rounded-full flex items-center justify-center">
          <Mail size={20} className="text-[#E85B5B]" />
        </div>
      </div>
    </div>
  );
}

function StepInvoiceDetails({ onNext }: { onNext: () => void }) {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [position, setPosition] = useState("");
  const [sources, setSources] = useState<string[]>([]);

  const toggleSource = (s: string) => {
    setSources((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  };

  return (
    <div className="flex flex-col gap-8 items-center">
      <div className="text-center">
        <h1 className="text-[28px] text-[#d0cac3] italic uppercase" style={{ fontWeight: 800 }}>
          ВАС ЗАРЕЄСТРОВАНО
        </h1>
        <p className="text-[#d0cac3]/60 text-[14px] mt-3">
          Заповніть додаткову інформацію
        </p>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <div className="relative">
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Олена Денисенко"
            className="w-full bg-[#1E1E1E] border border-white/10 rounded-[20px] px-7 py-5 text-[#d0cac3] text-[18px] placeholder-[#d0cac3]/60 outline-none focus:border-[#E85B5B]/50 transition pr-12"
          />
          <span className="absolute right-5 top-2 text-[#E85B5B] text-[18px]">*</span>
        </div>
        <div className="relative">
          <input
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Компанія"
            className="w-full bg-[#1E1E1E] border border-white/10 rounded-[20px] px-7 py-5 text-[#d0cac3] text-[18px] placeholder-[#d0cac3]/60 outline-none focus:border-[#E85B5B]/50 transition pr-12"
          />
          <span className="absolute right-5 top-2 text-[#E85B5B] text-[18px]">*</span>
        </div>
        <div className="relative">
          <input
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Посада"
            className="w-full bg-[#1E1E1E] border border-white/10 rounded-[20px] px-7 py-5 text-[#d0cac3] text-[18px] placeholder-[#d0cac3]/60 outline-none focus:border-[#E85B5B]/50 transition pr-12"
          />
          <span className="absolute right-5 top-2 text-[#E85B5B] text-[18px]">*</span>
        </div>

        {/* How did you hear about the course */}
        <div className="bg-[#1E1E1E] rounded-[16px] p-6 w-full">
          <p className="text-[#d0cac3] text-[15px] mb-5" style={{ fontWeight: 600 }}>
            Як ви дізналися про курс?
          </p>
          <div className="flex flex-col gap-4">
            {sourceOptions.map((opt) => {
              const isChecked = sources.includes(opt);
              return (
                <label key={opt} className="flex items-center gap-3 cursor-pointer">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center shrink-0 ${
                      isChecked
                        ? "bg-[#E85B5B]"
                        : "bg-[#1E1E1E] border border-[#E85B5B]"
                    }`}
                    onClick={() => toggleSource(opt)}
                  >
                    {isChecked && <Check size={13} className="text-white" />}
                  </div>
                  <span className="text-[#d0cac3] text-[14px]">{opt}</span>
                </label>
              );
            })}
          </div>
        </div>
      </div>
      <button
        onClick={onNext}
        disabled={!fullName || !companyName || !position}
        className="w-full bg-[#E85B5B] text-white py-5 rounded-full uppercase text-[18px] tracking-wider hover:bg-[#d14e4e] transition disabled:opacity-40 disabled:cursor-not-allowed"
        style={{ fontWeight: 500 }}
      >
        НАДІСЛАТИ
      </button>
    </div>
  );
}

function generateInvoicePDF() {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const today = new Date();
  const dateStr = `${String(today.getDate()).padStart(2, "0")}.${String(today.getMonth() + 1).padStart(2, "0")}.${today.getFullYear()}`;
  const invoiceNum = `РХ-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-001`;
  const W = 210;

  // Header bg
  doc.setFillColor(232, 91, 91);
  doc.rect(0, 0, W, 38, "F");

  // Company name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text("RUUUSH", 20, 22);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("Marketing Education Platform", 20, 30);

  // Invoice label
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PAHYHOK", W - 20, 18, { align: "right" });
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`No ${invoiceNum}`, W - 20, 25, { align: "right" });
  doc.text(`vid ${dateStr}`, W - 20, 31, { align: "right" });

  // Separator
  let y = 48;

  // Seller block
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text("POSTACHALNIK", 20, y);
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text('TOV "RUUUSH MARKETING"', 20, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("EDRPOU: 44556677", 20, y + 12);
  doc.text("m. Kyiv, vul. Khreschatyk, 1", 20, y + 17);
  doc.text("Tel.: +380 (50) 123 45 67", 20, y + 22);
  doc.text("Email: finance@ruuush.marketing", 20, y + 27);

  // Buyer block
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.text("ZAMOVNIK", W / 2 + 10, y);
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text('TOV "Innovatsiyni Rishennya"', W / 2 + 10, y + 6);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 100, 100);
  doc.text("EDRPOU: 12345678", W / 2 + 10, y + 12);
  doc.text("m. Kyiv, vul. Shevchenko, 10", W / 2 + 10, y + 17);

  // Divider line
  y = 88;
  doc.setDrawColor(220, 220, 220);
  doc.setLineWidth(0.3);
  doc.line(20, y, W - 20, y);

  // Table header
  y = 96;
  doc.setFillColor(245, 245, 245);
  doc.rect(20, y - 4, W - 40, 10, "F");
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("No", 24, y + 2);
  doc.text("Posluha", 36, y + 2);
  doc.text("K-st", 130, y + 2, { align: "center" });
  doc.text("Tsina", 155, y + 2, { align: "right" });
  doc.text("Suma", W - 24, y + 2, { align: "right" });

  // Table row
  y = 110;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 30, 30);
  doc.setFontSize(9);
  doc.text("1", 24, y);
  doc.text('Kurs "Povedinkova nauka: yak', 36, y);
  doc.text("zminyuvaty povedinku lyudey", 36, y + 5);
  doc.text("1", 130, y, { align: "center" });
  doc.text("27 500,00", 155, y, { align: "right" });
  doc.setFont("helvetica", "bold");
  doc.text("27 500,00", W - 24, y, { align: "right" });

  // Divider
  y = 122;
  doc.setDrawColor(220, 220, 220);
  doc.line(20, y, W - 20, y);

  // Totals
  y = 132;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(100, 100, 100);
  doc.text("Vsogo bez PDV:", 130, y);
  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.text("27 500,00 UAH", W - 24, y, { align: "right" });

  y += 8;
  doc.setTextColor(100, 100, 100);
  doc.setFont("helvetica", "normal");
  doc.text("PDV (ne platnyk):", 130, y);
  doc.setTextColor(30, 30, 30);
  doc.setFont("helvetica", "bold");
  doc.text("0,00 UAH", W - 24, y, { align: "right" });

  // Big total
  y += 14;
  doc.setFillColor(232, 91, 91);
  doc.roundedRect(110, y - 6, W - 130, 14, 3, 3, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(11);
  doc.text("Do splaty:  27 500,00 UAH", W / 2 + 30, y + 3, { align: "center" });

  // Payment details
  y += 24;
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("REKVIZITY DLYA OPLATY", 20, y);
  doc.setFont("helvetica", "normal");
  y += 7;
  doc.setTextColor(60, 60, 60);
  doc.text("Otrymuvach: TOV \"RUUUSH MARKETING\"", 20, y);
  y += 5;
  doc.text("IBAN: UA12 3456 7890 1234 5678 9012 3456 7", 20, y);
  y += 5;
  doc.text('Bank: AT "PrivatBank", m. Kyiv', 20, y);
  y += 5;
  doc.text("EDRPOU: 44556677", 20, y);
  y += 5;
  doc.text(`Pryznachennya platezhu: oplata za kurs zgidno rakhunku ${invoiceNum} vid ${dateStr}`, 20, y);

  // Signature lines
  y = 230;
  doc.setDrawColor(200, 200, 200);
  doc.line(20, y, 90, y);
  doc.line(120, y, 190, y);
  doc.setTextColor(150, 150, 150);
  doc.setFontSize(7);
  doc.text("Pidpys postachalnika", 55, y + 5, { align: "center" });
  doc.text("Pidpys zamovnyka", 155, y + 5, { align: "center" });

  // Stamp circle
  doc.setDrawColor(232, 91, 91);
  doc.setLineWidth(0.8);
  doc.circle(55, y - 15, 12);
  doc.setTextColor(232, 91, 91);
  doc.setFontSize(6);
  doc.setFont("helvetica", "bold");
  doc.text("RUUUSH", 55, y - 17, { align: "center" });
  doc.text("MARKETING", 55, y - 12, { align: "center" });
  doc.setFontSize(5);
  doc.setFont("helvetica", "normal");
  doc.text("M.P.", 55, y - 8, { align: "center" });

  // Footer
  doc.setTextColor(180, 180, 180);
  doc.setFontSize(7);
  doc.text("Tsey rakhunok ye diyisnym protayahom 5 bankivskyh dniv.", W / 2, 280, { align: "center" });
  doc.text("finance@ruuush.marketing  |  ruuush.marketing", W / 2, 285, { align: "center" });

  doc.save(`Rakhunok_${invoiceNum}.pdf`);
}

function InvoiceDocument() {
  const today = new Date();
  const invoiceNum = `РХ-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}${String(today.getDate()).padStart(2, "0")}-001`;

  return (
    <div className="bg-white rounded-[16px] p-6 w-full text-black overflow-hidden shadow-lg">
      {/* Header */}
      <div className="flex items-start justify-between mb-5 pb-4 border-b border-gray-200">
        <div>
          <div className="text-[#E85B5B] text-[22px] italic" style={{ fontWeight: 800 }}>
            РУУУШ
          </div>
          <p className="text-gray-400 text-[10px] mt-1">ТОВ «РУУУШ МАРКЕТИНГ»</p>
          <p className="text-gray-400 text-[10px]">ЄДРПОУ: 44556677</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-1.5 justify-end">
            <FileText size={14} className="text-gray-400" />
            <span className="text-[11px] text-gray-500" style={{ fontWeight: 600 }}>РАХУНОК</span>
          </div>
          <p className="text-[10px] text-gray-400 mt-1">№ {invoiceNum}</p>
          <p className="text-[10px] text-gray-400">
            від {String(today.getDate()).padStart(2, "0")}.{String(today.getMonth() + 1).padStart(2, "0")}.{today.getFullYear()}
          </p>
        </div>
      </div>

      {/* Bill To */}
      <div className="mb-4 pb-3 border-b border-gray-100">
        <p className="text-[9px] text-gray-400 uppercase tracking-wider mb-1">Замовник</p>
        <p className="text-[11px]" style={{ fontWeight: 600 }}>ТОВ «Інноваційні Рішення»</p>
        <p className="text-[10px] text-gray-500">ЄДРПОУ: 12345678</p>
      </div>

      {/* Table */}
      <table className="w-full mb-4 text-[10px]">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-2 text-gray-400" style={{ fontWeight: 500 }}>Послуга</th>
            <th className="text-center py-2 text-gray-400 w-10" style={{ fontWeight: 500 }}>К-сть</th>
            <th className="text-right py-2 text-gray-400" style={{ fontWeight: 500 }}>Сума</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-gray-100">
            <td className="py-2.5 pr-2">
              <p style={{ fontWeight: 500 }}>Курс «Поведінкова наука»</p>
              <p className="text-gray-400 text-[9px]">Як змінювати поведінку людей</p>
            </td>
            <td className="text-center py-2.5">1</td>
            <td className="text-right py-2.5 whitespace-nowrap" style={{ fontWeight: 600 }}>27 500,00 ₴</td>
          </tr>
        </tbody>
      </table>

      {/* Total */}
      <div className="flex justify-between items-center pt-2 border-t border-gray-200">
        <div>
          <p className="text-[9px] text-gray-400">Без ПДВ</p>
        </div>
        <div className="text-right">
          <p className="text-[9px] text-gray-400 mb-0.5">До сплати:</p>
          <p className="text-[16px] text-[#E85B5B]" style={{ fontWeight: 700 }}>27 500,00 ₴</p>
        </div>
      </div>

      {/* Footer stamp area */}
      <div className="mt-4 pt-3 border-t border-dashed border-gray-200 flex items-center justify-between">
        <div>
          <p className="text-[9px] text-gray-400">Підпис _________________</p>
        </div>
        <div className="relative">
          <div className="w-14 h-14 rounded-full border-2 border-[#E85B5B]/30 flex items-center justify-center rotate-[-12deg]">
            <span className="text-[#E85B5B]/50 text-[7px] text-center" style={{ fontWeight: 700 }}>
              РУУУШ<br />М.П.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepInvoiceCreated({ onHome }: { onHome: () => void }) {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="text-center">
        <h1 className="text-[28px] text-[#d0cac3] italic uppercase" style={{ fontWeight: 800 }}>
          РАХУНОК СТВОРЕНО
        </h1>
        <p className="text-[#d0cac3]/60 text-[14px] mt-3">
          Ваш рахунок готовий до завантаження та оплати
        </p>
      </div>

      {/* Invoice preview */}
      <InvoiceDocument />

      {/* Download */}
      <button
        className="w-full bg-[#E85B5B] text-white py-5 rounded-full uppercase text-[18px] tracking-wider flex items-center justify-center gap-3 hover:bg-[#d14e4e] transition"
        style={{ fontWeight: 500 }}
        onClick={generateInvoicePDF}
      >
        <Download size={22} />
        ЗАВАНТАЖИТИ
      </button>

      {/* Share */}
      <button
        className="w-full border border-[#E85B5B] text-white py-5 rounded-full uppercase text-[18px] tracking-wider flex items-center justify-center gap-3 hover:bg-[#E85B5B]/10 transition"
        style={{ fontWeight: 500 }}
      >
        <Share2 size={22} />
        ПОДІЛИТИСЬ
      </button>

      <div className="text-center text-[#d0cac3]/60 text-[13px] mt-4">
        Маєте запитання? Будемо раді поспілкуватися
      </div>
      <div className="flex justify-center gap-6">
        <div className="w-12 h-12 bg-[#1E1E1E] rounded-full flex items-center justify-center">
          <MessageCircle size={20} className="text-[#E85B5B]" />
        </div>
        <div className="w-12 h-12 bg-[#1E1E1E] rounded-full flex items-center justify-center">
          <Mail size={20} className="text-[#E85B5B]" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);

  const steps = [
    <StepRegistration key="reg" onNext={() => setStep(1)} />,
    <StepThankYou key="thanks" onPay={() => setStep(2)} onContact={() => setStep(4)} />,
    <StepPayment key="pay" onNext={() => setStep(3)} onInvoice={() => setStep(5)} />,
    <StepMonoCheckout key="mono" onBack={() => setStep(2)} onNext={() => setStep(4)} />,
    <StepSuccess key="success" />,
    <StepInvoiceCompany key="inv1" onNext={() => setStep(6)} />,
    <StepInvoiceDetails key="inv2" onNext={() => setStep(7)} />,
    <StepInvoiceCreated key="inv3" onHome={() => window.location.reload()} />,
  ];

  return (
    <div className="min-h-screen bg-[#141414] flex flex-col">
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