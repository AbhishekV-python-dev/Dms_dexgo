import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Bell,
  Plus,
  Car,
  Building2,
  MapPin,
  FileSpreadsheet,
  ChevronDown,
  LogOut,
  Sparkles,
  LayoutDashboard,
  Calculator,
  GitBranch,
  Target,
  Tag,
  FileSearch,
  Shield,
  Layers,
} from 'lucide-react';
import { DexgoLogo } from './DexgoLogo.tsx';
import { Company } from '../utils/dealerData.ts';

interface CommandNavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  selectedCompanyId: string;
  setSelectedCompanyId: (id: string) => void;
  companies: Company[];
  onOpenAddVehicle: () => void;
  onOpenAddCompany: () => void;
  onOpenAddBranch: () => void;
  onToggleLoginView: () => void;
  isLoginView: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  totalInventoryCount: number;
}

export const CommandNavbar: React.FC<CommandNavbarProps> = ({
  activeTab,
  setActiveTab,
  selectedCompanyId,
  setSelectedCompanyId,
  companies,
  onOpenAddVehicle,
  onOpenAddCompany,
  onOpenAddBranch,
  onToggleLoginView,
  isLoginView,
  searchQuery,
  setSearchQuery,
  totalInventoryCount,
}) => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showCompanyMenu, setShowCompanyMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);

  const activeCompany =
    companies.find((c) => c.id === selectedCompanyId) || companies[0];

  // Primary top modules
  const primaryNavModules = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inventory', label: 'Inventory', icon: Car, count: totalInventoryCount },
    { id: 'progression', label: 'Progression', icon: GitBranch },
    { id: 'emi', label: 'EMI Calculator', icon: Calculator },
    { id: 'deals', label: 'Quotes & Deals', icon: FileSpreadsheet },
    { id: 'companies', label: 'Company & Branches', icon: Building2 },
  ];

  // Secondary modules (accessible via "More" or quick switch)
  const secondaryNavModules = [
    { id: 'demands', label: 'Cars in Demand', icon: Target },
    { id: 'special_price', label: 'Special Price Requests', icon: Tag },
    { id: 'procurement', label: 'Procurement Checks', icon: FileSearch },
    { id: 'finance', label: 'Ledgers & Balance Sheets', icon: Layers },
    { id: 'access', label: 'Staff & Access Control', icon: Shield },
  ];

  if (isLoginView) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B101D]/90 backdrop-blur-xl">
        <div className="h-0.5 bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-600" />
        <div className="w-full px-4 sm:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onToggleLoginView}
            className="flex items-center gap-2 group focus:outline-none cursor-pointer"
            title="DEXGO Dealership OS"
          >
            <DexgoLogo size="md" showTagline={true} />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400 hidden sm:inline">
              Previewing Redesigned Sign-In Portal
            </span>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onToggleLoginView}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Enter DMS Workspace</span>
            </motion.button>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0B101D]/95 backdrop-blur-xl transition-all">
      {/* Top micro-bar for brand gradient */}
      <div className="h-0.5 bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-600" />

      {/* Main Command Bar Container - Full width fluid */}
      <div className="w-full px-3 sm:px-6">
        <div className="flex items-center justify-between h-15 gap-2">
          {/* Zone 1: Brand & Operating Entity Selector */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                if (isLoginView) onToggleLoginView();
                setActiveTab('dashboard');
              }}
              className="flex items-center gap-1.5 group focus:outline-none cursor-pointer"
              title="Return to Dashboard Home"
            >
              <DexgoLogo size="sm" showTagline={false} />
            </button>

            {/* Operating Entity Quick Switcher */}
            <div className="relative hidden 2xl:block">
              <button
                onClick={() => setShowCompanyMenu(!showCompanyMenu)}
                className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-900 border border-slate-800 hover:border-cyan-500/40 text-[11px] text-slate-300 transition-colors cursor-pointer"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 animate-pulse" />
                <span className="font-semibold text-white max-w-[100px] truncate">
                  {activeCompany ? activeCompany.name : 'All Entities'}
                </span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {showCompanyMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-60 bg-slate-900 border border-slate-800 rounded-xl shadow-xl shadow-black/80 p-1.5 z-50"
                  >
                    <div className="px-2 py-1 text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                      Switch Entity Scope
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCompanyId('ALL');
                        setShowCompanyMenu(false);
                      }}
                      className={`w-full text-left px-2 py-1 rounded-md text-xs flex items-center justify-between cursor-pointer ${
                        selectedCompanyId === 'ALL'
                          ? 'bg-cyan-500/10 text-cyan-300 font-semibold'
                          : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <span>All Registered Entities</span>
                      <span className="text-[10px] text-slate-500">Group</span>
                    </button>
                    {companies.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          setSelectedCompanyId(c.id);
                          setShowCompanyMenu(false);
                        }}
                        className={`w-full text-left px-2 py-1 rounded-md text-xs flex items-center justify-between cursor-pointer ${
                          selectedCompanyId === c.id
                            ? 'bg-cyan-500/10 text-cyan-300 font-semibold'
                            : 'text-slate-300 hover:bg-slate-800'
                        }`}
                      >
                        <span className="truncate">{c.name}</span>
                        <span className="text-[10px] text-emerald-400 font-mono">
                          {c.currency}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Zone 2: Navigation Modules with Animated Sliding Indicator */}
          <nav className="hidden lg:flex items-center gap-1">
            {primaryNavModules.map((module) => {
              const Icon = module.icon;
              const isActive = activeTab === module.id && !isLoginView;
              return (
                <button
                  key={module.id}
                  onClick={() => {
                    if (isLoginView) onToggleLoginView();
                    setActiveTab(module.id);
                  }}
                  className={`relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-semibold whitespace-nowrap transition-colors duration-150 cursor-pointer ${
                    isActive
                      ? 'text-cyan-300'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                  }`}
                >
                  {/* Fluid Framer Motion Background Pill */}
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active-pill"
                      className="absolute inset-0 rounded-md bg-cyan-950/60 border border-cyan-500/40 shadow-[0_0_12px_rgba(0,229,255,0.2)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}

                  <Icon
                    className={`relative z-10 w-3.5 h-3.5 ${
                      isActive ? 'text-cyan-400' : 'text-slate-400'
                    }`}
                  />
                  <span className="relative z-10">{module.label}</span>
                  {module.count !== undefined && (
                    <span className="relative z-10 text-[9px] px-1 py-0.2 rounded bg-slate-800 text-slate-300 font-mono">
                      {module.count}
                    </span>
                  )}
                  {isActive && (
                    <motion.span
                      layoutId="navbar-active-underline"
                      className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-cyan-400 to-emerald-400"
                      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                    />
                  )}
                </button>
              );
            })}

            {/* "More Operations" Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowMoreMenu(!showMoreMenu)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  secondaryNavModules.some((m) => m.id === activeTab)
                    ? 'text-cyan-300 bg-cyan-950/40 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span>More</span>
                <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform duration-200 ${showMoreMenu ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showMoreMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-2 w-56 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl p-1.5 z-50"
                  >
                    <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      Extended Operations
                    </div>
                    {secondaryNavModules.map((m) => {
                      const Icon = m.icon;
                      return (
                        <button
                          key={m.id}
                          onClick={() => {
                            setActiveTab(m.id);
                            setShowMoreMenu(false);
                          }}
                          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors text-left cursor-pointer ${
                            activeTab === m.id
                              ? 'bg-cyan-500/10 text-cyan-300 font-bold'
                              : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                          }`}
                        >
                          <Icon className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{m.label}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Zone 3: Universal Search, Quick Actions & Profile */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Global Search Input */}
            <div className="relative hidden xl:block w-32 2xl:w-40">
              <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full pl-7 pr-5 py-1 bg-slate-900 border border-slate-700/80 rounded-md text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-1.5 top-1.5 text-slate-500 hover:text-white text-xs cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Primary Action: "+ Add" Quick Hub */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowAddMenu(!showAddMenu)}
                className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 text-xs font-bold shadow-md shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
              >
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span>+ Add</span>
                <ChevronDown className={`w-3 h-3 stroke-[2.5] transition-transform duration-200 ${showAddMenu ? 'rotate-180' : ''}`} />
              </motion.button>

              <AnimatePresence>
                {showAddMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 bg-slate-900 border border-cyan-500/30 rounded-xl shadow-2xl shadow-black/80 p-1.5 z-50"
                  >
                    <div className="px-2.5 py-1.5 text-[10px] font-bold text-cyan-400 uppercase tracking-wider">
                      Quick Operations
                    </div>
                    <button
                      onClick={() => {
                        setShowAddMenu(false);
                        onOpenAddVehicle();
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-slate-200 hover:bg-slate-800 hover:text-cyan-300 transition-colors text-left cursor-pointer"
                    >
                      <Car className="w-3.5 h-3.5 text-cyan-400" />
                      <div>
                        <div className="font-semibold">Add Vehicle</div>
                        <div className="text-[10px] text-slate-400">Inventory intake</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setShowAddMenu(false);
                        onOpenAddCompany();
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-slate-200 hover:bg-slate-800 hover:text-cyan-300 transition-colors text-left cursor-pointer"
                    >
                      <Building2 className="w-3.5 h-3.5 text-blue-400" />
                      <div>
                        <div className="font-semibold">Register Entity</div>
                        <div className="text-[10px] text-slate-400">Corporate tax entity</div>
                      </div>
                    </button>
                    <button
                      onClick={() => {
                        setShowAddMenu(false);
                        onOpenAddBranch();
                      }}
                      className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-slate-200 hover:bg-slate-800 hover:text-emerald-300 transition-colors text-left cursor-pointer"
                    >
                      <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                      <div>
                        <div className="font-semibold">Add Showroom</div>
                        <div className="text-[10px] text-slate-400">Facility location</div>
                      </div>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Screen View Toggle (DMS Workspace vs Login Page) */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onToggleLoginView}
              className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold bg-slate-900 border border-slate-700/80 text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300 transition-all cursor-pointer whitespace-nowrap"
              title="Compare the redesigned login screen with the DMS workspace"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Portal</span>
            </motion.button>

            {/* Notification Drawer Trigger with Animated Pulse Ring */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 rounded-md bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 transition-colors cursor-pointer"
                aria-label="View dealership notifications"
              >
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-pulse ring-2 ring-cyan-500/30" />
              </button>

              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-72 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl shadow-black/80 p-3 z-50"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                      <span className="text-xs font-semibold text-white">Dealership Alerts</span>
                      <span className="text-[10px] text-cyan-400 font-mono">2 Live</span>
                    </div>
                    <div className="space-y-2 mt-2">
                      <div className="p-2 bg-slate-800/60 rounded-lg border border-slate-700/50 text-xs">
                        <div className="text-slate-200 font-medium">New Trade License Verified</div>
                        <div className="text-[10px] text-slate-400">Prime Rides LLC · Dubai Branch</div>
                      </div>
                      <div className="p-2 bg-slate-800/60 rounded-lg border border-slate-700/50 text-xs">
                        <div className="text-slate-200 font-medium">GCC Inspection Clearance</div>
                        <div className="text-[10px] text-slate-400">12 vehicles cleared at Yas Marina Hub</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* User Profile Badge */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-1.5 pl-1.5 pr-1 py-0.5 rounded-md bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
              >
                <div className="w-5 h-5 rounded bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-bold text-[10px]">
                  M
                </div>
                <span className="text-xs font-semibold text-white hidden md:inline">MasterTest</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-48 bg-slate-900 border border-slate-800 rounded-xl shadow-xl shadow-black/60 p-1.5 z-50"
                  >
                    <div className="px-2.5 py-1.5 border-b border-slate-800 mb-1">
                      <p className="text-xs font-semibold text-white">MasterTest Admin</p>
                      <p className="text-[10px] text-slate-400 font-mono">admin@dexgo.ae</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        onToggleLoginView();
                      }}
                      className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors text-left cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out (Auth Screen)</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile / Tablet Horizontal Navigation Scroll */}
        <div className="lg:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-slate-800/60 no-scrollbar">
          {[...primaryNavModules, ...secondaryNavModules].map((module) => {
            const Icon = module.icon;
            const isActive = activeTab === module.id && !isLoginView;
            return (
              <button
                key={module.id}
                onClick={() => {
                  if (isLoginView) onToggleLoginView();
                  setActiveTab(module.id);
                }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span>{module.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};
