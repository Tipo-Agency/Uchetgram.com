import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketingPageTemplate } from './MarketingPageTemplate';
import { motion } from 'motion/react';
import { CheckCircle2, Users, Target, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MarketingPageTemplate
      title="О компании"
      subtitle="Мы делаем учёт и коммуникацию с клиентами простыми — через Telegram и единую платформу."
      badge="Uchetgram"
      onEnterApp={() => navigate('/app')}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-12"
      >
        <div className="prose prose-slate max-w-none">
          <p className="text-ink-muted leading-relaxed">
            Uchetgram — это платформа для учёта, записи клиентов и управления бизнесом в сфере услуг. Наше ключевое отличие — тесная интеграция с Telegram: сотрудники работают в боте, клиенты пишут в мессенджере, заявки сразу попадают в CRM.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[
            { icon: Target, title: 'Миссия', text: 'Упростить учёт и коммуникацию для малого и среднего бизнеса.' },
            { icon: Zap, title: 'Подход', text: 'Запуск за 5 минут, без сложных внедрений и лишних приложений.' },
            { icon: Users, title: 'Команда', text: 'Опыт в продукте, разработке и сервисном бизнесе.' },
            { icon: CheckCircle2, title: 'Фокус', text: 'Отрасли услуг: красота, медицина, спорт, образование, авто.' },
          ].map((item, i) => (
            <div key={item.title} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80">
              <item.icon className="w-8 h-8 text-primary mb-3" />
              <h3 className="font-display font-bold text-ink mb-2">{item.title}</h3>
              <p className="text-sm text-ink-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </motion.section>
    </MarketingPageTemplate>
  );
};
