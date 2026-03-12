import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketingPageTemplate } from './MarketingPageTemplate';
import { motion } from 'motion/react';

export const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MarketingPageTemplate
      title="Пользовательское соглашение"
      subtitle="Условия использования сервиса Uchetgram."
      badge="Юридическая информация"
      onEnterApp={() => navigate('/app')}
      showCtaBlock={false}
    >
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="prose prose-slate max-w-none text-ink-muted"
      >
        <p className="leading-relaxed">
          Регистрируясь и используя Сервис Uchetgram, вы принимаете условия настоящего соглашения. Если вы не согласны с ними, не используйте Сервис.
        </p>
        <h3 className="text-ink font-display font-bold mt-8 mb-2">1. Предмет соглашения</h3>
        <p className="leading-relaxed">
          Сервис предоставляет платформу для учёта, записи клиентов и управления бизнес-процессами. Доступ предоставляется по тарифам, описанным на странице «Цены».
        </p>
        <h3 className="text-ink font-display font-bold mt-8 mb-2">2. Обязанности пользователя</h3>
        <p className="leading-relaxed">
          Вы обязуетесь предоставлять достоверные данные, соблюдать законодательство и не использовать Сервис для противоправной деятельности.
        </p>
        <h3 className="text-ink font-display font-bold mt-8 mb-2">3. Ограничение ответственности</h3>
        <p className="leading-relaxed">
          Сервис предоставляется «как есть». Мы прилагаем усилия для стабильной работы, но не гарантируем бесперебойность при форс-мажоре или работах.
        </p>
        <h3 className="text-ink font-display font-bold mt-8 mb-2">4. Контакты</h3>
        <p className="leading-relaxed">
          Вопросы по соглашению: <a href="mailto:legal@uchetgram.com" className="text-primary hover:underline">legal@uchetgram.com</a>.
        </p>
      </motion.section>
    </MarketingPageTemplate>
  );
};
