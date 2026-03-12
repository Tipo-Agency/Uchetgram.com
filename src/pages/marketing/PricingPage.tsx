import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { CheckCircle2, CreditCard, ArrowRight } from 'lucide-react';

const plans = [
  { name: 'Старт', price: '0', priceNote: 'навсегда', desc: 'Для частных мастеров и самозанятых', features: ['До 50 клиентов', 'Базовая аналитика', 'Онлайн-запись', 'Бот в Telegram'], ctaKey: 'landing.pricing.cta_free', popular: false },
  { name: 'Бизнес', price: '29', priceNote: '/мес', desc: 'Для студий и салонов', features: ['Безлимит клиентов', 'Складской учёт', 'Расчёт зарплат', 'Уведомления SMS и TG', 'Аналитика и отчёты'], ctaKey: 'landing.pricing.cta_trial', popular: true },
  { name: 'Pro', price: '79', priceNote: '/мес', desc: 'Для сетей и крупных центров', features: ['Всё из Бизнеса', 'Сетевой интерфейс', 'Персональный менеджер', 'API и интеграции'], ctaKey: 'landing.pricing.cta_contact', popular: false },
];

const faqs = [
  { q: 'Можно ли поменять тариф позже?', a: 'Да. Вы можете в любой момент перейти на другой план. Разница пересчитается пропорционально.' },
  { q: 'Что входит в 14 дней бесплатно?', a: 'Полный доступ к выбранному тарифу. Без привязки карты. Подключите Telegram и протестируйте все функции.' },
  { q: 'Есть ли ограничения по сотрудникам?', a: 'На Старте — до 2 сотрудников. На Бизнес и Pro — безлимит пользователей в рамках тарифа.' },
];

export const PricingPage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-8 bg-white rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <CreditCard className="w-4 h-4" />
            <span>Прозрачные тарифы</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-ink mb-6">
            {t('landing.pricing.title')}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto">
            {t('landing.pricing.subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-slate-50 rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden mx-6 md:mx-8 mb-12">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-3xl border-2 p-8 flex flex-col bg-white ${
                  plan.popular ? 'border-primary shadow-2xl shadow-primary/10 scale-[1.02] z-10' : 'border-slate-200 hover:border-primary/40'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
                    {t('landing.pricing.popular')}
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-2xl font-display font-bold text-ink">{plan.name}</h3>
                  <p className="text-sm text-ink-muted mt-1">{plan.desc}</p>
                </div>
                <div className="flex items-baseline gap-1 mb-8">
                  <span className="text-5xl font-display font-bold text-ink">${plan.price}</span>
                  <span className="text-ink-muted font-medium">{plan.priceNote}</span>
                </div>
                <ul className="space-y-4 flex-grow mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm font-medium text-ink">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full h-12 rounded-xl font-semibold"
                  onClick={() => navigate('/app')}
                >
                  {t(plan.ctaKey)}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white rounded-[32px] mx-6 md:mx-8 mb-12 px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-ink mb-10 text-center">Частые вопросы</h2>
          <div className="space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div key={faq.q} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
                <p className="font-display font-bold text-ink mb-2">{faq.q}</p>
                <p className="text-sm text-ink-muted leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[32px] mx-6 md:mx-8 mb-12">
        <div className="max-w-4xl mx-auto px-8 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Начните бесплатно</h2>
          <p className="text-lg text-white/70 mb-10">14 дней — без карты. Отмена в один клик.</p>
          <Button variant="primary" size="lg" className="rounded-xl bg-white text-primary hover:bg-slate-100 border-0" onClick={() => navigate('/app')}>
            Попробовать бесплатно
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </>
  );
};
