import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketingPageTemplate } from './MarketingPageTemplate';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Users, Globe } from 'lucide-react';

export const InvestorsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MarketingPageTemplate
      title="Инвесторам"
      subtitle="Метрики, видение и контакты для партнёрства и инвестиций."
      badge="IR"
      onEnterApp={() => navigate('/app')}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-12"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Users, label: 'Компаний', value: '500+' },
            { icon: BarChart3, label: 'Записей в месяц', value: '50K+' },
            { icon: TrendingUp, label: 'Рост MRR', value: 'YoY' },
            { icon: Globe, label: 'География', value: 'СНГ' },
          ].map((item) => (
            <div key={item.label} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center">
              <item.icon className="w-8 h-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-display font-bold text-ink">{item.value}</p>
              <p className="text-xs text-ink-muted">{item.label}</p>
            </div>
          ))}
        </div>
        <div className="prose prose-slate max-w-none space-y-4">
          <h3 className="text-xl font-display font-bold text-ink">Почему Uchetgram</h3>
          <p className="text-ink-muted">
            Мы фокусируемся на рынке учёта и записи для сферы услуг с акцентом на интеграцию с Telegram. Это снижает порог входа для клиентов и повышает retention за счёт привычного канала коммуникации.
          </p>
          <p className="text-ink-muted">
            Для запроса презентации и финансовой информации свяжитесь с нами: <a href="mailto:ir@uchetgram.com" className="text-primary font-semibold hover:underline">ir@uchetgram.com</a>.
          </p>
        </div>
      </motion.section>
    </MarketingPageTemplate>
  );
};
