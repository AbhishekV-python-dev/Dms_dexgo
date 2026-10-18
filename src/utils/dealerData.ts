export interface Company {
  id: string;
  name: string;
  taxRegistration: string;
  contact: string;
  currency: string;
  regionalSpec: string;
  status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  branchCount?: number;
  establishedYear?: number;
}

export interface Branch {
  id: string;
  name: string;
  companyId: string;
  companyName: string;
  address: string;
  contact: string;
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
  inventoryCount: number;
  manager: string;
}

export interface Vehicle {
  id: string;
  stockId: string;
  vin: string;
  make: string;
  model: string;
  variant?: string;
  year: number;
  color: string;
  price: number;
  purchaseCost?: number;
  leastSellingPrice?: number;
  currency: string;
  mileageKm: number;
  branchId: string;
  status: 'AVAILABLE' | 'BOOKED' | 'RESERVED' | 'SOLD' | 'UPCOMING';
  spec: 'GCC' | 'NON-GCC';
  documentsUploaded: number;
  documentsTotal: number;
  image?: string;
  daysInStock: number;
}

export interface VehicleExpense {
  id: string;
  vehicleId: string;
  description: string;
  amount: number;
  date: string;
}

export interface CarDemand {
  id: string;
  customerName: string;
  phone: string;
  vehicleRequested: string;
  yearRange: string;
  budgetAed: number;
  agent: string;
  matchesCount: number;
  status: 'ACTIVE' | 'FULFILLED' | 'CANCELLED';
  createdDate: string;
}

export interface SpecialPriceRequest {
  id: string;
  stockId: string;
  vehicle: string;
  originalPrice: number;
  purchaseCost: number;
  expenses: number;
  requestedPrice: number;
  requestedBy: string;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  requestDate: string;
}

export type ProgressionStage =
  | 'Evaluation'
  | 'Passing'
  | 'Dubai Passing'
  | 'Registration Passing'
  | 'Insurance'
  | 'Registration'
  | 'Delivery Video'
  | 'Completed';

export interface DealProgression {
  id: string;
  quoteId: string;
  stockId: string;
  vehicle: string;
  customer: string;
  seller: string;
  bank: string;
  sellingPrice: number;
  currentStage: ProgressionStage;
  status: 'Active' | 'Completed' | 'Pending';
  emirate: string;
  remarks: string;
  checklist: Record<string, boolean>;
}

export interface ProcurementCheck {
  id: string;
  stockId: string;
  chassis: string;
  vehicle: string;
  year: number;
  mileageKm: number;
  accidents: 'No Accidents' | 'Minor Scratches' | 'Repainted Panel';
  conditionNotes: string;
  checkedDate: string;
  inspector: string;
}

export interface EmiEstimate {
  id: string;
  customerName: string;
  customerMobile: string;
  vehicle: string;
  bank: string;
  interestRate: number;
  vehiclePrice: number;
  downPayment: number;
  financeAmount: number;
  tenureMonths: number;
  monthlyEmi: number;
  status: 'ACTIVE' | 'EXPIRED';
  createdDate: string;
}

export interface DealQuote {
  id: string;
  customer: string;
  phone: string;
  vehicle: string;
  price: number;
  paymentType: 'Finance' | 'Cash';
  status: 'Open' | 'Quotes' | 'Booked' | 'Sold' | 'Cancelled';
  createdDate: string;
}

// Initial Data Sets
export const initialCompanies: Company[] = [
  {
    id: 'comp-1',
    name: 'Admin Test Company',
    taxRegistration: '100XXXXXXXXX004',
    contact: '+971 50 444 4444',
    currency: 'AED',
    regionalSpec: 'GCC Specs (Standard)',
    status: 'ACTIVE',
    branchCount: 1,
    establishedYear: 2021,
  },
  {
    id: 'comp-2',
    name: 'Prime Rides Group LLC',
    taxRegistration: '100XXXXXXXXX003',
    contact: '+971 50 333 3333',
    currency: 'AED',
    regionalSpec: 'GCC Specs (Standard)',
    status: 'ACTIVE',
    branchCount: 3,
    establishedYear: 2019,
  },
  {
    id: 'comp-3',
    name: 'DEXGO Mobility Logistics',
    taxRegistration: '100XXXXXXXXX009',
    contact: '+971 4 888 9000',
    currency: 'AED',
    regionalSpec: 'GCC & European Specs',
    status: 'ACTIVE',
    branchCount: 2,
    establishedYear: 2023,
  },
];

export const initialBranches: Branch[] = [
  {
    id: 'br-1',
    name: 'Prime Rides Dubai Main Showroom',
    companyId: 'comp-2',
    companyName: 'Prime Rides Group LLC',
    address: 'Sheikh Zayed Rd, Al Quoz 1, Dubai, UAE',
    contact: '+971 50 222 2222',
    status: 'ACTIVE',
    inventoryCount: 42,
    manager: 'Tariq Al-Mansoor',
  },
  {
    id: 'br-2',
    name: 'DEXGO Flagship Hub - Yas Marina',
    companyId: 'comp-3',
    companyName: 'DEXGO Mobility Logistics',
    address: 'Yas Marina Circuit Boulevard, Abu Dhabi, UAE',
    contact: '+971 2 444 1188',
    status: 'ACTIVE',
    inventoryCount: 68,
    manager: 'Elena Vance',
  },
  {
    id: 'br-3',
    name: 'Admin Logistics Depot - Sharjah',
    companyId: 'comp-1',
    companyName: 'Admin Test Company',
    address: 'Industrial Area 12, Sharjah, UAE',
    contact: '+971 6 555 7799',
    status: 'ACTIVE',
    inventoryCount: 19,
    manager: 'Zaid Farooq',
  },
  {
    id: 'br-4',
    name: 'Prime Rides Luxury Studio - DIFC',
    companyId: 'comp-2',
    companyName: 'Prime Rides Group LLC',
    address: 'Gate Precinct 4, DIFC, Dubai, UAE',
    contact: '+971 4 333 8811',
    status: 'ACTIVE',
    inventoryCount: 15,
    manager: 'Kareem Nour',
  },
];

export const initialVehicles: Vehicle[] = [
  {
    id: 'veh-1',
    stockId: 'PR-L0047',
    vin: 'WP0AF2A91RS290118',
    make: 'Porsche',
    model: '911 GT3 RS (Weissach)',
    variant: 'RS Edition',
    year: 2024,
    color: 'Arctic Grey',
    price: 1350000,
    purchaseCost: 1210000,
    leastSellingPrice: 1300000,
    currency: 'AED',
    mileageKm: 850,
    branchId: 'br-1',
    status: 'AVAILABLE',
    spec: 'GCC',
    documentsUploaded: 2,
    documentsTotal: 2,
    daysInStock: 4,
  },
  {
    id: 'veh-2',
    stockId: 'PR-L0048',
    vin: 'W1NYX7JJ3MA918231',
    make: 'Mercedes-AMG',
    model: 'G63 Magno Edition',
    variant: 'G-Class AMG',
    year: 2025,
    color: 'Night Black Magno',
    price: 1120000,
    purchaseCost: 980000,
    leastSellingPrice: 1080000,
    currency: 'AED',
    mileageKm: 210,
    branchId: 'br-2',
    status: 'BOOKED',
    spec: 'GCC',
    documentsUploaded: 2,
    documentsTotal: 2,
    daysInStock: 2,
  },
  {
    id: 'veh-3',
    stockId: 'PR-L0049',
    vin: 'ZFF98NMA5P0298112',
    make: 'Ferrari',
    model: '296 GTB Assetto Fiorano',
    variant: 'Assetto Corsa',
    year: 2024,
    color: 'Rosso Corsa',
    price: 1490000,
    purchaseCost: 1340000,
    leastSellingPrice: 1450000,
    currency: 'AED',
    mileageKm: 1400,
    branchId: 'br-2',
    status: 'RESERVED',
    spec: 'GCC',
    documentsUploaded: 1,
    documentsTotal: 2,
    daysInStock: 12,
  },
  {
    id: 'veh-4',
    stockId: 'PR-L0050',
    vin: 'SALWR2V44NA891230',
    make: 'Land Rover',
    model: 'Range Rover SV Intrepid',
    variant: 'P530 V8',
    year: 2024,
    color: 'Santorini Black',
    price: 990000,
    purchaseCost: 890000,
    leastSellingPrice: 960000,
    currency: 'AED',
    mileageKm: 3200,
    branchId: 'br-1',
    status: 'AVAILABLE',
    spec: 'GCC',
    documentsUploaded: 2,
    documentsTotal: 2,
    daysInStock: 16,
  },
  {
    id: 'veh-5',
    stockId: 'PR-L0051',
    vin: 'SCA664S55LU019283',
    make: 'Rolls-Royce',
    model: 'Ghost Black Badge',
    variant: 'Black Badge V12',
    year: 2023,
    color: 'Diamond Black',
    price: 1850000,
    purchaseCost: 1680000,
    leastSellingPrice: 1800000,
    currency: 'AED',
    mileageKm: 4800,
    branchId: 'br-4',
    status: 'AVAILABLE',
    spec: 'GCC',
    documentsUploaded: 2,
    documentsTotal: 2,
    daysInStock: 28,
  },
  {
    id: 'veh-6',
    stockId: 'PR-L0052',
    vin: 'JTJHY7AX4P4091823',
    make: 'Lexus',
    model: 'GX460 Platinum',
    variant: 'Premier V8',
    year: 2023,
    color: 'Pearl White',
    price: 310000,
    purchaseCost: 265000,
    leastSellingPrice: 295000,
    currency: 'AED',
    mileageKm: 28000,
    branchId: 'br-1',
    status: 'SOLD',
    spec: 'GCC',
    documentsUploaded: 2,
    documentsTotal: 2,
    daysInStock: 35,
  },
  {
    id: 'veh-7',
    stockId: 'PR-L0053',
    vin: 'WVWZZZCDZPW019281',
    make: 'Volkswagen',
    model: 'Golf R 20 Years Edition',
    variant: 'Golf R DSG',
    year: 2023,
    color: 'Lapiz Blue',
    price: 215000,
    purchaseCost: 185000,
    leastSellingPrice: 205000,
    currency: 'AED',
    mileageKm: 14500,
    branchId: 'br-3',
    status: 'AVAILABLE',
    spec: 'GCC',
    documentsUploaded: 2,
    documentsTotal: 2,
    daysInStock: 7,
  },
  {
    id: 'veh-8',
    stockId: 'PR-L0054',
    vin: 'JN1BBAZ52Z0091823',
    make: 'Nissan',
    model: 'Patrol NISMO V8',
    variant: 'NISMO 5.6L',
    year: 2024,
    color: 'Solid White',
    price: 385000,
    purchaseCost: 335000,
    leastSellingPrice: 370000,
    currency: 'AED',
    mileageKm: 8900,
    branchId: 'br-2',
    status: 'AVAILABLE',
    spec: 'GCC',
    documentsUploaded: 2,
    documentsTotal: 2,
    daysInStock: 5,
  },
];

export const initialDemands: CarDemand[] = [
  {
    id: 'dem-1',
    customerName: 'Rashid Al Nuaimi',
    phone: '+971 50 888 1234',
    vehicleRequested: 'Mercedes-AMG G63 or G500',
    yearRange: '2023 - 2025',
    budgetAed: 1100000,
    agent: 'Kareem Nour',
    matchesCount: 2,
    status: 'ACTIVE',
    createdDate: '2026-10-14',
  },
  {
    id: 'dem-2',
    customerName: 'Zainab Mansoori',
    phone: '+971 52 444 9876',
    vehicleRequested: 'Porsche Cayenne Coupe GTS',
    yearRange: '2024+',
    budgetAed: 650000,
    agent: 'Tariq Al-Mansoor',
    matchesCount: 1,
    status: 'ACTIVE',
    createdDate: '2026-10-12',
  },
  {
    id: 'dem-3',
    customerName: 'Marcus Sterling',
    phone: '+971 55 111 4455',
    vehicleRequested: 'Aston Martin DB12 Coupe',
    yearRange: '2024 - 2025',
    budgetAed: 950000,
    agent: 'Elena Vance',
    matchesCount: 0,
    status: 'ACTIVE',
    createdDate: '2026-10-10',
  },
];

export const initialSpecialPrices: SpecialPriceRequest[] = [
  {
    id: 'spr-1',
    stockId: 'PR-L0050',
    vehicle: '2024 Land Rover Range Rover SV',
    originalPrice: 990000,
    purchaseCost: 890000,
    expenses: 12000,
    requestedPrice: 940000,
    requestedBy: 'suhana.m@dexgo.ae',
    status: 'PENDING',
    requestDate: '2026-10-14',
  },
  {
    id: 'spr-2',
    stockId: 'PR-L0053',
    vehicle: '2023 Volkswagen Golf R',
    originalPrice: 215000,
    purchaseCost: 185000,
    expenses: 4500,
    requestedPrice: 200000,
    requestedBy: 'kareem.n@dexgo.ae',
    status: 'APPROVED',
    requestDate: '2026-10-13',
  },
];

export const initialProgressions: DealProgression[] = [
  {
    id: 'PRG-14',
    quoteId: 'LEDGER-015',
    stockId: 'PR-L0047',
    vehicle: '2024 Porsche 911 GT3 RS',
    customer: 'PR TEST (Al Habtoor Fleet)',
    seller: 'Prime Rides Group LLC',
    bank: 'Dubai Islamic Bank',
    sellingPrice: 1350000,
    currentStage: 'Insurance',
    status: 'Active',
    emirate: 'Dubai',
    remarks: 'Pre-delivery ceramic coating and RTA passing cleared.',
    checklist: {
      Evaluation: true,
      Passing: true,
      Insurance: true,
      Registration: false,
      'Delivery Video': false,
      Completed: false,
    },
  },
  {
    id: 'PRG-15',
    quoteId: 'LEDGER-016',
    stockId: 'PR-L0048',
    vehicle: '2025 Mercedes-AMG G63',
    customer: 'Emirates Luxury Rentals',
    seller: 'Prime Rides Group LLC',
    bank: 'Emirates NBD',
    sellingPrice: 1120000,
    currentStage: 'Registration',
    status: 'Active',
    emirate: 'Abu Dhabi',
    remarks: 'Awaiting plate allocation from Abu Dhabi Police Licensing.',
    checklist: {
      Evaluation: true,
      Passing: true,
      Insurance: true,
      Registration: true,
      'Delivery Video': false,
      Completed: false,
    },
  },
];

export const initialProcurements: ProcurementCheck[] = [
  {
    id: 'CHK-101',
    stockId: 'PR-L0047',
    chassis: 'WP0AF2A91RS290118',
    vehicle: 'Porsche 911 GT3 RS',
    year: 2024,
    mileageKm: 850,
    accidents: 'No Accidents',
    conditionNotes: 'Factory paint intact throughout, zero scuffs, PPF installed on front clip.',
    checkedDate: '2026-10-14',
    inspector: 'Zaid Farooq',
  },
  {
    id: 'CHK-102',
    stockId: 'PR-L0053',
    chassis: 'WVWZZZCDZPW019281',
    vehicle: 'Volkswagen Golf R',
    year: 2023,
    mileageKm: 14500,
    accidents: 'Repainted Panel',
    conditionNotes: 'Rear right fender repainted at authorized agency, 120 micron reading.',
    checkedDate: '2026-10-11',
    inspector: 'Hassan Bilal',
  },
];

export const initialQuotes: DealQuote[] = [
  {
    id: 'LEDGER-015',
    customer: 'PR TEST (Al Habtoor Fleet)',
    phone: '+971 50 444 8822',
    vehicle: '2024 Porsche 911 GT3 RS',
    price: 1350000,
    paymentType: 'Finance',
    status: 'Booked',
    createdDate: '2026-10-14',
  },
  {
    id: 'LEDGER-016',
    customer: 'Emirates Luxury Rentals',
    phone: '+971 52 333 9900',
    vehicle: '2025 Mercedes-AMG G63',
    price: 1120000,
    paymentType: 'Finance',
    status: 'Booked',
    createdDate: '2026-10-13',
  },
  {
    id: 'LEDGER-017',
    customer: 'Keerthana Babu',
    phone: '+971 55 999 1122',
    vehicle: '2024 Land Rover Range Rover SV',
    price: 990000,
    paymentType: 'Cash',
    status: 'Open',
    createdDate: '2026-10-12',
  },
  {
    id: 'LEDGER-018',
    customer: 'Riyas Automotive Trading',
    phone: '+971 56 777 5544',
    vehicle: '2023 Lexus GX460 Platinum',
    price: 310000,
    paymentType: 'Cash',
    status: 'Sold',
    createdDate: '2026-10-10',
  },
];

export const initialEmiEstimates: EmiEstimate[] = [
  {
    id: 'EMI-0007',
    customerName: 'PR TEST Client',
    customerMobile: '+971 50 123 4567',
    vehicle: '2024 Porsche 911 GT3 RS',
    bank: 'Dubai Islamic Bank',
    interestRate: 4.85,
    vehiclePrice: 1350000,
    downPayment: 270000,
    financeAmount: 1080000,
    tenureMonths: 60,
    monthlyEmi: 22365,
    status: 'ACTIVE',
    createdDate: '2026-10-14',
  },
  {
    id: 'EMI-0008',
    customerName: 'Keerthana Babu',
    customerMobile: '+971 55 999 1122',
    vehicle: '2025 Mercedes-AMG G63',
    bank: 'Emirates NBD',
    interestRate: 4.99,
    vehiclePrice: 1120000,
    downPayment: 224000,
    financeAmount: 896000,
    tenureMonths: 48,
    monthlyEmi: 22396,
    status: 'ACTIVE',
    createdDate: '2026-10-13',
  },
];

// Pure Calculation & Math Utilities
export function calculateMonthlyEmi(
  vehiclePrice: number,
  downPayment: number,
  annualInterestRatePercent: number,
  tenureMonths: number,
  insuranceAmount: number = 0,
  bankProcessingFee: number = 0
): {
  financeAmount: number;
  totalInterest: number;
  totalPayable: number;
  monthlyEmi: number;
} {
  const principal = Math.max(0, vehiclePrice - downPayment + insuranceAmount + bankProcessingFee);
  if (principal <= 0 || tenureMonths <= 0) {
    return { financeAmount: 0, totalInterest: 0, totalPayable: 0, monthlyEmi: 0 };
  }

  const monthlyRate = (annualInterestRatePercent / 100) / 12;
  if (monthlyRate === 0) {
    const emi = Math.round(principal / tenureMonths);
    return { financeAmount: principal, totalInterest: 0, totalPayable: principal, monthlyEmi: emi };
  }

  // Standard amortized loan formula: E = P * r * (1 + r)^n / ((1 + r)^n - 1)
  const factor = Math.pow(1 + monthlyRate, tenureMonths);
  const monthlyEmi = Math.round((principal * monthlyRate * factor) / (factor - 1));
  const totalPayable = monthlyEmi * tenureMonths;
  const totalInterest = Math.max(0, totalPayable - principal);

  return {
    financeAmount: principal,
    totalInterest,
    totalPayable,
    monthlyEmi,
  };
}

export function filterCompanies(
  companies: Company[],
  query: string,
  statusFilter: string
): Company[] {
  const cleanQuery = query.trim().toLowerCase();
  return companies.filter((c) => {
    const matchesQuery =
      !cleanQuery ||
      c.name.toLowerCase().includes(cleanQuery) ||
      c.taxRegistration.toLowerCase().includes(cleanQuery) ||
      c.contact.toLowerCase().includes(cleanQuery);

    const matchesStatus =
      statusFilter === 'ALL' || c.status === statusFilter;

    return matchesQuery && matchesStatus;
  });
}

export function filterBranches(
  branches: Branch[],
  query: string,
  companyFilter: string,
  statusFilter: string
): Branch[] {
  const cleanQuery = query.trim().toLowerCase();
  return branches.filter((b) => {
    const matchesQuery =
      !cleanQuery ||
      b.name.toLowerCase().includes(cleanQuery) ||
      b.companyName.toLowerCase().includes(cleanQuery) ||
      b.address.toLowerCase().includes(cleanQuery) ||
      b.contact.toLowerCase().includes(cleanQuery);

    const matchesCompany =
      companyFilter === 'ALL' || b.companyId === companyFilter;

    const matchesStatus =
      statusFilter === 'ALL' || b.status === statusFilter;

    return matchesQuery && matchesCompany && matchesStatus;
  });
}

export function calculateFleetStats(companies: Company[], branches: Branch[]) {
  const totalCompanies = companies.length;
  const activeCompanies = companies.filter((c) => c.status === 'ACTIVE').length;
  const totalBranches = branches.length;
  const activeBranches = branches.filter((b) => b.status === 'ACTIVE').length;
  const totalInventory = branches.reduce((sum, b) => sum + b.inventoryCount, 0);

  return {
    totalCompanies,
    activeCompanies,
    totalBranches,
    activeBranches,
    totalInventory,
    complianceRate:
      totalCompanies > 0
        ? Math.round((activeCompanies / totalCompanies) * 100)
        : 100,
  };
}
