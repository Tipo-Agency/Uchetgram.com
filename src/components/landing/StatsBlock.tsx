import React from 'react';
import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

export type StatItem = {
  value: string;
  label: string;
  suffix?: string;
  icon?: LucideIcon;
  trend?: { value: string; up: boolean };
};

export type StatsBlockProps = {
  title: string;
  subtitle?: string;
  stats: StatItem[];
  variant?: 'light' | 'dark';
  columns?: 2 | 3 | 4 | 5;
  className?: string;
};

/**
 * Универсальный блок статистики для лендингов и маркетинговых страниц.
 * Поддерживает light/dark темы, иконки, тренды, гибкое количество колонок.
 */
export const StatsBlock: React.FC<StatsBlockProps> = ({
  title,
  subtitle,
  stats,
  variant = 'light',
  columns = 4,
  className = '',
}) => {
  const isDark = variant === 'dark';
  const colClass = {
    2: 'grid-cols-2',
    3: 'grid-cols-2 md:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 md:grid-cols-5',
  }[columns];

  return (
    <section
      className={`
        py-20 md:py-28 overflow-hidden
        ${isDark ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white' : 'bg-white text-ink'}
        ${className}
      `}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-14 md:mb-16">
          <h2 className={`text-3xl md:text-5xl font-display font-bold tracking-tight ${isDark ? 'text-white' : 'text-ink'}`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`mt-4 text-lg max-w-xl mx-auto ${isDark ? 'text-white/70' : 'text-ink-muted'}`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={`grid ${colClass} gap-8 md:gap-12`}>
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.08 }}
              className="relative group"
            >
              <div
                className={`
                  rounded-2xl p-6 md:p-8 border transition-all duration-300
                  ${isDark
                    ? 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                    : 'bg-slate-50/80 border-slate-200 hover:bg-white hover:border-primary/20 hover:shadow-lg'
                  }
                `}
              >
                {stat.icon && (
                  <div
                    className={`
                      w-12 h-12 rounded-xl flex items-center justify-center mb-4
                      ${isDark ? 'bg-primary/30 text-primary' : 'bg-primary/10 text-primary'}
                    `}
                  >
                    <stat.icon className="w-6 h-6" />
                  </div>
                )}
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span
                    className={`text-3xl md:text-4xl lg:text-5xl font-display font-bold tabular-nums ${
                      isDark ? 'text-white' : 'text-primary'
                    }`}
                  >
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className={`text-xl md:text-2xl font-semibold ${isDark ? 'text-white/80' : 'text-ink-muted'}`}>
                      {stat.suffix}
                    </span>
                  )}
                </div>
                {stat.trend && (
                  <span
                    className={`inline-block mt-2 text-sm font-semibold ${
                      stat.trend.up ? 'text-emerald-500' : 'text-red-500'
                    }`}
                  >
                    {stat.trend.value}
                  </span>
                )}
                <p className={`mt-2 font-medium ${isDark ? 'text-white/70' : 'text-ink-muted'}`}>
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
