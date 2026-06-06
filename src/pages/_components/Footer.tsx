import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/BrandLogo.tsx";

const ISOLINVEST_LOGO = "/assets/file_M84peypc8LnD2v2DJou3hD0S.png";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useTranslation("common");

  return (
    <footer id="contact" className="relative pt-16 sm:pt-20 pb-8">
      {/* Top divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Contact CTA */}
        <div className="text-center mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-5 text-balance">
            {t("footer.readyToBuild")} <span className="text-primary">{t("footer.build")}</span>?
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            {t("footer.description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+359879997812"
              className="inline-flex items-center gap-2.5 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5"
            >
              <Phone className="size-5" />
              +359 87 999 7812
            </a>
            <a
              href="mailto:deartstil.m@gmail.com"
              className="inline-flex items-center gap-2.5 rounded-xl bg-accent px-8 py-4 text-base font-bold text-accent-foreground shadow-xl shadow-accent/30 hover:shadow-accent/50 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-0.5"
            >
              <Mail className="size-5" />
              deartstil.m@gmail.com
            </a>
          </div>
        </div>

        {/* Info grid */}
        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-14">
          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <MapPin className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground mb-1">{t("footer.address")}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("footer.addressLine1")}
                <br />
                {t("footer.addressLine2")}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Phone className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground mb-1">
                {t("footer.phone")}
              </h4>
              <a
                href="tel:+359879997812"
                className="text-sm text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                +359 87 999 7812
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Clock className="size-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-foreground mb-1">
                {t("footer.workingHours")}
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {t("footer.weekdays")}
                <br />
                {t("footer.weekend")}
              </p>
            </div>
          </div>
        </div>

        {/* Partner logos */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 mb-10">
          <div className="flex flex-col items-center gap-2">
            <h3>
              <BrandLogo size="lg" />
            </h3>
            <span className="text-[10px] sm:text-xs font-bold text-primary tracking-wider uppercase">
              {t("footer.officialRepresentative")}
            </span>
            <a
              href="tel:+359879997812"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              <Phone className="size-3" />
              0879 99 78 12
            </a>
          </div>
          <div className="hidden sm:block w-px h-16 bg-border" />
          <div className="flex flex-col items-center gap-2">
            <img
              src={ISOLINVEST_LOGO}
              alt={t("alt.isolinvest")}
              className="h-8 sm:h-10 w-auto object-contain"
            />
            <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground tracking-wider uppercase">
              {t("footer.manufacturer")}
            </span>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border/60 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" />
          </div>
          <p className="text-xs text-muted-foreground">
            {"© "}{currentYear} {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  );
}
