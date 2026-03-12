import React from 'react';
import {
  CheckSquare,
  MessageSquare,
  Wallet,
  FileText,
  TrendingUp,
  GitBranch,
  MoreVertical,
  Clock,
  User as UserIcon,
  Pencil,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { UniversalEntity, EntityType, EntityPriority } from '@/src/types';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Dropdown } from '../ui/Dropdown';

interface EntityCardProps {
  entity: UniversalEntity;
  onClick?: (entity: UniversalEntity) => void;
  onEdit?: (entity: UniversalEntity) => void;
  onDelete?: (entity: UniversalEntity) => void;
}

const typeConfig = {
  [EntityType.TASK]: { icon: CheckSquare, color: 'text-blue-600', bg: 'bg-blue-50', label: 'Задача' },
  [EntityType.MESSAGE]: { icon: MessageSquare, color: 'text-purple-600', bg: 'bg-purple-50', label: 'Сообщение' },
  [EntityType.FINANCE_REQUEST]: { icon: Wallet, color: 'text-emerald-600', bg: 'bg-emerald-50', label: 'Финансы' },
  [EntityType.DOCUMENT]: { icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50', label: 'Документ' },
  [EntityType.LEAD]: { icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50', label: 'Лид' },
  [EntityType.PROCESS]: { icon: GitBranch, color: 'text-rose-600', bg: 'bg-rose-50', label: 'Процесс' },
};

const priorityConfig = {
  [EntityPriority.LOW]: 'bg-slate-100 text-slate-600',
  [EntityPriority.MEDIUM]: 'bg-blue-100 text-blue-600',
  [EntityPriority.HIGH]: 'bg-orange-100 text-orange-600',
  [EntityPriority.CRITICAL]: 'bg-red-100 text-red-600',
};

export const EntityCard: React.FC<EntityCardProps> = ({ entity, onClick, onEdit, onDelete }) => {
  const config = typeConfig[entity.type];
  const Icon = config.icon;

  const menuItems = [
    { id: 'open', label: 'Открыть', icon: <ExternalLink className="w-4 h-4" />, onClick: () => onClick?.(entity) },
    { id: 'edit', label: 'Изменить', icon: <Pencil className="w-4 h-4" />, onClick: () => onEdit?.(entity) },
    { id: 'delete', label: 'Удалить', icon: <Trash2 className="w-4 h-4" />, onClick: () => onDelete?.(entity) },
  ];

  return (
    <Card
      className="p-0 border-l-4 border-l-primary/20 hover:border-l-primary transition-all"
      onClick={() => onClick?.(entity)}
    >
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded-lg ${config.bg}`}>
              <Icon className={`w-4 h-4 ${config.color}`} />
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-muted">
              {config.label}
            </span>
          </div>
          <Dropdown
            align="right"
            items={menuItems}
            trigger={
              <Button variant="ghost" size="icon" className="h-8 w-8 text-ink-muted hover:text-ink shrink-0">
                <MoreVertical className="w-4 h-4" />
              </Button>
            }
          />
        </div>

        <h4 className="font-semibold text-ink mb-1 line-clamp-1">{entity.title}</h4>
        <p className="text-sm text-ink-muted line-clamp-2 mb-4">
          {entity.description || 'Нет описания'}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-slate-50">
          <div className="flex items-center gap-3">
            <div className="flex items-center text-[10px] text-ink-muted">
              <Clock className="w-3 h-3 mr-1" />
              {new Date(entity.createdAt).toLocaleDateString()}
            </div>
            <div className={`px-2 py-0.5 rounded text-[10px] font-bold ${priorityConfig[entity.priority]}`}>
              {entity.priority}
            </div>
          </div>
          
          <div className="flex -space-x-2">
            <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center">
              <UserIcon className="w-3 h-3 text-slate-500" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
