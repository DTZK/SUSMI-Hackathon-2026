// types.ts - All TypeScript types for NavCare

export type Language = 'en' | 'zh' | 'vi' | 'ko' | 'ar' | 'hi';

export type NavigationPage = 'home' | 'journey' | 'support' | 'records' | 'profile' | 'info';

export type JourneyStep = 'gp' | 'referral' | 'specialist' | 'tests' | 'care-plan';

export type VisitType = 'GP' | 'Pathology' | 'Specialist' | 'Imaging' | 'Allied Health';

export type AlertType = 'urgent' | 'important' | 'info' | 'success';
export type AlertCategory = 'follow-up' | 'test-due' | 'prescription' | 'preventive' | 'appointment' | 'cost';

export interface SmartAlert {
  id: string;
  type: AlertType;
  category: AlertCategory;
  title: string;
  message: string;
  contextualInfo?: string;
  actionLabel?: string;
  actionHandler?: string; // Action ID to trigger
  dueDate?: string;
  priority: number; // 1 = highest
  dismissed: boolean;
  createdAt: string;
  relatedVisitId?: string;
  relatedAppointmentId?: string;
}

export interface AlertRule {
  id: string;
  name: string;
  description: string;
  condition: string; // Description of when to trigger
  category: AlertCategory;
  type: AlertType;
  priority: number;
}

export interface User {
  name: string;
  referringGP: string;
  medicareActive: boolean;
  medicareNumber?: string;
  preferredLanguage: Language;
}

export interface CareJourney {
  pathway: string; // e.g., "Cardiology referral pathway"
  currentStep: JourneyStep;
  completedSteps: JourneyStep[];
  progressPercentage: number;
}

export interface Appointment {
  id: string;
  type: 'upcoming' | 'completed';
  specialty: string;
  doctorName: string;
  location: string;
  date: string;
  time?: string;
  estimatedCost: number;
  medicareRebate: number;
  outOfPocket: number;
  waitTime?: string; // e.g., "9 days"
  itemsToBring?: string[];
}

export interface Visit {
  id: string;
  date: string;
  type: VisitType;
  doctorName: string;
  location: string;
  presenting: string;
  notes: string;
  tags?: string[];
  cost?: number;
  medicareRebate?: number;
}

export interface CostBreakdown {
  item: string;
  cost: number;
  medicareRebate: number;
  outOfPocket: number;
}

export interface HealthSummary {
  totalVisits: number;
  outOfPocketTotal: number;
  upcomingAppointments: number;
  medicareRebateTotal: number;
  medicareSpending: number;
  safetyNetThreshold: number; // $811.80 for general
  safetyNetProgress: number; // percentage
}

export interface QuickAction {
  id: string;
  icon: string;
  title: string;
  description: string;
  action: string; // Message to send to chatbot
}

export interface InfoTopic {
  id: string;
  icon: string;
  title: string;
  content: string;
}

export interface EligibilityStep {
  question: string;
  options: Array<{
    label: string;
    value: string;
    next?: string; // ID of next step
    result?: EligibilityResult;
  }>;
}

export interface EligibilityResult {
  billingType: string;
  estimatedCost: string;
  tip: string;
}

export interface CostGuideItem {
  category: string;
  service: string;
  bulkBilled: boolean;
  mbsCode?: string;
  fullFee: number;
  medicareRebate: number;
  typicalGapFee: string;
}