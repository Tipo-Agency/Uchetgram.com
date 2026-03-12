import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Button } from './components/ui/Button';
import { Modal } from './components/ui/Modal';
import { DashboardModule } from './modules/dashboard/DashboardModule';
import { SalesModule } from './modules/sales/SalesModule';
import { FinanceModule } from './modules/finance/FinanceModule';
import { DocumentsModule } from './modules/documents/DocumentsModule';
import { TasksModule } from './modules/tasks/TasksModule';
import { ProcessesModule } from './modules/processes/ProcessesModule';
import { AnalyticsModule } from './modules/analytics/AnalyticsModule';
import { SettingsModule } from './modules/settings/SettingsModule';
import { MarketplaceModule } from './modules/marketplace/MarketplaceModule';
import { LandingPage } from './modules/landing/LandingPage';
import { MarketingLayout } from './components/layout/MarketingLayout';
import { AboutPage } from './pages/marketing/AboutPage';
import { ContactPage } from './pages/marketing/ContactPage';
import { CareersPage } from './pages/marketing/CareersPage';
import { PricingPage } from './pages/marketing/PricingPage';
import { InvestorsPage } from './pages/marketing/InvestorsPage';
import { SolutionsPage } from './pages/marketing/SolutionsPage';
import { ApiPage } from './pages/marketing/ApiPage';
import { HelpPage } from './pages/marketing/HelpPage';
import { StatusPage } from './pages/marketing/StatusPage';
import { PrivacyPage } from './pages/marketing/PrivacyPage';
import { TermsPage } from './pages/marketing/TermsPage';
import { ModulesIndexPage, ModuleDetailPage } from './pages/marketing/ModulesPage';
import { BusinessPage } from './pages/marketing/BusinessPage';
import { IntegrationsPage } from './pages/marketing/IntegrationsPage';
import { ModuleId } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

type AddModalType = 'task' | 'expense' | 'document' | 'lead' | null;

function AppShell() {
  const { t } = useTranslation();
  const [activeModule, setActiveModule] = useState<ModuleId>('dashboard');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [addModal, setAddModal] = useState<AddModalType>(null);

  const moduleTitles: Record<ModuleId, string> = {
    dashboard: t('nav.dashboard'),
    sales: t('nav.sales'),
    finance: t('nav.finance'),
    documents: t('nav.documents'),
    tasks: t('nav.tasks'),
    processes: t('nav.processes'),
    analytics: t('nav.analytics'),
    marketplace: t('nav.marketplace'),
    settings: t('nav.settings'),
  };

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <DashboardModule />;
      case 'sales':
        return <SalesModule />;
      case 'finance':
        return <FinanceModule />;
      case 'documents':
        return <DocumentsModule />;
      case 'tasks':
        return <TasksModule />;
      case 'processes':
        return <ProcessesModule />;
      case 'analytics':
        return <AnalyticsModule />;
      case 'marketplace':
        return <MarketplaceModule />;
      case 'settings':
        return <SettingsModule />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-full text-ink-muted">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">🏗️</span>
            </div>
            <h2 className="text-xl font-bold text-ink">Модуль в разработке</h2>
            <p className="mt-2">
              Мы работаем над тем, чтобы сделать {moduleTitles[activeModule]} доступным.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      <main className="flex-1 flex flex-col min-w-0">
        <Header
          title={moduleTitles[activeModule]}
          onAddTask={() => setAddModal('task')}
          onAddDeal={() => setAddModal('lead')}
          onAddDocument={() => setAddModal('document')}
          onAddRequest={() => setAddModal('expense')}
        />

        <div className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeModule}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {renderActiveModule()}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Глобальные модалки «Добавить» из хедера */}
      <Modal
        open={addModal === 'task'}
        onClose={() => setAddModal(null)}
        title="Новая задача"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setAddModal(null)}>Отмена</Button>
            <Button size="sm" onClick={() => setAddModal(null)}>Создать</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Название</label>
            <input
              type="text"
              placeholder="Введите название задачи"
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Описание</label>
            <textarea
              rows={3}
              placeholder="Описание (необязательно)"
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary resize-none"
            />
          </div>
        </div>
      </Modal>
      <Modal
        open={addModal === 'expense'}
        onClose={() => setAddModal(null)}
        title="Заявка на расход"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setAddModal(null)}>Отмена</Button>
            <Button size="sm" onClick={() => setAddModal(null)}>Отправить</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Сумма</label>
            <input type="number" placeholder="0" className="w-full px-3 py-2 rounded-lg border border-border bg-white text-ink focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Назначение</label>
            <input type="text" placeholder="На что нужны средства" className="w-full px-3 py-2 rounded-lg border border-border bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
        </div>
      </Modal>
      <Modal open={addModal === 'document'} onClose={() => setAddModal(null)} title="Документ" footer={<Button size="sm" onClick={() => setAddModal(null)}>Закрыть</Button>}>
        <p className="text-sm text-ink-muted">Создание документа доступно в разделе «Документы».</p>
      </Modal>
      <Modal
        open={addModal === 'lead'}
        onClose={() => setAddModal(null)}
        title="Новый лид"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setAddModal(null)}>Отмена</Button>
            <Button size="sm" onClick={() => setAddModal(null)}>Добавить</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Имя / Компания</label>
            <input type="text" placeholder="Контакт или компания" className="w-full px-3 py-2 rounded-lg border border-border bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Телефон или email</label>
            <input type="text" placeholder="Как связаться" className="w-full px-3 py-2 rounded-lg border border-border bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary" />
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();

  return (
    <Routes>
      {/* Главная — лендинг со своим nav/footer */}
      <Route path="/" element={<LandingPage onEnterApp={() => navigate('/app')} />} />

      {/* Основные маркетинговые страницы (Marketing.md §2) */}
      <Route path="/about" element={<MarketingLayout><AboutPage /></MarketingLayout>} />
      <Route path="/contact" element={<MarketingLayout><ContactPage /></MarketingLayout>} />
      <Route path="/careers" element={<MarketingLayout><CareersPage /></MarketingLayout>} />
      <Route path="/pricing" element={<MarketingLayout><PricingPage /></MarketingLayout>} />
      <Route path="/investors" element={<MarketingLayout><InvestorsPage /></MarketingLayout>} />
      <Route path="/solutions" element={<MarketingLayout><SolutionsPage /></MarketingLayout>} />
      <Route path="/api" element={<MarketingLayout><ApiPage /></MarketingLayout>} />
      <Route path="/integrations" element={<IntegrationsPage />} />
      <Route path="/help" element={<MarketingLayout><HelpPage /></MarketingLayout>} />
      <Route path="/status" element={<MarketingLayout><StatusPage /></MarketingLayout>} />
      <Route path="/privacy" element={<MarketingLayout><PrivacyPage /></MarketingLayout>} />
      <Route path="/terms" element={<MarketingLayout><TermsPage /></MarketingLayout>} />

      {/* Модули (Marketing.md §3) */}
      <Route path="/modules" element={<MarketingLayout><ModulesIndexPage /></MarketingLayout>} />
      <Route path="/modules/:moduleId" element={<MarketingLayout><ModuleDetailPage /></MarketingLayout>} />

      {/* Отраслевые решения (Marketing.md §4) */}
      <Route path="/business/:industry" element={<MarketingLayout><BusinessPage /></MarketingLayout>} />

      {/* Внутреннее приложение */}
      <Route path="/app" element={<AppShell />} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
