type BrandLogoSize = "sm" | "md" | "lg" | "xl" | "hero";

const SIZE_CLASSES: Record<BrandLogoSize, string> = {
  sm: "text-lg sm:text-xl",
  md: "text-2xl sm:text-3xl",
  lg: "text-3xl sm:text-4xl",
  xl: "text-4xl sm:text-5xl lg:text-6xl xl:text-7xl",
  hero: "text-[2rem] sm:text-5xl lg:text-6xl xl:text-7xl",
};

const DEART_GRADIENT = "linear-gradient(135deg, #e81c0e 0%, #f04a20 50%, #f26b1d 100%)";
const STIL_GRADIENT = "linear-gradient(135deg, #1a237e 0%, #283593 50%, #1e3fae 100%)";

// Solid colors for the glow layer (midpoint of each gradient)
const DEART_GLOW = "#f04a20";
const STIL_GLOW = "#283593";

type BrandLogoVariant = "light" | "dark";

export default function BrandLogo({
  size = "lg",
  variant = "light",
  className = "",
}: {
  size?: BrandLogoSize;
  variant?: BrandLogoVariant;
  className?: string;
}) {
  const sizeClass = SIZE_CLASSES[size];
  // Always prevent text wrapping so "СТИЛ М" stays on one line
  const noWrap = "whitespace-nowrap";

  const isDark = variant === "dark";

  return (
    <span className={`relative inline-block ${className}`}>
      {/* Glow layer - blurred duplicate behind */}
      <span
        className={`absolute inset-0 ${sizeClass} font-black tracking-tight leading-none blur-lg opacity-50 pointer-events-none select-none ${noWrap}`}
        aria-hidden="true"
      >
        <span style={{ color: isDark ? "#ff6b35" : DEART_GLOW }}>ДЕАРТ</span>{" "}
        <span style={{ color: isDark ? "#6b8cff" : STIL_GLOW }}>СТИЛ М</span>
      </span>

      {/* Real text */}
      <span className={`relative ${sizeClass} font-black tracking-tight leading-none ${noWrap}`}>
        {isDark ? (
          <>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #ff4433 0%, #ff6b35 100%)" }}
            >
              ДЕАРТ
            </span>{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "linear-gradient(135deg, #4a6cf7 0%, #6b8cff 50%, #8ba8ff 100%)" }}
            >
              СТИЛ М
            </span>
          </>
        ) : (
          <>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: DEART_GRADIENT }}
            >
              ДЕАРТ
            </span>{" "}
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: STIL_GRADIENT }}
            >
              СТИЛ М
            </span>
          </>
        )}
      </span>
    </span>
  );
}
