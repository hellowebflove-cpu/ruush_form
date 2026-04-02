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
      className={`w-full rounded-[16px] bg-bg-input p-6 text-left transition-colors ${
        selected ? "ring-1 ring-accent" : ""
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Radio circle */}
        <div className="mt-1 flex size-[26px] flex-shrink-0 items-center justify-center rounded-full border border-accent">
          {selected && <div className="size-[9px] rounded-full bg-accent" />}
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-[28px] font-semibold italic leading-tight text-text">
            {title}
          </span>
          <div className="flex items-center gap-6">
            {oldPrice && (
              <span className="text-[22px] font-extralight text-text line-through">
                {oldPrice}
              </span>
            )}
            <span className="text-[22px] font-medium text-text">{price}</span>
          </div>
          <span className="text-[14px] text-text">{description}</span>
        </div>
      </div>
    </button>
  );
}
