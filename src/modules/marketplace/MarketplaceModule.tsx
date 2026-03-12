import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Star, 
  Download, 
  CheckCircle2, 
  ArrowRight, 
  Filter, 
  Zap, 
  Scissors, 
  Truck, 
  Utensils, 
  Building2, 
  Globe, 
  ShieldCheck, 
  Cpu,
  Layout,
  ExternalLink,
  Plus
} from 'lucide-react';
import { Card } from '@/src/components/ui/Card';
import { Button } from '@/src/components/ui/Button';
import { MarketplaceItem } from '@/src/types';
import { motion, AnimatePresence } from 'motion/react';
import { useTranslation } from 'react-i18next';

// Mock Marketplace Data
const marketplaceItems: MarketplaceItem[] = [
  {
    id: 'm1',
    title: 'Салон красоты PRO',
    description: 'Полный цикл: онлайн-запись, учет расходников, расчет зарплат мастеров и CRM для клиентов.',
    category: 'industry',
    price: 'paid',
    rating: 4.9,
    installs: 1240,
    icon: '✂️',
    banner: 'https://picsum.photos/seed/beauty/800/400'
  },
  {
    id: 'm2',
    title: 'Логистика и Склад',
    description: 'Управление цепочками поставок, интеграция с картами и автоматизация складских остатков.',
    category: 'industry',
    price: 'paid',
    rating: 4.7,
    installs: 850,
    icon: '🚚',
    banner: 'https://picsum.photos/seed/logistics/800/400'
  },
  {
    id: 'm3',
    title: 'Ресторанный учет',
    description: 'Интеграция с кассами, калькуляционные карты, инвентаризация и аналитика фудкоста.',
    category: 'industry',
    price: 'paid',
    rating: 4.8,
    installs: 2100,
    icon: '🍽️',
    banner: 'https://picsum.photos/seed/restaurant/800/400'
  },
  {
    id: 'm4',
    title: 'Автоматизация HR',
    description: 'Шаблоны процессов найма, онбординга и хранения личных дел сотрудников.',
    category: 'automation',
    price: 'free',
    rating: 4.5,
    installs: 3400,
    icon: '👥',
    banner: 'https://picsum.photos/seed/hr/800/400'
  },
  {
    id: 'm5',
    title: 'Интеграция с маркетплейсами',
    description: 'Синхронизация заказов и остатков с Wildberries, Ozon и Яндекс.Маркет.',
    category: 'integration',
    price: 'paid',
    rating: 4.9,
    installs: 5600,
    icon: '📦',
    banner: 'https://picsum.photos/seed/marketplace/800/400'
  },
  {
    id: 'm6',
    title: 'Умная бухгалтерия',
    description: 'Автоматическое распознавание актов и счетов через ИИ и сверка с банком.',
    category: 'automation',
    price: 'free',
    rating: 4.6,
    installs: 1800,
    icon: '📊',
    banner: 'https://picsum.photos/seed/accounting/800/400'
  }
];

export const MarketplaceModule: React.FC = () => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState<'all' | 'industry' | 'integration' | 'automation'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = marketplaceItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col overflow-hidden bg-slate-50/50">
      {/* Toolbar - Sticky at the top */}
      <div className="bg-white border-b border-border px-8 md:px-12 py-4 flex flex-col md:flex-row items-center justify-between shrink-0 z-20 gap-4">
        <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto overflow-x-auto no-scrollbar">
          <div className="flex gap-4 md:gap-6 shrink-0">
            {['all', 'industry', 'integration', 'automation'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat as any)}
                className={`text-xs md:text-sm font-bold transition-all relative py-2 whitespace-nowrap ${
                  activeCategory === cat ? 'text-primary' : 'text-ink-muted hover:text-ink'
                }`}
              >
                {cat === 'all' ? t('marketplace.all') : 
                 cat === 'industry' ? t('marketplace.industry') : 
                 cat === 'integration' ? t('marketplace.integration') : t('marketplace.automation')}
                {activeCategory === cat && (
                  <motion.div layoutId="cat-underline" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                )}
              </button>
            ))}
          </div>
          
          <div className="hidden md:block h-6 w-px bg-border shrink-0" />
          
          <div className="relative flex-1 md:flex-none">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted" />
            <input 
              type="text" 
              placeholder={t('marketplace.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm w-full md:w-64 focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <Button variant="outline" size="sm" className="rounded-xl">{t('marketplace.my_purchases')}</Button>
          <Button variant="primary" size="sm" className="rounded-xl"><Plus className="w-4 h-4 mr-2" /> {t('marketplace.partners')}</Button>
        </div>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* Compact Hero Section - Now inside scrollable area */}
        <div className="px-8 md:px-12 pt-8 pb-4">
          <div className="bg-slate-900 rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
            <div className="relative z-10 max-w-2xl space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-[0.2em] border border-white/10">
                  <Zap className="w-3 h-3 fill-current text-amber-400" />
                  <span>Uchetgram Marketplace</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-display font-black leading-tight tracking-tight">
                  {t('marketplace.title')}
                </h1>
                <p className="text-sm md:text-base text-white/60 max-w-lg leading-relaxed font-medium">
                  {t('marketplace.subtitle')}
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <Button variant="primary" className="bg-white text-slate-900 hover:bg-white/90 border-none rounded-xl px-6 font-black text-xs uppercase tracking-widest">
                    {t('marketplace.top_10')}
                  </Button>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-xl px-6 font-black text-xs uppercase tracking-widest">
                    {t('marketplace.how_it_works')}
                  </Button>
                </div>
              </motion.div>
            </div>
            
            {/* Abstract Decorative Elements */}
            <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none">
              <motion.div 
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -right-20 -top-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" 
              />
              <div className="absolute right-20 top-10 w-48 h-48 bg-amber-400/10 rounded-full blur-[80px]" />
              
              {/* Floating Icons */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-[15%] top-[20%] p-4 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl"
              >
                <Layout className="w-8 h-8 text-white/40" />
              </motion.div>
              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute right-[30%] bottom-[20%] p-4 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl"
              >
                <Cpu className="w-6 h-6 text-white/40" />
              </motion.div>
            </div>
          </div>
        </div>

        {/* Grid Section */}
        <div className="p-8 md:px-12 pb-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-display font-black tracking-tight">
                {activeCategory === 'all' ? t('marketplace.all') : 
                 activeCategory === 'industry' ? t('marketplace.industry') : 
                 activeCategory === 'integration' ? t('marketplace.integration') : t('marketplace.automation')}
              </h2>
              <div className="flex items-center gap-2 text-sm text-ink-muted">
                {t('marketplace.sort_by')} <span className="text-primary cursor-pointer hover:underline font-bold">{t('marketplace.popularity')}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredItems.map((item, idx) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                  >
                    <Card className="p-0 overflow-hidden group hover:shadow-2xl hover:shadow-primary/5 transition-all border-none bg-white">
                      <div className="h-48 overflow-hidden relative">
                        <img 
                          src={item.banner} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                          <Button variant="primary" className="w-full">{t('marketplace.install_now')}</Button>
                        </div>
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-primary">
                          {item.category}
                        </div>
                      </div>
                      
                      <div className="p-6 space-y-4">
                        <div className="flex justify-between items-start">
                          <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-2xl">
                            {item.icon}
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                              <Star className="w-3 h-3 fill-current" /> {item.rating}
                            </div>
                            <p className="text-[10px] text-ink-muted font-medium">{item.installs} установок</p>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-lg font-bold text-ink group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-sm text-ink-muted line-clamp-2 mt-1 leading-relaxed">{item.description}</p>
                        </div>

                        <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
                          <span className={`text-sm font-bold ${item.price === 'free' ? 'text-emerald-500' : 'text-ink'}`}>
                            {item.price === 'free' ? t('marketplace.free') : t('marketplace.price_from', { price: '2,900' })}
                          </span>
                          <button className="text-primary text-xs font-bold flex items-center gap-1 hover:gap-2 transition-all">
                            {t('marketplace.details')} <ArrowRight className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {filteredItems.length === 0 && (
              <div className="py-20 flex flex-col items-center justify-center text-ink-muted">
                <ShoppingBag className="w-16 h-16 opacity-10 mb-4" />
                <h3 className="text-xl font-bold text-ink">{t('marketplace.not_found')}</h3>
                <p>{t('marketplace.not_found_desc')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
