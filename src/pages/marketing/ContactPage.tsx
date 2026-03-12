import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketingPageTemplate } from './MarketingPageTemplate';
import { motion } from 'motion/react';
import { Mail, MessageSquare, MapPin } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MarketingPageTemplate
      title="Контакты"
      subtitle="Свяжитесь с нами по любым вопросам: продажи, поддержка, партнёрство."
      badge="Связаться"
      onEnterApp={() => navigate('/app')}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <a href="mailto:hello@uchetgram.com" className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/30 transition-colors group">
            <Mail className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-bold text-ink mb-2">Email</h3>
            <p className="text-ink-muted text-sm">hello@uchetgram.com</p>
            <p className="text-xs text-ink-muted mt-1">Ответ в течение 24 часов</p>
          </a>
          <a href="https://t.me/uchetgram" target="_blank" rel="noopener noreferrer" className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-primary/30 transition-colors group">
            <MessageSquare className="w-10 h-10 text-primary mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-display font-bold text-ink mb-2">Telegram</h3>
            <p className="text-ink-muted text-sm">@uchetgram</p>
            <p className="text-xs text-ink-muted mt-1">Поддержка и вопросы</p>
          </a>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <MapPin className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display font-bold text-ink mb-2">Офис</h3>
            <p className="text-ink-muted text-sm">По предварительной записи</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
          <h3 className="font-display font-bold text-ink mb-2">Отдел продаж</h3>
          <p className="text-ink-muted text-sm mb-4">Корпоративные тарифы, интеграции, индивидуальные условия.</p>
          <a href="mailto:sales@uchetgram.com" className="text-primary font-semibold hover:underline">sales@uchetgram.com</a>
        </div>
      </motion.section>
    </MarketingPageTemplate>
  );
};
