import { GovernmentService } from '../types';
import { DISASTER_SERVICES } from './services/disaster';
import { EDUCATION_CENTRAL_SERVICES } from './services/educationCentral';
import { EDUCATION_STATE_SERVICES } from './services/educationState';
import { AGRICULTURE_SERVICES } from './services/agriculture';
import { BUSINESS_SERVICES } from './services/business';
import { BEREAVEMENT_SERVICES } from './services/bereavement';
import { OTHER_SERVICES } from './services/other';
import { HEALTHCARE_CENTRAL_SERVICES } from './services/healthcareCentral';
import { STATE_SCHEMES } from './services/stateSchemes';
import { UT_SCHEMES } from './services/utSchemes';

export const GOVERNMENT_SERVICES: GovernmentService[] = [
  ...DISASTER_SERVICES,
  ...EDUCATION_CENTRAL_SERVICES,
  ...EDUCATION_STATE_SERVICES,
  ...HEALTHCARE_CENTRAL_SERVICES,
  ...STATE_SCHEMES,
  ...UT_SCHEMES,
  ...AGRICULTURE_SERVICES,
  ...BUSINESS_SERVICES,
  ...BEREAVEMENT_SERVICES,
  ...OTHER_SERVICES,
];
