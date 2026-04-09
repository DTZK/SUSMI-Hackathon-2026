// mockData.ts - Sample data for development

// mockData.ts - Sample data for development
import type {
  User,
  CareJourney,
  Appointment,
  Visit,
  HealthSummary,
  QuickAction,
  InfoTopic,
  CostGuideItem
} from './types';

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