import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '@/src/components/ui/Logo';
import { Button } from '@/src/components/ui/Button';
import { LanguageSwitcher } from '@/src/components/LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const headerBtnClass =
  'rounded-lg h-8 px-3 text-xs font-semibold text-white/90 hover:bg-white/15 hover:text-white transition-colors';

export const MarketingLayout: React.FC<{ children: React.ReactNode; showCta?: boolean }> = ({
  children,
  showCta = true,
}) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-white text-ink font-sans selection:bg-primary selection:text-white overflow-x-hidden">
      <nav className="fixed top-0 left-0 right-0 z-[100] px-6 md:px-8 py-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-b-[32px] md:rounded-b-[40px] border-b-0 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Logo showText textOnDark className="h-7 md:h-8 w-auto" />
          </Link>
          <div className="hidden lg:flex items-center gap-1">
            <Link to="/modules" className={headerBtnClass}>
              Возможности
            </Link>
            <Link to="/business/beauty" className={headerBtnClass}>
              Для кого
            </Link>
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
          <div className="flex items-center gap-2 md:gap-3">
            <LanguageSwitcher variant="dark" size="sm" />
            <Button
              variant="outline"
              className="rounded-lg px-4 md:px-6 h-9 md:h-10 font-semibold text-xs md:text-sm border-white/40 text-white hover:bg-white/15 hover:border-white/60 transition-colors"
              onClick={() => navigate('/app')}
            >
              Войти
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-20">{children}</main>

      {showCta && (
        <section className="py-24 px-6 md:px-8">
          <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-800 to-slate-900 rounded-[32px] md:rounded-[40px] p-10 md:p-14 text-center text-white relative overflow-hidden border border-white/5">
            <div className="relative z-10 space-y-6">
              <h2 className="text-3xl md:text-4xl font-display font-bold">{t('landing.cta.title')}</h2>
              <p className="text-white/70 text-lg max-w-xl mx-auto">{t('landing.cta.subtitle')}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Button variant="primary" className="rounded-xl h-12 px-8" onClick={() => navigate('/app')}>
                  {t('landing.cta.button')}
                </Button>
                <a
                  href="mailto:hello@uchetgram.com"
                  className="inline-flex items-center justify-center h-12 px-8 rounded-xl border border-white/20 text-white hover:bg-white/10 font-semibold transition-colors"
                >
                  Связаться
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-t-[32px] md:rounded-t-[40px] pt-14 pb-8 px-6 md:px-8 text-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            <div className="space-y-4">
              <Logo showText textOnDark className="h-7 md:h-8 w-auto" />
              <p className="text-sm text-white/70 max-w-xs">{t('landing.footer.desc')}</p>
            </div>
            <div>
              <h4 className="font-display font-bold text-white mb-4 text-sm">Продукт</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/modules" className="text-white/70 hover:text-white hover:underline">Модули</Link></li>
                <li><Link to="/pricing" className="text-white/70 hover:text-white hover:underline">Цены</Link></li>
                <li><Link to="/api" className="text-white/70 hover:text-white hover:underline">API</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-white mb-4 text-sm">Компания</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="text-white/70 hover:text-white hover:underline">О нас</Link></li>
                <li><Link to="/careers" className="text-white/70 hover:text-white hover:underline">Карьера</Link></li>
                <li><Link to="/contact" className="text-white/70 hover:text-white hover:underline">Контакты</Link></li>
                <li><Link to="/investors" className="text-white/70 hover:text-white hover:underline">Инвесторам</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-display font-bold text-white mb-4 text-sm">Поддержка</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/help" className="text-white/70 hover:text-white hover:underline">Помощь</Link></li>
                <li><Link to="/status" className="text-white/70 hover:text-white hover:underline">Статус</Link></li>
                <li><Link to="/privacy" className="text-white/70 hover:text-white hover:underline">Конфиденциальность</Link></li>
                <li><Link to="/terms" className="text-white/70 hover:text-white hover:underline">Условия</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/50 font-semibold uppercase tracking-wider">
            <span>© 2024 Uchetgram. Все права защищены.</span>
            <div className="flex gap-6">
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
