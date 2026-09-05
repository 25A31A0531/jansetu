import { GovernmentService } from '../../types';

export const BUSINESS_SERVICES: GovernmentService[] = [
  {
    id: 'pm_mudra_yojana',
    name: 'Pradhan Mantri MUDRA Yojana (PMMY Collateral-Free Loan up to ₹10 Lakh)',
    department: 'Department of Financial Services', authority: 'Ministry of Finance, Govt of India',
    category: 'business', secondaryCategories: ['financial_assistance'],
    description: 'Collateral-free business loans for non-corporate, non-farm small and micro enterprises across Shishu (up to ₹50k), Kishor (₹50k-₹5L), and Tarun (₹5L-₹10L) categories.',
    benefitsSummary: 'Zero collateral security, competitive interest rates, repayment tenure up to 5-7 years.',
    jurisdictionLevel: 'CENTRAL', applicableStates: ['ALL'], residenceRequired: false,
    studyLocationEligible: false, employmentLocationEligible: false, propertyLocationEligible: false,
    agricultureLocationEligible: false, businessLocationEligible: true, status: 'ACTIVE', effectiveFrom: '2015-04-08',
    officialVerificationStatus: 'OFFICIALLY_VERIFIED',
    verificationEvidence: 'OFFICIAL_PORTAL',
    eligibleCategories: ['General', 'OBC', 'SC', 'ST', 'EWS'],
    applicationUrl: 'https://www.jansamarth.in',
    eligibilityRules: [
      { field: 'age', operator: 'greater_than_or_equal', value: 18, label: 'Applicant must be at least 18 years of age', isMandatory: true },
      { field: 'isBusinessOwner', operator: 'boolean_true', value: true, label: 'Starting or running a micro/small commercial or service enterprise', isMandatory: true },
    ],
    requiredDocuments: ['aadhaar', 'udyam_registration', 'bank_passbook', 'residence_cert'],
    steps: [
      {
        stepNumber: 1, title: 'Obtain Free Udyam MSME Registration',
        description: 'Complete 10-minute online registration on udyamregistration.gov.in.',
        requiredDocuments: ['aadhaar'], estimatedEffort: '15 minutes', isOnline: true, portalUrl: 'https://udyamregistration.gov.in',
      },
      {
        stepNumber: 2, title: 'Apply via JanSamarth Portal or Bank Branch',
        description: 'Submit digital application on JanSamarth platform or approach your preferred bank branch.',
        requiredDocuments: ['aadhaar', 'udyam_registration', 'bank_passbook'], estimatedEffort: '1 hour', isOnline: true, portalUrl: 'https://www.jansamarth.in',
      },
      {
        stepNumber: 3, title: 'Loan Appraisal & Mudra Card Sanction',
        description: 'Bank branch reviews credit appraisal and disburses loan funds.',
        requiredDocuments: [], estimatedEffort: '7-10 business days', isOnline: false, offlineOffice: 'Bank Branch',
      },
    ],
    sourceUrl: 'https://www.mudra.org.in', sourceAuthority: 'Ministry of Finance, Govt of India',
    sourceType: 'verified', sourceConfidence: 'High', lastVerified: '2026-08-30', version: '2026.1',
    tags: ['mudra', 'business-loan', 'msme', 'startup', 'udyam'],
  },
];
