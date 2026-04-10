// mockData.ts - Sample data for development
import type {
  User,
  CareJourney,
  Appointment,
  Visit,
  HealthSummary,
  QuickAction,
  InfoTopic,
  CostGuideItem,
  SmartAlert,
  AlertRule
} from './types';

// mockData.ts - Add this at the end

export const mockSmartAlerts: SmartAlert[] = [
  {
    id: '1',
    type: 'urgent',
    category: 'follow-up',
    title: 'Follow-up appointment needed',
    message: 'You haven\'t booked a follow-up with Dr. Mark Nguyen after your specialist visit on 18 Apr.',
    contextualInfo: 'It\'s recommended to see your GP within 2 weeks after a specialist consultation to discuss results and next steps.',
    actionLabel: 'Book GP Appointment',
    actionHandler: 'book-gp',
    dueDate: '2 May 2025',
    priority: 1,
    dismissed: false,
    createdAt: '22 Apr 2025',
    relatedVisitId: '4',
  },
  {
    id: '2',
    type: 'important',
    category: 'test-due',
    title: 'Blood pressure monitoring due',
    message: 'Your last 2 GP visits showed elevated BP (148/92). You should monitor your blood pressure regularly.',
    contextualInfo: 'Dr. Nguyen recommended daily BP monitoring. It\'s been 10 days since your last check.',
    actionLabel: 'Log BP Reading',
    actionHandler: 'log-bp',
    dueDate: 'Ongoing',
    priority: 2,
    dismissed: false,
    createdAt: '20 Apr 2025',
    relatedVisitId: '1',
  },
  {
    id: '3',
    type: 'important',
    category: 'test-due',
    title: 'Echocardiogram likely needed',
    message: 'Dr. Lisa Park mentioned an echocardiogram would likely be ordered at your first visit.',
    contextualInfo: 'After your specialist consultation on 18 Apr, you may need to book this test. Wait for Dr. Park\'s referral.',
    actionLabel: 'Check Test Status',
    actionHandler: 'check-test',
    dueDate: 'After 18 Apr visit',
    priority: 3,
    dismissed: false,
    createdAt: '15 Apr 2025',
    relatedAppointmentId: '1',
  },
  {
    id: '4',
    type: 'info',
    category: 'preventive',
    title: 'Annual health check approaching',
    message: 'You\'re eligible for a Medicare-funded annual health assessment.',
    contextualInfo: 'Patients with chronic conditions can get a comprehensive health check once per year, fully covered by Medicare.',
    actionLabel: 'Learn More',
    actionHandler: 'learn-health-check',
    dueDate: 'June 2025',
    priority: 4,
    dismissed: false,
    createdAt: '10 Apr 2025',
  },
  {
    id: '5',
    type: 'info',
    category: 'cost',
    title: 'Medicare Safety Net update',
    message: 'You\'re $622 away from the Medicare Safety Net threshold.',
    contextualInfo: 'Once you reach $811.80 in out-of-pocket costs, Medicare rebates increase to 80% for the rest of the year.',
    actionLabel: 'View Spending',
    actionHandler: 'view-spending',
    priority: 5,
    dismissed: false,
    createdAt: '18 Apr 2025',
  },
  {
    id: '6',
    type: 'success',
    category: 'appointment',
    title: 'Appointment confirmed',
    message: 'Your cardiologist appointment with Dr. Lisa Park is confirmed for 18 Apr at 2:30pm.',
    contextualInfo: 'Remember to bring your Medicare card, referral letter, and list of current medications.',
    priority: 6,
    dismissed: false,
    createdAt: '5 Apr 2025',
    relatedAppointmentId: '1',
  },
];

// Alert generation rules (for demonstration)
export const mockAlertRules: AlertRule[] = [
  {
    id: 'rule-1',
    name: 'Post-specialist follow-up',
    description: 'Trigger when no GP follow-up booked within 2 weeks of specialist visit',
    condition: 'specialist_visit + 14_days && no_gp_booking',
    category: 'follow-up',
    type: 'urgent',
    priority: 1,
  },
  {
    id: 'rule-2',
    name: 'Elevated BP monitoring',
    description: 'Trigger when BP elevated in 2+ consecutive visits',
    condition: 'bp_elevated >= 2 && last_check > 7_days',
    category: 'test-due',
    type: 'important',
    priority: 2,
  },
  {
    id: 'rule-3',
    name: 'Pending test after specialist',
    description: 'Remind about tests mentioned by specialist',
    condition: 'specialist_mentioned_test && test_not_booked',
    category: 'test-due',
    type: 'important',
    priority: 3,
  },
  {
    id: 'rule-4',
    name: 'Annual health check eligibility',
    description: 'Trigger for patients with chronic conditions once per year',
    condition: 'chronic_condition && last_health_check > 12_months',
    category: 'preventive',
    type: 'info',
    priority: 4,
  },
  {
    id: 'rule-5',
    name: 'Safety Net proximity',
    description: 'Alert when within $100 of Safety Net threshold',
    condition: 'out_of_pocket > (safety_net_threshold - 100)',
    category: 'cost',
    type: 'info',
    priority: 5,
  },
];

export const mockUser: User = {
  name: "Sarah Chen",
  referringGP: "Dr. Mark Nguyen",
  medicareActive: true,
  medicareNumber: "2234 56789 0",
  preferredLanguage: 'en'
};

export const mockCareJourney: CareJourney = {
  pathway: "Cardiology referral pathway",
  currentStep: 'specialist',
  completedSteps: ['gp', 'referral'],
  progressPercentage: 60
};

export const mockUpcomingAppointment: Appointment = {
  id: '1',
  type: 'upcoming',
  specialty: 'Cardiologist appointment',
  doctorName: 'Dr. Lisa Park',
  location: 'Sydney Heart Specialists, Darlinghurst',
  date: 'Fri 18 Apr',
  time: '2:30pm',
  estimatedCost: 295,
  medicareRebate: 161.35,
  outOfPocket: 134,
  waitTime: '9 days',
  itemsToBring: [
    'Medicare card',
    'Referral letter from Dr. Nguyen',
    'List of current medications',
    'Previous ECG results (if any)'
  ]
};

export const mockVisits: Visit[] = [
  {
    id: '1',
    date: '12 Mar 2025',
    type: 'GP',
    doctorName: 'Dr. Mark Nguyen',
    location: 'Macquarie Street Medical Centre',
    presenting: 'Chest tightness and mild shortness of breath on exertion. BP reading 148/92.',
    notes: 'ECG performed — borderline result. Referral to cardiologist issued. Advised to reduce sodium intake and monitor BP daily.',
    tags: ['BP elevated', 'ECG performed', 'Referral issued', 'Bulk billed'],
    cost: 87,
    medicareRebate: 87,
  },
  {
    id: '2',
    date: '15 Mar 2025',
    type: 'Pathology',
    doctorName: '',
    location: "St Vincent's Hospital Collection",
    presenting: '',
    notes: 'Blood panel — LDL 4.2, HbA1c normal. Results forwarded to GP for review.',
    tags: [],
    cost: 54,
    medicareRebate: 54,
  },
  {
    id: '3',
    date: '28 Mar 2025',
    type: 'GP',
    doctorName: 'Dr. Mark Nguyen',
    location: 'Macquarie Street Medical Centre',
    presenting: '',
    notes: 'GP follow-up — specialist confirmed. Lifestyle changes discussed. Appointment with Dr. Park secured.',
    tags: [],
    cost: 87,
    medicareRebate: 87,
  },
  {
    id: '4',
    date: '18 Apr 2025',
    type: 'Specialist',
    doctorName: 'Dr. Lisa Park',
    location: 'Sydney Heart Specialists, Darlinghurst',
    presenting: '',
    notes: 'First specialist visit. Echocardiogram likely to be ordered.',
    tags: ['Upcoming'],
    cost: 295,
    medicareRebate: 161.35,
  }
];

export const mockHealthSummary: HealthSummary = {
  totalVisits: 7,
  outOfPocketTotal: 341,
  upcomingAppointments: 3,
  medicareRebateTotal: 312,
  medicareSpending: 189,
  safetyNetThreshold: 811.80,
  safetyNetProgress: 23 // (189/811.80) * 100
};

export const mockQuickActions: QuickAction[] = [
  {
    id: '1',
    icon: '❓',
    title: 'What to expect',
    description: 'At your specialist visit',
    action: 'What should I expect at my cardiologist appointment?'
  },
  {
    id: '2',
    icon: '💳',
    title: 'Medicare claim',
    description: 'How to get your rebate',
    action: 'How do I claim my Medicare rebate?'
  },
  {
    id: '3',
    icon: '📅',
    title: 'Reschedule',
    description: 'Change your booking',
    action: 'I need to reschedule my appointment'
  },
  {
    id: '4',
    icon: 'ℹ️',
    title: 'Info hub',
    description: 'Australian health guide',
    action: 'Show me the info hub'
  }
];

export const mockInfoTopics: InfoTopic[] = [
  {
    id: '1',
    icon: '🏥',
    title: 'What is Medicare?',
    content: `Medicare is Australia's universal health insurance scheme. It covers:
    
• Free or subsidised treatment by doctors (GPs and specialists)
• Free treatment and accommodation in public hospitals
• Subsidised prescription medicines through the PBS
• Free treatment by health practitioners like optometrists

Most Australian residents are eligible for Medicare. You'll need a Medicare card to use it.`
  },
  {
    id: '2',
    icon: '💰',
    title: 'Bulk billing vs gap fees',
    content: `Bulk billing means the doctor charges Medicare directly — you pay nothing.

Gap fees happen when a doctor charges MORE than the Medicare rebate. You pay the difference (the "gap").

Example:
• Doctor charges: $180
• Medicare rebate: $80
• You pay (gap): $100

Always ask "Do you bulk bill?" when booking to avoid surprises.`
  },
  {
    id: '3',
    icon: '🏨',
    title: 'Public vs private hospitals',
    content: `Public hospitals:
• Free if you're a Medicare patient
• You don't choose your doctor
• May have waiting lists for non-urgent care

Private hospitals:
• You can choose your doctor
• Shorter waiting times
• You'll have out-of-pocket costs (unless you have private insurance)

In emergencies, ALWAYS go to the nearest hospital — public or private.`
  },
  {
    id: '4',
    icon: '🛡️',
    title: 'Do I need private insurance?',
    content: `You don't NEED private insurance to get healthcare in Australia — Medicare covers the basics.

Private insurance helps with:
• Choice of doctor in hospital
• Shorter waiting times for elective surgery
• Extras like dental, physio, glasses

If you earn over $90,000/year and don't have private insurance, you pay an extra 1-1.5% Medicare Levy Surcharge.`
  },
  {
    id: '5',
    icon: '🔒',
    title: 'Medicare Safety Net',
    content: `The Safety Net protects you from high medical costs.

How it works:
• Once you spend $811.80 out-of-pocket in a year, the Safety Net kicks in
• After that, Medicare rebates increase to 80% of the fee

Your NavCare app tracks your spending automatically and alerts you when you're close to the threshold.`
  }
];

export const mockCostGuide: CostGuideItem[] = [
  {
    category: 'GP',
    service: 'Standard consultation',
    bulkBilled: true,
    mbsCode: '23',
    fullFee: 42.85,
    medicareRebate: 42.85,
    typicalGapFee: '$0 (if bulk billed) or $0-$45'
  },
  {
    category: 'Specialist',
    service: 'Initial consultation',
    bulkBilled: false,
    mbsCode: '104',
    fullFee: 295,
    medicareRebate: 161.35,
    typicalGapFee: '$100-$200'
  },
  {
    category: 'Pathology',
    service: 'Blood test (standard panel)',
    bulkBilled: true,
    fullFee: 54,
    medicareRebate: 54,
    typicalGapFee: '$0 (usually bulk billed)'
  },
  {
    category: 'Imaging',
    service: 'X-ray (chest)',
    bulkBilled: true,
    mbsCode: '58503',
    fullFee: 62,
    medicareRebate: 62,
    typicalGapFee: '$0 (usually bulk billed)'
  },
  {
    category: 'Dental',
    service: 'Check-up and clean',
    bulkBilled: false,
    fullFee: 200,
    medicareRebate: 0,
    typicalGapFee: '$150-$250 (not covered by Medicare)'
  },
  {
    category: 'Allied Health',
    service: 'Physiotherapy (with GP referral)',
    bulkBilled: false,
    mbsCode: '10960',
    fullFee: 85,
    medicareRebate: 60,
    typicalGapFee: '$20-$60'
  }
];

