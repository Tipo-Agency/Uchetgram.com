import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Wallet, 
  FileText, 
  CheckSquare, 
  GitBranch, 
  BarChart3, 
  Settings,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';
import { ModuleId } from '@/src/types';
import { Logo } from '../ui/Logo';
import { useTranslation } from 'react-i18next';

interface SidebarProps {
  activeModule: ModuleId;
  onModuleChange: (id: ModuleId) => void;
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const menuItems = [
  { id: 'dashboard', translationKey: 'nav.dashboard', icon: LayoutDashboard },
  { id: 'sales', translationKey: 'nav.crm', icon: TrendingUp },
  { id: 'finance', translationKey: 'nav.finance', icon: Wallet },
  { id: 'documents', translationKey: 'nav.documents', icon: FileText },
  { id: 'tasks', translationKey: 'nav.tasks', icon: CheckSquare },
  { id: 'processes', translationKey: 'nav.processes', icon: GitBranch },
  { id: 'analytics', translationKey: 'nav.analytics', icon: BarChart3 },
  { id: 'marketplace', translationKey: 'nav.marketplace', icon: ShoppingBag },
  { id: 'settings', translationKey: 'nav.settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange, isCollapsed, setIsCollapsed }) => {
  const { t } = useTranslation();

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      className="h-screen bg-white border-r border-border flex flex-col sticky top-0 z-50"
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Logo showText={!isCollapsed} className="h-8 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onModuleChange(item.id as ModuleId)}
              className={`w-full flex items-center px-3 py-2.5 rounded-lg transition-all group relative ${
                isActive 
                  ? 'bg-primary/5 text-primary' 
                  : 'text-ink-muted hover:bg-slate-50 hover:text-ink'
              }`}
            >
              <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-primary' : 'text-ink-muted group-hover:text-ink'}`} />
              {!isCollapsed && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-3 text-sm font-medium"
                >
                  {t(item.translationKey)}
                </motion.span>
              )}
              {isActive && (
                <motion.div 
                  layoutId="active-pill"
                  className="absolute left-0 w-1 h-6 bg-primary rounded-r-full"
                />
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-border">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full flex items-center px-3 py-2 rounded-lg text-ink-muted hover:bg-slate-50 transition-colors"
        >
          {isCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          {!isCollapsed && <span className="ml-3 text-sm font-medium">{isCollapsed ? '' : t('common.collapse', { defaultValue: 'Свернуть' })}</span>}
        </button>
        <button className="w-full flex items-center px-3 py-2 mt-1 rounded-lg text-red-500 hover:bg-red-50 transition-colors">
          <LogOut className="w-5 h-5" />
          {!isCollapsed && <span className="ml-3 text-sm font-medium">{t('common.logout')}</span>}
        </button>
      </div>
    </motion.aside>
  );
};
