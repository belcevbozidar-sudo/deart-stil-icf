import { useRef, useMemo } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "motion/react";
import { Snowflake, Sun, ShieldCheck, Thermometer, Layers } from "lucide-react";
import { useTranslation } from "react-i18next";

// Pre-computed texture positions so they don't shift on re-render
function generatePositions(count: number, seed: number) {
  const positions: Array<{ x: number; y: number; size: number }> = [];
  let val = seed;
  for (let i = 0; i < count; i++) {
    val = (val * 16807 + 0) % 2147483647;
    const x = (val % 1000) / 10;
    val = (val * 16807 + 0) % 2147483647;
    const y = (val % 1000) / 10;
    val = (val * 16807 + 0) % 2147483647;
    const size = 3 + (val % 60) / 10;
    positions.push({ x, y, size });
  }
  return positions;
}

const EPS_DOTS_OUTER = generatePositions(30, 42);
const EPS_DOTS_INNER = generatePositions(25, 99);

export default function BlockExplodeSection() {
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Spread factor: 0 = assembled, 1 = exploded
  const spread = useTransform(scrollYProgress, [0.15, 0.42], [0, 1]);

  // Outer EPS moves left, inner moves right (responsive via clamp)
  const outerX = useTransform(spread, [0, 1], ["0%", "-65%"]);
  const innerX = useTransform(spread, [0, 1], ["0%", "65%"]);

  // Gap between layers when separating
  const gapOuter = useTransform(spread, [0, 1], [0, 12]);
  const gapInner = useTransform(spread, [0, 1], [0, 12]);

  // Section fade in/out
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0.02, 0.14, 0.72, 0.88],
    [0, 1, 1, 0]
  );

  // Heading
  const headingOpacity = useTransform(
    scrollYProgress,
    [0.06, 0.16, 0.68, 0.78],
    [0, 1, 1, 0]
  );

  // Labels appear after block explodes
  const labelsOpacity = useTransform(
    scrollYProgress,
    [0.34, 0.44, 0.65, 0.75],
    [0, 1, 1, 0]
  );
  const labelsY = useTransform(
    scrollYProgress,
    [0.34, 0.44],
    [20, 0]
  );

  // Temperature bar
  const tempOpacity = useTransform(
    scrollYProgress,
    [0.30, 0.42, 0.65, 0.75],
    [0, 1, 1, 0]
  );

  // Subtle block scale
  const blockScale = useTransform(
    scrollYProgress,
    [0.08, 0.25, 0.62, 0.82],
    [0.88, 1, 1, 0.92]
  );

  // Hint text
  const hintOpacity = useTransform(
    scrollYProgress,
    [0.08, 0.16, 0.38, 0.46],
    [0, 0.6, 0.6, 0]
  );

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ height: "120vh" }}
    >
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden">
        <motion.div
          style={{ opacity: sectionOpacity }}
          className="w-full max-w-2xl lg:max-w-3xl mx-auto flex flex-col items-center"
        >
          {/* Heading */}
          <motion.div
            className="text-center mb-6 sm:mb-8 lg:mb-10"
            style={{ opacity: headingOpacity }}
          >
            <span className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase text-accent mb-2 sm:mb-3">
              {t("block.sectionLabel")}
            </span>
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight text-balance">
              {t("block.threeLayers")}{" "}
              <span className="text-primary">{t("block.maximum")}</span> {t("block.protection")}
            </h2>
          </motion.div>

          {/* Temperature gradient bar */}
          <motion.div
            style={{ opacity: tempOpacity }}
            className="flex items-center justify-between w-full max-w-xs sm:max-w-sm mb-4 sm:mb-6"
          >
            <div className="flex items-center gap-1.5">
              <Snowflake className="size-3.5 sm:size-4 text-blue-500" />
              <span className="text-[10px] sm:text-xs font-bold text-blue-500">
                -15°C
              </span>
            </div>
            <div className="flex-1 mx-3 h-1.5 sm:h-2 rounded-full bg-gradient-to-r from-blue-400 via-stone-300 to-orange-400 opacity-60" />
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] sm:text-xs font-bold text-orange-500">
                +22°C
              </span>
              <Sun className="size-3.5 sm:size-4 text-orange-500" />
            </div>
          </motion.div>

          {/* Block assembly */}
          <motion.div
            style={{ scale: blockScale }}
            className="relative flex items-center justify-center w-full"
          >
            <div className="flex items-stretch justify-center">
              {/* Outer EPS layer */}
              <motion.div
                style={{ x: outerX, marginRight: gapOuter }}
                className="relative"
              >
                <EpsLayer
                  dots={EPS_DOTS_OUTER}
                  colorFrom="from-blue-200"
                  colorVia="via-blue-100"
                  colorTo="to-blue-50"
                  borderColor="border-blue-300/50"
                  widthClass="w-12 sm:w-20 lg:w-28"
                  heightClass="h-40 sm:h-56 lg:h-72"
                />
              </motion.div>

              {/* Concrete core */}
              <div className="relative">
                <ConcreteLayer
                  widthClass="w-12 sm:w-20 lg:w-28"
                  heightClass="h-40 sm:h-56 lg:h-72"
                />
              </div>

              {/* Inner EPS layer */}
              <motion.div
                style={{ x: innerX, marginLeft: gapInner }}
                className="relative"
              >
                <EpsLayer
                  dots={EPS_DOTS_INNER}
                  colorFrom="from-sky-200"
                  colorVia="via-sky-100"
                  colorTo="to-sky-50"
                  borderColor="border-sky-300/50"
                  widthClass="w-12 sm:w-20 lg:w-28"
                  heightClass="h-40 sm:h-56 lg:h-72"
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Scroll hint */}
          <motion.div
            style={{ opacity: hintOpacity }}
            className="mt-4 sm:mt-6 flex flex-col items-center gap-1.5"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-5 h-8 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center pt-1.5"
            >
              <div className="w-1 h-1.5 rounded-full bg-muted-foreground/50" />
            </motion.div>
            <span className="text-[10px] sm:text-xs text-muted-foreground font-medium">
              {t("block.scrollDown")}
            </span>
          </motion.div>

          {/* Layer info cards */}
          <motion.div
            style={{ opacity: labelsOpacity, y: labelsY }}
            className="grid grid-cols-3 gap-2 sm:gap-4 mt-5 sm:mt-8 w-full"
          >
            <InfoCard
              icon={<Snowflake className="size-3.5 sm:size-4" />}
              iconBg="bg-blue-500/10 text-blue-600"
              title={t("block.outerEps")}
              value={`50 ${tc("unit.mm")}`}
              subtitle={t("block.coldInsulation")}
            />
            <InfoCard
              icon={<ShieldCheck className="size-3.5 sm:size-4" />}
              iconBg="bg-stone-500/10 text-stone-600"
              title={t("block.concreteCore")}
              value={`150 ${tc("unit.mm")}`}
              subtitle={t("block.loadBearingWall")}
            />
            <InfoCard
              icon={<Thermometer className="size-3.5 sm:size-4" />}
              iconBg="bg-sky-500/10 text-sky-600"
              title={t("block.innerEps")}
              value={`50 ${tc("unit.mm")}`}
              subtitle={t("block.thermalComfort")}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── Layer Components ─── */

function EpsLayer({
  dots,
  colorFrom,
  colorVia,
  colorTo,
  borderColor,
  widthClass,
  heightClass,
}: {
  dots: Array<{ x: number; y: number; size: number }>;
  colorFrom: string;
  colorVia: string;
  colorTo: string;
  borderColor: string;
  widthClass: string;
  heightClass: string;
}) {
  // Memoize dots to avoid recalculating on each render
  const dotElements = useMemo(
    () =>
      dots.map((d, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/50"
          style={{
            width: `${d.size}px`,
            height: `${d.size}px`,
            top: `${d.y}%`,
            left: `${d.x}%`,
          }}
        />
      )),
    [dots]
  );

  return (
    <div
      className={`${widthClass} ${heightClass} relative rounded-lg sm:rounded-xl border ${borderColor} bg-gradient-to-b ${colorFrom} ${colorVia} ${colorTo} shadow-md sm:shadow-lg overflow-hidden`}
    >
      <div className="absolute inset-0 opacity-40">{dotElements}</div>
      {/* 3D edge highlights */}
      <div className="absolute inset-y-0 right-0 w-[2px] sm:w-1 bg-black/[0.06]" />
      <div className="absolute inset-x-0 top-0 h-[2px] sm:h-1 bg-white/40 rounded-t-lg sm:rounded-t-xl" />
      {/* EPS icon watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
        <Layers className="size-8 sm:size-14 lg:size-20" />
      </div>
    </div>
  );
}

function ConcreteLayer({
  widthClass,
  heightClass,
}: {
  widthClass: string;
  heightClass: string;
}) {
  return (
    <div
      className={`${widthClass} ${heightClass} relative rounded-lg sm:rounded-xl border border-stone-400/40 bg-gradient-to-b from-stone-400 via-stone-350 to-stone-300 shadow-md sm:shadow-lg overflow-hidden`}
    >
      {/* Aggregate speckle texture */}
      <div className="absolute inset-0 opacity-15">
        {[18, 35, 52, 68, 85].map((top) => (
          <div
            key={top}
            className="absolute left-[12%] right-[12%] h-[1.5px] bg-stone-600/30 rounded-full"
            style={{ top: `${top}%` }}
          />
        ))}
      </div>
      {/* Rebar cross pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-[1.5px] h-[70%] bg-stone-700 rounded-full" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="h-[1.5px] w-[70%] bg-stone-700 rounded-full" />
      </div>
      {/* 3D edges */}
      <div className="absolute inset-y-0 right-0 w-[2px] sm:w-1 bg-black/[0.08]" />
      <div className="absolute inset-x-0 top-0 h-[2px] sm:h-1 bg-white/20 rounded-t-lg sm:rounded-t-xl" />
      {/* Shield watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06]">
        <ShieldCheck className="size-8 sm:size-14 lg:size-20" />
      </div>
    </div>
  );
}

/* ─── Info Card ─── */

function InfoCard({
  icon,
  iconBg,
  title,
  value,
  subtitle,
}: {
  icon: React.ReactNode;
  iconBg: string;
  title: string;
  value: string;
  subtitle: string;
}) {
  return (
    <div className="rounded-xl sm:rounded-2xl bg-background/60 backdrop-blur-lg border border-border/50 p-2.5 sm:p-4 text-center hover:border-primary/20 transition-colors">
      <div
        className={`inline-flex size-7 sm:size-10 items-center justify-center rounded-lg sm:rounded-xl ${iconBg} mb-1.5 sm:mb-3`}
      >
        {icon}
      </div>
      <div className="text-[10px] sm:text-xs font-bold text-foreground mb-0.5">
        {title}
      </div>
      <div className="text-sm sm:text-lg lg:text-xl font-black text-primary leading-tight">
        {value}
      </div>
      <div className="text-[9px] sm:text-[11px] font-medium text-muted-foreground mt-0.5 sm:mt-1">
        {subtitle}
      </div>
    </div>
  );
}
