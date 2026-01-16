import '@/i18n';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Settings, Video, Sprout, MapPin, Cloud, Box, Wind, Zap, Film } from 'lucide-react';
import { ServiceCard } from '@/components/custom/ServiceCard';
import { FeatureInfoCard } from '@/components/custom/FeatureInfoCard';
import { StatsCard } from '@/components/custom/StatsCard';

export default function LandingPage() {
  const { t } = useTranslation();

  const services = [
    {
      icon: Settings,
      title: t('services.industrial.title'),
      description: t('services.industrial.description'),
      linkText: t('services.industrial.cta'),
      linkHref: '#industrial'
    },
    {
      icon: Video,
      title: t('services.video.title'),
      description: t('services.video.description'),
      linkText: t('services.video.cta'),
      linkHref: '#video'
    },
    {
      icon: Sprout,
      title: t('services.agriculture.title'),
      description: t('services.agriculture.description'),
      linkText: t('services.agriculture.cta'),
      linkHref: '#agriculture'
    },
  ];

  const featureInfos = [
    {
      icon: MapPin,
      title: t('features.precision.title'),
      description: t('features.precision.description')
    },
    {
      icon: Cloud,
      title: t('features.data.title'),
      description: t('features.data.description')
    },
    {
      icon: Box,
      title: t('features.3dmodels.title'),
      description: t('features.3dmodels.description')
    },
  ];

  const fpvFeatureInfos = [
    {
      icon: Zap,
      title: t('fpvFeatures.dynamic.title'),
      description: t('fpvFeatures.dynamic.description')
    },
    {
      icon: Wind,
      title: t('fpvFeatures.immersive.title'),
      description: t('fpvFeatures.immersive.description')
    },
    {
      icon: Film,
      title: t('fpvFeatures.cinematic.title'),
      description: t('fpvFeatures.cinematic.description')
    },
  ];

  return (
    <main>
      {/* HeroSection */}
      <section className="relative px-6 py-12 lg:px-10 lg:py-20 bg-white dark:bg-background-dark">
        <div className="max-w-[1280px] mx-auto">
          <div className="relative overflow-hidden rounded-xl bg-slate-900 min-h-[600px] flex items-end">
            <div className="absolute inset-0 bg-cover bg-center bg-gradient-to-t from-slate-900/80 to-slate-900/20" />
            <div className="relative z-10 p-10 lg:p-20 max-w-3xl">
              <h1 className="text-white text-5xl lg:text-7xl font-black leading-[1.1] tracking-tighter mb-6">
                {t('hero.title')}
              </h1>
              <p className="text-white/80 text-lg lg:text-xl font-normal mb-10 max-w-xl">
                {t('hero.subtitle')}
              </p>
              <a
                href="#contact"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-base font-bold transition-all shadow-lg inline-flex items-center gap-2"
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SectionHeader: Servizi */}
      <section className="bg-white dark:bg-background-dark py-12">
        <div className="max-w-[1280px] mx-auto px-10 border-t border-slate-100 dark:border-slate-800 pt-16 text-center">
          <span className="text-primary font-bold text-sm uppercase tracking-widest mb-4 block">
            {t('sectionHeaders.services.label')}
          </span>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
            {t('sectionHeaders.services.title')}
          </h2>
        </div>
      </section>

      {/* FeatureSection: Soft Grey Variant */}
      <section className="bg-soft-grey dark:bg-slate-900/50 py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-8">
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                  {t('feature.title')}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  {t('feature.description')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featureInfos.map((feature, index) => (
                  <FeatureInfoCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
              <a
                href="#photogrammetry"
                className="bg-primary hover:bg-primary/90 text-white w-fit px-8 py-3 rounded-lg text-sm font-bold transition-all shadow-md"
              >
                {t('feature.cta')}
              </a>
            </div>
            <div className="relative">
              <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 shadow-2xl border-8 border-white dark:border-slate-800" />
              <StatsCard value={t('feature.stats.value')} label={t('feature.stats.label')} />
            </div>
          </div>
        </div>
      </section>

      {/* FeatureSection: FPV (White Variant, Flipped) */}
      <section className="bg-white dark:bg-background-dark py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text Column (Right on Desktop) */}
            <div className="flex flex-col gap-8 lg:order-2">
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-4 text-slate-900 dark:text-white">
                  {t('fpvFeature.title')}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                  {t('fpvFeature.description')}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {fpvFeatureInfos.map((feature, index) => (
                  <FeatureInfoCard
                    key={index}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                  />
                ))}
              </div>
              <a
                href="#fpv"
                className="bg-primary hover:bg-primary/90 text-white w-fit px-8 py-3 rounded-lg text-sm font-bold transition-all shadow-md"
              >
                {t('fpvFeature.cta')}
              </a>
            </div>

            {/* Image Column (Left on Desktop) */}
            <div className="relative lg:order-1">
              <div className="w-full aspect-[4/3] rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 shadow-2xl border-8 border-slate-50 dark:border-slate-800" />
              <StatsCard value={t('fpvFeature.stats.value')} label={t('fpvFeature.stats.label')} />
            </div>
          </div>
        </div>
      </section>

      {/* TextGrid: Other Services */}
      <section className="bg-soft-grey dark:bg-slate-900/50 py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                linkText={service.linkText}
                linkHref={service.linkHref}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="bg-white dark:bg-background-dark py-20 px-6 lg:px-10">
        <div className="max-w-[960px] mx-auto text-center bg-white dark:bg-slate-900 p-12 rounded-3xl shadow-sm border border-slate-100 dark:border-slate-800">
          <h2 className="text-3xl lg:text-4xl font-black mb-6 text-slate-900 dark:text-white">
            {t('cta.title')}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="bg-primary text-white px-10 py-4 rounded-lg font-bold shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {t('cta.primary')}
            </a>
            <a
              href="tel:+1234567890"
              className="bg-white border-2 border-slate-200 text-slate-800 px-10 py-4 rounded-lg font-bold hover:bg-slate-50 transition-all dark:bg-transparent dark:text-white dark:border-slate-700"
            >
              {t('cta.secondary')}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
