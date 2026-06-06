import { motion } from "motion/react";
import { Factory, Cog, FlaskConical, PackageCheck, Truck, Award } from "lucide-react";
import { useTranslation } from "react-i18next";

const FACTORY_IMAGE_SRCS = [
  "/assets/file_BvZXL0j0q4rSr1fm3LBIyMEn.jpg",
  "/assets/file_FeRqTuKmnEjaeUh4jXbE90LL.jpg",
];

export default function ManufacturingSection() {
  const { t } = useTranslation("home");

  const FACTORY_IMAGES = [
    { src: FACTORY_IMAGE_SRCS[0], alt: t("manufacturing.altFactory1") },
    { src: FACTORY_IMAGE_SRCS[1], alt: t("manufacturing.altFactory2") },
  ];

  const PROCESS_STEPS = [
    {
      icon: FlaskConical,
      step: "01",
      title: t("manufacturing.step1.title"),
      description: t("manufacturing.step1.description"),
    },
    {
      icon: Cog,
      step: "02",
      title: t("manufacturing.step2.title"),
      description: t("manufacturing.step2.description"),
    },
    {
      icon: Factory,
      step: "03",
      title: t("manufacturing.step3.title"),
      description: t("manufacturing.step3.description"),
    },
    {
      icon: PackageCheck,
      step: "04",
      title: t("manufacturing.step4.title"),
      description: t("manufacturing.step4.description"),
    },
    {
      icon: Award,
      step: "05",
      title: t("manufacturing.step5.title"),
      description: t("manufacturing.step5.description"),
    },
    {
      icon: Truck,
      step: "06",
      title: t("manufacturing.step6.title"),
      description: t("manufacturing.step6.description"),
    },
  ];

  return (
    <section id="manufacturing" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-accent mb-4">
            {t("manufacturing.sectionLabel")}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-5 sm:mb-6 text-balance">
            {t("manufacturing.titlePre")} <span className="text-primary">{t("manufacturing.titleHighlight")}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t("manufacturing.description")}
          </p>
        </motion.div>

        {/* Factory images */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mb-16 sm:mb-20">
          {FACTORY_IMAGES.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full aspect-[16/10] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 via-transparent to-transparent" />
            </motion.div>
          ))}
          {/* Certifications below images */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-2 flex flex-wrap items-center justify-center gap-3 sm:gap-5 mt-2"
          >
            {["БТО (Българско техническо одобрение)", "БДС EN 14933"].map((cert) => (
              <span
                key={cert}
                className="rounded-full bg-primary/8 backdrop-blur-md px-5 py-2 text-xs sm:text-sm font-bold text-primary border border-primary/15"
              >
                {cert}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Process steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {PROCESS_STEPS.map((step, index) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="relative rounded-2xl bg-background/50 backdrop-blur border border-border/50 p-6 sm:p-7 h-full hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-hidden">
                {/* Step number watermark */}
                <span className="absolute top-3 right-4 text-6xl sm:text-7xl font-black text-primary/5 select-none leading-none">
                  {step.step}
                </span>

                <div className="flex size-12 sm:size-14 items-center justify-center rounded-xl bg-primary/8 text-primary mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <step.icon className="size-6 sm:size-7" />
                </div>

                <div className="flex items-center gap-3 mb-2.5">
                  <span className="text-xs font-bold text-accent tracking-wider uppercase">
                    {t("manufacturing.step")} {step.step}
                  </span>
                </div>

                <h4 className="text-base sm:text-lg font-bold mb-2.5 text-foreground">
                  {step.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
