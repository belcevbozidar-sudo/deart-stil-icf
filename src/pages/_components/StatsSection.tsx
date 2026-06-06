import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { Thermometer, Shield, Timer, TrendingDown } from "lucide-react";

export default function StatsSection() {
  const { t } = useTranslation("home");

  const STATS = [
    {
      icon: Thermometer,
      value: "0.032",
      unit: "W/mK",
      label: t("stats.thermalConductivity"),
    },
    {
      icon: Shield,
      value: "150+",
      unit: "kPa",
      label: t("stats.compressiveStrength"),
    },
    {
      icon: Timer,
      value: "50+",
      unit: t("stats.years"),
      label: t("stats.durability"),
    },
    {
      icon: TrendingDown,
      value: `${t("stats.upTo")} 85%`,
      unit: "",
      label: t("stats.heatLossReduction"),
    },
  ];

  return (
    <section className="relative py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              <div className="rounded-2xl bg-background/60 backdrop-blur-lg border border-border/60 p-5 sm:p-6 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3 sm:mb-4">
                  <div className="flex size-10 sm:size-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <stat.icon className="size-5 sm:size-6" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
                    {stat.value}
                  </span>
                  {stat.unit && (
                    <span className="text-sm sm:text-base font-bold text-primary">
                      {stat.unit}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-xs sm:text-sm font-medium text-muted-foreground leading-snug">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
