import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import {
  setLocaleInPath,
  SUPPORTED_LOCALES,
  SUPPORTED_LOCALES_ARRAY,
  type SupportedLocale,
} from "@/i18n";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";

function FlagImage({
  flagCode,
  name,
  size = "sm",
}: {
  flagCode: string;
  name: string;
  size?: "sm" | "md";
}) {
  const px = size === "sm" ? 22 : 26;
  return (
    <img
      src={`/flags/${flagCode}.svg`}
      width={px}
      height={Math.round(px * 0.75)}
      alt={`${name} flag`}
      className="rounded-[3px] object-cover shrink-0 shadow-sm border border-black/10"
      style={{ width: px, height: Math.round(px * 0.75) }}
      loading="eager"
    />
  );
}

export default function LocaleSwitcher({ className = "" }: { className?: string }) {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLocale = i18n.language as SupportedLocale;
  const currentMeta = SUPPORTED_LOCALES[currentLocale] ?? SUPPORTED_LOCALES.bg;

  const handleChangeLocale = (newLng: SupportedLocale) => {
    if (newLng === i18n.language) {
      setOpen(false);
      return;
    }
    const newPath = setLocaleInPath(newLng, location.pathname, location.search, location.hash);
    navigate(newPath);
    setOpen(false);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Trigger button — current flag + code + chevron */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg transition-all text-sm font-medium ${
          open
            ? "bg-primary/10 text-primary"
            : "text-foreground/60 hover:text-foreground hover:bg-primary/5"
        }`}
        aria-label="Select language"
      >
        <FlagImage flagCode={currentMeta.flagCode} name={currentMeta.name} size="sm" />
        <span className="text-xs font-semibold uppercase tracking-wide">
          {currentMeta.code}
        </span>
        <ChevronDown
          className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute right-0 top-full mt-2 z-50 min-w-[200px] rounded-xl bg-background/95 backdrop-blur-xl border border-border shadow-xl shadow-primary/5 overflow-hidden"
          >
            <div className="py-1.5">
              {SUPPORTED_LOCALES_ARRAY.map((lng) => {
                const meta = SUPPORTED_LOCALES[lng];
                const isActive = currentLocale === lng;
                return (
                  <button
                    key={lng}
                    onClick={() => handleChangeLocale(lng)}
                    className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold"
                        : "text-foreground/70 hover:bg-primary/5 hover:text-foreground"
                    }`}
                  >
                    <FlagImage flagCode={meta.flagCode} name={meta.name} size="md" />
                    <span>{meta.nativeName}</span>
                    {isActive && (
                      <span className="ml-auto size-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
