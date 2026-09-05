import { ClassificationResult, CitizenProfile, LifeEvent, ClarificationQuestion } from '../types';
import { detectLanguage } from '../i18n';

export const DISASTER_KEYWORDS = [
  // English
  'cyclone', 'flood', 'floods', 'heavy rain', 'heavy rains', 'storm', 'storms', 'calamity', 'inundation',
  'house damaged', 'house was damaged', 'house destroyed', 'house was destroyed', 'house collapsed',
  'lost my house', 'lost home', 'home damaged', 'home was damaged', 'home destroyed', 'home was destroyed',
  'home collapsed', 'damaged by a storm', 'destroyed in a storm', 'destroyed in a cyclone', 'collapsed during a cyclone',
  'roof damaged', 'sdrf', 'ndrf',

  // Romanized Telugu & Hindi
  'tufaan', 'toofan', 'tufan', 'damage ayyindi', 'toot gaya', 'kharab ho gaya', 'nasht ho gaya', 'padipoyindi', 'koolipoyindi',
  'naa illu', 'mera ghar',

  // Telugu
  'తుఫాను', 'తుపాను', 'వరద', 'వరదలు', 'ఇల్లు దెబ్బతింది', 'ఇల్లు కూలిపోయింది', 'ఇల్లు పడిపోయింది', 'వర్షం వల్ల',
  'భారీ వర్షాలు', 'విపత్తు',

  // Hindi
  'चक्रवात', 'तूफान', 'बाढ़', 'घर क्षतिग्रस्त', 'घर टूट गया', 'घर गिर गया', 'घर नष्ट हो गया',
  'घर खराब हो गया', 'भारी बारिश', 'आपदा',

  // Tamil
  'புயல்', 'வெள்ளம்', 'வீடு சேதமடைந்தது', 'வீடு இடிந்துவிட்டது', 'வீடு விழுந்தது', 'மழை வெள்ளம்', 'பேரிடர்',

  // Kannada
  'ಚಂಡಮಾರುತ', 'ಪ್ರವಾಹ', 'ಮನೆ ಹಾನಿಯಾಗಿದೆ', 'ಮನೆ ಕುಸಿದಿದೆ', 'ಮನೆ ಬಿದ್ದಿದೆ', 'ಭಾರೀ ಮಳೆ', 'ವಿಪತ್ತು',

  // Malayalam
  'ചുഴലിക്കാറ്റ്', 'പ്രളയം', 'വെള്ളപ്പൊക്കം', 'വീട് തകർന്നു', 'വീട് ഇടിഞ്ഞു', 'കനത്ത മഴ', 'ദുരന്തം',

  // Marathi
  'चक्रीवादळ', 'वादळ', 'पूर', 'घर कोसळले', 'घर पडले', 'घराचे नुकसान', 'मुसळधार पाऊस', 'आपत्ती',

  // Bengali
  'ঘূর্ণিঝড়', 'ঝড়', 'বন্যা', 'বাড়ি ক্ষতিগ্রস্ত', 'বাড়ি ভেঙে গেছে', 'ভারী বৃষ্টিপাত', 'দুর্যোগ',

  // Gujarati
  'વાવાઝોડું', 'તોફાન', 'પૂર', 'ઘર પડી ગયું', 'ઘર તૂટી ગયું', 'ઘરને નુકસાન', 'ભારે વરસાદ', 'હોનારત',

  // Punjabi
  'ਤੂਫ਼ਾਨ', 'ਚੱਕਰਵਾਤ', 'ਹੜ੍ਹ', 'ਘਰ ਢਹਿ ਗਿਆ', 'ਘਰ ਟੁੱਟ ਗਿਆ', 'ਘਰ ਦਾ ਨੁਕਸਾਨ', 'ਭਾਰੀ ਮੀਂਹ', 'ਆਫ਼ਤ',

  // Odia
  'ବାତ୍ୟା', 'ଝଡ଼', 'ବନ୍ୟା', 'ଘର ଭାଙ୍ଗିଯାଇଛି', 'ଘର ନଷ୍ଟ ହୋଇଯାଇଛି', 'ପ୍ରବଳ ବର୍ଷା', 'ବିପର୍ଯ୍ୟୟ',

  // Assamese
  'ধুমুহা', 'ঘূৰ্ণীবতাহ', 'বানপানী', 'ঘৰ ভাঙি গৈছে', 'ঘৰ ধ্বংস হৈছে', 'প্ৰবল বৰষুণ', 'বিপৰ্যয়',

  // Urdu
  'طوفان', 'سائیکلون', 'سیلاب', 'گھر تباہ ہو گیا', 'گھر گر گیا', 'گھر کو نقصان', 'شدید بارش', 'آفت',
];

export const AGRI_KEYWORDS = [
  // English
  'crop', 'crops', 'farmer', 'farmers', 'farming', 'farm', 'paddy', 'cotton', 'kisan',
  'agriculture', 'agricultural', 'harvest', 'cultivat', 'crop loss', 'crop damage',

  // Telugu
  'చేను', 'పంట', 'పంట నష్టం', 'రైతు', 'వ్యవసాయం', 'విత్తనాలు',

  // Hindi
  'फसल', 'फसल नुकसान', 'किसान', 'खेती', 'कृषि', 'पैदावार',

  // Tamil
  'பயிர்', 'பயிர் சேதம்', 'விவசாயி', 'விவசாயம்',

  // Kannada
  'ಬೆಳೆ', 'ಬೆಳೆ ಹಾನಿ', 'ರೈತ', 'ಕೃಷಿ',

  // Malayalam
  'വിള', 'വിളനാശം', 'കർഷകൻ', 'കൃഷി',

  // Marathi
  'पीक', 'पीक नुकसान', 'शेतकरी', 'शेती', 'कृषी',

  // Bengali
  'ফসল', 'ফসলের ক্ষতি', 'কৃষক', 'কৃষি',

  // Gujarati
  'પાક', 'પાક નુકસાન', 'ખેડૂત', 'ખેતી',

  // Punjabi
  'ਫ਼ਸਲ', 'ਫ਼ਸਲ ਦਾ ਨੁਕਸਾਨ', 'ਕਿਸਾਨ', 'ਖੇਤੀਬਾੜੀ',

  // Odia
  'ଫସଲ', 'ଫସଲ ନଷ୍ଟ', 'ଚାଷୀ', 'କୃଷି',

  // Assamese
  'শস্য', 'শস্যৰ ক্ষতি', 'কৃষক', 'কৃষি',

  // Urdu
  'فصل', 'فصل کا نقصان', 'کسان', 'کھیتی باڑی', 'زراعت',
];

export const BEREAVEMENT_KEYWORDS = [
  // English
  'death', 'died', 'passed away', 'father died', 'mother died', 'deceased',
  'legal heir', 'succession', 'survivor', 'death certificate',

  // Romanized
  'chanipoyaru', 'maranam', 'swargwas', 'inteqal',

  // Telugu
  'మరణం', 'చనిపోయారు', 'మరణ ధృవీకరణ పత్రం', 'వారసత్వ',

  // Hindi
  'मृत्यु', 'निधन', 'स्वर्गवास', 'मृत्यु प्रमाण पत्र', 'वारिस',

  // Tamil
  'இறப்பு', 'மறைவு', 'இறப்புச் சான்றிதழ்', 'வாரிசு',

  // Kannada
  'ಮರಣ', 'ನಿಧನ', 'ಮರಣ ಪ್ರಮಾಣಪತ್ರ', 'ವಾರಸುದಾರ',

  // Malayalam
  'മരണം', 'നിര്യാണം', 'മരണ സർട്ടിഫിക്കറ്റ്', 'അവകാശി',

  // Marathi
  'मृत्यू', 'निधन', 'मृत्यू दाखला', 'वारस',

  // Bengali
  'মৃত্যু', 'মারা গেছেন', 'মৃত্যু সনদ', 'উত্তরাধিকারী',

  // Gujarati
  'મૃત્યુ', 'અવસાન', 'મરણનો દાખલો', 'વારસદાર',

  // Punjabi
  'ਮੌਤ', 'ਅਕਾਲ ਚਲਾਣਾ', 'ਮੌਤ ਦਾ ਸਰਟੀਫਿਕੇਟ', 'ਵਾਰਸ',

  // Odia
  'ମୃତ୍ୟୁ', 'ଦେହାନ୍ତ', 'ମୃତ୍ୟୁ ପ୍ରମାଣପତ୍ର', 'ଉତ୍ତରାଧିକାରୀ',

  // Assamese
  'মৃত্যু', 'দেহাৱসান', 'মৃত্যু প্ৰমাণপত্ৰ', 'উত্তৰাধিকাৰী',

  // Urdu
  'وفات', 'انتقال', 'ڈیتھ سرٹیفکیٹ', 'وارث',
];

export const EDUCATION_KEYWORDS = [
  // English variations
  'higher studies', 'higher study', 'higher education',
  'education', 'educational', 'education loan', 'educational loan',
  'student loan', 'study loan', 'student', 'students',
  'scholarship', 'scholarships',
  'btech', 'b.tech', 'college', 'colleges',
  'university', 'universities',
  'tuition', 'tuition fee', 'tuition fees', 'fee reimbursement',
  'degree', 'matric', 'school', 'schooling', 'schools',
  'study', 'studies', 'studying', 'course', 'courses',
  'fee', 'fees',

  // Romanized Telugu (Tanglish)
  'chaduvu', 'chadhuvu', 'chadukodaniki', 'chaduvukodaniki',
  'chadavadam', 'chadavali', 'chaduvukovali', 'chaduvukune',
  'chaduvukovadaniki', 'chaduvutunna', 'chadavataniki', 'vidya',

  // Romanized Hindi (Hinglish)
  'padhai', 'padhna', 'padhne', 'padhaye', 'shiksha',
  'padhai ke liye loan', 'shiksha loan', 'education loan chahiye',
  'padhai ke liye',

  // Native Indic scripts - Hindi
  'छात्र', 'विद्यार्थी', 'शिक्षा ऋण', 'एजुकेशन लोन', 'शिक्षा', 'पढ़ाई',
  'छात्रवृत्ति', 'पढ़ाई के लिए लोन', 'कॉलेज लोन',

  // Telugu
  'విద్యార్థి', 'స్కాలర్‌షిప్', 'చదువు', 'విద్యా', 'విద్యారుణం',

  // Tamil
  'படிப்பு', 'கல்வி', 'கல்விக் கடன்', 'மாணவர்', 'உதவித்தொகை',

  // Kannada
  'ಶಿಕ್ಷಣ', 'ವಿದ್ಯಾಭ್ಯಾಸ', 'ವಿದ್ಯಾರ್ಥಿ', 'ಶೈಕ್ಷಣಿಕ ಸಾಲ', 'ವಿದ್ಯಾರ್ಥಿವೇತನ',

  // Malayalam
  'വിദ്യാഭ്യാസം', 'പഠനം', 'വിദ്യാർത്ഥി', 'വിദ്യാഭ്യാസ വായ്പ', 'സ്കോളർഷിപ്പ്',

  // Marathi
  'शिक्षण', 'विद्यार्थी', 'शैक्षणिक कर्ज', 'शिष्यवृत्ती', 'अभ्यास',

  // Bengali
  'শিক্ষা', 'পড়াশোনা', 'ছাত্র', 'শিক্ষার্থী', 'শিক্ষা ঋণ', 'বৃত্তি',

  // Gujarati
  'શિક્ષણ', 'અભ્યાસ', 'વિદ્યાર્થી', 'શિક્ષણ લોન', 'શિષ્યવૃત્તિ',

  // Punjabi
  'ਸਿੱਖਿਆ', 'ਪੜ੍ਹਾਈ', 'ਵਿਦਿਆਰਥੀ', 'ਐਜੂਕੇਸ਼ਨ ਲੋਨ', 'ਵਜ਼ੀਫ਼ਾ',

  // Odia
  'ଶିକ୍ଷା', 'ପାଠପଢ଼ା', 'ଛାତ୍ର', 'ଶିକ୍ଷା ଋଣ', 'ଛାତ୍ରବୃତ୍ତି',

  // Assamese
  'শিক্ষা', 'পঢ়াশুনা', 'ছাত্ৰ', 'শিক্ষা ঋণ', 'জলপানী',

  // Urdu
  'تعلیم', 'طالب علم', 'ایجوکیشن لون', 'تعلیمی قرض', 'وظیفہ',
];

export const BUSINESS_KEYWORDS = [
  'business', 'shop', 'store', 'startup', 'mudra', 'msme',
  'enterprise', 'commercial loan', 'udyam', 'self employed',
  'వ్యాపారం', 'షాపు', 'రుణం',
  'व्यापार', 'दुकान', 'मुद्रा लोन', 'उद्योग',
  'தொழில்', 'வியாபாரம்', 'முத்ரா கடன்',
  'ವ್ಯಾಪಾರ', 'ಉದ್ಯಮ', 'ಮುದ್ರಾ ಸಾಲ',
  'ബിസിനസ്സ്', 'വ്യാപാരം', 'മുദ്ര വായ്പ',
  'व्यवसाय', 'दुकान', 'उद्योग',
  'ব্যবসা', 'দোকান', 'মুদ্রা ঋণ',
  'વેપાર', 'દુકાન', 'મુદ્રા લોન',
  'ਵਪਾਰ', 'ਦੁਕਾਨ', 'ਮੁਦਰਾ ਲੋਨ',
  'ବ୍ୟବସାୟ', 'ଦୋକାନ', 'ମୁଦ୍ରା ଋଣ',
  'ব্যৱসায়', 'দোকান', 'মুদ্ৰা ঋণ',
  'کاروبار', 'تجارت', 'مدرا قرض',
];

export const EMPLOYMENT_KEYWORDS = [
  'job', 'unemployed', 'lost job', 'laid off', 'apprentice', 'naps',
  'training', 'career', 'employment',
  'ఉద్యోగం', 'నిరుద్యోగి', 'శిక్షణ',
  'नौकरी', 'रोजगार', 'बेरोजगार', 'प्रशिक्षण',
  'வேலை', 'வேலையின்மை', 'பயிற்சி',
  'ಉದ್ಯೋಗ', 'ನಿರುದ್ಯೋಗಿ', 'ತರಬೇತಿ',
  'ജോലി', 'തൊഴിൽ', 'പരിശീലനം',
  'नोकरी', 'रोजगार', 'प्रशिक्षण',
  'চাকরি', 'বেকার', 'কর্মসংস্থান',
  'નોકરી', 'બેરોજગાર', 'રોજગાર',
  'ਨੌਕਰੀ', 'ਬੇਰੁਜ਼ਗਾਰ', 'ਸਿਖਲਾਈ',
  'ଚାକିରି', 'ବେକାର', 'ନିଯୁକ୍ତି',
  'চাকৰি', 'বেকাৰ', 'নিযুক্তি',
  'نوکری', 'بے روزگار', 'ملازمت',
];

export const DOC_KEYWORDS = [
  'aadhaar', 'lost aadhaar', 'lost document', 'reprint', 'ration card',
  'voter id', 'pan card', 'certificate',
  'ఆధార్', 'రేషన్', 'రేషన్ కార్డు',
  'आधार', 'पहचान पत्र', 'राशन कार्ड',
  'ஆதார்', 'ரேஷன் அட்டை',
  'ಆಧಾರ್', 'ಪಡಿತರ ಚೀಟಿ',
  'ആധാർ', 'റേഷൻ കാർഡ്',
  'आधार', 'रेशन कार्ड',
  'আধার', 'রেশন কার্ড',
  'આધાર', 'રેશન કાર્ડ',
  'ਆਧਾਰ', 'ਰਾਸ਼ਨ ਕਾਰਡ',
  'ଆଧାର', 'ରାସନ କାର୍ଡ',
  'আধাৰ', 'ৰেচন কাৰ্ড',
  'آدھار', 'راشن کارڈ',
];

export function hasKeyword(text: string, kw: string): boolean {
  const lowerKw = kw.toLowerCase().trim();
  if (!lowerKw) return false;

  // Handle "course" to avoid false positive from "of course"
  if (lowerKw === 'course' || lowerKw === 'courses') {
    const textWithoutOfCourse = text.replace(/\bof\s+courses?\b/gi, '');
    return /\bcourses?\b/i.test(textWithoutOfCourse);
  }

  // Handle "fee" and "fees" with strict word boundaries so it never collides with "coffee", "feet", etc.
  if (lowerKw === 'fee' || lowerKw === 'fees') {
    return /\bfees?\b/i.test(text);
  }

  // Handle "study" to also match morphological variations: "studies", "studying"
  if (lowerKw === 'study' || lowerKw === 'studies' || lowerKw === 'studying') {
    return /\b(study|studies|studying)\b/i.test(text);
  }

  // If keyword contains whitespace (phrases) or non-ASCII characters (Indic scripts), substring match is exact
  if (/\s|[^\x00-\x7F]/.test(lowerKw)) {
    return text.includes(lowerKw);
  }

  // For short single-word ASCII keywords (<= 4 chars) like "job", "crop", "farm", enforce word boundaries
  if (lowerKw.length <= 4) {
    const escaped = lowerKw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp(`\\b${escaped}\\b`, 'i').test(text);
  }

  // Standard substring match for longer words and stems (e.g., "cultivat", "scholarship")
  return text.includes(lowerKw);
}

export function hasAnyKeyword(text: string, keywords: string[]): boolean {
  return keywords.some((kw) => hasKeyword(text, kw));
}

/**
 * Robust Education & Education Loan query detector
 */
export function isEducationQuery(query: string): boolean {
  if (hasAnyKeyword(query, EDUCATION_KEYWORDS)) {
    return true;
  }

  // Morphological matching for Romanized Telugu education forms (e.g., chaduvutunnanu, chaduvukovali)
  if (/\b(chadh?uv\w*|chadh?uk\w*|chadav\w*)\b/i.test(query)) {
    return true;
  }

  // Morphological matching for Romanized Hindi education forms (e.g., padh rahe, padhai)
  if (/\b(padh(ai|na|ne|te|raha)\w*)\b/i.test(query)) {
    return true;
  }

  // Compound education phrases (English)
  if (/\bhigher\s+(studies|study|education)\b/i.test(query)) {
    return true;
  }

  // Compound Study/Student term + Loan/Financial term across languages
  const hasStudyTerm = /\b(education|study|student|btech|b\.tech|college|school|tuition|course|degree|shiksha|padhai|chadh?uvu|vidya|kalvi|padikira|chathra|chhatra|vidyarthi)\b/i.test(query)
    || /शिक्षा|पढ़ाई|छात्र|विद्यार्थी|चదువు|విద్య|படிப்பு|கல்வி|ಶಿಕ್ಷಣ|ವಿದ್ಯಾಭ್ಯಾಸ|വിദ്യാഭ്യാസം|പഠനം|शिक्षण|শিক্ষা|શિક્ષણ|ਅਭਿਆਸ|ਸਿੱਖਿਆ|ଶିକ୍ଷା|তালেম|تعلیم/i.test(query);

  const hasLoanTerm = /\b(loan|loans|fee|fees|scholarship|aid|stipend|reimbursement|rin|karan|vaddi|appu)\b/i.test(query)
    || /ऋण|लोन|कर्ज|రుణం|கடன்|ಸಾಲ|വായ്പ|ঋণ|લોન|ਕਰਜ਼|ଋଣ|قرض/i.test(query);

  if (hasStudyTerm && hasLoanTerm) {
    return true;
  }

  return false;
}

/**
 * Robust Disaster, Storm, Cyclone, and House Destruction detector
 */
export function isDisasterQuery(query: string): boolean {
  if (hasAnyKeyword(query, DISASTER_KEYWORDS)) {
    return true;
  }

  // Weather terms
  const weatherPattern = /\b(cyclone|storm|flood|floods|rain|rains|calamity|inundation|tufaan|toofan|tufan)\b/i.test(query)
    || /तूफान|चक्रवात|बाढ़|बारिश|తుఫాను|తుపాను|వరద|పుயல்|வெள்ளம்|ಚಂಡಮಾರುತ|ಪ್ರವಾಹ|ചുഴലിക്കാറ്റ്|പ്രളയം|चक्रीवादळ|वादळ|पूर|ঘূর্ণিঝড়|ঝড়|বন্যা|વાવાઝોડું|તોફાન|પૂર|ਤੂਫ਼ਾਨ|ਹੜ੍ਹ|ବାତ୍ୟା|ଝଡ଼|ବନ୍ୟା|ধুমুহা|বানপানী|طوفان|سیلاب/i.test(query);

  // Dwelling / Property terms
  const dwellingPattern = /\b(house|home|roof|property|dwelling|hut|shed|ghar|makan|illu|veedu|mane|veedu|bari|ghar|kothi|makan)\b/i.test(query)
    || /घर|मकान|छत|ఇల్లు|గృహం|வீடு|கூரை|ಮನೆ|ಛಾವಣಿ|വീട്|বাড়ি|ছাদ|ઘર|ছત|ਘਰ|ಛੱਤ|ଘର|ଛାତ|ঘৰ|گھر|چھت/i.test(query);

  // Damage / Collapse / Loss verbs
  const damagePattern = /\b(destroyed|damaged|collapsed|lost|fallen|fell|damage|break|broken|padipoyindi|koolipoyindi|toot|gir|nasht|kharab)\b/i.test(query)
    || /नष्ट|गिर|टूट|खराब|क्षतिग्रस्त|కూలిపోయింది|పడిపోయింది|దెబ్బతింది|சேத|இடிந்து|விழுந்தது|ಹಾನಿ|ಕುಸಿದಿದೆ|ಬಿದ್ದಿದೆ|തകർന്നു|ഇടിഞ്ഞു|कोसळले|पडले|नुकसान|ভেঙে|ক্ষতিগ্রস্ত|પડી|તૂટી|ਨੁਕਸਾਨ|ਢਹਿ|ଭାଙ୍ଗି|ভাঙি|تباہ|گر/i.test(query);

  // If weather + damage, or dwelling + damage + weather
  if ((weatherPattern && damagePattern) || (dwellingPattern && damagePattern)) {
    return true;
  }

  return false;
}

/**
 * Context-Aware Multi-Label Life Event Classification
 */
export function classifyLifeEvent(input: string): ClassificationResult {
  const query = input.toLowerCase().trim();
  detectLanguage(input);

  const isDisaster = isDisasterQuery(query);
  const isAgriQuery = hasAnyKeyword(query, AGRI_KEYWORDS);

  if (isAgriQuery && isDisaster) {
    return {
      primaryIntent: 'agriculture', secondaryIntents: ['disaster', 'financial_assistance'],
      confidence: 0.96, reason: 'Citizen reports agricultural crop loss resulting from weather/cyclone damage.',
      extractedContext: { isFarmer: true }, requiresClarification: false,
    };
  }

  if (isDisaster) {
    return {
      primaryIntent: 'disaster', secondaryIntents: ['housing', 'financial_assistance'],
      confidence: 0.97, reason: 'Citizen reports residential property damage or distress caused by natural calamity/cyclone/storm.',
      extractedContext: { hasHouseDamage: true }, requiresClarification: false,
    };
  }

  if (hasAnyKeyword(query, BEREAVEMENT_KEYWORDS)) {
    return {
      primaryIntent: 'bereavement', secondaryIntents: ['identity_documents', 'financial_assistance'],
      confidence: 0.95, reason: 'Citizen inquiries about civil formalities, certificates, and succession following family bereavement.',
      requiresClarification: false,
    };
  }

  if (isEducationQuery(query)) {
    return {
      primaryIntent: 'education', secondaryIntents: ['financial_assistance'],
      confidence: 0.94, reason: 'Citizen is seeking student scholarships, fee waivers, or higher education financial aid.',
      extractedContext: { isStudent: true }, requiresClarification: false,
    };
  }

  if (isAgriQuery) {
    return {
      primaryIntent: 'agriculture', secondaryIntents: ['financial_assistance'],
      confidence: 0.93, reason: 'Citizen inquiries about agricultural support, PM-KISAN, or farming subsidies.',
      extractedContext: { isFarmer: true }, requiresClarification: false,
    };
  }

  if (hasAnyKeyword(query, BUSINESS_KEYWORDS)) {
    return {
      primaryIntent: 'business', secondaryIntents: ['financial_assistance'],
      confidence: 0.92, reason: 'Citizen is starting or expanding a commercial/micro enterprise and seeking credit or registration.',
      extractedContext: { isBusinessOwner: true }, requiresClarification: false,
    };
  }

  if (hasAnyKeyword(query, EMPLOYMENT_KEYWORDS)) {
    return {
      primaryIntent: 'employment', secondaryIntents: ['financial_assistance'],
      confidence: 0.91, reason: 'Citizen is seeking employment assistance, apprentice placement with stipend, or skill development.',
      requiresClarification: false,
    };
  }

  if (hasAnyKeyword(query, DOC_KEYWORDS)) {
    return {
      primaryIntent: 'identity_documents', secondaryIntents: ['other'],
      confidence: 0.93, reason: 'Citizen inquiries about replacing lost identity cards or updating demographic credentials.',
      requiresClarification: false,
    };
  }

  return {
    primaryIntent: 'other', secondaryIntents: [], confidence: 0.45,
    reason: 'Insufficient specific keywords to make a confident life-event classification.',
    requiresClarification: true,
    clarificationPrompt: "I'm not confident enough to classify this yet. Try describing what happened, what you need, and which state you live in.",
  };
}

export function generateClarifyingQuestions(
  profile: Partial<CitizenProfile>,
  event: LifeEvent
): ClarificationQuestion[] {
  const existingKeys = Object.keys(profile);
  return event.suggestedQuestions.filter((q) => !existingKeys.includes(String(q.field)));
}
