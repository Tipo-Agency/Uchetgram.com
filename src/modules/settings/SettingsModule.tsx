import React, { useState } from 'react';
import { 
  Settings, 
  Users, 
  Zap, 
  Shield, 
  CreditCard, 
  Bell, 
  Globe, 
  Lock, 
  Plus, 
  MoreVertical, 
  Check, 
  X, 
  ExternalLink, 
  Save, 
  Trash2, 
  Mail, 
  Key, 
  Smartphone, 
  Layout,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

// Mock Data
const mockUsers = [
  { id: 'u1', name: 'Алексей Иванов', email: 'alex@uchetgram.ru', role: 'Администратор', status: 'ACTIVE', avatar: 'https://picsum.photos/seed/u1/100/100' },
  { id: 'u2', name: 'Мария Петрова', email: 'maria@uchetgram.ru', role: 'Менеджер', status: 'ACTIVE', avatar: 'https://picsum.photos/seed/u2/100/100' },
  { id: 'u3', name: 'Иван Сидоров', email: 'ivan@uchetgram.ru', role: 'Бухгалтер', status: 'INVITED', avatar: 'https://picsum.photos/seed/u3/100/100' },
];

export const SettingsModule: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<SettingsTab>('general');
  const [companyName, setCompanyName] = useState('Uchetgram Corp');

  const integrations = [
    { id: '1c', name: '1С:Предприятие', status: 'CONNECTED', lastSync: '10 мин. назад', icon: '🏢' },
    { id: 'tinkoff', name: 'Тинькофф Бизнес', status: 'CONNECTED', lastSync: '1 час назад', icon: '🏦' },
    { id: 'telegram', name: 'Telegram Bot', status: 'DISCONNECTED', lastSync: '-', icon: '✈️' },
    { id: 'amocrm', name: 'amoCRM', status: 'DISCONNECTED', lastSync: '-', icon: '🎯' },
  ];

  const menuItems: { id: SettingsTab; label: string; icon: React.ReactNode }[] = [
    { id: 'general', label: t('settings.tabs.general'), icon: <Globe className="w-4 h-4" /> },
    { id: 'users', label: t('settings.tabs.users'), icon: <Users className="w-4 h-4" /> },
    { id: 'integrations', label: t('settings.tabs.integrations'), icon: <Zap className="w-4 h-4" /> },
    { id: 'security', label: t('settings.tabs.security'), icon: <Lock className="w-4 h-4" /> },
    { id: 'billing', label: t('settings.tabs.billing'), icon: <CreditCard className="w-4 h-4" /> },
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex overflow-hidden bg-slate-50/50">
      {/* Sidebar */}
      <div className="w-72 bg-white border-r border-border flex flex-col shrink-0">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-bold text-ink flex items-center gap-2">
            <Settings className="w-5 h-5 text-primary" /> {t('settings.title')}
          </h2>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-primary/5 text-primary shadow-sm ring-1 ring-primary/10' 
                  : 'text-ink-muted hover:bg-slate-50 hover:text-ink'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                {item.label}
              </div>
              <ChevronRight className={`w-4 h-4 transition-transform ${activeTab === item.id ? 'translate-x-1' : 'opacity-0'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-12 custom-scrollbar">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {activeTab === 'general' && (
              <motion.div
                key="general"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-ink">{t('settings.general.title')}</h3>
                  <p className="text-sm text-ink-muted">{t('settings.general.desc')}</p>
                </div>

                <Card className="p-8 space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-ink-muted uppercase tracking-wider">{t('settings.general.company_name')}</label>
                    <input 
                      type="text" 
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-border rounded-xl text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-ink-muted uppercase tracking-wider">{t('settings.general.currency')}</label>
                      <select className="w-full px-4 py-3 bg-slate-50 border border-border rounded-xl text-sm outline-none">
                        <option>Российский рубль (₽)</option>
                        <option>Доллар США ($)</option>
                        <option>Евро (€)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-ink-muted uppercase tracking-wider">{t('settings.general.timezone')}</label>
                      <select className="w-full px-4 py-3 bg-slate-50 border border-border rounded-xl text-sm outline-none">
                        <option>(GMT+03:00) Москва</option>
                        <option>(GMT+00:00) Лондон</option>
                        <option>(GMT+09:00) Токио</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-slate-100 flex justify-end">
                    <Button variant="primary">
                      <Save className="w-4 h-4 mr-2" /> {t('settings.general.save')}
                    </Button>
                  </div>
                </Card>

                <Card className="p-8 border-red-100 bg-red-50/30">
                  <h4 className="text-sm font-bold text-red-600 mb-2">{t('settings.general.danger_zone')}</h4>
                  <p className="text-xs text-ink-muted mb-6">{t('settings.general.delete_desc')}</p>
                  <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">{t('settings.general.delete_account')}</Button>
                </Card>
              </motion.div>
            )}

            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="flex justify-between items-end">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold text-ink">{t('settings.users.title')}</h3>
                    <p className="text-sm text-ink-muted">{t('settings.users.desc')}</p>
                  </div>
                  <Button variant="primary" size="sm">
                    <Plus className="w-4 h-4 mr-2" /> {t('settings.users.invite')}
                  </Button>
                </div>

                <Card className="p-0 overflow-hidden">
                  <div className="divide-y divide-border">
                    {mockUsers.map((user) => (
                      <div key={user.id} className="p-6 flex items-center justify-between hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden">
                            <img src={user.avatar} alt="" className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-ink">{user.name}</h4>
                            <p className="text-xs text-ink-muted">{user.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-8">
                          <div className="text-right">
                            <p className="text-xs font-bold text-ink">{user.role}</p>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${
                              user.status === 'ACTIVE' ? 'text-emerald-500' : 'text-amber-500'
                            }`}>
                              {user.status === 'ACTIVE' ? t('settings.users.status_active') : t('settings.users.status_invited')}
                            </span>
                          </div>
                          <button className="p-2 hover:bg-slate-100 rounded-lg text-ink-muted">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>
            )}

            {activeTab === 'integrations' && (
              <motion.div
                key="integrations"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-ink">{t('settings.integrations.title')}</h3>
                  <p className="text-sm text-ink-muted">{t('settings.integrations.desc')}</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {integrations.map((item) => (
                    <Card key={item.id} className="p-6 flex items-center justify-between group hover:border-primary/30 transition-all">
                      <div className="flex items-center gap-6">
                        <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl group-hover:bg-primary/5 transition-colors">
                          {item.icon}
                        </div>
                        <div>
                          <h4 className="text-lg font-bold text-ink">{item.name}</h4>
                          <div className="flex items-center gap-3 mt-1">
                            <span className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider ${
                              item.status === 'CONNECTED' ? 'text-emerald-500' : 'text-slate-400'
                            }`}>
                              <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'CONNECTED' ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                              {item.status === 'CONNECTED' ? t('settings.integrations.connected') : t('settings.integrations.disconnected')}
                            </span>
                            {item.lastSync !== '-' && (
                              <span className="text-[10px] text-ink-muted font-medium">{t('settings.integrations.sync', { time: item.lastSync })}</span>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button variant={item.status === 'CONNECTED' ? 'outline' : 'primary'} size="sm">
                        {item.status === 'CONNECTED' ? t('settings.integrations.setup') : t('settings.integrations.connect')}
                      </Button>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'billing' && (
              <motion.div
                key="billing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-8"
              >
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-ink">{t('settings.billing.title')}</h3>
                  <p className="text-sm text-ink-muted">{t('settings.billing.desc')}</p>
                </div>

                <Card className="p-8 bg-primary text-white overflow-hidden relative">
                  <div className="relative z-10">
                    <div className="flex justify-between items-start mb-8">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">{t('settings.billing.current_plan')}</span>
                        <h4 className="text-3xl font-bold mt-1">Business Pro</h4>
                      </div>
                      <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-sm font-bold">
                        {t('settings.billing.active_until', { date: '12.04.2024' })}
                      </div>
                    </div>
                    <div className="flex items-end gap-2 mb-8">
                      <span className="text-4xl font-bold">12,900 ₽</span>
                      <span className="text-white/60 mb-1">/ месяц</span>
                    </div>
                    <Button variant="outline" className="bg-white text-primary border-none hover:bg-white/90">
                      {t('settings.billing.upgrade')}
                    </Button>
                  </div>
                  <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
                </Card>

                <div className="space-y-4">
                  <h4 className="text-sm font-bold text-ink">{t('settings.billing.payment_history')}</h4>
                  <Card className="p-0 overflow-hidden">
                    <div className="divide-y divide-border">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-4">
                            <div className="p-2 bg-slate-100 rounded-lg text-ink-muted">
                              <CreditCard className="w-4 h-4" />
                            </div>
                            <div>
                              <p className="text-sm font-bold text-ink">{t('settings.billing.invoice_no', { no: 450 + i })}</p>
                              <p className="text-xs text-ink-muted">12.{i < 10 ? `0${i}` : i}.2024</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-bold text-ink">12,900 ₽</span>
                            <Button variant="outline" size="sm">PDF</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
