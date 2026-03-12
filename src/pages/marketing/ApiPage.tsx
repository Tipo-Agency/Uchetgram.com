import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketingPageTemplate } from './MarketingPageTemplate';
import { motion } from 'motion/react';
import { Code, Book, Key } from 'lucide-react';

export const ApiPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MarketingPageTemplate
      title="API"
      subtitle="REST API для интеграций: свои скрипты, синхронизация с 1С и внешними системами."
      badge="Разработчикам"
      onEnterApp={() => navigate('/app')}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="space-y-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <Code className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display font-bold text-ink">REST API</h3>
            <p className="text-sm text-ink-muted mt-2">CRUD по клиентам, записям, услугам, транзакциям. Webhooks для событий.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <Key className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display font-bold text-ink">Авторизация</h3>
            <p className="text-sm text-ink-muted mt-2">API-ключи в личном кабинете. OAuth для сторонних приложений — в планах.</p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <Book className="w-10 h-10 text-primary mb-4" />
            <h3 className="font-display font-bold text-ink">Документация</h3>
            <p className="text-sm text-ink-muted mt-2">OpenAPI (Swagger). Доступна после регистрации в разделе «Настройки → API».</p>
          </div>
        </div>
        <div className="p-6 rounded-2xl bg-slate-900 text-white font-mono text-sm overflow-x-auto">
          <pre>{`GET /api/v1/clients
GET /api/v1/appointments
POST /api/v1/bookings
...`}</pre>
        </div>
        <p className="text-ink-muted text-sm">
          Полная документация и лимиты — в личном кабинете после входа. Вопросы по API: <a href="mailto:api@uchetgram.com" className="text-primary hover:underline">api@uchetgram.com</a>.
        </p>
      </motion.section>
    </MarketingPageTemplate>
  );
};
