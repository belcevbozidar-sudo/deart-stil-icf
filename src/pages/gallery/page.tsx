import { useState, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Navbar from "../_components/Navbar.tsx";
import BrandLogo from "@/components/BrandLogo.tsx";
import Footer from "../_components/Footer.tsx";

const GALLERY_IMAGES = [
  "/assets/file_75EcGnlf8pY3Asw2s1s2nElf.jpg",
  "/assets/file_leUBM5YsD9m9k4Mh0nOaktQ7.jpg",
  "/assets/file_TPH3fCTgvtE26MWKx7zMla7r.jpg",
  "/assets/file_BvZXL0j0q4rSr1fm3LBIyMEn.jpg",
  "/assets/file_FeRqTuKmnEjaeUh4jXbE90LL.jpg",
  "/assets/file_CV3l05pRCVV6EE7W34K3eDsm.jpg",
  "/assets/file_8d4f9FHwRlADzbZ4111PhSia.jpg",
  "/assets/file_LA6sYl34AoAzIzc9FvvzVa0K.jpg",
  "/assets/file_Y5Ihknw3301WtKDPF0fQd7fd.jpg",
  "/assets/file_09caexPiqbhAtrtsmqb6z0ZK.jpg",
  "/assets/file_FSuvRGIO6DK2St3cZxsM2kr1.jpg",
  "/assets/file_UsFtR9blBjzY52xyzBm2cddj.jpg",
  "/assets/file_x8m7cYnJM0HkRHiISN72lcLv.jpg",
  "/assets/file_jjy6UQoAYfWkNbcjIMPJOGCF.jpg",
  "/assets/file_CI4KOCY9M3aFLgVA5K0ok1fu.jpg",
  "/assets/file_XamM2ZnYTRCkIOVBNug13Xh0.jpg",
  "/assets/file_m9qUYjIwvtz1EzsXCpUwOnja.jpg",
  "/assets/file_13HnKlShswr1BzS895UW3N8y.jpg",
  "/assets/file_WZscqRUFO12wnlsmAnCqFPfZ.jpg",
  "/assets/file_i2dcWofBdtB8VJ9R8CaPP50r.jpg",
  "/assets/file_GhyjxoKAN2kTBfDu2MAAWutv.jpg",
  "/assets/file_LZvfGBAxeIxMdcIDlWypwUTK.jpg",
  "/assets/file_WfEiEZjuiU7El8Dc2cRBT6CW.jpg",
  "/assets/file_bYL1Ol539llUlfyhVjXc6A3u.jpg",
  "/assets/file_q5LWm2A1WLUH149gqQWvi75f.jpg",
  "/assets/file_ZRcTLwbSg5OHDW9CkZyBao0i.jpg",
];

export default function Gallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { t } = useTranslation("common");
  const { lng } = useParams<{ lng: string }>();

  const GALLERY_ALT = t("alt.isolinvest");

  const openLightbox = useCallback((index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  }, []);

  const goNext = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % GALLERY_IMAGES.length : null
    );
  }, []);

  const goPrev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null
        ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
        : null
    );
  }, []);

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, oklch(0.95 0.04 250) 0%, oklch(0.98 0.008 250) 20%, oklch(0.99 0.003 250) 45%, oklch(0.98 0.01 60) 75%, oklch(0.96 0.03 55) 100%)",
        }}
      />
      <div
        className="fixed bottom-0 right-0 -z-10 pointer-events-none"
        style={{
          width: "min(900px, 70vw)",
          height: "min(900px, 70vh)",
          background:
            "radial-gradient(ellipse at 100% 100%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 15%, rgba(255,255,255,0.35) 35%, rgba(255,255,255,0.08) 60%, transparent 80%)",
        }}
      />

      <Navbar />

      {/* Hero header */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              to={`/${lng}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="size-4" />
              {t("gallery.backToHome")}
            </Link>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-4 text-balance"
          >
            {t("gallery.ourGallery")} <span className="text-primary">{t("gallery.galleryHighlight")}</span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-4 mt-4"
          >
            <h2>
              <BrandLogo size="md" />
            </h2>
            <span className="text-muted-foreground text-sm font-medium">|</span>
            <img
              src="/assets/file_M84peypc8LnD2v2DJou3hD0S.png"
              alt={GALLERY_ALT}
              className="h-7 sm:h-9 w-auto object-contain"
            />
          </motion.div>
        </div>
      </section>

      {/* Gallery grid */}
      <section className="pb-20 sm:pb-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            layout
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {GALLERY_IMAGES.map((src, index) => (
                <motion.div
                  key={src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: index * 0.04 }}
                  className="mb-4 break-inside-avoid"
                >
                  <button
                    onClick={() => openLightbox(index)}
                    className="group relative w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <img
                      src={src}
                      alt=""
                      loading="lazy"
                      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Image count */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-sm text-muted-foreground mt-10"
          >
            {t("gallery.photoCount", { count: GALLERY_IMAGES.length })}
          </motion.p>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] bg-foreground/95 backdrop-blur-sm flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="size-6" />
            </button>

            {/* Previous */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              className="absolute left-3 sm:left-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="size-6" />
            </button>

            {/* Next */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              className="absolute right-3 sm:right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="size-6" />
            </button>

            {/* Image */}
            <motion.img
              key={GALLERY_IMAGES[selectedIndex]}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              src={GALLERY_IMAGES[selectedIndex]}
              alt=""
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 text-white text-sm font-semibold">
              {selectedIndex + 1} / {GALLERY_IMAGES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
