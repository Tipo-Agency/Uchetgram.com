import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketingPageTemplate } from './MarketingPageTemplate';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

export const StatusPage: React.FC = () => {
  const navigate = useNavigate();

  const services = [
    { name: 'Веб-приложение', status: 'operational' },
    { name: 'API', status: 'operational' },
    { name: 'Telegram-бот', status: 'operational' },
    { name: 'Платежи', status: 'operational' },
  ];

  return (
    <MarketingPageTemplate
      title="Статус сервиса"
      subtitle="Текущее состояние сервисов Uchetgram. Обновляется в реальном времени."
      badge="Status"
      onEnterApp={() => navigate('/app')}
      showCtaBlock={false}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-4"
      >
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
          {services.map((s) => (
            <div key={s.name} className="flex items-center justify-between p-4 border-b border-slate-100 last:border-0 bg-white">
              <span className="font-medium text-ink">{s.name}</span>
              <span className="inline-flex items-center gap-2 text-emerald-600 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" /> Работает
              </span>
            </div>
          ))}
        </div>
        <p className="text-sm text-ink-muted">
          При сбоях мы публикуем информацию здесь и в канале <a href="https://t.me/uchetgram_status" className="text-primary hover:underline">@uchetgram_status</a>.
        </p>
      </motion.section>
    </MarketingPageTemplate>
  );
};
