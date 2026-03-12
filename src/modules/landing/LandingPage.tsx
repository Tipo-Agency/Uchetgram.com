import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Shield, 
  Globe, 
  BarChart3, 
  Workflow, 
  Users, 
  Layout, 
  Cpu, 
  ArrowUpRight,
  Play,
  Star,
  ChevronRight,
  ChevronDown,
  Menu,
  X,
  Smartphone,
  Calendar,
  MessageSquare,
  CreditCard,
  Lock,
  PieChart,
  Target,
  TrendingUp,
  Scissors,
  Stethoscope,
  Dumbbell,
  Palmtree,
  GraduationCap,
  Car,
  Hammer,
  ShoppingBag,
  User,
  Send,
  Bot
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Logo } from '@/src/components/ui/Logo';
import { StatsBlock } from '@/src/components/landing/StatsBlock';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';

const industryToRoute: Record<string, string> = {
  beauty: 'beauty', medical: 'medicine', sport: 'sport', leisure: 'services', education: 'education',
  auto: 'auto', services: 'services', retail: 'retail', private: 'beauty',
};

export const LandingPage: React.FC<{ onEnterApp: () => void }> = ({ onEnterApp }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState<'features' | 'industries' | null>(null);

  const headerBtnClass =
    'rounded-lg h-8 px-3 text-xs font-semibold text-white/90 hover:bg-white/15 hover:text-white transition-colors';

  const features = [
    { id: 'booking', title: t('landing.features.items.booking'), icon: <Calendar className="w-5 h-5" />, desc: t('landing.features.items.booking_desc') },
    { id: 'crm', title: t('landing.features.items.crm'), icon: <Users className="w-5 h-5" />, desc: t('landing.features.items.crm_desc') },
    { id: 'journal', title: t('landing.features.items.journal'), icon: <Layout className="w-5 h-5" />, desc: t('landing.features.items.journal_desc') },
    { id: 'notifications', title: t('landing.features.items.notifications'), icon: <MessageSquare className="w-5 h-5" />, desc: t('landing.features.items.notifications_desc') },
    { id: 'payments', title: t('landing.features.items.payments'), icon: <CreditCard className="w-5 h-5" />, desc: t('landing.features.items.payments_desc'), badge: 'New' },
    { id: 'analytics', title: t('landing.features.items.analytics'), icon: <BarChart3 className="w-5 h-5" />, desc: t('landing.features.items.analytics_desc') },
    { id: 'loyalty', title: t('landing.features.items.loyalty'), icon: <Star className="w-5 h-5" />, desc: t('landing.features.items.loyalty_desc') },
    { id: 'finance', title: t('landing.features.items.finance'), icon: <TrendingUp className="w-5 h-5" />, desc: t('landing.features.items.finance_desc') },
    { id: 'security', title: t('landing.features.items.security'), icon: <Lock className="w-5 h-5" />, desc: t('landing.features.items.security_desc') },
    { id: 'salary', title: t('landing.features.items.salary'), icon: <PieChart className="w-5 h-5" />, desc: t('landing.features.items.salary_desc') },
    { id: 'inventory', title: t('landing.features.items.inventory'), icon: <ShoppingBag className="w-5 h-5" />, desc: t('landing.features.items.inventory_desc') },
    { id: 'telephony', title: t('landing.features.items.telephony'), icon: <Smartphone className="w-5 h-5" />, desc: t('landing.features.items.telephony_desc') },
  ];

  const industries = [
    { id: 'beauty', title: t('landing.industries.items.beauty'), icon: <Scissors className="w-5 h-5" /> },
    { id: 'medical', title: t('landing.industries.items.medical'), icon: <Stethoscope className="w-5 h-5" /> },
    { id: 'sport', title: t('landing.industries.items.sport'), icon: <Dumbbell className="w-5 h-5" /> },
    { id: 'leisure', title: t('landing.industries.items.leisure'), icon: <Palmtree className="w-5 h-5" /> },
    { id: 'education', title: t('landing.industries.items.education'), icon: <GraduationCap className="w-5 h-5" /> },
    { id: 'auto', title: t('landing.industries.items.auto'), icon: <Car className="w-5 h-5" /> },
    { id: 'services', title: t('landing.industries.items.services'), icon: <Hammer className="w-5 h-5" /> },
    { id: 'retail', title: t('landing.industries.items.retail'), icon: <ShoppingBag className="w-5 h-5" /> },
    { id: 'private', title: t('landing.industries.items.private'), icon: <User className="w-5 h-5" /> },
  ];

  const megaMenuOffset = 'mt-[15px]';

  const renderMegaMenuFeatures = () => (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`absolute left-0 top-full ${megaMenuOffset} z-50 w-[min(100vw-2rem,640px)]`}
    >
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        <div className="p-6">
          <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-4">Инструменты</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {features.slice(0, 8).map(f => (
              <Link
                key={f.id}
                to="/modules"
                className="group flex items-center gap-3 text-left p-3 rounded-xl hover:bg-white/10 transition-colors w-full"
                onClick={() => setActiveMegaMenu(null)}
              >
                <div className="w-10 h-10 shrink-0 rounded-lg bg-primary/20 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {f.icon}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-display font-bold text-sm text-white truncate">{f.title}</span>
                    {f.badge && <span className="shrink-0 px-1.5 py-0.5 bg-amber-400/90 text-[10px] font-bold rounded text-white uppercase">New</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <Link to="/modules" className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors" onClick={() => setActiveMegaMenu(null)}>
                <Smartphone className="w-4 h-4 shrink-0" />
                Мобильное приложение
              </Link>
              <Link to="/modules" className="flex items-center gap-2 text-white/80 hover:text-white text-sm font-medium transition-colors" onClick={() => setActiveMegaMenu(null)}>
                <Globe className="w-4 h-4 shrink-0" />
                Виджет записи
              </Link>
            </div>
            <Link
              to="/modules"
              className="rounded-lg h-9 px-4 text-sm font-semibold text-white border border-white/20 hover:bg-white/15 transition-colors flex items-center gap-1.5"
              onClick={() => setActiveMegaMenu(null)}
            >
              Все инструменты <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderMegaMenuIndustries = () => (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 6 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`absolute left-0 top-full ${megaMenuOffset} z-50 w-[min(100vw-2rem,560px)]`}
    >
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl border border-white/10 shadow-xl overflow-hidden">
        <div className="p-6">
          <p className="text-[11px] font-semibold text-white/50 uppercase tracking-wider mb-4">Сферы бизнеса</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {industries.map(i => (
              <Link
                key={i.id}
                to={`/business/${industryToRoute[i.id] || i.id}`}
                className="flex flex-col items-center gap-2.5 py-4 px-5 rounded-xl hover:bg-white/10 transition-colors w-full text-center min-w-0"
                onClick={() => setActiveMegaMenu(null)}
              >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-white/10 flex items-center justify-center text-white/80 hover:bg-primary/30 transition-colors">
                  {i.icon}
                </div>
                <span className="font-display font-bold text-sm text-white leading-tight px-2 break-words">{i.title}</span>
              </Link>
            ))}
          </div>
          <div className="mt-5 pt-5 border-t border-white/10 flex justify-end">
            <Link
              to="/business/beauty"
              className="rounded-lg h-9 px-4 text-sm font-semibold text-white border border-white/20 hover:bg-white/15 transition-colors flex items-center gap-1.5"
              onClick={() => setActiveMegaMenu(null)}
            >
              Все сферы <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderFeatures = () => (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-20 md:pb-28 px-6 md:px-8 bg-white rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Cpu className="w-4 h-4" />
            <span>Все инструменты в одной системе</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-ink mb-6"
          >
            {t('landing.features.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto mb-10"
          >
            {t('landing.features.subtitle')}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="flex flex-wrap justify-center gap-4">
            <Button variant="primary" className="rounded-xl px-6 h-11" onClick={onEnterApp}>
              Попробовать бесплатно
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="ghost" className="rounded-xl text-ink-muted hover:bg-slate-100" onClick={() => navigate('/pricing')}>
              Смотреть тарифы
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Инфографика: что входит в экосистему */}
      <section className="py-20 md:py-28 bg-slate-50 rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center text-ink mb-4">
            Всё в одном месте
          </h2>
          <p className="text-center text-ink-muted max-w-2xl mx-auto mb-14">
            Запись, CRM, финансы, аналитика и Telegram — без переключения между сервисами.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Calendar, label: 'Онлайн-запись', value: '24/7' },
              { icon: Users, label: 'Клиенты в CRM', value: '∞' },
              { icon: Send, label: 'Заявки из TG', value: '1 клик' },
              { icon: BarChart3, label: 'Отчёты', value: 'в реальном времени' },
            ].map((item, idx) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="bg-white rounded-2xl p-6 border border-slate-200/80 hover:border-primary/30 hover:shadow-lg transition-all text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                  <item.icon className="w-6 h-6" />
                </div>
                <p className="text-2xl md:text-3xl font-display font-bold text-primary">{item.value}</p>
                <p className="text-sm font-medium text-ink-muted mt-1">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Группы возможностей */}
      <section className="py-24 md:py-32 bg-white rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-12 text-center">
            Подробнее о возможностях
          </h2>
          <div className="space-y-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Работа с клиентами</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.filter(f => ['booking', 'crm', 'notifications', 'loyalty'].includes(f.id)).map((f, idx) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">{f.icon}</div>
                    <h3 className="font-display font-bold text-ink mb-2">{f.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Финансы и учёт</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.filter(f => ['payments', 'analytics', 'finance', 'salary'].includes(f.id)).map((f, idx) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{f.icon}</div>
                      {f.badge && <span className="px-2 py-0.5 bg-amber-400 text-[10px] font-bold rounded text-white">New</span>}
                    </div>
                    <h3 className="font-display font-bold text-ink mb-2">{f.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-primary mb-6">Операции</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {features.filter(f => ['journal', 'security', 'inventory', 'telephony'].includes(f.id)).map((f, idx) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:bg-white hover:border-primary/20 hover:shadow-xl transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">{f.icon}</div>
                    <h3 className="font-display font-bold text-ink mb-2">{f.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-t-[48px] md:rounded-t-[64px] overflow-hidden">
        <div className="max-w-4xl mx-auto px-8 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Готовы попробовать все функции?</h2>
          <p className="text-lg text-white/70 mb-10">14 дней бесплатно. Без карты. Подключение Telegram за 5 минут.</p>
          <Button variant="primary" size="lg" className="rounded-xl bg-white text-primary hover:bg-slate-100 border-0" onClick={onEnterApp}>
            Начать бесплатно
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </>
  );

  const industryUseCases: Record<string, string[]> = {
    beauty: ['Запись к мастерам', 'Управление сменами', 'Программы лояльности', 'Учёт материалов'],
    medical: ['Запись к врачам', 'Медкарты', 'Напоминания пациентам', 'Интеграция с кассами'],
    sport: ['Абонементы', 'Расписание занятий', 'Тренеры и залы', 'Членские взносы'],
    leisure: ['Бронирование', 'Клиентская база', 'События и акции', 'Обратная связь'],
    education: ['Курсы и потоки', 'Домашние задания', 'Оплата модулей', 'Сертификаты'],
    auto: ['Запись на услуги', 'История авто', 'Склад запчастей', 'Расчёт работ'],
    services: ['Заявки и задачи', 'Выездные бригады', 'Документооборот', 'Клиентский учёт'],
    retail: ['Остатки и приход', 'Продажи и чеки', 'Лояльность', 'Отчётность'],
    private: ['Личный календарь', 'Клиенты и записи', 'Доходы', 'Напоминания в TG'],
  };

  const renderIndustries = () => (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-20 md:pb-28 px-6 md:px-8 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-b-[48px] md:rounded-b-[64px] overflow-hidden text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Users className="w-4 h-4" />
            <span>Для кого Uchetgram</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6"
          >
            {t('landing.industries.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10"
          >
            {t('landing.industries.subtitle')}
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Button variant="primary" className="rounded-xl bg-white text-slate-900 hover:bg-slate-100 border-0 px-6 h-11" onClick={onEnterApp}>
              Подобрать решение
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Карточки отраслей с кейсами */}
      <section className="py-24 md:py-32 bg-white rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-4 text-center">
            Решения под вашу сферу
          </h2>
          <p className="text-center text-ink-muted max-w-2xl mx-auto mb-16">
            Готовые сценарии и настройки для быстрого старта. Плюс Telegram для сотрудников и клиентов.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((i, idx) => (
              <motion.div
                key={i.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(idx * 0.05, 0.35) }}
                className="group bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-primary/30 hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                    {i.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold text-ink mb-4">{i.title}</h3>
                  <ul className="space-y-2">
                    {(industryUseCases[i.id] || ['Запись', 'CRM', 'Аналитика', 'Telegram']).map((item, k) => (
                      <li key={k} className="flex items-center gap-2 text-sm text-ink-muted">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="px-8 pb-6">
                  <button
                    type="button"
                    onClick={() => navigate('/pricing')}
                    className="text-sm font-semibold text-primary hover:underline"
                  >
                    Узнать тарифы →
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Инфографика: один продукт для всех */}
      <section className="py-20 md:py-28 bg-slate-50 rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-ink">
                Один продукт — любые отрасли
              </h2>
              <p className="text-lg text-ink-muted">
                Не нужно покупать отдельные системы для салона, клиники или автосервиса. Модули настраиваются под ваш бизнес, а клиенты и сотрудники работают в привычном Telegram.
              </p>
              <ul className="space-y-4">
                {['Готовые шаблоны под сферу', 'Единая база клиентов и записей', 'Бот для сотрудников и клиентов'].map((item, k) => (
                  <li key={k} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="font-medium text-ink">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="grid grid-cols-3 gap-4">
              {industries.slice(0, 6).map((i, idx) => (
                <div
                  key={i.id}
                  className="aspect-square rounded-2xl bg-white border border-slate-200 flex flex-col items-center justify-center p-4 hover:border-primary/30 hover:shadow-lg transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-2">{i.icon}</div>
                  <span className="text-xs font-bold text-ink text-center leading-tight">{i.title}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-t-[48px] md:rounded-t-[64px] overflow-hidden">
        <div className="max-w-4xl mx-auto px-8 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Найдите своё решение</h2>
          <p className="text-lg text-white/70 mb-10">Запуск за 5 минут. 14 дней бесплатно.</p>
          <Button variant="primary" size="lg" className="rounded-xl bg-white text-primary hover:bg-slate-100 border-0" onClick={onEnterApp}>
            Начать бесплатно
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </>
  );

  const pricingPlans = [
    { name: 'Старт', price: '0', priceNote: 'навсегда', desc: 'Для частных мастеров и самозанятых', features: ['До 50 клиентов', 'Базовая аналитика', 'Онлайн-запись', 'Бот в Telegram'], cta: t('landing.pricing.cta_free'), popular: false },
    { name: 'Бизнес', price: '29', priceNote: '/мес', desc: 'Для студий и салонов', features: ['Безлимит клиентов', 'Складской учёт', 'Расчёт зарплат', 'Уведомления SMS и TG', 'Аналитика и отчёты'], cta: t('landing.pricing.cta_trial'), popular: true },
    { name: 'Pro', price: '79', priceNote: '/мес', desc: 'Для сетей и крупных центров', features: ['Всё из Бизнеса', 'Сетевой интерфейс', 'Персональный менеджер', 'API и интеграции'], cta: t('landing.pricing.cta_contact'), popular: false },
  ];

  const renderPricing = () => (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-20 md:pb-28 px-6 md:px-8 bg-white rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6"
          >
            <CreditCard className="w-4 h-4" />
            <span>Прозрачные тарифы</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-ink mb-6"
          >
            {t('landing.pricing.title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto"
          >
            {t('landing.pricing.subtitle')}
          </motion.p>
        </div>
      </section>

      {/* Тарифы */}
      <section className="py-20 md:py-28 bg-slate-50 rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
            {pricingPlans.map((plan, idx) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`relative rounded-3xl border-2 p-8 md:p-10 flex flex-col bg-white ${
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
                  {plan.features.map(f => (
                    <li key={f} className="flex items-center gap-3 text-sm font-medium text-ink">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.popular ? 'primary' : 'outline'}
                  className="w-full h-12 rounded-xl font-semibold"
                  onClick={onEnterApp}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / доверие */}
      <section className="py-24 md:py-32 bg-white rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-3xl mx-auto px-8">
          <h2 className="text-3xl font-display font-bold text-ink mb-12 text-center">Частые вопросы</h2>
          <div className="space-y-6">
            {[
              { q: 'Можно ли поменять тариф позже?', a: 'Да. Вы можете в любой момент перейти на другой план. Разница пересчитается пропорционально.' },
              { q: 'Что входит в 14 дней бесплатно?', a: 'Полный доступ к выбранному тарифу. Без привязки карты. Подключите Telegram и протестируйте все функции.' },
              { q: 'Есть ли ограничения по сотрудникам?', a: 'На Старте — до 2 сотрудников. На Бизнес и Pro — безлимит пользователей в рамках тарифа.' },
            ].map((faq, idx) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80"
              >
                <p className="font-display font-bold text-ink mb-2">{faq.q}</p>
                <p className="text-sm text-ink-muted leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-t-[48px] md:rounded-t-[64px] overflow-hidden">
        <div className="max-w-4xl mx-auto px-8 text-center text-white">
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Начните бесплатно</h2>
          <p className="text-lg text-white/70 mb-10">14 дней — без карты. Отмена в один клик.</p>
          <Button variant="primary" size="lg" className="rounded-xl bg-white text-primary hover:bg-slate-100 border-0" onClick={onEnterApp}>
            Попробовать бесплатно
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </>
  );

  const renderIntegrations = () => (
    <>
      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-20 md:pb-28 px-6 md:px-8 bg-white rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6"
          >
            <Send className="w-4 h-4" />
            <span>Telegram из коробки</span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-ink mb-6"
          >
            Интеграции
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto mb-10"
          >
            Telegram — по умолчанию. Плюс платёжные системы, 1С, виджеты на сайт и API для своих доработок.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <Button variant="primary" className="rounded-xl px-6 h-11" onClick={onEnterApp}>
              Подключить интеграции
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Telegram — главная интеграция (инфографика) */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-6">
            Telegram — в центре системы
          </h2>
          <p className="text-center text-white/70 max-w-2xl mx-auto mb-16">
            Сотрудники работают в боте, клиенты пишут в мессенджере. Заявки попадают в CRM без ручного ввода.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/30 flex items-center justify-center mx-auto mb-6">
                <Bot className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Бот для сотрудников</h3>
              <p className="text-sm text-white/70">Задачи, уведомления, отчёты и доступ к данным — всё в одном чате.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.08 }}
              className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-sky-500/30 flex items-center justify-center mx-auto mb-6">
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Клиенты в Telegram</h3>
              <p className="text-sm text-white/70">Запись, напоминания, оплата. Сообщения автоматически попадают в карточку клиента.</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.16 }}
              className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/30 flex items-center justify-center mx-auto mb-6">
                <Workflow className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">Связка с CRM и задачами</h3>
              <p className="text-sm text-white/70">Заявка из чата → лид в воронке → задача исполнителю. Без копирования.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Остальные интеграции — карточки */}
      <section className="py-24 md:py-32 bg-white rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-4 text-center">
            Платежи, сайт, API
          </h2>
          <p className="text-center text-ink-muted max-w-2xl mx-auto mb-16">
            Подключайте платёжные системы, встраивайте виджет записи на сайт и используйте API для своих сценариев.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CreditCard, title: 'Платежи', desc: 'Stripe, платёжные виджеты, привязка карт и онлайн-оплата.' },
              { icon: Globe, title: 'Виджет на сайт', desc: 'Запись на услуги с вашего сайта. Конвертация трафика в записи.' },
              { icon: Cpu, title: 'API', desc: 'REST API для своих скриптов и автоматизаций.' },
              { icon: Lock, title: '1С и кассы', desc: 'Синхронизация с 1С и онлайн-кассами по мере выхода.' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.06 }}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-slate-50 rounded-t-[48px] md:rounded-t-[64px] overflow-hidden">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-ink mb-6">Подключите всё за 5 минут</h2>
          <p className="text-lg text-ink-muted mb-10">Регистрация → добавление бота в Telegram → первый учёт.</p>
          <Button variant="primary" size="lg" className="rounded-xl" onClick={onEnterApp}>
            Начать бесплатно
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </>
  );

  const renderHome = () => (
    <>
      {/* 1. Hero — Учёт и рост в одном месте. Telegram в фокусе. */}
      <section className="pt-28 md:pt-36 lg:pt-40 pb-20 md:pb-28 px-6 md:px-8 relative overflow-hidden bg-white rounded-b-[48px] md:rounded-b-[64px]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold uppercase tracking-[0.2em]">
              <Send className="w-3.5 h-3.5" />
              <span>Учёт и коммуникация в Telegram</span>
            </div>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.05]">
              Учёт и рост бизнеса в одном месте
            </h1>
            <p className="text-lg md:text-xl text-ink-muted leading-relaxed max-w-xl">
              Онлайн-запись, CRM, зарплаты и аналитика — плюс тесная интеграция с Telegram: бот для сотрудников и общение с клиентами без потери заявок.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <Button variant="primary" size="lg" className="h-11 px-6 rounded-xl font-semibold text-sm shadow-lg shadow-primary/20" onClick={onEnterApp}>
                Начать бесплатно
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button variant="ghost" className="h-11 px-5 rounded-xl text-ink-muted hover:text-ink hover:bg-slate-100" onClick={() => navigate('/modules')}>
                Посмотреть демо
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-ink-muted">
              <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-emerald-500" /> Без привязки карты</span>
              <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-primary" /> Запуск за 5 минут</span>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="lg:col-span-6"
          >
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white shadow-2xl relative overflow-hidden border border-white/10">
              <div className="absolute top-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              <div className="relative z-10 space-y-5">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-white/40">Данные за сегодня</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-xs text-white/50 font-medium">Выручка</p>
                    <p className="text-2xl font-display font-bold mt-0.5">+$2,540</p>
                    <p className="text-xs text-emerald-400 mt-2">+18% к неделе</p>
                  </div>
                  <div className="bg-white/5 rounded-2xl p-5 border border-white/10">
                    <p className="text-xs text-white/50 font-medium">Записей</p>
                    <p className="text-2xl font-display font-bold mt-0.5">126</p>
                    <p className="text-xs text-white/50 mt-2">на сегодня</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-2xl bg-primary/15 border border-primary/30">
                  <div className="w-10 h-10 rounded-xl bg-primary/80 flex items-center justify-center shrink-0"><Send className="w-5 h-5" /></div>
                  <div>
                    <p className="text-sm font-semibold text-white">Заявки из Telegram</p>
                    <p className="text-xs text-white/60">сразу в CRM и в задачи</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. Logos — Нам доверяют */}
      <section className="py-12 md:py-16 bg-slate-50 rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-[11px] font-bold text-ink-muted uppercase tracking-[0.2em] mb-8">{t('landing.trust.title')}</p>
          <div className="flex flex-wrap justify-center items-center gap-x-12 md:gap-x-20 gap-y-8 text-ink-muted/60 text-lg md:text-2xl font-bold">
            <span className="italic tracking-tight">BEAUTY.PRO</span>
            <span className="tracking-widest">FITNESS_ONE</span>
            <span className="uppercase">MedCenter</span>
            <span className="tracking-tight">AUTO.HUB</span>
            <span className="italic">EDU+</span>
          </div>
        </div>
      </section>

      {/* 3. USP — Всё в Telegram: бот для сотрудников + клиенты в TG (главное преимущество) */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden text-white">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-white/90 text-sm font-semibold mb-6">
              <Send className="w-4 h-4" />
              Ключевое преимущество
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
              Всё в Telegram — и для сотрудников, и для клиентов
            </h2>
            <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
              Единственная система, где учёт и коммуникация с клиентами живут в привычном мессенджере. Без лишних приложений и потери заявок.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 rounded-[32px] p-8 md:p-10 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/30 flex items-center justify-center mb-6">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Бот для сотрудников</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Задачи, отчёты, уведомления и доступ к данным — прямо в Telegram. Сотрудники не заходят в лишние сервисы: всё в одном чате.
              </p>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Новые заявки и задачи в боте</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Подтверждение и перенос записей</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Краткая аналитика и напоминания</li>
              </ul>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 rounded-[32px] p-8 md:p-10 border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-sky-500/40 flex items-center justify-center mb-6">
                <MessageSquare className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">Клиенты пишут в Telegram</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                Запись, напоминания, оплата и обратная связь — в одном канале. Заявки из чата автоматически попадают в CRM, ничего не теряется.
              </p>
              <ul className="space-y-3 text-white/80">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Запись на услуги через чат-бота</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> Напоминания и отмены в TG</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" /> История обращений в карточке клиента</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Features — Сотни задач. Одна экосистема */}
      <section className="py-24 md:py-32 bg-white rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight">
              Сотни задач. <span className="text-primary">Одна экосистема</span>
            </h2>
            <p className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto">
              Всё для учёта, записи и роста выручки — плюс Telegram из коробки
            </p>
          </div>

          {/* Группы: Работа с клиентами, Финансы и учёт, Операции */}
          <div className="space-y-16">
            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Работа с клиентами</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.filter(f => ['booking', 'crm', 'notifications', 'loyalty'].includes(f.id)).map((f, idx) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-slate-50/80 hover:bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                      {f.icon}
                    </div>
                    <h3 className="font-display font-bold text-ink mb-1">{f.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed line-clamp-2">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Финансы и учёт</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {features.filter(f => ['payments', 'analytics', 'finance', 'salary'].includes(f.id)).map((f, idx) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-slate-50/80 hover:bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                      {f.icon}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-display font-bold text-ink">{f.title}</h3>
                      {f.badge && <span className="px-1.5 py-0.5 bg-amber-400 text-[10px] font-bold rounded text-white">New</span>}
                    </div>
                    <p className="text-sm text-ink-muted leading-relaxed line-clamp-2">{f.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="space-y-6">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Операции и процессы</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {features.filter(f => ['journal', 'security', 'inventory', 'telephony'].includes(f.id)).map((f, idx) => (
                  <motion.div
                    key={f.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                    className="group bg-slate-50/80 hover:bg-white p-6 rounded-2xl border border-slate-200/80 hover:border-primary/30 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors mb-4">
                      {f.icon}
                    </div>
                    <h3 className="font-display font-bold text-ink">{f.title}</h3>
                    <p className="text-sm text-ink-muted leading-relaxed line-clamp-2 mt-1">{f.desc}</p>
                  </motion.div>
                ))}
                <button
                  type="button"
                  onClick={() => navigate('/modules')}
                  className="group flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-slate-300 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 text-ink-muted hover:text-primary"
                >
                  <ArrowRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                  <span className="font-display font-bold text-sm">Всё остальное</span>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Business Goals — Uchetgram поможет достичь любых бизнес-целей (4 карточки, одна про TG) */}
      <section className="py-24 md:py-32 bg-slate-50 rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
              Uchetgram поможет достичь любых <span className="text-primary">бизнес-целей</span>
            </h2>
            <p className="text-lg text-ink-muted max-w-2xl mx-auto">Как у лидеров рынка — плюс общение с клиентами там, где им удобно</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="bg-white p-8 md:p-10 rounded-[32px] border border-border/60 shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6"><Globe className="w-6 h-6" /></div>
              <h3 className="text-2xl font-display font-bold mb-4">Привлекайте клиентов бесплатно 24/7</h3>
              <p className="text-ink-muted leading-relaxed">
                Онлайн-запись на сайте и в партнёрских сервисах. Плюс клиенты могут записаться и уточнить детали прямо в Telegram — без звонков и потери заявок.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.05 }} className="bg-white p-8 md:p-10 rounded-[32px] border border-border/60 shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6"><Cpu className="w-6 h-6" /></div>
              <h3 className="text-2xl font-display font-bold mb-4">Не тратьте время на рутину</h3>
              <p className="text-ink-muted leading-relaxed">
                Запись, подтверждение визитов и расписание — за вас. Плюс расчёт зарплат, склад и аналитика. Сотрудники получают задачи и отчёты в Telegram-боте.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="bg-white p-8 md:p-10 rounded-[32px] border border-border/60 shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-600 mb-6"><Send className="w-6 h-6" /></div>
              <h3 className="text-2xl font-display font-bold mb-4">Клиенты в Telegram — заявки в CRM</h3>
              <p className="text-ink-muted leading-relaxed">
                Все сообщения из Telegram попадают в карточку клиента. Напоминания, отмена и перенос записи — в том же чате. Ни одной потерянной заявки.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }} className="bg-white p-8 md:p-10 rounded-[32px] border border-border/60 shadow-sm hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6"><BarChart3 className="w-6 h-6" /></div>
              <h3 className="text-2xl font-display font-bold mb-4">Управляйте бизнесом откуда угодно</h3>
              <p className="text-ink-muted leading-relaxed">
                Аналитика, заполненность и выручка — в веб-интерфейсе и в боте. Настраивайте права доступа и держите руку на пульсе без лишних входов в систему.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. How it works — 3 шага */}
      <section className="py-24 md:py-32 bg-white rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">Как начать за 5 минут</h2>
            <p className="text-lg text-ink-muted max-w-2xl mx-auto">Регистрация, подключение Telegram и первый учёт</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {[
              { step: '1', title: 'Регистрация и бот', desc: 'Создайте аккаунт и подключите Telegram-бота для сотрудников и клиентов.', icon: Bot },
              { step: '2', title: 'Клиенты пишут в TG', desc: 'Заявки из чата автоматически попадают в CRM. Напоминания и запись — в том же мессенджере.', icon: MessageSquare },
              { step: '3', title: 'Учёт и аналитика', desc: 'Ведите записи, зарплаты, склад и смотрите отчёты в одном месте.', icon: BarChart3 },
            ].map((item, idx) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="text-center md:text-left">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto md:mx-0 mb-6">
                  <item.icon className="w-7 h-7" />
                </div>
                <span className="text-sm font-bold text-primary">Шаг {item.step}</span>
                <h3 className="text-xl font-display font-bold mt-2 mb-3">{item.title}</h3>
                <p className="text-ink-muted leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Industries — Подходит для любого бизнеса в сфере услуг */}
      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-800 to-slate-900 rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center space-y-4 mb-24">
            <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight text-white">
              Подходит <span className="text-amber-400">для любого бизнеса</span> <br />
              <span className="text-white">в сфере услуг</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="grid grid-cols-2 gap-x-12 gap-y-8">
              {industries.map(i => (
                <div key={i.id} className="pb-8 border-b border-white/20 group cursor-pointer" onClick={() => navigate(`/business/${industryToRoute[i.id] || i.id}`)}>
                  <div className="flex items-center gap-4 group-hover:translate-x-2 transition-transform">
                    <span className="text-2xl font-display font-bold text-white group-hover:text-amber-400 transition-colors">{i.title}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="relative z-10 bg-white/10 rounded-[48px] p-12 border border-white/10">
                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur p-6 rounded-3xl border border-white/10 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white shrink-0">
                      <Logo showText={false} className="h-6 w-auto brightness-0 invert" />
                    </div>
                    <div>
                      <p className="text-xs text-white/60 font-bold uppercase">5 мин назад</p>
                      <p className="text-sm font-bold text-white">Новая запись: Анна. Услуга: МАНИКЮР</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <img src="https://picsum.photos/seed/manicure/300/300" alt="Manicure" className="w-1/2 rounded-3xl shadow-lg" />
                    <div className="w-1/2 space-y-4">
                      <div className="bg-white/10 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
                        <User className="w-5 h-5 text-primary" />
                        <span className="text-sm font-bold text-white">Шиномонтаж</span>
                      </div>
                      <img src="https://picsum.photos/seed/barber/300/300" alt="Barber" className="w-full rounded-3xl shadow-lg" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-amber-400/10 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Stats — универсальный StatsBlock (переиспользуемый) */}
      <StatsBlock
        title="Нам доверяют"
        subtitle="Компании уже ведут учёт и общаются с клиентами через Uchetgram"
        variant="light"
        columns={4}
        stats={[
          { value: '500+', label: 'компаний' },
          { value: '50K+', label: 'записей в месяц' },
          { value: '24/7', label: 'поддержка в Telegram' },
          { value: '95%', label: 'рекомендуют коллегам' },
        ]}
        className="rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px]"
      />

      {/* 9. Integrations — Telegram в приоритете */}
      <section className="py-24 md:py-32 bg-slate-50 rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mb-4">Интеграции</h2>
            <p className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto">
              Telegram — из коробки. Плюс платёжные системы, 1С, виджеты на сайт и API для своих доработок.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              onClick={() => navigate('/integrations')}
              className="group text-left p-6 md:p-8 rounded-2xl bg-white border-2 border-primary/30 hover:border-primary hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/15 flex items-center justify-center text-primary mb-5 group-hover:bg-primary group-hover:text-white transition-colors">
                <Send className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-lg text-ink mb-2">Telegram</h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Бот для сотрудников, клиенты пишут в TG, заявки сразу в CRM. Главная интеграция.
              </p>
            </motion.button>
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              onClick={() => navigate('/integrations')}
              className="group text-left p-6 md:p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-ink-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors mb-5">
                <CreditCard className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-lg text-ink mb-2">Платежи</h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Stripe, платёжные виджеты, привязка карт и онлайн-оплата услуг.
              </p>
            </motion.button>
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              onClick={() => navigate('/integrations')}
              className="group text-left p-6 md:p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-ink-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors mb-5">
                <Globe className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-lg text-ink mb-2">Виджет на сайт</h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                Запись на услуги прямо с вашего сайта. Конвертируйте трафик в записи.
              </p>
            </motion.button>
            <motion.button
              type="button"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              onClick={() => navigate('/integrations')}
              className="group text-left p-6 md:p-8 rounded-2xl bg-white border border-slate-200 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-ink-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors mb-5">
                <Cpu className="w-7 h-7" />
              </div>
              <h3 className="font-display font-bold text-lg text-ink mb-2">API и 1С</h3>
              <p className="text-sm text-ink-muted leading-relaxed">
                REST API для своих скриптов. Синхронизация с 1С и внешними системами.
              </p>
            </motion.button>
          </div>
          <div className="text-center">
            <Button variant="outline" className="rounded-xl px-6" onClick={() => navigate('/integrations')}>
              Все интеграции
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );

  return (
    <div className="min-h-screen bg-white text-ink font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      {/* Navigation — форма всегда: тёмный градиент + скругление снизу */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-8 py-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-b-[32px] md:rounded-b-[40px] border-b-0 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 md:gap-8">
            <Link to="/" className="flex items-center gap-2">
              <Logo showText={true} textOnDark className="h-7 md:h-8 w-auto" />
            </Link>
            {/* Пункты навигации — выпадающее под своим пунктом, отступ 15px */}
            <div className="hidden lg:flex items-center gap-1">
              <div
                className="relative"
                onMouseEnter={() => {
                  setActiveMegaMenu('features');
                  document.dispatchEvent(new CustomEvent('header-menu-open', { detail: 'mega' }));
                }}
              >
                <div className={`flex items-center gap-1 cursor-pointer ${headerBtnClass}`}>
                  <span>Возможности</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      activeMegaMenu === 'features' ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {activeMegaMenu === 'features' && renderMegaMenuFeatures()}
                </AnimatePresence>
              </div>
              <div
                className="relative"
                onMouseEnter={() => {
                  setActiveMegaMenu('industries');
                  document.dispatchEvent(new CustomEvent('header-menu-open', { detail: 'mega' }));
                }}
              >
                <div className={`flex items-center gap-1 cursor-pointer ${headerBtnClass}`}>
                  <span>Для кого</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      activeMegaMenu === 'industries' ? 'rotate-180' : ''
                    }`}
                  />
                </div>
                <AnimatePresence>
                  {activeMegaMenu === 'industries' && renderMegaMenuIndustries()}
                </AnimatePresence>
              </div>
              <Link to="/integrations" className={headerBtnClass}>
                Интеграции
              </Link>
              <Link to="/pricing" className={headerBtnClass}>
                Цены
              </Link>
              <Link to="/about" className={headerBtnClass}>
                О компании
              </Link>
              <Link to="/contact" className={headerBtnClass}>
                Контакты
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitcher variant="dark" size="sm" />
            <Button
              variant="outline"
              className="rounded-lg px-4 md:px-6 h-9 md:h-10 font-semibold text-xs md:text-sm border-white/40 text-white hover:bg-white/15 hover:border-white/60 transition-colors"
              onClick={onEnterApp}
            >
              Войти
            </Button>

            <button
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/15 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Overlay for closing mega menu on click outside */}
        <AnimatePresence>
          {activeMegaMenu && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 hidden lg:block"
              onClick={() => setActiveMegaMenu(null)}
            />
          )}
        </AnimatePresence>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 top-[73px] bg-white z-[90] lg:hidden overflow-y-auto px-6 py-8"
            >
              <div className="flex flex-col gap-8">
                <div className="space-y-4">
                  <p className="text-[10px] font-black text-ink-muted uppercase tracking-[0.2em] mb-4">Меню</p>
                  <div className="space-y-6">
              <Link to="/modules" className="flex items-center justify-between text-2xl font-display font-black" onClick={() => setIsMenuOpen(false)}>
                Возможности <ArrowRight className="w-6 h-6 text-primary" />
              </Link>
              <Link to="/business/beauty" className="flex items-center justify-between text-2xl font-display font-black" onClick={() => setIsMenuOpen(false)}>
                Для кого <ArrowRight className="w-6 h-6 text-primary" />
              </Link>
              <Link to="/integrations" className="flex items-center justify-between text-2xl font-display font-black" onClick={() => setIsMenuOpen(false)}>
                Интеграции <ArrowRight className="w-6 h-6 text-primary" />
              </Link>
              <Link to="/pricing" className="flex items-center justify-between text-2xl font-display font-black" onClick={() => setIsMenuOpen(false)}>
                Цены <ArrowRight className="w-6 h-6 text-primary" />
              </Link>
              <Link to="/about" className="flex items-center justify-between text-2xl font-display font-black" onClick={() => setIsMenuOpen(false)}>
                О компании <ArrowRight className="w-6 h-6 text-primary" />
              </Link>
              <Link to="/contact" className="flex items-center justify-between text-2xl font-display font-black" onClick={() => setIsMenuOpen(false)}>
                Контакты <ArrowRight className="w-6 h-6 text-primary" />
              </Link>
                  </div>
                </div>

                <div className="pt-8 border-t border-border space-y-4">
                  <Button 
                    variant="primary" 
                    className="w-full h-16 rounded-2xl bg-primary text-white font-black uppercase tracking-widest text-sm"
                    onClick={onEnterApp}
                  >
                    Попробовать бесплатно
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full h-16 rounded-2xl border-ink/10 font-black uppercase tracking-widest text-sm"
                    onClick={onEnterApp}
                  >
                    Войти в систему
                  </Button>
                </div>

                <div className="pt-8 flex justify-center gap-6 text-ink-muted">
                  <Globe className="w-6 h-6" />
                  <Smartphone className="w-6 h-6" />
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main>{renderHome()}</main>

      {/* CTA Section */}
      <section className="py-32 px-8">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-[32px] md:rounded-[40px] p-12 md:p-16 text-center text-white relative overflow-hidden border border-white/5 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
          <div className="relative z-10 space-y-6 md:space-y-8">
            <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight">{t('landing.cta.title')}</h2>
            <p className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto">
              {t('landing.cta.subtitle')}
            </p>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4 pt-2">
              <Button
                variant="primary"
                className="h-12 md:h-14 px-8 md:px-10 text-base md:text-lg rounded-xl md:rounded-2xl bg-primary hover:bg-primary-hover text-white border-none"
                onClick={onEnterApp}
              >
                {t('landing.cta.button')}
              </Button>
              <button
                type="button"
                className="h-12 md:h-14 px-8 md:px-10 text-base md:text-lg rounded-xl md:rounded-2xl border border-white/20 text-white hover:bg-white/10 transition-colors font-semibold"
              >
                {t('landing.cta.contact')}
              </button>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-400/10 rounded-full blur-[100px]" />
        </div>
      </section>

      {/* Footer — в стиле шапки: тёмный градиент, скругление сверху */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-t-[32px] md:rounded-t-[40px] pt-16 pb-8 px-6 md:px-8 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            <div className="space-y-5">
              <Logo showText textOnDark className="h-7 md:h-8 w-auto" />
              <p className="text-sm text-white/70 leading-relaxed max-w-xs">
                {t('landing.footer.desc')}
              </p>
            </div>
            <div>
              <h4 className="font-display font-bold text-white mb-5 text-sm">Продукт</h4>
              <ul className="space-y-3.5 text-sm">
                <li><Link to="/modules" className="block text-white/70 hover:text-white hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">Модули</Link></li>
                <li><Link to="/pricing" className="block text-white/70 hover:text-white hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">Цены</Link></li>
                <li><Link to="/integrations" className="block text-white/70 hover:text-white hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">Интеграции</Link></li>
                <li><Link to="/api" className="block text-white/70 hover:text-white hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-white mb-5 text-sm">Компания</h4>
              <ul className="space-y-3.5 text-sm">
                <li><Link to="/about" className="block text-white/70 hover:text-white hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">О нас</Link></li>
                <li><Link to="/investors" className="block text-white/70 hover:text-white hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">Инвесторам</Link></li>
                <li><Link to="/careers" className="block text-white/70 hover:text-white hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">Карьера</Link></li>
                <li><Link to="/contact" className="block text-white/70 hover:text-white hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">Контакты</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-white mb-5 text-sm">Поддержка</h4>
              <ul className="space-y-3.5 text-sm">
                <li><Link to="/help" className="block text-white/70 hover:text-white hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">Помощь</Link></li>
                <li><Link to="/solutions" className="block text-white/70 hover:text-white hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">Решения</Link></li>
                <li><Link to="/status" className="block text-white/70 hover:text-white hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">Статус</Link></li>
                <li><Link to="/privacy" className="block text-white/70 hover:text-white hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">Конфиденциальность</Link></li>
                <li><Link to="/terms" className="block text-white/70 hover:text-white hover:bg-white/5 -mx-2 px-2 py-1 rounded-lg transition-colors">Условия</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50 font-semibold uppercase tracking-wider">
            <span>© 2024 Uchetgram. Все права защищены.</span>
            <div className="flex gap-6 md:gap-8">
              <a href="#" className="text-white/50 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="text-white/50 hover:text-white transition-colors">Telegram</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
