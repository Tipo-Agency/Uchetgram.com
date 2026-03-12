import React from 'react';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { ArrowRight } from 'lucide-react';

type Props = {
  title: string;
  subtitle?: string;
  badge?: string;
  children: React.ReactNode;
  onEnterApp: () => void;
  showCtaBlock?: boolean;
};

/**
 * Шаблон маркетинговой страницы: hero (заголовок + подзаголовок) + контент + опциональный CTA-блок.
 * CTA-секция внизу страницы рендерит MarketingLayout, здесь только блок внутри страницы.
 */
export const MarketingPageTemplate: React.FC<Props> = ({
  title,
  subtitle,
  badge,
  children,
  onEnterApp,
  showCtaBlock = true,
}) => (
  <>
    <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-8 bg-white rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
      <div className="max-w-4xl mx-auto text-center">
        {badge && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold uppercase tracking-widest text-primary mb-4"
          >
            {badge}
          </motion.p>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-ink mb-6"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>

    <div className="max-w-4xl mx-auto px-6 md:px-8 pb-16">{children}</div>

    {showCtaBlock && (
      <section className="py-16 md:py-24 bg-slate-50 rounded-[32px] md:rounded-[40px] mx-6 md:mx-8 mb-12">
        <div className="max-w-2xl mx-auto text-center px-6">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-ink mb-4">Готовы начать?</h2>
          <p className="text-ink-muted mb-8">14 дней бесплатно. Без привязки карты.</p>
          <Button variant="primary" className="rounded-xl px-8 h-12" onClick={onEnterApp}>
            Попробовать бесплатно
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>
    )}
  </>
);
