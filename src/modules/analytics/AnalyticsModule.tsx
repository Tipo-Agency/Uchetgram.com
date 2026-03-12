import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar, 
  Filter, 
  Download, 
  PieChart as PieChartIcon, 
  Activity,
  Target,
  Zap
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell, 
  PieChart, 
  Pie,
  Legend
} from 'recharts';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

// Mock Data
const revenueData = [
  { name: 'Янв', value: 400000, secondary: 240000 },
  { name: 'Фев', value: 300000, secondary: 139800 },
  { name: 'Мар', value: 200000, secondary: 980000 },
  { name: 'Апр', value: 278000, secondary: 390800 },
  { name: 'Май', value: 189000, secondary: 480000 },
  { name: 'Июн', value: 239000, secondary: 380000 },
  { name: 'Июл', value: 349000, secondary: 430000 },
];

const funnelData = [
  { name: 'Лиды', value: 1200, color: '#1356A3' },
  { name: 'Квалифицирован', value: 800, color: '#1E70D1' },
  { name: 'Предложение', value: 450, color: '#3B82F6' },
  { name: 'Переговоры', value: 200, color: '#60A5FA' },
  { name: 'Сделка', value: 120, color: '#93C5FD' },
];

const taskEfficiencyData = [
  { name: 'Пн', value: 12, secondary: 10 },
  { name: 'Вт', value: 19, secondary: 15 },
  { name: 'Ср', value: 15, secondary: 18 },
  { name: 'Чт', value: 22, secondary: 20 },
  { name: 'Пт', value: 30, secondary: 25 },
];

const teamPerformance = [
  { name: 'Алексей', value: 45 },
  { name: 'Мария', value: 32 },
  { name: 'Иван', value: 28 },
  { name: 'Елена', value: 15 },
];

const COLORS = ['#1356A3', '#F27D26', '#10B981', '#6366F1', '#F59E0B'];

export const AnalyticsModule: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<'finance' | 'sales' | 'ops'>('finance');

  const funnelData = [
    { name: t('analytics.funnel_steps.leads'), value: 1200, color: '#1356A3' },
    { name: t('analytics.funnel_steps.qualified'), value: 800, color: '#1E70D1' },
    { name: t('analytics.funnel_steps.proposal'), value: 450, color: '#3B82F6' },
    { name: t('analytics.funnel_steps.negotiations'), value: 200, color: '#60A5FA' },
    { name: t('analytics.funnel_steps.deal'), value: 120, color: '#93C5FD' },
  ];

  const renderMetric = (label: string, value: string, change: string, trend: 'up' | 'down', icon: React.ReactNode) => (
    <Card className="p-6 hover:shadow-lg transition-all border-none bg-white/80 backdrop-blur-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-slate-50 rounded-2xl text-primary">
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
          trend === 'up' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
        }`}>
          {trend === 'up' ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
          {change}
        </div>
      </div>
      <p className="text-xs font-bold text-ink-muted uppercase tracking-wider mb-1">{label}</p>
      <h3 className="text-2xl font-bold text-ink">{value}</h3>
    </Card>
  );

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-slate-50/50">
      {/* Toolbar */}
      <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setActiveTab('finance')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'finance' ? 'bg-white shadow-sm text-primary' : 'text-ink-muted hover:text-ink'}`}
            >
              <DollarSign className="w-4 h-4" /> {t('analytics.tabs.finance')}
            </button>
            <button 
              onClick={() => setActiveTab('sales')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'sales' ? 'bg-white shadow-sm text-primary' : 'text-ink-muted hover:text-ink'}`}
            >
              <Target className="w-4 h-4" /> {t('analytics.tabs.sales')}
            </button>
            <button 
              onClick={() => setActiveTab('ops')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'ops' ? 'bg-white shadow-sm text-primary' : 'text-ink-muted hover:text-ink'}`}
            >
              <Zap className="w-4 h-4" /> {t('analytics.tabs.ops')}
            </button>
          </div>
          
          <div className="h-6 w-px bg-border" />
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm"><Calendar className="w-4 h-4 mr-2" /> {new Date().toLocaleString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'en' ? 'en-US' : 'ru-RU', { month: 'long', year: 'numeric' })}</Button>
            <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> {t('analytics.filters')}</Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> {t('analytics.export_pdf')}</Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-7xl mx-auto space-y-8">
          
          {/* Top Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {activeTab === 'finance' && (
              <>
                {renderMetric(t('analytics.metrics.revenue'), '2,450,000 ₽', '+12.5%', 'up', <DollarSign className="w-6 h-6" />)}
                {renderMetric(t('analytics.metrics.expenses'), '1,120,000 ₽', '+5.2%', 'down', <TrendingDown className="w-6 h-6" />)}
                {renderMetric(t('analytics.metrics.net_profit'), '1,330,000 ₽', '+18.3%', 'up', <TrendingUp className="w-6 h-6" />)}
                {renderMetric(t('analytics.metrics.margin'), '54.3%', '+2.1%', 'up', <Activity className="w-6 h-6" />)}
              </>
            )}
            {activeTab === 'sales' && (
              <>
                {renderMetric(t('analytics.metrics.new_leads'), '1,240', '+8.4%', 'up', <Users className="w-6 h-6" />)}
                {renderMetric(t('analytics.metrics.conversion'), '9.7%', '+1.2%', 'up', <Target className="w-6 h-6" />)}
                {renderMetric(t('analytics.metrics.avg_check'), '45,000 ₽', '-2.5%', 'down', <DollarSign className="w-6 h-6" />)}
                {renderMetric(t('analytics.metrics.ltv'), '185,000 ₽', '+5.7%', 'up', <TrendingUp className="w-6 h-6" />)}
              </>
            )}
            {activeTab === 'ops' && (
              <>
                {renderMetric(t('analytics.metrics.tasks_completed'), '145', '+15.2%', 'up', <CheckCircle2 className="w-6 h-6" />)}
                {renderMetric(t('analytics.metrics.avg_completion_time'), '4.2 ч', '-12.5%', 'up', <Clock className="w-6 h-6" />)}
                {renderMetric(t('analytics.metrics.active_processes'), '12', '+2', 'up', <Zap className="w-6 h-6" />)}
                {renderMetric(t('analytics.metrics.efficiency'), '92%', '+3.4%', 'up', <Activity className="w-6 h-6" />)}
              </>
            )}
          </div>

          {/* Main Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-2 p-8">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-lg font-bold text-ink">{t('analytics.charts.dynamics_title')}</h3>
                  <p className="text-sm text-ink-muted">{t('analytics.charts.dynamics_desc')}</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-ink">
                    <div className="w-3 h-3 rounded-full bg-primary" /> {t('analytics.charts.current')}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-ink-muted">
                    <div className="w-3 h-3 rounded-full bg-slate-200" /> {t('analytics.charts.previous')}
                  </div>
                </div>
              </div>
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1356A3" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#1356A3" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748B' }} 
                      dy={10}
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 12, fill: '#64748B' }} 
                      tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip 
                      contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#1356A3" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="secondary" 
                      stroke="#E2E8F0" 
                      strokeWidth={2}
                      fill="transparent" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-lg font-bold text-ink mb-2">{t('analytics.charts.distribution_title')}</h3>
              <p className="text-sm text-ink-muted mb-8">{t('analytics.charts.distribution_desc')}</p>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={funnelData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {funnelData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36}/>
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Bottom Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-8">
              <h3 className="text-lg font-bold text-ink mb-6">{t('analytics.team_efficiency')}</h3>
              <div className="space-y-6">
                {teamPerformance.map((user, idx) => (
                  <div key={user.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-primary">
                          {user.name[0]}
                        </div>
                        <span className="text-sm font-bold text-ink">{user.name}</span>
                      </div>
                      <span className="text-xs font-bold text-primary">{t('analytics.tasks_count', { count: user.value })}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(user.value / 50) * 100}%` }}
                        transition={{ duration: 1, delay: idx * 0.1 }}
                        className="h-full bg-primary rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-8">
              <h3 className="text-lg font-bold text-ink mb-6">{t('analytics.sales_funnel')}</h3>
              <div className="space-y-4">
                {funnelData.map((step, idx) => (
                  <div key={step.name} className="flex items-center gap-4">
                    <div className="w-32 text-xs font-bold text-ink-muted uppercase tracking-wider">{step.name}</div>
                    <div className="flex-1 flex items-center gap-4">
                      <div className="flex-1 bg-slate-100 h-8 rounded-lg overflow-hidden relative">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(step.value / 1200) * 100}%` }}
                          transition={{ duration: 1, delay: idx * 0.1 }}
                          className="h-full bg-primary/10 border-r-2 border-primary"
                        />
                        <span className="absolute inset-0 flex items-center px-4 text-xs font-bold text-primary">
                          {step.value}
                        </span>
                      </div>
                      <div className="w-16 text-right text-xs font-bold text-ink">
                        {idx > 0 ? `${Math.round((step.value / funnelData[idx-1].value) * 100)}%` : '100%'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
