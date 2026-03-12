import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketingLayout } from '@/src/components/layout/MarketingLayout';
import { motion } from 'motion/react';
import { Button } from '@/src/components/ui/Button';
import { Send, Bot, MessageSquare, Workflow, CreditCard, Globe, Cpu, Lock, ArrowRight } from 'lucide-react';

export const IntegrationsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MarketingLayout showCta={true}>
      <section className="pt-28 md:pt-36 pb-16 md:pb-24 px-6 md:px-8 bg-white rounded-b-[48px] md:rounded-b-[64px] overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6">
            <Send className="w-4 h-4" />
            <span>Telegram из коробки</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-ink mb-6">
            Интеграции
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto mb-10">
            Telegram — по умолчанию. Плюс платёжные системы, 1С, виджеты на сайт и API.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
            <Button variant="primary" className="rounded-xl px-6 h-11" onClick={() => navigate('/app')}>
              Подключить интеграции
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-t-[48px] md:rounded-t-[64px] rounded-b-[48px] md:rounded-b-[64px] overflow-hidden text-white mx-6 md:mx-8 mb-12">
        <div className="max-w-7xl mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-6">Telegram — в центре системы</h2>
          <p className="text-center text-white/70 max-w-2xl mx-auto mb-16">Сотрудники работают в боте, клиенты пишут в мессенджере.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Bot, title: 'Бот для сотрудников', desc: 'Задачи, уведомления, отчёты — всё в одном чате.' },
              { icon: MessageSquare, title: 'Клиенты в Telegram', desc: 'Запись, напоминания, оплата. Сообщения в карточку клиента.' },
              { icon: Workflow, title: 'Связка с CRM', desc: 'Заявка из чата → лид → задача. Без копирования.' },
            ].map((item, idx) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.08 }} className="bg-white/5 rounded-2xl p-8 border border-white/10 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/30 flex items-center justify-center mx-auto mb-6">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold mb-3">{item.title}</h3>
                <p className="text-sm text-white/70">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 bg-white rounded-[32px] mx-6 md:mx-8 mb-12 px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-ink mb-4 text-center">Платежи, сайт, API</h2>
          <p className="text-center text-ink-muted max-w-2xl mx-auto mb-16">Stripe, виджет на сайт, REST API, 1С.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: CreditCard, title: 'Платежи', desc: 'Stripe, платёжные виджеты, онлайн-оплата.' },
              { icon: Globe, title: 'Виджет на сайт', desc: 'Запись на услуги с вашего сайта.' },
              { icon: Cpu, title: 'API', desc: 'REST API для своих скриптов.' },
              { icon: Lock, title: '1С и кассы', desc: 'Синхронизация по мере выхода.' },
            ].map((item, idx) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                  <item.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-ink mb-2">{item.title}</h3>
                <p className="text-sm text-ink-muted">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MarketingLayout>
  );
};
