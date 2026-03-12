import React from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { MarketingPageTemplate } from './MarketingPageTemplate';
import { motion } from 'motion/react';
import { Calendar, Users, Layout, BarChart3, PieChart, Workflow, ShoppingBag, Cpu } from 'lucide-react';

const modules = [
  { id: 'core', title: 'Ядро системы', desc: 'Базовая функциональность и универсальная сущность.', icon: Cpu },
  { id: 'planning', title: 'Планирование', desc: 'План-факт, бюджеты и цели.', icon: Layout },
  { id: 'processes', title: 'Бизнес-процессы', desc: 'Автоматизация рабочих процессов и регламентов.', icon: Workflow },
  { id: 'users', title: 'Пользователи и роли', desc: 'Управление командой и правами доступа.', icon: Users },
  { id: 'finance', title: 'Финансы', desc: 'Управление финансами, заявками и платежами.', icon: PieChart },
  { id: 'reporting', title: 'Отчёты и аналитика', desc: 'Дашборды и аналитические отчёты.', icon: BarChart3 },
  { id: 'inventory', title: 'Склад и запасы', desc: 'Учёт остатков и движения товаров.', icon: ShoppingBag },
  { id: 'crm', title: 'CRM и продажи', desc: 'Воронка продаж, лиды и сделки.', icon: Calendar },
];

export const ModulesIndexPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MarketingPageTemplate
      title="Модули системы"
      subtitle="Обзор всех модулей платформы Uchetgram. Каждый модуль решает свою задачу и работает в связке с остальными."
      badge="Продукт"
      onEnterApp={() => navigate('/app')}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {modules.map((m) => (
          <Link
            key={m.id}
            to={`/modules/${m.id}`}
            className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/30 hover:shadow-lg transition-all group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
              <m.icon className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-ink">{m.title}</h3>
            <p className="text-sm text-ink-muted mt-2">{m.desc}</p>
          </Link>
        ))}
      </motion.section>
    </MarketingPageTemplate>
  );
};

const moduleContent: Record<string, { title: string; subtitle: string; points: string[] }> = {
  core: { title: 'Ядро системы', subtitle: 'Базовая функциональность и универсальная сущность.', points: ['Единая база клиентов и записей', 'Роли и права доступа', 'Интеграция с Telegram-ботом', 'Настройки компании и филиалов'] },
  planning: { title: 'Планирование', subtitle: 'План-факт, бюджеты и цели.', points: ['Бюджеты по статьям', 'План-факт анализ', 'Цели и KPI', 'Прогноз выручки'] },
  processes: { title: 'Бизнес-процессы', subtitle: 'Автоматизация рабочих процессов и регламентов.', points: ['Шаблоны процессов', 'Согласования и маршруты', 'Уведомления и дедлайны', 'История изменений'] },
  users: { title: 'Пользователи и роли', subtitle: 'Управление командой и правами доступа.', points: ['Роли и права', 'Приглашение сотрудников', 'Доступ в Telegram-боте', 'Аудит действий'] },
  finance: { title: 'Финансы', subtitle: 'Управление финансами, заявками и платежами.', points: ['Выручка и расходы', 'Заявки на расходы', 'Расчёт зарплат', 'Интеграция с кассами'] },
  reporting: { title: 'Отчёты и аналитика', subtitle: 'Дашборды и аналитические отчёты.', points: ['Дашборды в реальном времени', 'Отчёты по выручке и клиентам', 'Экспорт в Excel/PDF', 'Кастомные отчёты'] },
  inventory: { title: 'Склад и запасы', subtitle: 'Учёт остатков и движения товаров.', points: ['Остатки и приход/расход', 'Связь с услугами и продажами', 'Оповещения о минимуме', 'Инвентаризация'] },
  crm: { title: 'CRM и продажи', subtitle: 'Воронка продаж, лиды и сделки.', points: ['Воронка и этапы', 'Лиды из Telegram и сайта', 'Карточка клиента и история', 'Задачи по сделкам'] },
};

export const ModuleDetailPage: React.FC = () => {
  const navigate = useNavigate();
  const { moduleId } = useParams<{ moduleId: string }>();
  const content = moduleContent[moduleId || 'core'] || moduleContent.core;

  return (
    <MarketingPageTemplate
      title={content.title}
      subtitle={content.subtitle}
      badge="Модуль"
      onEnterApp={() => navigate('/app')}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-8"
      >
        <h3 className="text-xl font-display font-bold text-ink">Ключевые возможности</h3>
        <ul className="space-y-4">
          {content.points.map((p) => (
            <li key={p} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
              <span className="w-2 h-2 rounded-full bg-primary shrink-0" />
              {p}
            </li>
          ))}
        </ul>
        <p className="text-ink-muted text-sm">
          <Link to="/modules" className="text-primary hover:underline">← Все модули</Link>
        </p>
      </motion.section>
    </MarketingPageTemplate>
  );
};
