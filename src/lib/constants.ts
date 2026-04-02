interface PaymentOption {
  id: string;
  title: string;
  price: string;
  oldPrice?: string;
  description: string;
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "full",
    title: "Оплата за увесь курс",
    price: "27 500 грн",
    oldPrice: "30500 грн",
    description: "за раннім бронюванням до 16.03.2025",
  },
  {
    id: "mono",
    title: "Оплата частинами від Mono",
    price: "30 500 грн",
    description: "розстрочка до 6 місяців",
  },
  {
    id: "ruuush_split",
    title: "Оплата частинами від РУУУШ",
    price: "30 500 грн",
    description: "поділ на 2 платежі",
  },
  {
    id: "invoice",
    title: "Безготівковий розрахунок для юридичних осіб",
    price: "27 500 грн",
    oldPrice: "30500 грн",
    description: "за раннім бронюванням до 16.03.2025",
  },
];

export type PaymentMethodId = string;
