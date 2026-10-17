import { Minus, Plus } from "lucide-react";

export default function QuantityStepper({ value, onChange, max = 10, testId = "qty" }) {
  return (
    <div data-testid={`${testId}-stepper`} className="inline-flex items-center rounded-full border border-line bg-white">
      <button
        data-testid={`${testId}-decrease`}
        aria-label="Decrease quantity"
        onClick={() => onChange(Math.max(1, value - 1))}
        disabled={value <= 1}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink disabled:opacity-30 hover:bg-secondary transition-colors"
      >
        <Minus size={15} />
      </button>
      <span data-testid={`${testId}-value`} aria-live="polite" className="w-8 text-center text-sm font-semibold text-ink">
        {value}
      </span>
      <button
        data-testid={`${testId}-increase`}
        aria-label="Increase quantity"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        className="flex h-10 w-10 items-center justify-center rounded-full text-ink disabled:opacity-30 hover:bg-secondary transition-colors"
      >
        <Plus size={15} />
      </button>
    </div>
  );
}
