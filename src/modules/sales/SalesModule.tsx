import React from 'react';
import { 
  Kanban, 
  List, 
  Filter, 
  Download, 
  Plus,
  Search,
  ChevronRight,
  MoreHorizontal
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { useTranslation } from 'react-i18next';

export const SalesModule: React.FC = () => {
  const { t } = useTranslation();

  const stages = [
    { id: 'new', title: t('sales.stages.new'), count: 12, color: 'bg-blue-500' },
    { id: 'qualify', title: t('sales.stages.qualify'), count: 8, color: 'bg-indigo-500' },
    { id: 'proposal', title: t('sales.stages.proposal'), count: 5, color: 'bg-purple-500' },
    { id: 'negotiation', title: t('sales.stages.negotiation'), count: 3, color: 'bg-amber-500' },
    { id: 'closing', title: t('sales.stages.closing'), count: 2, color: 'bg-emerald-500' },
  ];

  const leads = [
    { id: '1', company: 'ООО "Вектор"', contact: 'Иван Петров', value: '150 000 ₽', stage: 'new', priority: 'high' },
    { id: '2', company: 'ГазПром Снаб', contact: 'Елена Сидорова', value: '1 200 000 ₽', stage: 'qualify', priority: 'critical' },
    { id: '3', company: 'ИП Соколов', contact: 'Андрей Соколов', value: '45 000 ₽', stage: 'new', priority: 'medium' },
    { id: '4', company: 'ТехноМир', contact: 'Марина К.', value: '320 000 ₽', stage: 'proposal', priority: 'high' },
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden">
      {/* Toolbar */}
      <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button className="p-1.5 bg-white shadow-sm rounded-md text-primary"><Kanban className="w-4 h-4" /></button>
            <button className="p-1.5 text-ink-muted hover:text-ink"><List className="w-4 h-4" /></button>
          </div>
          <div className="h-6 w-px bg-border mx-2" />
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><Filter className="w-4 h-4 mr-2" /> {t('sales.filters')}</Button>
            <Button variant="outline" size="sm"><Search className="w-4 h-4 mr-2" /> {t('sales.search')}</Button>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2" /> {t('sales.export')}</Button>
          <Button variant="primary" size="sm"><Plus className="w-4 h-4 mr-2" /> {t('sales.new_lead')}</Button>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex-1 overflow-x-auto bg-slate-50/50 p-8">
        <div className="flex gap-6 h-full min-w-max">
          {stages.map(stage => (
            <div key={stage.id} className="w-80 flex flex-col gap-4">
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${stage.color}`} />
                  <h3 className="font-bold text-ink text-sm uppercase tracking-wider">{stage.title}</h3>
                  <span className="bg-slate-200 text-ink-muted text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                    {stage.count}
                  </span>
                </div>
                <button className="text-ink-muted hover:text-ink"><MoreHorizontal className="w-4 h-4" /></button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto pr-2">
                {leads.filter(l => l.stage === stage.id).map(lead => (
                  <Card key={lead.id} className="p-4 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                        lead.priority === 'critical' ? 'bg-red-100 text-red-600' : 
                        lead.priority === 'high' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {t(`sales.priorities.${lead.priority}`)}
                      </span>
                      <span className="text-sm font-bold text-primary">{lead.value}</span>
                    </div>
                    <h4 className="font-bold text-ink mb-1">{lead.company}</h4>
                    <p className="text-xs text-ink-muted mb-4">{lead.contact}</p>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                      <div className="flex -space-x-1">
                        <div className="w-5 h-5 rounded-full bg-slate-200 border border-white" />
                      </div>
                      <button className="text-ink-muted hover:text-primary transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                ))}
                
                <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 hover:border-primary/30 hover:text-primary hover:bg-primary/5 transition-all text-sm font-medium">
                  + {t('sales.add')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
