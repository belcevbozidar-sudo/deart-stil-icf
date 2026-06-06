import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Phone, Mail, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import LocaleSwitcher from "@/components/locale-switcher.tsx";

const DEART_LOGO = "/assets/file_g4PlvsMgC5S789RfE6QWfIZW.png";

const NAV_LINKS = [
  { key: "nav.home", href: "#hero" },
  { key: "nav.products", href: "#products" },
  { key: "nav.calculator", href: "#calculator" },
  { key: "nav.manufacturing", href: "#manufacturing" },
  { key: "nav.gallery", href: "gallery" },
  { key: "nav.contacts", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lng } = useParams<{ lng: string }>();
  const { t } = useTranslation("common");

  const isHome =
    location.pathname === `/${lng}` || location.pathname === `/${lng}/`;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Gallery page — navigate to locale-prefixed path
    if (href === "gallery") {
      navigate(`/${lng}/gallery`);
      return;
    }
    // Anchor links
    const scrollToSection = () => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };
    if (isHome) {
      setTimeout(scrollToSection, 300);
    } else {
      navigate(`/${lng}`);
      // After navigating home, wait for the page to render then scroll
      setTimeout(scrollToSection, 600);
    }
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-lg shadow-primary/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavClick("#hero")}
            className="flex items-center gap-3 sm:gap-4 group"
          >
            <img
              src={DEART_LOGO}
              alt={t("alt.deartStilM")}
              className="h-11 sm:h-14 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </button>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.key}
                onClick={() => handleNavClick(link.href)}
                className="px-4 py-2 text-sm font-semibold text-foreground/70 hover:text-foreground transition-colors rounded-lg hover:bg-primary/5"
              >
                {t(link.key)}
              </button>
            ))}
          </div>

          {/* Desktop: locale switcher + CTA */}
          <div className="hidden md:flex items-center gap-3">
            <LocaleSwitcher />
            <a
              href="tel:+359879997883"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all hover:scale-[1.02]"
            >
              <Phone className="size-4" />
              {t("nav.call")}
            </a>
            <a
              href="mailto:deartstil.m@gmail.com"
              className="inline-flex items-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-accent-foreground shadow-lg shadow-accent/25 hover:shadow-accent/40 transition-all hover:scale-[1.02]"
            >
              <Mail className="size-4" />
              {t("nav.email")}
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-primary/5 text-foreground"
          >
            {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-t border-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Mobile logo */}
              <div className="flex items-center gap-3 pb-3 mb-2 border-b border-border">
                <img src={DEART_LOGO} alt={t("alt.deartStilM")} className="h-10 w-auto object-contain" />
              </div>

              {/* Mobile locale switcher */}
              <div className="flex justify-center py-2 border-b border-border mb-2">
                <LocaleSwitcher />
              </div>

              {NAV_LINKS.map((link) => (
                <button
                  key={link.key}
                  onClick={() => handleNavClick(link.href)}
                  className="block w-full text-left px-4 py-3 rounded-lg text-sm font-semibold text-foreground/80 hover:bg-primary/5 hover:text-foreground transition-colors"
                >
                  {t(link.key)}
                </button>
              ))}
              <div className="flex gap-2 pt-3 border-t border-border">
                <a
                  href="tel:+359879997883"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground"
                >
                  <Phone className="size-4" />
                  {t("nav.call")}
                </a>
                <a
                  href="mailto:deartstil.m@gmail.com"
                  className="flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-bold text-accent-foreground"
                >
                  <Mail className="size-4" />
                  {t("nav.email")}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
