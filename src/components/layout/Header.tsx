import React from 'react';
import { Bell, Search, User, Plus, CheckSquare, TrendingUp, FileText, Wallet } from 'lucide-react';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useTranslation } from 'react-i18next';

interface HeaderProps {
  title: string;
  onAddTask?: () => void;
  onAddDeal?: () => void;
  onAddDocument?: () => void;
  onAddRequest?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onAddTask,
  onAddDeal,
  onAddDocument,
  onAddRequest,
}) => {
  const { t } = useTranslation();

  const addItems = [
    { id: 'task', label: t('dashboard.action_task', { defaultValue: 'Задача' }), icon: <CheckSquare className="w-4 h-4" />, onClick: () => onAddTask?.() },
    { id: 'deal', label: 'Сделка', icon: <TrendingUp className="w-4 h-4" />, onClick: () => onAddDeal?.() },
    { id: 'document', label: t('dashboard.action_document', { defaultValue: 'Документ' }), icon: <FileText className="w-4 h-4" />, onClick: () => onAddDocument?.() },
    { id: 'request', label: 'Заявка на расход', icon: <Wallet className="w-4 h-4" />, onClick: () => onAddRequest?.() },
  ];

  return (
    <header className="h-16 bg-white border-b border-border px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-ink">{title}</h1>
        <div className="hidden md:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 border border-transparent focus-within:border-primary/30 focus-within:bg-white transition-all">
          <Search className="w-4 h-4 text-ink-muted shrink-0" />
          <input
            type="text"
            placeholder={t('common.search')}
            className="bg-transparent border-none outline-none ml-2 text-sm w-64 text-ink placeholder:text-ink-muted"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />

        <div className="h-8 w-px bg-border mx-1" />

        <Dropdown
          align="right"
          items={addItems}
          trigger={
            <Button variant="primary" size="sm" className="hidden sm:inline-flex focus:ring-2 focus:ring-primary/30">
              <Plus className="w-4 h-4 mr-2" />
              {t('common.add')}
            </Button>
          }
        />

        <div className="h-8 w-px bg-border mx-1" />

        <Button
          variant="ghost"
          size="icon"
          className="relative text-ink-muted hover:text-primary hover:bg-primary/5 rounded-lg"
          aria-label="Уведомления"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </Button>

        <Button
          variant="ghost"
          className="flex items-center gap-2 p-1 pl-2 rounded-lg border border-transparent hover:border-border hover:bg-slate-50"
        >
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-ink leading-none">Александр Д.</p>
            <p className="text-[10px] text-ink-muted mt-0.5">Администратор</p>
          </div>
          <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden shrink-0">
            <User className="w-5 h-5 text-slate-500" />
          </div>
        </Button>
      </div>
    </header>
  );
};
