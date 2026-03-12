import React, { useState } from 'react';
import {
  Inbox,
  Clock,
  AlertCircle,
  ArrowUpRight,
  ArrowDownLeft,
  Users,
  CheckSquare,
  Wallet,
  FileText,
  TrendingUp,
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Modal } from '@/src/components/ui/Modal';
import { EntityCard } from '@/src/components/entities/EntityCard';
import { UniversalEntity, EntityType, EntityPriority } from '@/src/types';
import { useTranslation } from 'react-i18next';

const mockEntities: UniversalEntity[] = [
  {
    id: '1',
    type: EntityType.TASK,
    title: 'Подготовить отчет за Q1',
    description: 'Нужно собрать данные по продажам и расходам за первый квартал 2024 года.',
    status: 'IN_PROGRESS',
    priority: EntityPriority.HIGH,
    creatorId: 'user1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: {}
  },
  {
    id: '2',
    type: EntityType.FINANCE_REQUEST,
    title: 'Заявка на закупку оборудования',
    description: 'Запрос на 3 новых монитора для отдела дизайна.',
    status: 'PENDING',
    priority: EntityPriority.MEDIUM,
    creatorId: 'user2',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: { amount: 75000 }
  },
  {
    id: '3',
    type: EntityType.MESSAGE,
    title: 'Новое сообщение от клиента',
    description: 'Клиент "ТехноПром" интересуется условиями долгосрочного сотрудничества.',
    status: 'NEW',
    priority: EntityPriority.LOW,
    creatorId: 'client1',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: {}
  },
  {
    id: '4',
    type: EntityType.LEAD,
    title: 'Потенциальный проект: Ребрендинг',
    description: 'Входящий лид с сайта. Бюджет от 500к.',
    status: 'QUALIFICATION',
    priority: EntityPriority.CRITICAL,
    creatorId: 'system',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    metadata: {}
  }
];

type QuickModal = 'task' | 'expense' | 'document' | 'lead' | null;

export const DashboardModule: React.FC = () => {
  const { t } = useTranslation();
  const [quickModal, setQuickModal] = useState<QuickModal>(null);

  return (
    <div className="p-8 space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-primary text-white border-none shadow-lg shadow-primary/20">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-primary-foreground/70 text-sm font-medium">{t('dashboard.stats.incoming')}</p>
              <h3 className="text-3xl font-bold mt-1">24</h3>
            </div>
            <div className="p-2 bg-white/20 rounded-lg">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs mt-4 text-primary-foreground/60">{t('dashboard.stats.growth', { value: 12 })}</p>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-ink-muted text-sm font-medium">{t('dashboard.stats.outgoing')}</p>
              <h3 className="text-3xl font-bold mt-1 text-ink">18</h3>
            </div>
            <div className="p-2 bg-slate-100 rounded-lg text-ink-muted">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs mt-4 text-emerald-600 font-medium">{t('dashboard.stats.today', { value: 5 })}</p>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-ink-muted text-sm font-medium">{t('dashboard.stats.tasks')}</p>
              <h3 className="text-3xl font-bold mt-1 text-ink">42</h3>
            </div>
            <div className="p-2 bg-slate-100 rounded-lg text-ink-muted">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs mt-4 text-orange-600 font-medium">{t('dashboard.stats.overdue', { value: 8 })}</p>
        </Card>

        <Card>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-ink-muted text-sm font-medium">{t('dashboard.stats.team')}</p>
              <h3 className="text-3xl font-bold mt-1 text-ink">12</h3>
            </div>
            <div className="p-2 bg-slate-100 rounded-lg text-ink-muted">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <p className="text-xs mt-4 text-ink-muted">{t('dashboard.stats.online')}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Feed */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-ink flex items-center gap-2">
              <Inbox className="w-5 h-5 text-primary" />
              {t('dashboard.activity_feed')}
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="rounded-full">
                {t('dashboard.filter_all')}
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full">
                {t('dashboard.filter_mine')}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockEntities.map(entity => (
              <EntityCard key={entity.id} entity={entity} />
            ))}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card title={t('dashboard.notifications')}>
            <div className="space-y-4">
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-red-50 text-red-600 rounded-lg shrink-0">
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink leading-tight">Срок оплаты счета истекает</p>
                  <p className="text-xs text-ink-muted mt-1">Счет №452 от "Альфа-Групп" должен быть оплачен до завтра.</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-ink leading-tight">Встреча через 30 минут</p>
                  <p className="text-xs text-ink-muted mt-1">Обсуждение квартальных планов с отделом продаж.</p>
                </div>
              </div>
            </div>
          </Card>

          <Card title={t('dashboard.quick_actions')}>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="h-auto flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-border hover:border-primary/40 hover:bg-primary/5"
                onClick={() => setQuickModal('task')}
              >
                <CheckSquare className="w-5 h-5 text-ink-muted" />
                <span className="text-xs font-medium">{t('dashboard.action_task')}</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-border hover:border-primary/40 hover:bg-primary/5"
                onClick={() => setQuickModal('expense')}
              >
                <Wallet className="w-5 h-5 text-ink-muted" />
                <span className="text-xs font-medium">{t('dashboard.action_expense')}</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-border hover:border-primary/40 hover:bg-primary/5"
                onClick={() => setQuickModal('document')}
              >
                <FileText className="w-5 h-5 text-ink-muted" />
                <span className="text-xs font-medium">{t('dashboard.action_document')}</span>
              </Button>
              <Button
                variant="outline"
                className="h-auto flex flex-col items-center justify-center gap-2 py-4 rounded-xl border-border hover:border-primary/40 hover:bg-primary/5"
                onClick={() => setQuickModal('lead')}
              >
                <TrendingUp className="w-5 h-5 text-ink-muted" />
                <span className="text-xs font-medium">{t('dashboard.action_lead')}</span>
              </Button>
            </div>
          </Card>
        </div>
      </div>

      {/* Модалки быстрых действий */}
      <Modal
        open={quickModal === 'task'}
        onClose={() => setQuickModal(null)}
        title={t('dashboard.action_task')}
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setQuickModal(null)}>
              Отмена
            </Button>
            <Button size="sm" onClick={() => setQuickModal(null)}>
              Создать
            </Button>
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
        open={quickModal === 'expense'}
        onClose={() => setQuickModal(null)}
        title="Заявка на расход"
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setQuickModal(null)}>
              Отмена
            </Button>
            <Button size="sm" onClick={() => setQuickModal(null)}>
              Отправить
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Сумма</label>
            <input
              type="number"
              placeholder="0"
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-ink focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Назначение</label>
            <input
              type="text"
              placeholder="На что нужны средства"
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={quickModal === 'document'}
        onClose={() => setQuickModal(null)}
        title={t('dashboard.action_document')}
        footer={
          <Button size="sm" onClick={() => setQuickModal(null)}>
            Закрыть
          </Button>
        }
      >
        <p className="text-sm text-ink-muted">
          Создание документа будет доступно в модуле «Документы».
        </p>
      </Modal>

      <Modal
        open={quickModal === 'lead'}
        onClose={() => setQuickModal(null)}
        title={t('dashboard.action_lead')}
        footer={
          <>
            <Button variant="ghost" size="sm" onClick={() => setQuickModal(null)}>
              Отмена
            </Button>
            <Button size="sm" onClick={() => setQuickModal(null)}>
              Добавить
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Имя / Компания</label>
            <input
              type="text"
              placeholder="Контакт или компания"
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink mb-1">Телефон или email</label>
            <input
              type="text"
              placeholder="Как связаться"
              className="w-full px-3 py-2 rounded-lg border border-border bg-white text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
