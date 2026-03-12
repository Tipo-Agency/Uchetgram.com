import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MarketingPageTemplate } from './MarketingPageTemplate';
import { motion } from 'motion/react';
import { BarChart3, Users, Workflow, CreditCard } from 'lucide-react';

export const SolutionsPage: React.FC = () => {
  const navigate = useNavigate();

  const solutions = [
    { icon: BarChart3, title: 'Финансы и аналитика', desc: 'Учёт выручки, расходов, зарплат. Отчёты и дашборды в реальном времени.', to: '/modules/finance' },
    { icon: Users, title: 'CRM и продажи', desc: 'Воронка, лиды, сделки. Заявки из Telegram сразу в CRM.', to: '/modules/crm' },
    { icon: Workflow, title: 'Бизнес-процессы', desc: 'Автоматизация регламентов, согласований и задач.', to: '/modules/processes' },
    { icon: CreditCard, title: 'Платежи и запись', desc: 'Онлайн-оплата, онлайн-запись 24/7, напоминания клиентам.', to: '/modules' },
  ];

  return (
    <MarketingPageTemplate
      title="Решения"
      subtitle="Готовые сценарии под задачи бизнеса: финансы, CRM, процессы, запись и платежи."
      badge="Сценарии"
      onEnterApp={() => navigate('/app')}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {solutions.map((s) => (
            <Link
              key={s.title}
              to={s.to}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all flex gap-4"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <s.icon className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-display font-bold text-ink">{s.title}</h3>
                <p className="text-sm text-ink-muted mt-1">{s.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>
    </MarketingPageTemplate>
  );
};
