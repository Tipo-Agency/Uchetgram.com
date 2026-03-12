import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MarketingPageTemplate } from './MarketingPageTemplate';
import { motion } from 'motion/react';

export const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <MarketingPageTemplate
      title="Политика конфиденциальности"
      subtitle="Правила обработки персональных данных в Uchetgram."
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
          Настоящая политика определяет порядок сбора, хранения и использования персональных данных пользователей сервиса Uchetgram («Сервис»). Используя Сервис, вы соглашаетесь с этой политикой.
        </p>
        <h3 className="text-ink font-display font-bold mt-8 mb-2">1. Какие данные мы обрабатываем</h3>
        <p className="leading-relaxed">
          Мы обрабатываем данные, необходимые для регистрации и работы в Сервисе: email, имя, данные телефона, данные учётной записи Telegram, а также данные, которые вы вносите в Сервис (клиенты, записи, транзакции).
        </p>
        <h3 className="text-ink font-display font-bold mt-8 mb-2">2. Цели обработки</h3>
        <p className="leading-relaxed">
          Обеспечение работы Сервиса, техподдержка, улучшение продукта, соблюдение законодательства.
        </p>
        <h3 className="text-ink font-display font-bold mt-8 mb-2">3. Передача данных</h3>
        <p className="leading-relaxed">
          Мы не передаём персональные данные третьим лицам в маркетинговых целях. Данные могут передаваться провайдерам инфраструктуры и по требованию закона.
        </p>
        <h3 className="text-ink font-display font-bold mt-8 mb-2">4. Контакты</h3>
        <p className="leading-relaxed">
          По вопросам персональных данных: <a href="mailto:privacy@uchetgram.com" className="text-primary hover:underline">privacy@uchetgram.com</a>.
        </p>
      </motion.section>
    </MarketingPageTemplate>
  );
};
