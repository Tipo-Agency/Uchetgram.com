import React, { useState, useMemo } from 'react';
import { 
  GitBranch, 
  Play, 
  CheckCircle2, 
  Clock, 
  User as UserIcon, 
  ArrowRight, 
  Settings, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ChevronRight, 
  AlertCircle, 
  Activity, 
  History,
  Check,
  X,
  Zap,
  Layout,
  Workflow
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { 
  ProcessInstance, 
  ProcessStep, 
  StepType, 
  ProcessStatus, 
  EntityType, 
  EntityPriority,
  User 
} from '@/src/types';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

// Mock Users
const mockUsers: User[] = [
  { id: 'u1', name: 'Алексей Иванов', email: 'alex@uchetgram.ru', avatar: 'https://picsum.photos/seed/u1/100/100', role: 'Менеджер' },
  { id: 'u2', name: 'Мария Петрова', email: 'maria@uchetgram.ru', avatar: 'https://picsum.photos/seed/u2/100/100', role: 'Дизайнер' },
  { id: 'u3', name: 'Иван Сидоров', email: 'ivan@uchetgram.ru', avatar: 'https://picsum.photos/seed/u3/100/100', role: 'Разработчик' },
];

// Mock Process Instances
const initialProcesses: ProcessInstance[] = [
  {
    id: 'p1',
    type: EntityType.PROCESS,
    templateId: 't_hiring',
    title: 'Найм нового сотрудника: Дизайнер',
    status: 'ACTIVE',
    priority: EntityPriority.HIGH,
    creatorId: 'u1',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-05T11:30:00Z',
    currentStepId: 'step_2',
    metadata: {},
    steps: [
      { id: 'step_1', title: 'Сбор резюме', type: StepType.TASK, assigneeId: 'u1', nextStepId: 'step_2' },
      { id: 'step_2', title: 'Первичное интервью', type: StepType.TASK, assigneeId: 'u1', nextStepId: 'step_3' },
      { id: 'step_3', title: 'Техническое задание', type: StepType.DECISION, assigneeId: 'u2', branches: { 'Выполнено': 'step_4', 'Провалено': 'step_end_fail' } },
      { id: 'step_4', title: 'Финальное интервью', type: StepType.TASK, assigneeId: 'u1', nextStepId: 'step_end_success' },
      { id: 'step_end_success', title: 'Оффер принят', type: StepType.END },
      { id: 'step_end_fail', title: 'Отказ', type: StepType.END },
    ],
    history: [
      { stepId: 'step_1', completedAt: '2024-03-02T10:00:00Z', completedBy: 'u1', result: 'Done' }
    ]
  },
  {
    id: 'p2',
    type: EntityType.PROCESS,
    templateId: 't_payment',
    title: 'Согласование счета №452',
    status: 'ACTIVE',
    priority: EntityPriority.CRITICAL,
    creatorId: 'u2',
    createdAt: '2024-03-04T09:00:00Z',
    updatedAt: '2024-03-04T09:00:00Z',
    currentStepId: 'step_pay_1',
    metadata: {},
    steps: [
      { id: 'step_pay_1', title: 'Проверка бухгалтерией', type: StepType.TASK, assigneeId: 'u3', nextStepId: 'step_pay_2' },
      { id: 'step_pay_2', title: 'Утверждение директором', type: StepType.DECISION, assigneeId: 'u1', branches: { 'Одобрено': 'step_pay_3', 'Отклонено': 'step_pay_end_fail' } },
      { id: 'step_pay_3', title: 'Оплата', type: StepType.TASK, assigneeId: 'u3', nextStepId: 'step_pay_end_success' },
      { id: 'step_pay_end_success', title: 'Счет оплачен', type: StepType.END },
      { id: 'step_pay_end_fail', title: 'Счет отклонен', type: StepType.END },
    ],
    history: []
  }
];

export const ProcessesModule: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [processes, setProcesses] = useState<ProcessInstance[]>(initialProcesses);
  const [selectedProcessId, setSelectedProcessId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProcesses = useMemo(() => 
    processes.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
  , [processes, searchQuery]);

  const selectedProcess = useMemo(() => 
    processes.find(p => p.id === selectedProcessId) || null
  , [processes, selectedProcessId]);

  const handleCompleteStep = (processId: string, stepId: string, result?: string) => {
    setProcesses(prev => prev.map(p => {
      if (p.id !== processId) return p;
      
      const currentStep = p.steps.find(s => s.id === stepId);
      if (!currentStep) return p;

      let nextStepId = '';
      if (currentStep.type === StepType.DECISION && result && currentStep.branches) {
        nextStepId = currentStep.branches[result] || '';
      } else {
        nextStepId = currentStep.nextStepId || '';
      }

      const newHistory = [...p.history, { 
        stepId, 
        completedAt: new Date().toISOString(), 
        completedBy: 'u1', // Current user mock
        result 
      }];

      return {
        ...p,
        currentStepId: nextStepId,
        history: newHistory,
        status: nextStepId.includes('end') ? 'COMPLETED' : 'ACTIVE',
        updatedAt: new Date().toISOString()
      };
    }));
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-slate-50/50">
      {/* Toolbar */}
      <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Workflow className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-ink">{t('processes.title')}</h2>
          </div>
          
          <div className="h-6 w-px bg-border" />
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input 
                type="text" 
                placeholder={t('processes.search_placeholder')} 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>
            <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> {t('processes.filters')}</Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm"><Settings className="w-4 h-4 mr-2" /> {t('processes.templates')}</Button>
          <Button variant="primary" size="sm"><Plus className="w-4 h-4 mr-2" /> {t('processes.start_process')}</Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Process List */}
        <div className="w-96 border-r border-border bg-white overflow-y-auto shrink-0 custom-scrollbar">
          <div className="p-4 space-y-2">
            {filteredProcesses.map(p => (
              <div 
                key={p.id}
                onClick={() => setSelectedProcessId(p.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                  selectedProcessId === p.id 
                    ? 'border-primary bg-primary/5 shadow-sm' 
                    : 'border-transparent hover:bg-slate-50'
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                    p.status === 'COMPLETED' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'
                  }`}>
                    {p.status === 'COMPLETED' ? t('processes.status_completed') : t('processes.status_active')}
                  </span>
                  <span className="text-[10px] text-ink-muted font-medium">
                    {new Date(p.createdAt).toLocaleDateString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'en' ? 'en-US' : 'ru-RU')}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-ink mb-2 group-hover:text-primary transition-colors">{p.title}</h4>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-slate-200 overflow-hidden">
                      <img src={mockUsers.find(u => u.id === p.creatorId)?.avatar} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] text-ink-muted font-medium">
                      {t('processes.steps_count', { completed: p.history.length, total: p.steps.length })}
                    </span>
                  </div>
                  <ChevronRight className={`w-4 h-4 transition-transform ${selectedProcessId === p.id ? 'translate-x-1 text-primary' : 'text-slate-300'}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Detail */}
        <div className="flex-1 overflow-y-auto bg-slate-50/50 custom-scrollbar">
          <AnimatePresence mode="wait">
            {selectedProcess ? (
              <motion.div 
                key={selectedProcess.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-8 max-w-4xl mx-auto space-y-8"
              >
                {/* Process Header */}
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold text-ink mb-2">{selectedProcess.title}</h2>
                    <div className="flex items-center gap-4 text-sm text-ink-muted">
                      <span className="flex items-center gap-1"><Activity className="w-4 h-4" /> {t('processes.id', { id: selectedProcess.id })}</span>
                      <span className="flex items-center gap-1"><History className="w-4 h-4" /> {t('processes.started_at', { date: new Date(selectedProcess.createdAt).toLocaleString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'en' ? 'en-US' : 'ru-RU') })}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">{t('processes.pause')}</Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 border-red-100">{t('processes.cancel')}</Button>
                  </div>
                </div>

                {/* Workflow Visualization */}
                <div className="space-y-6 relative">
                  <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-slate-200" />
                  
                  {selectedProcess.steps.map((step, index) => {
                    const isCompleted = selectedProcess.history.some(h => h.stepId === step.id);
                    const isActive = selectedProcess.currentStepId === step.id;
                    const isPending = !isCompleted && !isActive;
                    const historyEntry = selectedProcess.history.find(h => h.stepId === step.id);

                    return (
                      <div key={step.id} className="relative pl-14">
                        {/* Step Marker */}
                        <div className={`absolute left-4 -translate-x-1/2 w-4 h-4 rounded-full border-2 z-10 transition-all ${
                          isCompleted ? 'bg-emerald-500 border-emerald-500' : 
                          isActive ? 'bg-white border-primary ring-4 ring-primary/20' : 
                          'bg-white border-slate-300'
                        }`}>
                          {isCompleted && <Check className="w-2.5 h-2.5 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />}
                        </div>

                        <Card className={`transition-all ${
                          isActive ? 'border-primary shadow-lg shadow-primary/5 ring-1 ring-primary/10' : 
                          isCompleted ? 'opacity-70 grayscale-[0.5]' : 
                          'opacity-50'
                        }`}>
                          <div className="flex justify-between items-start">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                                  step.type === StepType.DECISION ? 'bg-purple-100 text-purple-600' :
                                  step.type === StepType.END ? 'bg-slate-100 text-slate-600' :
                                  'bg-blue-100 text-blue-600'
                                }`}>
                                  {t(`processes.step_type.${step.type.toLowerCase()}`)}
                                </span>
                                <h4 className="text-sm font-bold text-ink">{step.title}</h4>
                              </div>
                              {step.description && <p className="text-xs text-ink-muted">{step.description}</p>}
                            </div>

                            {step.assigneeId && (
                              <div className="flex items-center gap-2">
                                <div className="text-right">
                                  <p className="text-[10px] font-bold text-ink">{mockUsers.find(u => u.id === step.assigneeId)?.name}</p>
                                  <p className="text-[9px] text-ink-muted">{t('processes.assignee')}</p>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-slate-200 overflow-hidden">
                                  <img src={mockUsers.find(u => u.id === step.assigneeId)?.avatar} alt="" className="w-full h-full object-cover" />
                                </div>
                              </div>
                            )}
                          </div>

                          {/* Action Area for Active Step */}
                          {isActive && step.type !== StepType.END && (
                            <div className="mt-6 pt-6 border-t border-slate-100 flex items-center justify-between">
                              <div className="flex items-center gap-2 text-xs text-ink-muted">
                                <Zap className="w-4 h-4 text-amber-500" />
                                {t('processes.waiting_action')}
                              </div>
                              <div className="flex gap-2">
                                {step.type === StepType.DECISION && step.branches ? (
                                  Object.keys(step.branches).map(branch => (
                                    <Button 
                                      key={branch}
                                      variant={branch.toLowerCase().includes('одобр') || branch.toLowerCase().includes('выполн') || branch.toLowerCase().includes('approved') || branch.toLowerCase().includes('done') ? 'primary' : 'outline'}
                                      size="sm"
                                      onClick={() => handleCompleteStep(selectedProcess.id, step.id, branch)}
                                    >
                                      {branch}
                                    </Button>
                                  ))
                                ) : (
                                  <Button 
                                    variant="primary" 
                                    size="sm"
                                    onClick={() => handleCompleteStep(selectedProcess.id, step.id)}
                                  >
                                    {t('processes.complete_step')}
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          )}

                          {/* History Info for Completed Step */}
                          {isCompleted && historyEntry && (
                            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-[10px] text-ink-muted">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                {t('processes.completed_at', { date: new Date(historyEntry.completedAt).toLocaleString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'en' ? 'en-US' : 'ru-RU') })}
                              </div>
                              {historyEntry.result && (
                                <span className="font-bold uppercase text-primary">{t('processes.result', { result: historyEntry.result })}</span>
                              )}
                            </div>
                          )}
                        </Card>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-ink-muted">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                  <Workflow className="w-10 h-10 opacity-20" />
                </div>
                <h3 className="text-lg font-bold text-ink">{t('processes.select_process')}</h3>
                <p className="text-sm">{t('processes.select_process_desc')}</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
