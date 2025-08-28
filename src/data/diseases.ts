export interface DiseaseContent {
  overview: string;
  symptoms: string[];
  causes: string[];
  prevention: string[];
  treatment: string[];
  complications?: string[];
  riskFactors?: string[];
  diagnosis?: string[];
  livingWith?: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  resources: Array<{
    title: string;
    url?: string;
    description: string;
  }>;
}

export interface MultilingualContent {
  en: DiseaseContent;
  tw?: DiseaseContent; // Twi
  ee?: DiseaseContent; // Ewe
  ga?: DiseaseContent; // Ga
  ha?: DiseaseContent; // Hausa
}

export interface DetailedDisease {
  id: string;
  name: string;
  category: "communicable" | "non-communicable" | "emergency";
  description: string;
  lastUpdated: string;
  isOfflineAvailable?: boolean;
  isSaved?: boolean;
  severity?: "low" | "medium" | "high";
  content: MultilingualContent;
  medicalReviewDate?: string;
  reviewedBy?: string;
  estimatedReadTime?: string;
}

export const diseaseDatabase: DetailedDisease[] = [
  {
    id: "hiv-aids",
    name: "HIV/AIDS",
    category: "communicable",
    description: "Understanding HIV transmission, prevention, and living with HIV. Comprehensive guide covering symptoms, testing, treatment options, and support resources.",
    lastUpdated: "2 days ago",
    isOfflineAvailable: true,
    isSaved: false,
    severity: "high",
    medicalReviewDate: "2024-08-15",
    reviewedBy: "Dr. Sarah Mensah, Infectious Disease Specialist",
    estimatedReadTime: "12 min",
    content: {
      en: {
        overview: "HIV (Human Immunodeficiency Virus) is a virus that attacks the body's immune system. If HIV is not treated, it can lead to AIDS (Acquired Immunodeficiency Syndrome). HIV is spread through certain body fluids from an infected person, including blood, semen, vaginal fluids, and breast milk. With proper medical care, HIV can be controlled and people with HIV can live long, healthy lives.",
        symptoms: [
          "Fever and chills",
          "Fatigue and weakness",
          "Swollen lymph nodes",
          "Rash on the skin",
          "Night sweats",
          "Persistent cough",
          "Rapid weight loss",
          "Frequent infections"
        ],
        causes: [
          "Unprotected sexual contact with an infected person",
          "Sharing needles or syringes",
          "Blood transfusions with contaminated blood",
          "Mother-to-child transmission during pregnancy, birth, or breastfeeding",
          "Exposure to infected blood through cuts or needle sticks"
        ],
        prevention: [
          "Use condoms consistently and correctly during sexual activity",
          "Get tested regularly and know your partner's status",
          "Never share needles, syringes, or other drug equipment",
          "Consider PrEP (Pre-exposure prophylaxis) if at high risk",
          "Ensure safe blood transfusions from screened donors",
          "Pregnant women should get tested and receive treatment if positive"
        ],
        treatment: [
          "Antiretroviral therapy (ART) - combination of HIV medicines",
          "Regular monitoring of viral load and CD4 count",
          "Treatment of opportunistic infections",
          "Preventive care and vaccinations",
          "Nutritional support and counseling",
          "Mental health support and counseling"
        ],
        complications: [
          "Opportunistic infections (tuberculosis, pneumonia)",
          "Certain cancers (Kaposi's sarcoma, lymphomas)",
          "Neurological complications",
          "Cardiovascular disease",
          "Kidney disease",
          "Bone disease"
        ],
        riskFactors: [
          "Unprotected sex",
          "Multiple sexual partners",
          "History of sexually transmitted infections",
          "Injection drug use",
          "Being born to an HIV-positive mother",
          "Receiving blood transfusions in countries with poor screening"
        ],
        diagnosis: [
          "HIV antibody tests (rapid tests, blood tests)",
          "HIV antigen/antibody combination tests",
          "HIV viral load tests",
          "CD4 cell count",
          "Resistance testing"
        ],
        livingWith: [
          "Take HIV medicines exactly as prescribed",
          "Keep all medical appointments",
          "Practice safe sex to protect partners",
          "Maintain a healthy lifestyle",
          "Get regular preventive care",
          "Connect with support groups and resources"
        ],
        faqs: [
          {
            question: "Can HIV be cured?",
            answer: "Currently, there is no cure for HIV. However, with proper medical treatment (ART), people with HIV can live long, healthy lives and reduce the virus to undetectable levels."
          },
          {
            question: "How is HIV transmitted?",
            answer: "HIV is transmitted through contact with infected blood, semen, vaginal fluids, and breast milk. It is most commonly spread through unprotected sex and sharing needles."
          },
          {
            question: "What does 'undetectable = untransmittable' mean?",
            answer: "When someone with HIV takes treatment and maintains an undetectable viral load for at least 6 months, they cannot sexually transmit HIV to others."
          },
          {
            question: "Should I get tested for HIV?",
            answer: "Yes, everyone between ages 13-64 should get tested at least once. People at higher risk should test more frequently."
          }
        ],
        resources: [
          {
            title: "Ghana AIDS Commission",
            description: "National coordination body for HIV/AIDS response in Ghana"
          },
          {
            title: "UNAIDS Ghana",
            description: "UN agency providing HIV/AIDS support and resources"
          },
          {
            title: "HIV Prevention Hotline",
            description: "Free confidential counseling and testing information: 0800-100-100"
          },
          {
            title: "Local Support Groups",
            description: "Connect with peer support groups in your community"
          }
        ]
      }
    }
  },
  {
    id: "hypertension",
    name: "Hypertension",
    category: "non-communicable",
    description: "High blood pressure management and prevention strategies. Learn about risk factors, lifestyle changes, medications, and monitoring techniques.",
    lastUpdated: "1 day ago",
    isOfflineAvailable: true,
    isSaved: true,
    severity: "medium",
    medicalReviewDate: "2024-08-20",
    reviewedBy: "Dr. Kwame Asante, Cardiologist",
    estimatedReadTime: "8 min",
    content: {
      en: {
        overview: "Hypertension, or high blood pressure, is a common condition where the force of blood against artery walls is consistently too high. Often called the 'silent killer' because it typically has no symptoms, hypertension can lead to serious health problems if left untreated, including heart disease, stroke, and kidney disease.",
        symptoms: [
          "Usually no symptoms (silent condition)",
          "Severe headaches (in very high blood pressure)",
          "Nosebleeds",
          "Fatigue or confusion",
          "Vision problems",
          "Chest pain",
          "Difficulty breathing",
          "Irregular heartbeat"
        ],
        causes: [
          "Family history of high blood pressure",
          "Age (risk increases with age)",
          "Excessive salt intake",
          "Lack of physical activity",
          "Being overweight or obese",
          "Drinking too much alcohol",
          "Smoking",
          "Chronic kidney disease"
        ],
        prevention: [
          "Maintain a healthy weight",
          "Exercise regularly (at least 30 minutes daily)",
          "Eat a balanced diet low in salt and saturated fat",
          "Limit alcohol consumption",
          "Don't smoke or quit smoking",
          "Manage stress effectively",
          "Get adequate sleep (7-8 hours)",
          "Monitor your blood pressure regularly"
        ],
        treatment: [
          "Lifestyle modifications (diet, exercise, weight loss)",
          "ACE inhibitors",
          "Calcium channel blockers",
          "Diuretics (water pills)",
          "Beta-blockers",
          "ARBs (Angiotensin receptor blockers)",
          "Regular blood pressure monitoring"
        ],
        complications: [
          "Heart attack",
          "Stroke",
          "Heart failure",
          "Kidney disease",
          "Vision problems",
          "Sexual dysfunction",
          "Peripheral artery disease"
        ],
        riskFactors: [
          "Age (over 45 for men, over 55 for women)",
          "Family history",
          "African ancestry",
          "Obesity",
          "Sedentary lifestyle",
          "High sodium diet",
          "Excessive alcohol use",
          "Diabetes"
        ],
        diagnosis: [
          "Blood pressure measurements (multiple readings)",
          "24-hour ambulatory blood pressure monitoring",
          "Home blood pressure monitoring",
          "Blood tests (kidney function, cholesterol)",
          "Electrocardiogram (ECG)",
          "Echocardiogram"
        ],
        livingWith: [
          "Take medications as prescribed",
          "Monitor blood pressure at home",
          "Follow a heart-healthy diet (DASH diet)",
          "Exercise regularly",
          "Manage stress",
          "Limit sodium intake",
          "Attend regular check-ups"
        ],
        faqs: [
          {
            question: "What is normal blood pressure?",
            answer: "Normal blood pressure is less than 120/80 mmHg. High blood pressure is 130/80 mmHg or higher."
          },
          {
            question: "Can high blood pressure be cured?",
            answer: "While hypertension cannot be cured, it can be effectively controlled with lifestyle changes and medications."
          },
          {
            question: "How often should I check my blood pressure?",
            answer: "If you have hypertension, check daily at the same time. If normal, check at least annually or as recommended by your doctor."
          },
          {
            question: "What foods should I avoid?",
            answer: "Limit salt, processed foods, saturated fats, and excessive alcohol. Focus on fruits, vegetables, whole grains, and lean proteins."
          }
        ],
        resources: [
          {
            title: "Ghana Heart Foundation",
            description: "Local organization promoting heart health and hypertension awareness"
          },
          {
            title: "Blood Pressure Monitoring Guide",
            description: "Learn how to properly monitor your blood pressure at home"
          },
          {
            title: "DASH Diet Information",
            description: "Dietary guidelines for managing high blood pressure"
          },
          {
            title: "Exercise for Heart Health",
            description: "Safe exercise recommendations for people with hypertension"
          }
        ]
      }
    }
  },
  {
    id: "malaria",
    name: "Malaria",
    category: "communicable",
    description: "Prevention, symptoms, and treatment of malaria. Essential information for prevention, recognizing symptoms, and seeking timely treatment.",
    lastUpdated: "3 days ago",
    isOfflineAvailable: true,
    isSaved: false,
    severity: "high",
    medicalReviewDate: "2024-08-18",
    reviewedBy: "Dr. Abena Osei, Tropical Medicine Specialist",
    estimatedReadTime: "10 min",
    content: {
      en: {
        overview: "Malaria is a life-threatening disease caused by parasites transmitted through the bites of infected female Anopheles mosquitoes. It remains a major health concern in Ghana and other tropical regions. Early diagnosis and prompt treatment are crucial for preventing serious complications and death.",
        symptoms: [
          "High fever and chills",
          "Headache",
          "Nausea and vomiting",
          "Muscle aches and fatigue",
          "Sweating",
          "Chest or abdominal pain",
          "Cough",
          "Diarrhea"
        ],
        causes: [
          "Plasmodium falciparum (most dangerous)",
          "Plasmodium vivax",
          "Plasmodium ovale",
          "Plasmodium malariae",
          "Transmitted by infected Anopheles mosquitoes"
        ],
        prevention: [
          "Sleep under insecticide-treated bed nets",
          "Use indoor residual spraying",
          "Eliminate standing water around homes",
          "Wear long-sleeved clothing at night",
          "Use mosquito repellent",
          "Take antimalarial prophylaxis when traveling",
          "Seek prompt treatment for fever"
        ],
        treatment: [
          "Artemisinin-based combination therapy (ACT)",
          "Severe malaria: intravenous artesunate",
          "Supportive care (fluids, fever management)",
          "Treatment of complications",
          "Complete the full course of medication"
        ],
        complications: [
          "Cerebral malaria",
          "Severe anemia",
          "Respiratory distress",
          "Kidney failure",
          "Low blood sugar",
          "Shock and circulatory collapse",
          "Death if untreated"
        ],
        riskFactors: [
          "Living in or traveling to endemic areas",
          "Young children under 5",
          "Pregnant women",
          "People with compromised immune systems",
          "Lack of previous exposure",
          "Not using preventive measures"
        ],
        diagnosis: [
          "Rapid diagnostic tests (RDTs)",
          "Microscopic examination of blood smear",
          "PCR tests for confirmation",
          "Complete blood count",
          "Blood glucose levels"
        ],
        livingWith: [
          "Complete treatment as prescribed",
          "Rest and stay hydrated",
          "Monitor for recurring symptoms",
          "Continue prevention measures",
          "Seek immediate care for fever",
          "Inform healthcare providers of malaria history"
        ],
        faqs: [
          {
            question: "How quickly do malaria symptoms appear?",
            answer: "Symptoms typically appear 7-30 days after being bitten by an infected mosquito, but can sometimes take up to a year."
          },
          {
            question: "Can malaria be prevented?",
            answer: "Yes, malaria can be prevented through bed nets, repellents, indoor spraying, and antimalarial drugs for travelers."
          },
          {
            question: "Is malaria contagious between people?",
            answer: "No, malaria is not spread from person to person except through blood transfusion, organ transplant, or shared needles."
          },
          {
            question: "When should I seek medical care?",
            answer: "Seek immediate medical care for fever, especially if you live in or have traveled to a malaria-endemic area."
          }
        ],
        resources: [
          {
            title: "Ghana National Malaria Control Programme",
            description: "Government program for malaria prevention and control"
          },
          {
            title: "WHO Malaria Information",
            description: "Global malaria prevention and treatment guidelines"
          },
          {
            title: "Free Malaria Testing Centers",
            description: "Locations offering free malaria testing and treatment"
          },
          {
            title: "Bed Net Distribution Program",
            description: "Information on free insecticide-treated bed nets"
          }
        ]
      }
    }
  }
];

export function getDiseaseById(id: string): DetailedDisease | undefined {
  return diseaseDatabase.find(disease => disease.id === id);
}

export function getBasicDiseases() {
  return diseaseDatabase.map(disease => ({
    id: disease.id,
    name: disease.name,
    category: disease.category,
    description: disease.description,
    lastUpdated: disease.lastUpdated,
    isOfflineAvailable: disease.isOfflineAvailable,
    isSaved: disease.isSaved,
    severity: disease.severity
  }));
}