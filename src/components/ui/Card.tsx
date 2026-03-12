import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, subtitle, footer, onClick }) => {
  return (
    <div 
      className={`bg-white border border-border rounded-xl overflow-hidden ${onClick ? 'cursor-pointer hover:border-primary/30 transition-colors' : ''} ${className}`}
      onClick={onClick}
    >
      {(title || subtitle) && (
        <div className="px-6 py-4 border-b border-border">
          {title && <h3 className="text-lg font-semibold text-ink">{title}</h3>}
          {subtitle && <p className="text-sm text-ink-muted mt-1">{subtitle}</p>}
        </div>
      )}
      <div className="px-6 py-4">
        {children}
      </div>
      {footer && (
        <div className="px-6 py-4 bg-slate-50 border-t border-border">
          {footer}
        </div>
      )}
    </div>
  );
};
