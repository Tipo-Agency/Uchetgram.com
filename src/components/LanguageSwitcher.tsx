import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const languages = [
  { code: 'ru', label: 'RU' },
  { code: 'uz', label: 'UZ' },
  { code: 'en', label: 'EN' },
];

export const LanguageSwitcher: React.FC<{
  variant?: 'light' | 'dark';
  /** В тёмной шапке — в одном стиле с кнопками навигации (без рамки, компактно) */
  size?: 'default' | 'sm';
}> = ({ variant = 'light', size = 'default' }) => {
  const isDark = variant === 'dark';
  const isSm = size === 'sm';
  const { i18n } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const current = languages.find((l) => l.code === i18n.language) ?? languages[0];

  // Закрытие при клике вне
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Гарантия, что открыт только один дропдаун в шапке
  React.useEffect(() => {
    const handleHeaderMenu = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail !== 'language') {
        setOpen(false);
      }
    };
    document.addEventListener('header-menu-open', handleHeaderMenu as EventListener);
    return () => document.removeEventListener('header-menu-open', handleHeaderMenu as EventListener);
  }, []);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setOpen(false);
  };

  const toggle = () => {
    const next = !open;
    setOpen(next);
    if (next) {
      document.dispatchEvent(new CustomEvent('header-menu-open', { detail: 'language' }));
    }
  };

  const triggerClass = isDark && isSm
    ? 'flex items-center justify-center gap-1 rounded-lg h-8 px-3 text-xs font-semibold text-white/90 hover:bg-white/15 hover:text-white transition-colors min-w-[4.5rem]'
    : isDark
      ? 'flex items-center justify-between gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors w-20 bg-white/15 text-white/90 hover:bg-white/25 border border-white/20'
      : 'flex items-center justify-between gap-1 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors w-20 bg-slate-100 text-ink-muted hover:bg-slate-200';

  return (
    <div ref={containerRef} className="relative inline-block">
      <button type="button" onClick={toggle} className={triggerClass}>
        <Globe className={`w-3.5 h-3.5 shrink-0 ${isDark ? 'text-white/80' : 'text-primary/80'}`} />
        <span>{current.label}</span>
        <ChevronDown
          className={`w-3 h-3 shrink-0 transition-transform ${isDark ? 'text-white/70' : 'text-slate-400'} ${open ? 'rotate-180' : ''}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className={`absolute right-0 mt-1.5 z-50 overflow-hidden rounded-xl border shadow-xl ${
              isDark
                ? 'w-[4.5rem] min-w-[4.5rem] bg-slate-800 border-white/10 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.4)]'
                : 'w-20 bg-white border-border'
            }`}
          >
            {languages.map((lang) => {
              const isActive = i18n.language === lang.code;
              return (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => changeLanguage(lang.code)}
                  className={`w-full px-3 py-2 text-left text-xs font-semibold transition-colors first:pt-2.5 last:pb-2.5 ${
                    isDark
                      ? isActive
                        ? 'bg-primary text-white'
                        : 'text-white/90 hover:bg-white/10'
                      : isActive
                        ? 'bg-primary text-white'
                        : 'hover:bg-slate-50 text-ink-muted'
                  }`}
                >
                  {lang.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
