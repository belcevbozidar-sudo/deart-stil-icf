import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calculator, Ruler, ArrowUpDown, Layers, Phone, Mail, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";

// ICF block dimensions in meters (1200mm x 400mm x 250mm)
const BLOCK_LENGTH_M = 1.2;
const BLOCK_HEIGHT_M = 0.4;
const BLOCK_SURFACE_AREA = BLOCK_LENGTH_M * BLOCK_HEIGHT_M; // 0.48 m²

const WALL_WIDTH_MM = 250;

// 5% waste factor
const WASTE_FACTOR = 1.05;

export default function CalculatorSection() {
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");
  const [wallLength, setWallLength] = useState("");
  const [wallHeight, setWallHeight] = useState("");

  const length = parseFloat(wallLength);
  const height = parseFloat(wallHeight);
  const hasValidInput = !isNaN(length) && !isNaN(height) && length > 0 && height > 0;

  const results = useMemo(() => {
    if (!hasValidInput) return null;

    const wallArea = length * height;
    const exactBlocks = wallArea / BLOCK_SURFACE_AREA;
    const blocksWithWaste = Math.ceil(exactBlocks * WASTE_FACTOR);

    return {
      wallArea: wallArea.toFixed(2),
      exactBlocks: Math.ceil(exactBlocks),
      recommendedBlocks: blocksWithWaste,
    };
  }, [length, height, hasValidInput]);

  const handleReset = () => {
    setWallLength("");
    setWallHeight("");
  };

  return (
    <section id="calculator" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-14 sm:mb-16"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-accent mb-4">
            {t("calculator.sectionLabel")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5 sm:mb-6 text-balance">
            {t("calculator.titlePre")} <span className="text-primary">{t("calculator.titleHighlight")}</span> {t("calculator.titlePost")}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("calculator.description")}
          </p>
        </motion.div>

        {/* Calculator card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto"
        >
          <div className="rounded-3xl bg-background/70 backdrop-blur-xl border border-border/60 shadow-2xl shadow-primary/8 overflow-hidden">
            {/* Calculator header */}
            <div className="bg-primary/5 border-b border-border/50 px-6 sm:px-8 py-5 sm:py-6 flex items-center gap-3">
              <div className="flex size-10 sm:size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                <Calculator className="size-5 sm:size-6" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-foreground">
                  {t("calculator.icfCalculator")}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t("calculator.block")}: {BLOCK_LENGTH_M * 1000} x {BLOCK_HEIGHT_M * 1000} x {WALL_WIDTH_MM} {tc("unit.mm")}
                  ({t("calculator.coverage")}: {BLOCK_SURFACE_AREA} {t("calculator.sqm")})
                </p>
              </div>
            </div>

            <div className="p-6 sm:p-8 lg:p-10 space-y-8">
              {/* Dimension inputs */}
              <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
                <div>
                  <label
                    htmlFor="wall-length"
                    className="flex items-center gap-2 text-sm font-bold text-foreground mb-3"
                  >
                    <Ruler className="size-4 text-primary" />
                    {t("calculator.wallLength")}
                  </label>
                  <input
                    id="wall-length"
                    type="number"
                    min="0.1"
                    step="0.1"
                    placeholder={t("calculator.placeholderLength")}
                    value={wallLength}
                    onChange={(e) => setWallLength(e.target.value)}
                    className="w-full rounded-xl border-2 border-border/60 bg-background/80 px-4 sm:px-5 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="wall-height"
                    className="flex items-center gap-2 text-sm font-bold text-foreground mb-3"
                  >
                    <ArrowUpDown className="size-4 text-primary" />
                    {t("calculator.wallHeight")}
                  </label>
                  <input
                    id="wall-height"
                    type="number"
                    min="0.1"
                    step="0.1"
                    placeholder={t("calculator.placeholderHeight")}
                    value={wallHeight}
                    onChange={(e) => setWallHeight(e.target.value)}
                    className="w-full rounded-xl border-2 border-border/60 bg-background/80 px-4 sm:px-5 py-3.5 sm:py-4 text-base sm:text-lg font-semibold text-foreground placeholder:text-muted-foreground/50 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                  />
                </div>
              </div>

              {/* Reset button */}
              {hasValidInput && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-end"
                >
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <RotateCcw className="size-4" />
                    {t("calculator.reset")}
                  </button>
                </motion.div>
              )}

              {/* Results */}
              <AnimatePresence mode="wait">
                {results && (
                  <motion.div
                    key={results.wallArea}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-5"
                  >
                    {/* Divider */}
                    <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />

                    {/* Result cards */}
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                      <ResultCard
                        label={t("calculator.wallArea")}
                        value={results.wallArea}
                        unit={t("calculator.sqm")}
                        delay={0}
                      />
                      <ResultCard
                        label={t("calculator.exactBlocks")}
                        value={String(results.exactBlocks)}
                        unit={t("calculator.pcs")}
                        delay={0.1}
                      />
                      <ResultCard
                        label={t("calculator.recommendedBlocks")}
                        value={String(results.recommendedBlocks)}
                        unit={t("calculator.pcs")}
                        delay={0.2}
                        highlighted
                      />
                    </div>

                    {/* Info note */}
                    <div className="flex items-start gap-3 rounded-xl bg-accent/10 border border-accent/20 p-4">
                      <Layers className="size-5 text-accent shrink-0 mt-0.5" />
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        <span className="font-bold text-foreground">
                          {t("calculator.recommendedNote")}
                        </span>{" "}
                        {t("calculator.noteText")}{" "}
                        <span className="font-bold">{WALL_WIDTH_MM} {tc("unit.mm")}</span>.{" "}
                        {t("calculator.contactForQuote")}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="flex flex-wrap gap-3 pt-2">
                      <a
                        href="tel:+359879997883"
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02]"
                      >
                        <Phone className="size-4" />
                        {t("calculator.orderNow")}
                      </a>
                      <a
                        href="mailto:deartstil.m@gmail.com"
                        className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all hover:scale-[1.02]"
                      >
                        <Mail className="size-4" />
                        {t("calculator.requestQuote")}
                      </a>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Empty state hint */}
              {!hasValidInput && (
                <div className="text-center py-6 sm:py-8">
                  <div className="flex size-14 sm:size-16 items-center justify-center rounded-2xl bg-primary/8 text-primary mx-auto mb-4">
                    <Ruler className="size-7 sm:size-8" />
                  </div>
                  <p className="text-sm sm:text-base text-muted-foreground font-medium">
                    {t("calculator.emptyHint")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ResultCard({
  label,
  value,
  unit,
  delay,
  highlighted = false,
}: {
  label: string;
  value: string;
  unit: string;
  delay: number;
  highlighted?: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className={`rounded-xl p-4 sm:p-5 text-center ${
        highlighted
          ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
          : "bg-primary/5 border border-border/50"
      }`}
    >
      <div
        className={`text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight ${
          highlighted ? "" : "text-foreground"
        }`}
      >
        {value}
      </div>
      <div
        className={`text-xs sm:text-sm font-bold mt-0.5 ${
          highlighted ? "text-primary-foreground/80" : "text-primary"
        }`}
      >
        {unit}
      </div>
      <div
        className={`text-[10px] sm:text-xs font-semibold mt-1.5 ${
          highlighted ? "text-primary-foreground/70" : "text-muted-foreground"
        }`}
      >
        {label}
      </div>
    </motion.div>
  );
}
