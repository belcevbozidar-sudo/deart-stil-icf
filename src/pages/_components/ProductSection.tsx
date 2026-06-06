import { motion } from "motion/react";
import {
  Layers,
  Flame,
  Droplets,
  Volume2,
  Ruler,
  CheckCircle2,
} from "lucide-react";
import BrandLogo from "@/components/BrandLogo.tsx";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";

const PRODUCT_IMAGE_SRCS = [
  "/assets/file_75EcGnlf8pY3Asw2s1s2nElf.jpg",
  "/assets/file_leUBM5YsD9m9k4Mh0nOaktQ7.jpg",
  "/assets/file_TPH3fCTgvtE26MWKx7zMla7r.jpg",
];
const HOUSE_IMAGE =
  "/assets/file_IhAa21zMo3vtBO06ffgTZY3G.png";

export default function ProductSection() {
  const { t } = useTranslation("home");
  const { t: tc } = useTranslation("common");
  const { lng } = useParams<{ lng: string }>();

  const PRODUCT_IMAGES = [
    { src: PRODUCT_IMAGE_SRCS[0], alt: t("products.altProduct1") },
    { src: PRODUCT_IMAGE_SRCS[1], alt: t("products.altProduct2") },
    { src: PRODUCT_IMAGE_SRCS[2], alt: t("products.altProduct3") },
  ];

  const FEATURES = [
    {
      icon: Layers,
      title: t("products.feature.thermal.title"),
      description: t("products.feature.thermal.description"),
    },
    {
      icon: Flame,
      title: t("products.feature.fire.title"),
      description: t("products.feature.fire.description"),
    },
    {
      icon: Droplets,
      title: t("products.feature.moisture.title"),
      description: t("products.feature.moisture.description"),
    },
    {
      icon: Volume2,
      title: t("products.feature.sound.title"),
      description: t("products.feature.sound.description"),
    },
    {
      icon: Ruler,
      title: t("products.feature.precision.title"),
      description: t("products.feature.precision.description"),
    },
    {
      icon: CheckCircle2,
      title: t("products.feature.certification.title"),
      description: t("products.feature.certification.description"),
    },
  ];

  const SPECS = [
    { label: t("products.spec.blockLength"), value: `1200 ${tc("unit.mm")}` },
    { label: t("products.spec.blockHeight"), value: `400 ${tc("unit.mm")}` },
    { label: t("products.spec.wallWidth"), value: `250 ${tc("unit.mm")}` },
    { label: t("products.spec.concreteCore"), value: `150 ${tc("unit.mm")}` },
    { label: t("products.spec.epsOuter"), value: `50 ${tc("unit.mm")}` },
    { label: t("products.spec.epsInner"), value: `50 ${tc("unit.mm")}` },
    { label: t("products.spec.epsDensity"), value: `27 ${t("products.specUnit.kgm3")}` },
    { label: t("products.spec.thermalConductivity"), value: "0.032 W/mK" },
  ];

  return (
    <section id="products" className="relative py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 lg:mb-20"
        >
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-accent mb-4">
            {t("products.sectionLabel")}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6 text-balance">
            {t("products.titlePre")}{" "}
            <span className="text-primary">{t("products.titleHighlight")}</span> {t("products.titlePost")}
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
            {t("products.description")}
          </p>
        </motion.div>

        {/* Product images grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16 lg:mb-20">
          {PRODUCT_IMAGES.map((image, index) => (
            <motion.div
              key={image.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.12 }}
              className="relative group"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl shadow-primary/10 bg-white">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full aspect-square object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            </motion.div>
          ))}
          {/* Floating spec badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-3 flex justify-center"
          >
            <div className="inline-flex items-center gap-3 bg-accent text-accent-foreground rounded-xl px-5 py-3 shadow-xl">
              <div className="text-lg sm:text-xl font-black">
                {"λ = 0.032"}
              </div>
              <div className="text-xs sm:text-sm font-semibold opacity-90">
                W/mK
              </div>
            </div>
          </motion.div>
        </div>

        {/* Product showcase: specs */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center mb-16 sm:mb-20 lg:mb-28">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black mb-5 sm:mb-8">
              {t("products.techSpecs")}
            </h3>
            <div className="space-y-2 sm:space-y-3">
              {SPECS.map((spec, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between gap-3 rounded-xl bg-background/50 backdrop-blur border border-border/50 px-3 sm:px-5 py-2.5 sm:py-3.5 hover:border-primary/20 transition-colors"
                >
                  <span className="text-xs sm:text-sm font-semibold text-muted-foreground shrink-0">
                    {spec.label}
                  </span>
                  <span className="text-xs sm:text-base font-bold text-foreground text-right">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="relative rounded-2xl overflow-hidden shadow-xl shadow-primary/10 bg-white"
          >
            <img
              src={PRODUCT_IMAGES[2].src}
              alt={PRODUCT_IMAGES[2].alt}
              className="w-full aspect-[4/3] object-contain p-6"
            />
          </motion.div>
        </div>

        {/* Feature grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="group"
            >
              <div className="rounded-2xl bg-background/50 backdrop-blur border border-border/50 p-5 sm:p-7 h-full hover:border-primary/25 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300">
                <div className="flex size-11 sm:size-14 items-center justify-center rounded-xl bg-primary/8 text-primary mb-4 sm:mb-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <feature.icon className="size-5 sm:size-7" />
                </div>
                <h4 className="text-sm sm:text-lg font-bold mb-2 sm:mb-2.5 text-foreground">
                  {feature.title}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Shuffled/Selected project showcase section */}
        <div className="mt-16 sm:mt-20 lg:mt-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12"
          >
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-foreground mb-3 sm:mb-4">
              {t("products.galleryTitle")}
            </h3>
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground leading-relaxed">
              {t("products.gallerySubtitle")}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border/40"
            >
              <img
                src="/assets/gallery_new_4.webp"
                alt="House"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border/40"
            >
              <img
                src="/assets/gallery_new_8.webp"
                alt="Warehouse"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg border border-border/40"
            >
              <img
                src="/assets/gallery_new_6.webp"
                alt="Building"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-center mt-8 sm:mt-10"
          >
            <Link
              to={`/${lng}/gallery`}
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-sm font-bold text-primary-foreground shadow-xl shadow-primary/20 hover:shadow-primary/35 transition-all hover:scale-[1.03]"
            >
              {t("products.viewGallery")}
            </Link>
          </motion.div>
        </div>

        {/* Energy-efficient house showcase - responsive layout */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="mt-16 sm:mt-20 lg:mt-28 rounded-2xl overflow-hidden"
        >
          {/* Desktop/tablet: text overlaid on image */}
          <div className="hidden sm:block relative">
            <img
              src={HOUSE_IMAGE}
              alt={t("products.altEnergyHouse")}
              className="w-full aspect-[21/9] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/30 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 md:px-12 lg:px-16">
              <div className="max-w-lg">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 sm:mb-4">
                  {t("products.buildingTitle")}
                </h3>
                <div className="flex items-center gap-4 mb-4">
                  <BrandLogo size="md" variant="dark" />
                  <span className="text-white/30 text-lg">|</span>
                  <img
                    src="/assets/file_M84peypc8LnD2v2DJou3hD0S.png"
                    alt={tc("alt.isolinvest")}
                    className="h-6 md:h-8 w-auto object-contain"
                  />
                </div>
                <p className="text-sm md:text-base text-white/80 leading-relaxed mb-5 sm:mb-6">
                  {t("products.buildingDescriptionDesktop")}
                </p>
                <a
                  href="tel:+359879997883"
                  className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-accent-foreground shadow-xl hover:scale-[1.03] transition-transform"
                >
                  {t("products.contactUs")}
                </a>
              </div>
            </div>
          </div>

          {/* Mobile: stacked layout - image on top, content below */}
          <div className="sm:hidden">
            <img
              src={HOUSE_IMAGE}
              alt={t("products.altEnergyHouse")}
              className="w-full aspect-[16/9] object-cover"
            />
            <div className="bg-foreground px-5 py-6">
              <h3 className="text-xl font-black text-white mb-2.5">
                {t("products.buildingTitle")}
              </h3>
              <div className="flex items-center gap-3 mb-3">
                <BrandLogo size="md" variant="dark" />
                <span className="text-white/30 text-sm">|</span>
                <img
                  src="/assets/file_M84peypc8LnD2v2DJou3hD0S.png"
                  alt={tc("alt.isolinvest")}
                  className="h-5 w-auto object-contain"
                />
              </div>
              <p className="text-sm text-white/75 leading-relaxed mb-5">
                {t("products.buildingDescriptionMobile")}
              </p>
              <a
                href="tel:+359879997883"
                className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-lg"
              >
                {t("products.contactUs")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
