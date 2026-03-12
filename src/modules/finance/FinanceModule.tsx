import React, { useState } from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  FileUp, 
  PieChart, 
  History, 
  CheckCircle2, 
  AlertCircle,
  Plus,
  Filter,
  Download,
  RefreshCw,
  MoreHorizontal,
  Search
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Transaction, ExpenseCategory, FundAllocationRequest, EntityPriority, EntityType } from '@/src/types';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

// Mock Data
const mockTransactions: Transaction[] = [
  { id: 't1', date: '2024-03-08', amount: 150000, type: 'INCOME', category: 'Продажи', description: 'Оплата по счету №45 от ООО "Вектор"', source: 'BANK', isReconciled: true },
  { id: 't2', date: '2024-03-07', amount: 45000, type: 'EXPENSE', category: 'Аренда', description: 'Аренда офиса за март', source: 'BANK', isReconciled: true },
  { id: 't3', date: '2024-03-07', amount: 12000, type: 'EXPENSE', category: 'Маркетинг', description: 'Реклама в Яндекс.Директ', source: '1C', isReconciled: false },
  { id: 't4', date: '2024-03-06', amount: 8500, type: 'EXPENSE', category: 'Хоз. нужды', description: 'Закупка канцелярии', source: 'MANUAL', isReconciled: true },
];

const mockRequests: FundAllocationRequest[] = [
  {
    id: 'r1',
    type: EntityType.FINANCE_REQUEST,
    title: 'Закупка лицензий ПО',
    amount: 55000,
    categoryId: 'it',
    requesterId: 'user3',
    status: 'PENDING',
    priority: EntityPriority.HIGH,
    creatorId: 'user3',
    createdAt: '2024-03-05T10:00:00Z',
    updatedAt: '2024-03-05T10:00:00Z',
    metadata: {}
  },
  {
    id: 'r2',
    type: EntityType.FINANCE_REQUEST,
    title: 'Командировка в Казань',
    amount: 32000,
    categoryId: 'travel',
    requesterId: 'user4',
    status: 'APPROVED',
    priority: EntityPriority.MEDIUM,
    creatorId: 'user4',
    createdAt: '2024-03-04T14:30:00Z',
    updatedAt: '2024-03-06T09:00:00Z',
    metadata: {}
  }
];

type FinanceTab = 'overview' | 'transactions' | 'planning' | 'requests';

export const FinanceModule: React.FC = () => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<FinanceTab>('overview');

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <OverviewTab />;
      case 'transactions': return <TransactionsTab />;
      case 'planning': return <PlanningTab />;
      case 'requests': return <RequestsTab />;
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Module Header */}
      <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-8">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            {(['overview', 'transactions', 'planning', 'requests'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeTab === tab 
                    ? 'bg-white shadow-sm text-primary' 
                    : 'text-ink-muted hover:text-ink'
                }`}
              >
                {t(`finance.tabs.${tab}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm">
            <RefreshCw className="w-4 h-4 mr-2" />
            {t('finance.sync_1c')}
          </Button>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {t('finance.new_transaction')}
          </Button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto bg-slate-50/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

const OverviewTab = () => {
  const { t, i18n } = useTranslation();
  const currentMonth = new Date().toLocaleString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'en' ? 'en-US' : 'ru-RU', { month: 'long' });

  return (
    <div className="p-8 space-y-8">
      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-primary text-white border-none shadow-lg shadow-primary/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-primary-foreground/70 text-sm font-medium">{t('finance.total_balance')}</p>
              <h3 className="text-3xl font-bold mt-1">4 250 000 ₽</h3>
            </div>
            <div className="p-2 bg-white/20 rounded-lg">
              <Wallet className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-primary-foreground/60">
            <span className="text-emerald-300 font-bold">+15%</span> {t('finance.growth_month', { value: 15 })}
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-ink-muted text-sm font-medium">{t('finance.income', { month: currentMonth })}</p>
              <h3 className="text-3xl font-bold mt-1 text-emerald-600">850 000 ₽</h3>
            </div>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[75%]" />
          </div>
          <p className="text-[10px] text-ink-muted mt-2">{t('finance.plan_progress', { value: 75 })}</p>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-ink-muted text-sm font-medium">{t('finance.expense', { month: currentMonth })}</p>
              <h3 className="text-3xl font-bold mt-1 text-red-600">320 000 ₽</h3>
            </div>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-red-500 h-full w-[40%]" />
          </div>
          <p className="text-[10px] text-ink-muted mt-2">{t('finance.budget_spent', { value: 40 })}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card title={t('finance.expense_distribution')}>
          <div className="space-y-4">
            {[
              { name: 'Аренда и ЖКХ', amount: '120 000 ₽', perc: 35, color: 'bg-blue-500' },
              { name: 'ФОТ', amount: '150 000 ₽', perc: 45, color: 'bg-indigo-500' },
              { name: 'Маркетинг', amount: '35 000 ₽', perc: 12, color: 'bg-purple-500' },
              { name: 'Прочее', amount: '15 000 ₽', perc: 8, color: 'bg-slate-400' },
            ].map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-ink">{item.name}</span>
                  <span className="text-ink-muted">{item.amount} ({item.perc}%)</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full`} style={{ width: `${item.perc}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card title={t('finance.reconciliation')}>
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-xl border border-emerald-100">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="text-sm font-bold text-emerald-900">Тинькофф Бизнес</p>
                  <p className="text-xs text-emerald-700">{t('finance.synced_ago', { time: '10 мин.' })}</p>
                </div>
              </div>
              <span className="text-sm font-bold text-emerald-900">2 450 000 ₽</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-bold text-orange-900">1С: Бухгалтерия</p>
                  <p className="text-xs text-orange-700">{t('finance.unreconciled_ops', { count: 3 })}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="bg-white border-orange-200 text-orange-700 hover:bg-orange-100">
                {t('finance.reconcile')}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

const TransactionsTab = () => {
  const { t } = useTranslation();
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input 
              type="text" 
              placeholder={t('finance.search_placeholder')}
              className="pl-10 pr-4 py-2 bg-white border border-border rounded-lg text-sm w-80 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> {t('finance.filters')}</Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><FileUp className="w-4 h-4 mr-2" /> {t('finance.upload_statement')}</Button>
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> {t('finance.export')}</Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-border">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{t('finance.table.date')}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{t('finance.table.description')}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{t('finance.table.category')}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{t('finance.table.amount')}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{t('finance.table.source')}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{t('finance.table.status')}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-ink-muted"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockTransactions.map((t_item) => (
              <tr key={t_item.id} className="hover:bg-slate-50 transition-colors group">
                <td className="px-6 py-4 text-sm text-ink-muted">{t_item.date}</td>
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-ink">{t_item.description}</p>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-slate-100 rounded text-[10px] font-bold text-ink-muted uppercase">
                    {t_item.category}
                  </span>
                </td>
                <td className={`px-6 py-4 text-sm font-bold ${t_item.type === 'INCOME' ? 'text-emerald-600' : 'text-red-600'}`}>
                  {t_item.type === 'INCOME' ? '+' : '-'}{t_item.amount.toLocaleString()} ₽
                </td>
                <td className="px-6 py-4">
                  <span className="text-[10px] font-medium text-ink-muted flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> {t_item.source}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {t_item.isReconciled ? (
                    <span className="flex items-center gap-1 text-emerald-600 text-[10px] font-bold uppercase">
                      <CheckCircle2 className="w-3 h-3" /> {t('finance.status.reconciled')}
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-orange-600 text-[10px] font-bold uppercase">
                      <AlertCircle className="w-3 h-3" /> {t('finance.status.pending')}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1 text-ink-muted hover:text-ink opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

const PlanningTab = () => {
  const { t } = useTranslation();
  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">{t('finance.planning_title', { period: 'Март 2024' })}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">{t('finance.prev_period')}</Button>
          <Button variant="primary" size="sm">{t('finance.save_plan')}</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card title={t('finance.expense_items')}>
            <div className="space-y-4">
              {[
                { name: 'Аренда офиса', type: 'FIXED', value: 45000, actual: 45000 },
                { name: 'Налоги', type: 'PERCENTAGE', value: 6, actual: 52000, base: t('finance.from_turnover') },
                { name: 'ФОТ (Оклады)', type: 'FIXED', value: 280000, actual: 280000 },
                { name: 'Бонусы продаж', type: 'PERCENTAGE', value: 10, actual: 85000, base: t('finance.from_profit') },
                { name: 'Маркетинг', type: 'FIXED', value: 50000, actual: 32000 },
              ].map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-border">
                  <div>
                    <p className="text-sm font-bold text-ink">{item.name}</p>
                    <p className="text-[10px] text-ink-muted uppercase font-bold">
                      {item.type === 'FIXED' ? t('finance.fixed') : t('finance.percentage', { value: item.value, base: item.base })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-ink">{item.actual.toLocaleString()} ₽</p>
                    <p className="text-[10px] text-ink-muted">{t('finance.plan_value', { value: item.type === 'FIXED' ? item.value.toLocaleString() : '???' })}</p>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 hover:border-primary/30 hover:text-primary transition-all text-xs font-medium">
                {t('finance.add_item')}
              </button>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card title={t('finance.forecast')}>
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-xl border border-primary/10">
                <p className="text-xs text-primary font-bold uppercase tracking-wider">{t('finance.expected_profit')}</p>
                <h4 className="text-2xl font-bold text-primary mt-1">530 000 ₽</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-ink-muted">{t('finance.margin')}</span>
                  <span className="text-ink font-bold">32%</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-ink-muted">{t('finance.break_even')}</span>
                  <span className="text-ink font-bold">1 200 000 ₽</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

const RequestsTab = () => {
  const { t } = useTranslation();
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">{t('finance.requests_title')}</h2>
        <Button variant="primary" size="sm"><Plus className="w-4 h-4 mr-2" /> {t('finance.create_request')}</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockRequests.map((req) => (
          <Card key={req.id} className="hover:border-primary/30 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                req.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-600' : 'bg-orange-100 text-orange-600'
              }`}>
                {req.status === 'APPROVED' ? t('finance.status.approved') : t('finance.status.on_approval')}
              </div>
              <span className="text-lg font-bold text-ink">{req.amount.toLocaleString()} ₽</span>
            </div>
            
            <h4 className="font-bold text-ink mb-1">{req.title}</h4>
            <p className="text-xs text-ink-muted mb-4">{t('finance.category_label', { category: req.categoryId })}</p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-slate-200" />
                <span className="text-xs text-ink font-medium">Сотрудник #{req.requesterId}</span>
              </div>
              <div className="flex gap-2">
                {req.status === 'PENDING' && (
                  <>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:bg-red-50">{t('finance.reject')}</Button>
                    <Button variant="outline" size="sm" className="text-emerald-600 border-emerald-100 hover:bg-emerald-50">{t('finance.approve')}</Button>
                  </>
                )}
                {req.status === 'APPROVED' && (
                  <Button variant="primary" size="sm">{t('finance.pay')}</Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
