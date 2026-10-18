import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  initialCompanies,
  initialBranches,
  initialVehicles,
  initialProgressions,
  Company,
  Branch,
  Vehicle,
  DealProgression,
} from './utils/dealerData.ts';
import { CommandNavbar } from './components/CommandNavbar.tsx';
import { ShowroomDashboardView } from './components/ShowroomDashboardView.tsx';
import { VehicleInventoryView } from './components/VehicleInventoryView.tsx';
import { DealProgressionView } from './components/DealProgressionView.tsx';
import { EmiCalculatorView } from './components/EmiCalculatorView.tsx';
import { QuotesDealsView } from './components/QuotesDealsView.tsx';
import { CompanyManagementView } from './components/CompanyManagementView.tsx';
import { CarsInDemandView } from './components/CarsInDemandView.tsx';
import { SpecialPriceView } from './components/SpecialPriceView.tsx';
import { ProcurementChecksView } from './components/ProcurementChecksView.tsx';
import { DealsFinanceView } from './components/DealsFinanceView.tsx';
import { AuthPortalView } from './components/AuthPortalView.tsx';
import { CompanyModal } from './components/CompanyModal.tsx';
import { BranchModal } from './components/BranchModal.tsx';
import { VehicleModal } from './components/VehicleModal.tsx';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [isLoginView, setIsLoginView] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companies, setCompanies] = useState<Company[]>(initialCompanies);
  const [branches, setBranches] = useState<Branch[]>(initialBranches);
  const [vehicles, setVehicles] = useState<Vehicle[]>(initialVehicles);
  const [progressions] = useState<DealProgression[]>(initialProgressions);
  const [selectedCompanyId, setSelectedCompanyId] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected vehicle for inspector drawer in Inventory
  const [selectedVehicleForDetail, setSelectedVehicleForDetail] = useState<Vehicle | null>(null);

  // Modals state
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState(false);
  const [isCompanyModalOpen, setIsCompanyModalOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [isBranchModalOpen, setIsBranchModalOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<Branch | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handlers for Company
  const handleSaveCompany = (data: Omit<Company, 'id'>) => {
    if (editingCompany) {
      setCompanies((prev) =>
        prev.map((c) => (c.id === editingCompany.id ? { ...data, id: c.id } : c))
      );
      showToast(`Updated entity "${data.name}"`);
    } else {
      const newComp: Company = {
        ...data,
        id: `comp-${Date.now()}`,
      };
      setCompanies((prev) => [...prev, newComp]);
      showToast(`Registered new entity "${data.name}"`);
    }
    setEditingCompany(null);
  };

  const handleDeleteCompany = (id: string) => {
    const comp = companies.find((c) => c.id === id);
    setCompanies((prev) => prev.filter((c) => c.id !== id));
    showToast(`Removed entity "${comp?.name || id}"`);
  };

  // Handlers for Branch
  const handleSaveBranch = (data: Omit<Branch, 'id'>) => {
    if (editingBranch) {
      setBranches((prev) =>
        prev.map((b) => (b.id === editingBranch.id ? { ...data, id: b.id } : b))
      );
      showToast(`Updated showroom "${data.name}"`);
    } else {
      const newBranch: Branch = {
        ...data,
        id: `br-${Date.now()}`,
      };
      setBranches((prev) => [...prev, newBranch]);
      setCompanies((prev) =>
        prev.map((c) =>
          c.id === data.companyId
            ? { ...c, branchCount: (c.branchCount || 0) + 1 }
            : c
        )
      );
      showToast(`Added showroom "${data.name}"`);
    }
    setEditingBranch(null);
  };

  const handleDeleteBranch = (id: string) => {
    const br = branches.find((b) => b.id === id);
    setBranches((prev) => prev.filter((b) => b.id !== id));
    showToast(`Removed showroom "${br?.name || id}"`);
  };

  // Handler for Vehicle Intake
  const handleAddVehicle = (data: Omit<Vehicle, 'id' | 'stockId' | 'spec' | 'documentsUploaded' | 'documentsTotal' | 'daysInStock'>) => {
    const newStockId = `PR-L00${vehicles.length + 55}`;
    const newVeh: Vehicle = {
      ...data,
      id: `veh-${Date.now()}`,
      stockId: newStockId,
      spec: 'GCC',
      documentsUploaded: 2,
      documentsTotal: 2,
      daysInStock: 1,
    };
    setVehicles((prev) => [newVeh, ...prev]);

    // Update branch inventory count
    setBranches((prev) =>
      prev.map((b) =>
        b.id === data.branchId
          ? { ...b, inventoryCount: b.inventoryCount + 1 }
          : b
      )
    );
    showToast(`Vehicle ${data.make} ${data.model} (${newStockId}) allocated to fleet`);
  };

  const totalInventoryCount = branches.reduce(
    (sum, b) => sum + b.inventoryCount,
    0
  );

  return (
    <div className="min-h-screen bg-[#080C14] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Animated Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-900 border border-cyan-500/40 text-slate-100 text-xs shadow-2xl shadow-cyan-950/80"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Executive Command Bar */}
      <CommandNavbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        selectedCompanyId={selectedCompanyId}
        setSelectedCompanyId={setSelectedCompanyId}
        companies={companies}
        onOpenAddVehicle={() => setIsVehicleModalOpen(true)}
        onOpenAddCompany={() => {
          setEditingCompany(null);
          setIsCompanyModalOpen(true);
        }}
        onOpenAddBranch={() => {
          setEditingBranch(null);
          setIsBranchModalOpen(true);
        }}
        onToggleLoginView={() => setIsLoginView(!isLoginView)}
        isLoginView={isLoginView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalInventoryCount={totalInventoryCount}
      />

      {/* Main Viewport Content with Fluid View Transitions */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          {isLoginView ? (
            <motion.div
              key="auth-portal"
              initial={{ opacity: 0, y: 12, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.995 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              <AuthPortalView onLoginSuccess={() => setIsLoginView(false)} />
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12, scale: 0.995 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.995 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* 1. Showroom Command Center (Video 00:00 - 00:12) */}
              {activeTab === 'dashboard' && (
                <ShowroomDashboardView
                  vehicles={vehicles}
                  progressions={progressions}
                  onNavigateTab={(tab) => setActiveTab(tab)}
                  onOpenAddVehicle={() => setIsVehicleModalOpen(true)}
                  onSelectVehicle={(car) => {
                    setSelectedVehicleForDetail(car);
                    setActiveTab('inventory');
                  }}
                />
              )}

              {/* 2. Vehicle Inventory & Expenses (Video 00:13 - 00:46) */}
              {activeTab === 'inventory' && (
                <VehicleInventoryView
                  vehicles={vehicles}
                  branches={branches}
                  onOpenAddVehicle={() => setIsVehicleModalOpen(true)}
                  selectedVehicleForDetail={selectedVehicleForDetail}
                  setSelectedVehicleForDetail={setSelectedVehicleForDetail}
                />
              )}

              {/* 3. Deal Progression State Machine (Video 00:53 - 01:00) */}
              {activeTab === 'progression' && <DealProgressionView />}

              {/* 4. EMI Calculator & Estimates (Video 01:07 - 01:22) */}
              {activeTab === 'emi' && <EmiCalculatorView vehicles={vehicles} />}

              {/* 5. Quotes & Deals (Video 01:23 - 01:32) */}
              {activeTab === 'deals' && <QuotesDealsView vehicles={vehicles} />}

              {/* 6. Company & Branches */}
              {activeTab === 'companies' && (
                <CompanyManagementView
                  companies={companies}
                  branches={branches}
                  onOpenAddCompany={() => {
                    setEditingCompany(null);
                    setIsCompanyModalOpen(true);
                  }}
                  onOpenAddBranch={() => {
                    setEditingBranch(null);
                    setIsBranchModalOpen(true);
                  }}
                  onEditCompany={(comp) => {
                    setEditingCompany(comp);
                    setIsCompanyModalOpen(true);
                  }}
                  onEditBranch={(br) => {
                    setEditingBranch(br);
                    setIsBranchModalOpen(true);
                  }}
                  onDeleteCompany={handleDeleteCompany}
                  onDeleteBranch={handleDeleteBranch}
                  selectedCompanyFilter={selectedCompanyId}
                  setSelectedCompanyFilter={setSelectedCompanyId}
                  searchQuery={searchQuery}
                  setSearchQuery={setSearchQuery}
                />
              )}

              {/* 7. Cars in Demand (Video 00:47 - 00:50) */}
              {activeTab === 'demands' && <CarsInDemandView />}

              {/* 8. Special Price Requests (Video 00:51 - 00:52) */}
              {activeTab === 'special_price' && <SpecialPriceView />}

              {/* 9. Procurement Checks (Video 01:01 - 01:06) */}
              {activeTab === 'procurement' && <ProcurementChecksView />}

              {/* 10. Financial Ledgers & Access */}
              {(activeTab === 'finance' || activeTab === 'access') && (
                <DealsFinanceView
                  type={activeTab as 'finance' | 'access'}
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-800/80 bg-[#070A11] py-4 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">DEXGO</span>
            <span>·</span>
            <span>Automotive Dealership & Mobility Operating System</span>
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span className="text-emerald-400">GCC Compliant</span>
            <span>VAT 5% Ready</span>
            <button
              onClick={() => setIsLoginView(!isLoginView)}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              {isLoginView ? 'View DMS System' : 'View Login Screen'}
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals with Animation */}
      <CompanyModal
        isOpen={isCompanyModalOpen}
        onClose={() => {
          setIsCompanyModalOpen(false);
          setEditingCompany(null);
        }}
        onSave={handleSaveCompany}
        initialData={editingCompany}
      />

      <BranchModal
        isOpen={isBranchModalOpen}
        onClose={() => {
          setIsBranchModalOpen(false);
          setEditingBranch(null);
        }}
        onSave={handleSaveBranch}
        companies={companies}
        initialData={editingBranch}
      />

      <VehicleModal
        isOpen={isVehicleModalOpen}
        onClose={() => setIsVehicleModalOpen(false)}
        onAddVehicle={handleAddVehicle}
        branches={branches}
      />
    </div>
  );
}
