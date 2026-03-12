import React, { useState, useMemo } from 'react';
import { 
  CheckSquare, 
  Plus, 
  Search, 
  Filter, 
  Kanban, 
  List, 
  Calendar, 
  MoreHorizontal, 
  Clock, 
  User as UserIcon, 
  Tag, 
  ChevronRight, 
  AlertCircle, 
  CheckCircle2, 
  Circle, 
  ArrowRight,
  MessageSquare,
  Paperclip,
  Subtitles,
  X,
  Share2,
  Trash2
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { Task, TaskStatus, EntityPriority, EntityType, User } from '@/src/types';
import { motion, AnimatePresence, Reorder } from 'motion/react';
import { useTranslation } from 'react-i18next';

// Mock Users
const mockUsers: User[] = [
  { id: 'u1', name: 'Алексей Иванов', email: 'alex@uchetgram.ru', avatar: 'https://picsum.photos/seed/u1/100/100', role: 'Менеджер' },
  { id: 'u2', name: 'Мария Петрова', email: 'maria@uchetgram.ru', avatar: 'https://picsum.photos/seed/u2/100/100', role: 'Дизайнер' },
  { id: 'u3', name: 'Иван Сидоров', email: 'ivan@uchetgram.ru', avatar: 'https://picsum.photos/seed/u3/100/100', role: 'Разработчик' },
];

// Mock Tasks
const initialTasks: Task[] = [
  {
    id: 't1',
    type: EntityType.TASK,
    title: 'Разработать дизайн-систему',
    description: 'Необходимо создать набор UI-компонентов в Figma для нового модуля задач.',
    status: TaskStatus.IN_PROGRESS,
    priority: EntityPriority.CRITICAL,
    creatorId: 'u1',
    assigneeId: 'u2',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-05T11:30:00Z',
    dueDate: '2024-03-15',
    tags: ['Design', 'UI/UX'],
    subtasks: [
      { id: 's1', title: 'Цветовая палитра', isCompleted: true },
      { id: 's2', title: 'Типографика', isCompleted: true },
      { id: 's3', title: 'Компоненты кнопок', isCompleted: false },
    ],
    metadata: {}
  },
  {
    id: 't2',
    type: EntityType.TASK,
    title: 'Интеграция с 1С',
    description: 'Настройка обмена данными по счетам и актам.',
    status: TaskStatus.TODO,
    priority: EntityPriority.HIGH,
    creatorId: 'u1',
    assigneeId: 'u3',
    createdAt: '2024-03-02T14:00:00Z',
    updatedAt: '2024-03-02T14:00:00Z',
    dueDate: '2024-03-20',
    tags: ['Backend', 'Finance'],
    subtasks: [],
    metadata: {}
  },
  {
    id: 't3',
    type: EntityType.TASK,
    title: 'Подготовить отчет за февраль',
    description: 'Собрать все данные по продажам и расходам.',
    status: TaskStatus.REVIEW,
    priority: EntityPriority.MEDIUM,
    creatorId: 'u2',
    assigneeId: 'u1',
    createdAt: '2024-03-03T16:00:00Z',
    updatedAt: '2024-03-03T16:00:00Z',
    dueDate: '2024-03-05', // Overdue
    tags: ['Reports'],
    subtasks: [
      { id: 's4', title: 'Выгрузка из CRM', isCompleted: true },
      { id: 's5', title: 'Сверка с бухгалтерией', isCompleted: false },
    ],
    metadata: {}
  },
  {
    id: 't4',
    type: EntityType.TASK,
    title: 'Обновить документацию API',
    description: 'Добавить описание новых эндпоинтов для модуля документов.',
    status: TaskStatus.DONE,
    priority: EntityPriority.LOW,
    creatorId: 'u3',
    assigneeId: 'u3',
    createdAt: '2024-03-04T09:00:00Z',
    updatedAt: '2024-03-04T09:00:00Z',
    dueDate: '2024-03-04',
    tags: ['Documentation'],
    subtasks: [],
    metadata: {}
  }
];

type ViewMode = 'list' | 'kanban' | 'gantt';

export const TasksModule: React.FC = () => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => 
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [tasks, searchQuery]);

  const selectedTask = useMemo(() => 
    tasks.find(t => t.id === selectedTaskId) || null
  , [tasks, selectedTaskId]);

  const handleStatusChange = (taskId: string, newStatus: TaskStatus) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t));
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-slate-50/50">
      {/* Toolbar */}
      <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex bg-slate-100 p-1 rounded-xl">
            <button 
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-ink-muted hover:text-ink'}`}
            >
              <List className="w-4 h-4" /> {t('tasks.view_list')}
            </button>
            <button 
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'kanban' ? 'bg-white shadow-sm text-primary' : 'text-ink-muted hover:text-ink'}`}
            >
              <Kanban className="w-4 h-4" /> {t('tasks.view_kanban')}
            </button>
            <button 
              onClick={() => setViewMode('gantt')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${viewMode === 'gantt' ? 'bg-white shadow-sm text-primary' : 'text-ink-muted hover:text-ink'}`}
            >
              <Calendar className="w-4 h-4" /> {t('tasks.view_gantt')}
            </button>
          </div>
          
          <div className="h-6 w-px bg-border" />
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input 
                type="text" 
                placeholder={t('tasks.search_placeholder')}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> {t('tasks.filters')}</Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" /> {t('tasks.add_task')}
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'list' ? (
            <ListView 
              key="list" 
              tasks={filteredTasks} 
              onTaskClick={setSelectedTaskId} 
            />
          ) : viewMode === 'kanban' ? (
            <KanbanView 
              key="kanban" 
              tasks={filteredTasks} 
              onTaskClick={setSelectedTaskId}
              onStatusChange={handleStatusChange}
            />
          ) : (
            <GanttView 
              key="gantt"
              tasks={filteredTasks}
              onTaskClick={setSelectedTaskId}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Task Details Panel */}
      <AnimatePresence>
        {selectedTaskId && selectedTask && (
          <TaskDetailsPanel 
            task={selectedTask} 
            onClose={() => setSelectedTaskId(null)}
            onStatusChange={handleStatusChange}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Kanban View ---
const KanbanView: React.FC<{ 
  tasks: Task[]; 
  onTaskClick: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}> = ({ tasks, onTaskClick, onStatusChange }) => {
  const { t } = useTranslation();
  const columns: { id: TaskStatus; title: string; color: string }[] = [
    { id: TaskStatus.TODO, title: t('tasks.status.todo'), color: 'bg-slate-200' },
    { id: TaskStatus.IN_PROGRESS, title: t('tasks.status.in_progress'), color: 'bg-blue-500' },
    { id: TaskStatus.REVIEW, title: t('tasks.status.review'), color: 'bg-amber-500' },
    { id: TaskStatus.DONE, title: t('tasks.status.done'), color: 'bg-emerald-500' },
  ];

  return (
    <div className="h-full overflow-x-auto p-8 flex gap-6">
      {columns.map(col => (
        <div key={col.id} className="w-80 shrink-0 flex flex-col h-full">
          <div className="flex items-center justify-between mb-4 px-1">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${col.color}`} />
              <h3 className="font-bold text-sm text-ink">{col.title}</h3>
              <span className="text-xs font-bold text-ink-muted bg-slate-100 px-2 py-0.5 rounded-full">
                {tasks.filter(t => t.status === col.id).length}
              </span>
            </div>
            <button className="p-1 hover:bg-slate-200 rounded text-ink-muted transition-colors">
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
            {tasks.filter(t => t.status === col.id).map(task => (
              <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task.id)} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const TaskCard: React.FC<{ task: Task; onClick: () => void }> = ({ task, onClick }) => {
  const { t, i18n } = useTranslation();
  const priorityColors = {
    [EntityPriority.LOW]: 'bg-slate-100 text-slate-600',
    [EntityPriority.MEDIUM]: 'bg-blue-100 text-blue-600',
    [EntityPriority.HIGH]: 'bg-orange-100 text-orange-600',
    [EntityPriority.CRITICAL]: 'bg-red-100 text-red-600',
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && task.status !== TaskStatus.DONE;
  const completedSubtasks = task.subtasks.filter(s => s.isCompleted).length;

  return (
    <motion.div
      layoutId={task.id}
      whileHover={{ y: -2, boxShadow: '0 10px 20px -10px rgba(0,0,0,0.1)' }}
      className="bg-white border border-border rounded-xl p-4 cursor-pointer group transition-all"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${priorityColors[task.priority]}`}>
          {t(`tasks.priority.${task.priority.toLowerCase()}`)}
        </span>
        <button className="p-1 text-ink-muted hover:text-ink opacity-0 group-hover:opacity-100 transition-opacity">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <h4 className="text-sm font-bold text-ink mb-2 line-clamp-2 leading-snug group-hover:text-primary transition-colors">
        {task.title}
      </h4>

      {task.description && (
        <p className="text-xs text-ink-muted line-clamp-2 mb-4 leading-relaxed">
          {task.description}
        </p>
      )}

      {task.subtasks.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-[10px] font-bold text-ink-muted mb-1.5">
            <span>{t('tasks.details.checklist')}</span>
            <span>{completedSubtasks}/{task.subtasks.length}</span>
          </div>
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-primary h-full transition-all duration-500" 
              style={{ width: `${(completedSubtasks / task.subtasks.length) * 100}%` }} 
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-slate-50">
        <div className="flex items-center gap-3">
          {task.dueDate && (
            <div className={`flex items-center gap-1 text-[10px] font-bold ${isOverdue ? 'text-red-500' : 'text-ink-muted'}`}>
              <Clock className="w-3 h-3" />
              {new Date(task.dueDate).toLocaleDateString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'en' ? 'en-US' : 'ru-RU', { day: 'numeric', month: 'short' })}
            </div>
          )}
          <div className="flex items-center gap-1 text-[10px] font-bold text-ink-muted">
            <MessageSquare className="w-3 h-3" /> 3
          </div>
        </div>

        {task.assigneeId && (
          <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white overflow-hidden">
            <img src={mockUsers.find(u => u.id === task.assigneeId)?.avatar} alt="" className="w-full h-full object-cover" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- List View ---
const ListView: React.FC<{ tasks: Task[]; onTaskClick: (id: string) => void }> = ({ tasks, onTaskClick }) => {
  const { t, i18n } = useTranslation();
  return (
    <div className="h-full overflow-y-auto p-8">
      <Card className="p-0 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-border">
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{t('tasks.table.status')}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{t('tasks.table.task')}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{t('tasks.table.priority')}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{t('tasks.table.assignee')}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{t('tasks.table.deadline')}</th>
              <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-wider text-ink-muted">{t('tasks.table.progress')}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {tasks.map(task => (
              <tr 
                key={task.id} 
                className="hover:bg-slate-50 transition-colors cursor-pointer group"
                onClick={() => onTaskClick(task.id)}
              >
                <td className="px-6 py-4">
                  <StatusBadge status={task.status} />
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-ink group-hover:text-primary transition-colors">{task.title}</p>
                  <div className="flex gap-2 mt-1">
                    {task.tags.map(tag => (
                      <span key={tag} className="text-[9px] font-bold text-primary bg-primary/5 px-1.5 py-0.5 rounded uppercase">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <PriorityBadge priority={task.priority} />
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-200 overflow-hidden">
                      <img src={mockUsers.find(u => u.id === task.assigneeId)?.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-xs text-ink font-medium">{mockUsers.find(u => u.id === task.assigneeId)?.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs font-medium ${new Date(task.dueDate!) < new Date() && task.status !== TaskStatus.DONE ? 'text-red-500' : 'text-ink-muted'}`}>
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'en' ? 'en-US' : 'ru-RU') : '-'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className="bg-primary h-full" 
                        style={{ width: `${(task.subtasks.filter(s => s.isCompleted).length / (task.subtasks.length || 1)) * 100}%` }} 
                      />
                    </div>
                    <span className="text-[10px] font-bold text-ink-muted">
                      {task.subtasks.filter(s => s.isCompleted).length}/{task.subtasks.length}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

// --- Gantt View ---
const GanttView: React.FC<{ tasks: Task[]; onTaskClick: (id: string) => void }> = ({ tasks, onTaskClick }) => {
  const { t, i18n } = useTranslation();
  // Generate days for the timeline (e.g., 30 days from now)
  const days = useMemo(() => {
    const arr = [];
    const start = new Date();
    start.setDate(start.getDate() - 5); // Show 5 days in the past
    for (let i = 0; i < 30; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      arr.push(d);
    }
    return arr;
  }, []);

  const getTaskPosition = (task: Task) => {
    if (!task.dueDate) return null;
    const taskDate = new Date(task.dueDate);
    const startDate = days[0];
    const diffTime = taskDate.getTime() - startDate.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);
    
    // Assume each day is 100px wide
    // For mock purposes, let's assume tasks take 3 days
    const duration = 3; 
    const left = diffDays * 100;
    const width = duration * 100;
    
    return { left, width };
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Timeline Header */}
      <div className="flex border-b border-border overflow-x-auto custom-scrollbar bg-slate-50">
        <div className="w-64 shrink-0 border-r border-border p-4 font-bold text-xs text-ink-muted uppercase tracking-wider sticky left-0 bg-slate-50 z-10">
          {t('tasks.gantt.tasks_sidebar')}
        </div>
        <div className="flex">
          {days.map((day, i) => (
            <div key={i} className="w-[100px] shrink-0 border-r border-border/50 p-2 text-center">
              <p className="text-[10px] font-bold text-ink-muted uppercase">{day.toLocaleDateString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'en' ? 'en-US' : 'ru-RU', { weekday: 'short' })}</p>
              <p className="text-sm font-black text-ink">{day.getDate()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Rows */}
      <div className="flex-1 overflow-y-auto overflow-x-auto custom-scrollbar">
        <div className="flex flex-col min-w-max">
          {tasks.map(task => {
            const pos = getTaskPosition(task);
            return (
              <div key={task.id} className="flex border-b border-slate-50 group hover:bg-slate-50/50 transition-colors">
                <div 
                  className="w-64 shrink-0 border-r border-border p-4 sticky left-0 bg-white group-hover:bg-slate-50 transition-colors z-10 cursor-pointer"
                  onClick={() => onTaskClick(task.id)}
                >
                  <p className="text-sm font-bold text-ink truncate group-hover:text-primary transition-colors">{task.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <StatusBadge status={task.status} />
                  </div>
                </div>
                <div className="flex relative h-20 items-center">
                  {/* Grid lines */}
                  {days.map((_, i) => (
                    <div key={i} className="w-[100px] h-full border-r border-border/30 shrink-0" />
                  ))}
                  
                  {/* Task Bar */}
                  {pos && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="absolute h-10 rounded-xl shadow-sm cursor-pointer flex items-center px-4 overflow-hidden border border-white/20 group/bar"
                      style={{ 
                        left: pos.left, 
                        width: pos.width,
                        backgroundColor: task.status === TaskStatus.DONE ? '#10b981' : 
                                       task.status === TaskStatus.IN_PROGRESS ? '#3b82f6' : 
                                       task.status === TaskStatus.REVIEW ? '#f59e0b' : '#94a3b8'
                      }}
                      onClick={() => onTaskClick(task.id)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity" />
                      <span className="text-xs font-bold text-white truncate relative z-10">{task.title}</span>
                    </motion.div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// --- Helper Components ---
const StatusBadge: React.FC<{ status: TaskStatus }> = ({ status }) => {
  const { t } = useTranslation();
  const configs = {
    [TaskStatus.TODO]: { label: t('tasks.status.todo'), color: 'bg-slate-100 text-slate-600', icon: Circle },
    [TaskStatus.IN_PROGRESS]: { label: t('tasks.status.in_progress'), color: 'bg-blue-100 text-blue-600', icon: Clock },
    [TaskStatus.REVIEW]: { label: t('tasks.status.review'), color: 'bg-amber-100 text-amber-600', icon: AlertCircle },
    [TaskStatus.DONE]: { label: t('tasks.status.done'), color: 'bg-emerald-100 text-emerald-600', icon: CheckCircle2 },
    [TaskStatus.CANCELLED]: { label: t('tasks.status.cancelled'), color: 'bg-red-100 text-red-600', icon: X },
  };
  const config = configs[status];
  const Icon = config.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  );
};

const PriorityBadge: React.FC<{ priority: EntityPriority }> = ({ priority }) => {
  const { t } = useTranslation();
  const configs = {
    [EntityPriority.LOW]: { label: t('tasks.priority.low'), color: 'text-slate-400' },
    [EntityPriority.MEDIUM]: { label: t('tasks.priority.medium'), color: 'text-blue-500' },
    [EntityPriority.HIGH]: { label: t('tasks.priority.high'), color: 'text-orange-500' },
    [EntityPriority.CRITICAL]: { label: t('tasks.priority.critical'), color: 'text-red-500' },
  };
  const config = configs[priority];
  return (
    <span className={`text-xs font-bold ${config.color}`}>
      {config.label}
    </span>
  );
};

// --- Task Details Panel ---
const TaskDetailsPanel: React.FC<{ 
  task: Task; 
  onClose: () => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}> = ({ task, onClose, onStatusChange }) => {
  const { t, i18n } = useTranslation();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-end bg-ink/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg text-ink-muted">
              <X className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-ink-muted uppercase tracking-widest">{t('tasks.details.title')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-2" /> Поделиться</Button>
            <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 border-red-100"><Trash2 className="w-4 h-4" /></Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <StatusBadge status={task.status} />
              <PriorityBadge priority={task.priority} />
            </div>
            <h2 className="text-2xl font-bold text-ink leading-tight">{task.title}</h2>
          </div>

          <div className="grid grid-cols-2 gap-8 py-6 border-y border-slate-100">
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">{t('tasks.details.assignee')}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                  <img src={mockUsers.find(u => u.id === task.assigneeId)?.avatar} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="text-sm font-bold text-ink">{mockUsers.find(u => u.id === task.assigneeId)?.name}</p>
                  <p className="text-[10px] text-ink-muted">{mockUsers.find(u => u.id === task.assigneeId)?.role}</p>
                </div>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-bold text-ink-muted uppercase tracking-wider">{t('tasks.details.due_date')}</p>
              <div className="flex items-center gap-2 text-ink">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold">
                  {task.dueDate ? new Date(task.dueDate).toLocaleDateString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'en' ? 'en-US' : 'ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }) : t('tasks.details.not_set')}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <Subtitles className="w-4 h-4 text-primary" /> {t('tasks.details.description')}
            </h3>
            <div className="bg-slate-50 p-6 rounded-2xl text-sm text-ink leading-relaxed border border-slate-100">
              {task.description || t('tasks.details.no_description')}
            </div>
          </div>

          {task.subtasks.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-ink flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckSquare className="w-4 h-4 text-primary" /> {t('tasks.details.checklist')}
                </div>
                <span className="text-[10px] text-ink-muted">
                  {task.subtasks.filter(s => s.isCompleted).length}/{task.subtasks.length}
                </span>
              </h3>
              <div className="space-y-2">
                {task.subtasks.map(sub => (
                  <div key={sub.id} className="flex items-center gap-3 p-3 bg-white border border-border rounded-xl hover:border-primary/30 transition-all group">
                    <button className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${sub.isCompleted ? 'bg-primary border-primary text-white' : 'border-slate-200 hover:border-primary'}`}>
                      {sub.isCompleted && <CheckCircle2 className="w-3 h-3" />}
                    </button>
                    <span className={`text-sm ${sub.isCompleted ? 'text-ink-muted line-through' : 'text-ink font-medium'}`}>
                      {sub.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-ink flex items-center gap-2">
              <Tag className="w-4 h-4 text-primary" /> {t('tasks.details.tags')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {task.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-primary/5 text-primary text-[10px] font-bold rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
              <button className="px-3 py-1 border border-dashed border-slate-200 text-slate-400 text-[10px] font-bold rounded-full hover:border-primary hover:text-primary transition-all">
                + {t('tasks.details.add_tag')}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 border-t border-border bg-slate-50 flex gap-3">
          <Button variant="primary" className="flex-1">{t('tasks.details.start_task')}</Button>
          <Button variant="outline" className="flex-1">{t('tasks.details.complete_task')}</Button>
        </div>
      </motion.div>
    </motion.div>
  );
};
