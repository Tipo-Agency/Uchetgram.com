import React, { useState, useMemo } from 'react';
import { 
  Folder, 
  File, 
  FileText, 
  Link as LinkIcon, 
  MoreVertical, 
  Plus, 
  Search, 
  Filter, 
  ChevronRight, 
  Grid, 
  List, 
  Download, 
  Share2, 
  Trash2,
  ExternalLink,
  Eye,
  FileImage,
  FileSpreadsheet,
  FileCode,
  ArrowLeft
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { AppDocument, DocType, EntityPriority, EntityType } from '@/src/types';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

// Mock Data
const mockDocuments: AppDocument[] = [
  {
    id: 'f1',
    type: EntityType.DOCUMENT,
    docType: DocType.FOLDER,
    title: 'Должностные инструкции',
    status: 'ACTIVE',
    priority: EntityPriority.MEDIUM,
    creatorId: 'admin',
    createdAt: '2024-01-10T12:00:00Z',
    updatedAt: '2024-03-01T15:00:00Z',
    metadata: {},
    tags: ['HR', 'Инструкции']
  },
  {
    id: 'f2',
    type: EntityType.DOCUMENT,
    docType: DocType.FOLDER,
    title: 'Маркетинг 2024',
    status: 'ACTIVE',
    priority: EntityPriority.LOW,
    creatorId: 'admin',
    createdAt: '2024-02-15T09:00:00Z',
    updatedAt: '2024-02-15T09:00:00Z',
    metadata: {},
    tags: ['Marketing']
  },
  {
    id: 'd1',
    type: EntityType.DOCUMENT,
    docType: DocType.INTERNAL,
    parentId: 'f1',
    title: 'Менеджер по продажам',
    content: '# Должностная инструкция: Менеджер по продажам\n\n1. Общие положения...\n2. Обязанности...',
    status: 'ACTIVE',
    priority: EntityPriority.HIGH,
    creatorId: 'hr_manager',
    createdAt: '2024-03-01T10:00:00Z',
    updatedAt: '2024-03-05T11:30:00Z',
    metadata: {},
    tags: ['Sales', 'HR']
  },
  {
    id: 'd2',
    type: EntityType.DOCUMENT,
    docType: DocType.LINK,
    parentId: 'f2',
    title: 'Медиаплан (Google Sheets)',
    externalUrl: 'https://docs.google.com/spreadsheets/d/example',
    status: 'ACTIVE',
    priority: EntityPriority.MEDIUM,
    creatorId: 'marketing_lead',
    createdAt: '2024-03-02T14:00:00Z',
    updatedAt: '2024-03-02T14:00:00Z',
    metadata: {},
    tags: ['GoogleSheets', 'Planning']
  },
  {
    id: 'd3',
    type: EntityType.DOCUMENT,
    docType: DocType.FILE,
    title: 'Логотип_финал.png',
    fileUrl: 'https://picsum.photos/seed/logo/800/600',
    mimeType: 'image/png',
    fileSize: 1024 * 1024 * 2.5,
    status: 'ACTIVE',
    priority: EntityPriority.LOW,
    creatorId: 'designer',
    createdAt: '2024-03-03T16:00:00Z',
    updatedAt: '2024-03-03T16:00:00Z',
    metadata: {},
    tags: ['Design', 'Assets']
  },
  {
    id: 'd4',
    type: EntityType.DOCUMENT,
    docType: DocType.LINK,
    title: 'Дизайн макет (Figma)',
    externalUrl: 'https://www.figma.com/file/example',
    status: 'ACTIVE',
    priority: EntityPriority.HIGH,
    creatorId: 'designer',
    createdAt: '2024-03-04T09:00:00Z',
    updatedAt: '2024-03-04T09:00:00Z',
    metadata: {},
    tags: ['Figma', 'UI/UX']
  }
];

export const DocumentsModule: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [currentFolderId, setCurrentFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDoc, setSelectedDoc] = useState<AppDocument | null>(null);

  const currentFolder = useMemo(() => 
    currentFolderId ? mockDocuments.find(d => d.id === currentFolderId) : null
  , [currentFolderId]);

  const filteredDocs = useMemo(() => {
    return mockDocuments.filter(doc => {
      const matchesFolder = doc.parentId === (currentFolderId || undefined);
      const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesFolder && matchesSearch;
    });
  }, [currentFolderId, searchQuery]);

  const breadcrumbs = useMemo(() => {
    const path = [];
    let current = currentFolder;
    while (current) {
      path.unshift(current);
      current = current.parentId ? mockDocuments.find(d => d.id === current?.parentId) || null : null;
    }
    return path;
  }, [currentFolder]);

  const getDocIcon = (doc: AppDocument) => {
    if (doc.docType === DocType.FOLDER) return <Folder className="w-8 h-8 text-primary fill-primary/10" />;
    if (doc.docType === DocType.LINK) return <LinkIcon className="w-8 h-8 text-indigo-500" />;
    if (doc.docType === DocType.INTERNAL) return <FileText className="w-8 h-8 text-emerald-500" />;
    
    if (doc.mimeType?.startsWith('image/')) return <FileImage className="w-8 h-8 text-purple-500" />;
    if (doc.mimeType?.includes('spreadsheet') || doc.title.endsWith('.xlsx')) return <FileSpreadsheet className="w-8 h-8 text-emerald-600" />;
    
    return <File className="w-8 h-8 text-slate-400" />;
  };

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-slate-50/50">
      {/* Toolbar */}
      <div className="bg-white border-b border-border px-8 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-medium text-ink-muted">
            <button 
              onClick={() => setCurrentFolderId(null)}
              className="hover:text-primary transition-colors"
            >
              {t('documents.title')}
            </button>
            {breadcrumbs.map((crumb) => (
              <React.Fragment key={crumb.id}>
                <ChevronRight className="w-4 h-4" />
                <button 
                  onClick={() => setCurrentFolderId(crumb.id)}
                  className="hover:text-primary transition-colors last:text-ink last:font-bold"
                >
                  {crumb.title}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input 
              type="text" 
              placeholder={t('documents.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-64 focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow-sm text-primary' : 'text-ink-muted'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow-sm text-primary' : 'text-ink-muted'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          <Button variant="primary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            {t('documents.create')}
          </Button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-8">
        {filteredDocs.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-ink-muted">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
              <File className="w-10 h-10 opacity-20" />
            </div>
            <h3 className="text-lg font-bold text-ink">{t('documents.empty_title')}</h3>
            <p className="text-sm">{t('documents.empty_desc')}</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6" : "space-y-2"}>
            {filteredDocs.map((doc) => (
              <motion.div
                key={doc.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -4 }}
                className="group"
              >
                {viewMode === 'grid' ? (
                  <Card 
                    className="p-4 flex flex-col items-center text-center relative cursor-pointer hover:border-primary/30 transition-all"
                    onClick={() => doc.docType === DocType.FOLDER ? setCurrentFolderId(doc.id) : setSelectedDoc(doc)}
                  >
                    <div className="mb-4 p-4 bg-slate-50 rounded-2xl group-hover:bg-primary/5 transition-colors">
                      {getDocIcon(doc)}
                    </div>
                    <h4 className="text-sm font-bold text-ink line-clamp-1 mb-1">{doc.title}</h4>
                    <p className="text-[10px] text-ink-muted uppercase font-bold tracking-wider">
                      {doc.docType === DocType.FOLDER ? t('documents.elements', { count: mockDocuments.filter(d => d.parentId === doc.id).length }) : doc.docType}
                    </p>
                    
                    <button className="absolute top-2 right-2 p-1 text-ink-muted hover:text-ink opacity-0 group-hover:opacity-100 transition-opacity">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </Card>
                ) : (
                  <div 
                    className="flex items-center justify-between p-3 bg-white border border-border rounded-xl hover:border-primary/30 transition-all cursor-pointer group"
                    onClick={() => doc.docType === DocType.FOLDER ? setCurrentFolderId(doc.id) : setSelectedDoc(doc)}
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-slate-50 rounded-lg group-hover:bg-primary/5 transition-colors">
                        {React.cloneElement(getDocIcon(doc) as React.ReactElement, { className: 'w-5 h-5' })}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-ink">{doc.title}</h4>
                        <p className="text-[10px] text-ink-muted uppercase font-bold">{doc.docType}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="text-xs text-ink-muted">{new Date(doc.updatedAt).toLocaleDateString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'en' ? 'en-US' : 'ru-RU')}</span>
                      <button className="p-1 text-ink-muted hover:text-ink">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Preview Overlay */}
      <AnimatePresence>
        {selectedDoc && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-end bg-ink/20 backdrop-blur-sm"
            onClick={() => setSelectedDoc(null)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl h-full bg-white shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview Header */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => setSelectedDoc(null)}
                    className="p-2 hover:bg-slate-100 rounded-lg text-ink-muted"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <div>
                    <h3 className="text-lg font-bold text-ink">{selectedDoc.title}</h3>
                    <p className="text-xs text-ink-muted">{t('documents.updated_at', { date: new Date(selectedDoc.updatedAt).toLocaleString(i18n.language === 'uz' ? 'uz-UZ' : i18n.language === 'en' ? 'en-US' : 'ru-RU') })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm"><Share2 className="w-4 h-4 mr-2" /> {t('documents.share')}</Button>
                  <Button variant="outline" size="sm" className="text-red-500 hover:bg-red-50 border-red-100"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>

              {/* Preview Content */}
              <div className="flex-1 overflow-y-auto p-8 bg-slate-50/30">
                {selectedDoc.docType === DocType.INTERNAL && (
                  <div className="bg-white p-12 rounded-2xl shadow-sm border border-border min-h-full prose prose-slate max-w-none">
                    <div className="whitespace-pre-wrap font-sans text-ink leading-relaxed">
                      {selectedDoc.content}
                    </div>
                  </div>
                )}

                {selectedDoc.docType === DocType.LINK && (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-indigo-50 text-indigo-500 rounded-3xl flex items-center justify-center mb-6">
                      <ExternalLink className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl font-bold text-ink mb-2">{t('documents.external_resource')}</h4>
                    <p className="text-ink-muted mb-8 max-w-xs">{t('documents.external_resource_desc')}</p>
                    <Button 
                      variant="primary" 
                      size="lg"
                      onClick={() => window.open(selectedDoc.externalUrl, '_blank')}
                    >
                      {t('documents.open_new_tab')}
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                )}

                {selectedDoc.docType === DocType.FILE && selectedDoc.mimeType?.startsWith('image/') && (
                  <div className="h-full flex flex-col items-center justify-center">
                    <img 
                      src={selectedDoc.fileUrl} 
                      alt={selectedDoc.title} 
                      className="max-w-full max-h-[60vh] rounded-xl shadow-lg border border-border"
                      referrerPolicy="no-referrer"
                    />
                    <div className="mt-8 flex gap-4">
                      <Button variant="primary"><Download className="w-4 h-4 mr-2" /> {t('documents.download')}</Button>
                      <Button variant="outline"><Eye className="w-4 h-4 mr-2" /> {t('documents.full_screen')}</Button>
                    </div>
                  </div>
                )}

                {selectedDoc.docType === DocType.FILE && !selectedDoc.mimeType?.startsWith('image/') && (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <div className="w-24 h-24 bg-slate-100 text-slate-400 rounded-3xl flex items-center justify-center mb-6">
                      <FileCode className="w-10 h-10" />
                    </div>
                    <h4 className="text-xl font-bold text-ink mb-2">{selectedDoc.title}</h4>
                    <p className="text-ink-muted mb-8">{t('documents.preview_unavailable_desc')}</p>
                    <Button variant="primary" size="lg"><Download className="w-4 h-4 mr-2" /> {t('documents.download')}</Button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
