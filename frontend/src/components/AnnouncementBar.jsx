import { useState } from "react";
import { X } from "lucide-react";
import { ANNOUNCEMENT } from "@/data/site";

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);
  if (!ANNOUNCEMENT.visible || dismissed) return null;
  return (
    <div data-testid="announcement-bar" className="relative bg-ink text-ivory">
      <div className="mx-auto max-w-7xl px-10 py-2.5 text-center">
        <p className="text-[11px] sm:text-xs tracking-wide text-ivory/90">
          {ANNOUNCEMENT.message}
        </p>
      </div>
      <button
        data-testid="announcement-dismiss"
        aria-label="Dismiss announcement"
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 text-ivory/70 hover:text-ivory transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  );
}
