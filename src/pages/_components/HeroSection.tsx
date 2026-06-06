import { Phone, Mail, ArrowDown } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/BrandLogo.tsx";

const HERO_IMAGE = "/assets/file_GxGRYo6stDsN2ge4AKAzygO9.png";

const ISOLINVEST_LOGO = "/assets/file_M84peypc8LnD2v2DJou3hD0S.png";

export default function HeroSection() {
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");

  const scrollToProducts = () => {
    const el = document.querySelector("#products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden pt-24 pb-12 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20"
    >
      {/* Decorative geometric shapes - hidden on small screens to prevent overflow */}
      <div className="absolute top-20 right-0 hidden sm:block w-72 lg:w-96 h-72 lg:h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 hidden sm:block w-64 lg:w-80 h-64 lg:h-80 bg-accent/8 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          {/* Left: Text content */}
          <div className="space-y-5 sm:space-y-7">
            {/* Деарт Стил М - prominent text name */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              <h2>
                <BrandLogo size="hero" />
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-primary/10 px-2.5 sm:px-3 py-1.5 text-[10px] sm:text-sm font-bold text-primary tracking-wider uppercase">
                <span className="size-1.5 sm:size-2 rounded-full bg-primary animate-pulse shrink-0" />
                <span className="whitespace-nowrap">{t("hero.representativeOf")}</span>
                <img src={ISOLINVEST_LOGO} alt={tc("alt.isolinvest")} className="h-4 sm:h-6 w-auto object-contain shrink-0" />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight leading-[1.08]"
            >
              {t("hero.titleLine1")}{" "}
              <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                {t("hero.titleHighlight1")}
                <br />
                {t("hero.titleHighlight2")}
              </span>{" "}
              {t("hero.titleLine2")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-sm sm:text-base lg:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="tel:+359879997883"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5"
              >
                <Phone className="size-4 sm:size-5" />
                {t("hero.callNow")}
              </a>
              <a
                href="mailto:deartstil.m@gmail.com"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-bold text-accent-foreground shadow-xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5"
              >
                <Mail className="size-4 sm:size-5" />
                {t("hero.writeUs")}
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 1 }}
              className="flex flex-wrap items-center gap-4 sm:gap-6 pt-2 sm:pt-4 text-xs sm:text-sm text-muted-foreground"
            >
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500" />
                <span className="font-medium">{t("hero.certifiedProduction")}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500" />
                <span className="font-medium">БДС EN 14933</span>
              </div>
            </motion.div>
          </div>

          {/* Right: Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="relative lg:mt-4"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/15">
              <img
                src={HERO_IMAGE}
                alt={t("hero.altConstruction")}
                className="w-full h-auto aspect-[16/10] object-cover"
              />
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent" />
            </div>

            {/* Floating accent card - kept inside bounds on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
              className="absolute bottom-3 left-3 sm:-bottom-5 sm:-left-5 bg-background/95 backdrop-blur-md rounded-xl p-3 sm:p-4 shadow-xl border border-border"
            >
              <div className="text-xl sm:text-3xl font-black text-primary">
                85%
              </div>
              <div className="text-[10px] sm:text-sm font-semibold text-muted-foreground">
                {t("hero.lowerHeatLoss")}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="hidden lg:flex justify-center mt-12"
        >
          <button
            onClick={scrollToProducts}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors group"
          >
            <span className="text-xs font-medium tracking-wider uppercase">
              {t("hero.learnMore")}
            </span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="size-5 group-hover:text-primary transition-colors" />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
