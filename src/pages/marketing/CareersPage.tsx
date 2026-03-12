import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketingPageTemplate } from './MarketingPageTemplate';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const navigate = useNavigate();

  const vacancies = [
    { title: 'Frontend-разработчик', team: 'Продукт', desc: 'React, TypeScript, участие в развитии маркетинга и приложения.' },
    { title: 'Backend-разработчик', team: 'Продукт', desc: 'Python, FastAPI, PostgreSQL. API и интеграции.' },
    { title: 'Менеджер по работе с клиентами', team: 'Продажи', desc: 'Входящие заявки, онбординг, удержание.' },
  ];

  return (
    <MarketingPageTemplate
      title="Карьера"
      subtitle="Присоединяйтесь к команде Uchetgram. Мы растем и ищем людей, которые хотят менять то, как бизнес ведёт учёт и общается с клиентами."
      badge="Вакансии"
      onEnterApp={() => navigate('/app')}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-8"
      >
        <p className="text-ink-muted">
          Мы предлагаем удалёнку или гибрид, адекватные дедлайны и возможность влиять на продукт.
        </p>
        <div className="space-y-4">
          {vacancies.map((v, i) => (
            <div
              key={v.title}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/20 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wider">{v.team}</span>
                <h3 className="font-display font-bold text-ink mt-1">{v.title}</h3>
                <p className="text-sm text-ink-muted mt-1">{v.desc}</p>
              </div>
              <a
                href={`mailto:jobs@uchetgram.com?subject=Отклик: ${v.title}`}
                className="inline-flex items-center gap-2 text-primary font-semibold text-sm shrink-0"
              >
                Откликнуться <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
        <p className="text-sm text-ink-muted">
          Нет подходящей вакансии? Напишите на <a href="mailto:jobs@uchetgram.com" className="text-primary hover:underline">jobs@uchetgram.com</a> — рассмотрим вашу кандидатуру.
        </p>
      </motion.section>
    </MarketingPageTemplate>
  );
};
