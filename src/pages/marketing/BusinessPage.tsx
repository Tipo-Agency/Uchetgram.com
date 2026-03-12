import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { MarketingPageTemplate } from './MarketingPageTemplate';
import { motion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';

const industryMeta: Record<string, { title: string; subtitle: string; pain: string; solution: string; modules: string[] }> = {
  beauty: { title: 'Салоны красоты', subtitle: 'Решение для салонов, студий и частных мастеров.', pain: 'Разрозненные записи, путаница в сменах, потеря заявок из соцсетей.', solution: 'Единая запись 24/7, расписание мастеров, клиенты и история в одном месте. Напоминания и запись через Telegram.', modules: ['Онлайн-запись', 'CRM', 'Финансы', 'Склад материалов'] },
  medicine: { title: 'Медицина', subtitle: 'Клиники, медицинские центры и кабинеты.', pain: 'Очереди по телефону, забытые записи, сложный учёт по врачам и кабинетам.', solution: 'Запись к врачам онлайн, напоминания пациентам, учёт кабинетов и смен. Интеграция с кассами и документами.', modules: ['Запись', 'CRM пациентов', 'Финансы', 'Отчёты'] },
  sport: { title: 'Фитнес и спорт', subtitle: 'Фитнес-клубы, залы и студии.', pain: 'Абонементы в разных системах, ручное продление, нет единой базы клиентов.', solution: 'Абонементы и посещения, автоматическое продление, запись на занятия. Бот для тренеров и клиентов.', modules: ['Абонементы', 'Расписание', 'CRM', 'Финансы'] },
  auto: { title: 'Автосервисы', subtitle: 'СТО, автосервисы и дилеры.', pain: 'Запись по телефону, потеря истории ремонтов, склад запчастей в Excel.', solution: 'Запись на услуги, история авто и работ, склад запчастей. Напоминания о ТО и смене шин.', modules: ['Запись', 'Склад', 'CRM', 'Финансы'] },
  education: { title: 'Образование', subtitle: 'Онлайн-школы, курсы и учебные центры.', pain: 'Разрозненные списки учеников, ручная запись на курсы, нет единой аналитики.', solution: 'Запись на курсы и потоки, база учеников, оплата модулей. Домашние задания и прогресс в одном месте.', modules: ['CRM', 'Запись', 'Финансы', 'Отчёты'] },
  retail: { title: 'Ритейл', subtitle: 'Магазины и торговые сети.', pain: 'Учёт остатков в таблицах, нет связи продаж с клиентами и лояльностью.', solution: 'Остатки и приход/расход, продажи и чеки, программы лояльности. Отчётность в реальном времени.', modules: ['Склад', 'CRM', 'Финансы', 'Аналитика'] },
  services: { title: 'Услуги', subtitle: 'B2B и B2C сервисные компании.', pain: 'Заявки теряются, нет единого места для задач и клиентов.', solution: 'Заявки из сайта и Telegram в CRM, задачи исполнителям, учёт работ и выручки.', modules: ['CRM', 'Задачи', 'Финансы', 'Запись'] },
  restaurant: { title: 'Рестораны', subtitle: 'Кафе, бары и рестораны.', pain: 'Брони столиков по телефону, нет учёта гостей и предпочтений.', solution: 'Бронирование столиков, карточка гостя, обратная связь. Интеграция с кассами и кухней — в планах.', modules: ['Брони', 'CRM гостей', 'Финансы'] },
};

export const BusinessPage: React.FC = () => {
  const navigate = useNavigate();
  const { industry } = useParams<{ industry: string }>();
  const meta = industryMeta[industry || 'beauty'] || industryMeta.beauty;

  return (
    <MarketingPageTemplate
      title={meta.title}
      subtitle={meta.subtitle}
      badge="Отрасль"
      onEnterApp={() => navigate('/app')}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 rounded-2xl bg-slate-100 border border-slate-200">
            <h3 className="font-display font-bold text-ink mb-2">Боль</h3>
            <p className="text-ink-muted text-sm">{meta.pain}</p>
          </div>
          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
            <h3 className="font-display font-bold text-ink mb-2">Решение</h3>
            <p className="text-ink-muted text-sm">{meta.solution}</p>
          </div>
        </div>
        <div>
          <h3 className="font-display font-bold text-ink mb-4">Рекомендуемые модули</h3>
          <ul className="flex flex-wrap gap-3">
            {meta.modules.map((m) => (
              <li key={m}>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-medium text-ink">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  {m}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <p className="text-ink-muted text-sm">
          <Link to="/business/beauty" className="text-primary hover:underline">← Все отрасли</Link>
        </p>
      </motion.section>
    </MarketingPageTemplate>
  );
};
