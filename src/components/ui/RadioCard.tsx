"use client";

interface RadioCardProps {
  selected: boolean;
  onSelect: () => void;
  title: string;
  price: string;
  oldPrice?: string;
  description: string;
}

export function RadioCard({
  selected,
  onSelect,
  title,
  price,
  oldPrice,
  description,
}: RadioCardProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full rounded-xl bg-bg-input p-4 text-left border-2 transition-colors ${
        selected ? "border-accent" : "border-transparent"
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Radio circle */}
        <div className="mt-0.5 flex size-5 flex-shrink-0 items-center justify-center rounded-full border-2 border-white/30 data-[selected=true]:border-accent" data-selected={selected}>
          {selected && <div className="size-2.5 rounded-full bg-accent" />}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[14px] leading-tight text-text">
            {title}
          </span>
          <div className="flex items-center gap-2 mt-1">
            {oldPrice && (
              <span className="text-[13px] text-text/40 line-through">
                {oldPrice}
              </span>
            )}
            <span className="text-[16px] font-bold text-text">{price}</span>
          </div>
          {description && <span className="text-[12px] text-text/40 mt-0.5">{description}</span>}
        </div>
      </div>
    </button>
  );
}
