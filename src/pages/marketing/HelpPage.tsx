import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MarketingPageTemplate } from './MarketingPageTemplate';
import { motion } from 'motion/react';
import { BookOpen, MessageSquare, Search } from 'lucide-react';

export const HelpPage: React.FC = () => {
  const navigate = useNavigate();

  const categories = [
    { title: 'Начало работы', links: ['Регистрация и первый вход', 'Подключение Telegram-бота', 'Добавление сотрудников'] },
    { title: 'Запись и клиенты', links: ['Онлайн-запись', 'Карточка клиента', 'Напоминания и уведомления'] },
    { title: 'Финансы и отчёты', links: ['Выручка и платежи', 'Расчёт зарплат', 'Экспорт в Excel'] },
    { title: 'Интеграции', links: ['Telegram', 'Виджет на сайт', 'API'] },
  ];

  return (
    <MarketingPageTemplate
      title="Помощь"
      subtitle="База знаний и ответы на частые вопросы. Не нашли ответ — напишите в поддержку."
      badge="Центр поддержки"
      onEnterApp={() => navigate('/app')}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-10"
      >
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-ink-muted" />
            <input
              type="search"
              placeholder="Поиск по базе знаний..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
              <h3 className="font-display font-bold text-ink mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" /> {cat.title}
              </h3>
              <ul className="space-y-2">
                {cat.links.map((link) => (
                  <li key={link}>
                    <Link to="/help" className="text-ink-muted hover:text-primary text-sm hover:underline">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-10 h-10 text-primary" />
            <div>
              <h3 className="font-display font-bold text-ink">Поддержка в Telegram</h3>
              <p className="text-sm text-ink-muted">Ответ в течение рабочего дня</p>
            </div>
          </div>
          <a href="https://t.me/uchetgram_support" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline shrink-0">
            Написать в поддержку →
          </a>
        </div>
      </motion.section>
    </MarketingPageTemplate>
  );
};
