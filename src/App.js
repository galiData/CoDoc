import React, { useState } from 'react';
import { Upload, FileText, Brain, Stethoscope, Search, Check, Clock, AlertCircle, User, Calendar, Activity, BookOpen, Target, Zap } from 'lucide-react';

const CoDocApp = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [processingStage, setProcessingStage] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState('summary');

  // Mock patient data with comprehensive admission notes
  const patients = [
    {
      id: 1,
      name: "Sarah Cohen",
      age: 62,
      mrn: "TMC-2024-001",
      diagnosis: "Stage IIIA Non-Small Cell Lung Cancer",
      admissionDate: "2024-05-15",
      status: "processed",
      rawNotes: `CHIEF COMPLAINT: Progressive shortness of breath and chest pain over 3 months.

HISTORY OF PRESENT ILLNESS: 62-year-old female with a 40 pack-year smoking history (quit 10 years ago) presents with a 3-month history of progressive dyspnea on exertion, initially noted only with climbing stairs but now occurring with minimal activity. Associated with right-sided chest pain, described as sharp and constant, worsening with deep inspiration. Patient also reports a 15-pound unintentional weight loss over the past 2 months, decreased appetite, and occasional dry cough. No hemoptysis, fever, or night sweats reported.

PAST MEDICAL HISTORY: Hypertension (well-controlled on lisinopril), hyperlipidemia, osteoarthritis. Previous cholecystectomy in 2018. No prior malignancy.

SOCIAL HISTORY: Former smoker (40 pack-years, quit 2014), occasional alcohol use (1-2 glasses wine weekly), retired teacher, lives with husband, no occupational exposures.

PHYSICAL EXAMINATION: Vital signs stable. General appearance: thin-appearing woman in mild respiratory distress. HEENT: unremarkable. Neck: palpable right supraclavicular lymph node, mobile, firm, approximately 2cm. Chest: decreased air entry right upper zone, dullness to percussion. Heart: regular rate and rhythm. Abdomen: soft, non-tender. Extremities: no clubbing, cyanosis, or edema.

IMAGING: Chest CT with contrast shows 4.2 cm spiculated mass in right upper lobe with associated post-obstructive collapse. Multiple enlarged mediastinal lymph nodes (largest 2.8 cm in 4R station). Small right pleural effusion. PET-CT demonstrates FDG-avid primary tumor (SUVmax 12.4) and mediastinal nodes (SUVmax 8.9). No distant metastases identified.

PATHOLOGY: CT-guided biopsy of lung mass: Invasive adenocarcinoma, moderately differentiated. Immunohistochemistry positive for TTF-1 and napsin A. Molecular testing: EGFR exon 19 deletion mutation detected. ALK and ROS1 negative. PD-L1 expression 45%.

LABORATORY: Complete blood count within normal limits. Comprehensive metabolic panel unremarkable. CEA elevated at 12.4 ng/mL (normal <3.0).

PULMONARY FUNCTION: FEV1 78% predicted, DLCO 65% predicted, consistent with mild restriction.

ECOG PERFORMANCE STATUS: 1`,
      summary: "62-year-old former smoker with stage IIIA adenocarcinoma of the lung harboring EGFR exon 19 deletion. Mediastinal lymph node involvement without distant metastases. Good performance status with adequate pulmonary reserve."
    },
    {
      id: 2,
      name: "David Levi",
      age: 58,
      mrn: "TMC-2024-002",
      diagnosis: "Stage IV Colorectal Cancer",
      admissionDate: "2024-05-14",
      status: "processed",
      rawNotes: `CHIEF COMPLAINT: Abdominal pain and rising CEA levels during surveillance.

HISTORY OF PRESENT ILLNESS: 58-year-old male with history of T3N1 sigmoid adenocarcinoma resected 18 months ago presents for evaluation of rising CEA and new abdominal pain. Patient completed adjuvant FOLFOX chemotherapy 12 months ago with excellent tolerance. Recent surveillance imaging revealed new liver lesions. Patient reports vague right upper quadrant discomfort, early satiety, and 8-pound weight loss over 6 weeks. No bowel obstruction symptoms, GI bleeding, or jaundice.

PAST MEDICAL HISTORY: Sigmoid colon adenocarcinoma (pT3N1M0) resected March 2023, completed adjuvant FOLFOX. Type 2 diabetes mellitus (well-controlled), hypertension. Appendectomy in childhood.

FAMILY HISTORY: Father died of pancreatic cancer age 68, mother with breast cancer age 72. No known Lynch syndrome in family.

PHYSICAL EXAMINATION: Well-appearing male in no distress. Abdomen: soft, mild right upper quadrant tenderness, liver edge palpable 3 cm below costal margin, no masses. Well-healed midline surgical scar. Rectal examination: no masses, stool brown, guaiac negative.

IMAGING: CT abdomen/pelvis with contrast: Multiple new liver metastases, largest 4.8 cm in segment VII. Primary anastomosis intact, no local recurrence. No retroperitoneal adenopathy or peritoneal disease. Chest CT: no pulmonary metastases.

LABORATORY: CEA 142 ng/mL (previously 3.2 ng/mL six months ago). CA 19-9 elevated at 89 U/mL. Liver function tests: ALT 78, AST 85, alkaline phosphatase 156, total bilirubin 1.8.

PATHOLOGY REVIEW: Original tumor: moderately differentiated adenocarcinoma. Molecular testing from liver biopsy: KRAS wild-type, BRAF wild-type, MSI stable. HER2 amplification negative.

PERFORMANCE STATUS: ECOG 0-1`,
      summary: "58-year-old male with metachronous liver metastases from prior sigmoid adenocarcinoma. KRAS wild-type, MSI stable disease with good performance status and limited metastatic burden."
    },
    {
      id: 3,
      name: "Rachel Goldberg",
      age: 45,
      mrn: "TMC-2024-003",
      diagnosis: "Triple Negative Breast Cancer",
      admissionDate: "2024-05-13",
      status: "processing",
      rawNotes: `CHIEF COMPLAINT: Newly discovered left breast mass.

HISTORY OF PRESENT ILLNESS: 45-year-old premenopausal woman presents with 6-week history of palpable left breast mass noted during self-examination. Mass has increased in size and associated with mild tenderness. No nipple discharge, skin changes, or axillary adenopathy noted by patient. Last menstrual period 2 weeks ago, regular cycles. No recent trauma.

PAST MEDICAL HISTORY: No significant past medical history. No prior breast biopsies. Menarche at age 12, nulliparous by choice.

FAMILY HISTORY: Strong family history significant for maternal grandmother with breast cancer at age 52 and ovarian cancer at age 67. Maternal aunt with breast cancer at age 48. Paternal grandmother with ovarian cancer. No male breast cancers in family.

PHYSICAL EXAMINATION: Well-developed woman in no distress. Breast examination: 3.5 cm firm, irregular, fixed mass in left upper outer quadrant. Skin intact, no nipple retraction. Palpable mobile left axillary lymph node approximately 1.5 cm. Right breast unremarkable.

IMAGING: Bilateral mammography: 3.8 cm irregular mass left breast with associated calcifications, BI-RADS 5. Left axillary lymphadenopathy. MRI breast: 4.1 cm enhancing mass with restricted diffusion, no multicentric disease, contralateral breast unremarkable.

PATHOLOGY: Core needle biopsy left breast mass: Invasive ductal carcinoma, grade 3/3 (tubule formation 3, nuclear grade 3, mitotic rate 3). Extensive lymphovascular invasion present. Immunohistochemistry: ER negative (<1%), PR negative (<1%), HER2 negative (IHC 1+, FISH not performed). Ki-67 85%.

STAGING: CT chest/abdomen/pelvis: no distant metastases. Bone scan negative. Clinical stage T2N1M0.

GENETICS: Given strong family history, genetic counseling arranged. BRCA1 mutation detected (c.5266dupC). BRCA2 and other hereditary cancer genes negative.

LABORATORY: Complete blood count and comprehensive metabolic panel within normal limits.`,
      summary: "45-year-old premenopausal woman with newly diagnosed invasive ductal carcinoma, triple-negative, grade 3 with BRCA1 mutation. Clinical stage T2N1M0 with high proliferative index."
    },
    {
      id: 4,
      name: "Michael Rosenberg",
      age: 71,
      mrn: "TMC-2024-004",
      diagnosis: "Chronic Lymphocytic Leukemia",
      admissionDate: "2024-05-12",
      status: "pending",
      rawNotes: "",
      summary: ""
    },
    {
      id: 5,
      name: "Anna Friedman",
      age: 54,
      mrn: "TMC-2024-005",
      diagnosis: "Stage II Ovarian Cancer",
      admissionDate: "2024-05-11",
      status: "processed",
      rawNotes: `CHIEF COMPLAINT: Abdominal bloating and pelvic pain.

HISTORY OF PRESENT ILLNESS: 54-year-old postmenopausal woman presents with 4-month history of progressive abdominal bloating, early satiety, and pelvic pressure. Initially attributed symptoms to menopause but persistent nature prompted evaluation. Patient reports 12-pound weight gain despite decreased appetite. No GI bleeding, bowel obstruction, or urinary symptoms.

PAST MEDICAL HISTORY: Menopause at age 51, no HRT. Hypothyroidism (stable on levothyroxine). No prior gynecologic surgeries.

FAMILY HISTORY: Sister with breast cancer at age 58, no ovarian cancer history.

PHYSICAL EXAMINATION: Pelvic examination reveals large, firm, fixed pelvic mass. Abdomen distended with shifting dullness consistent with ascites.

IMAGING: Pelvic ultrasound: complex bilateral ovarian masses, largest 8 cm. CT abdomen/pelvis: bilateral ovarian masses with moderate ascites, no obvious peritoneal implants.

SURGERY: Optimal cytoreductive surgery performed: total abdominal hysterectomy, bilateral salpingo-oophorectomy, omentectomy, peritoneal biopsies. All visible disease resected (R0 resection).

PATHOLOGY: High-grade serous ovarian carcinoma, bilateral ovaries involved. No surface involvement, confined to ovaries. Final stage T1cN0M0 (Stage IC due to surgical spill).

MOLECULAR: BRCA2 mutation detected. Homologous recombination deficiency score positive.

LABORATORY: CA-125 245 U/mL preoperatively, declined to 28 U/mL postoperatively.`,
      summary: "54-year-old woman with stage IC high-grade serous ovarian carcinoma, BRCA2 mutation positive, status post optimal cytoreductive surgery."
    },
    {
      id: 6,
      name: "Joseph Klein",
      age: 66,
      mrn: "TMC-2024-006",
      diagnosis: "Prostate Adenocarcinoma",
      admissionDate: "2024-05-10",
      status: "processed",
      rawNotes: `CHIEF COMPLAINT: Rising PSA despite androgen deprivation therapy.

HISTORY OF PRESENT ILLNESS: 66-year-old male with history of high-risk prostate adenocarcinoma diagnosed 2 years ago presents with biochemical and radiographic progression despite ongoing ADT. Initial presentation with PSA 42 ng/mL, Gleason 4+5=9 disease. Started on leuprolide with initial excellent response (PSA nadir 0.8 ng/mL). Over past 6 months, PSA rising despite castrate testosterone levels. Recent bone pain in lower back and hips.

PAST MEDICAL HISTORY: Prostate adenocarcinoma diagnosed 2022, coronary artery disease (stable), diabetes mellitus type 2.

PHYSICAL EXAMINATION: Elderly male in no acute distress. DRE: prostate firm, enlarged, nodular. No lymphadenopathy.

IMAGING: Bone scan: multiple new sclerotic lesions in spine, pelvis, and ribs consistent with metastases. CT abdomen/pelvis: prostate enlarged, no lymphadenopathy.

LABORATORY: PSA 42 ng/mL (rising from nadir 0.8), testosterone <20 ng/dL (castrate level). Alkaline phosphatase 245 U/L.

MOLECULAR: Circulating tumor DNA analysis pending. Germline testing: no BRCA mutations detected.`,
      summary: "66-year-old male with castration-resistant prostate cancer and new bone metastases, progressing after 14 months of androgen deprivation therapy."
    }
  ];

  const processingStages = [
    { icon: Upload, text: "Uploading admission notes", color: "text-blue-500" },
    { icon: Brain, text: "AI processing and summarization", color: "text-purple-500" },
    { icon: Search, text: "Cross-referencing Ichilov guidelines", color: "text-green-500" },
    { icon: Stethoscope, text: "Generating treatment recommendations", color: "text-red-500" }
  ];

  const handlePatientSelect = (patient) => {
    setSelectedPatient(patient);
    if (patient.status === 'processed') {
      setShowResults(true);
      setProcessingStage(0);
    } else {
      setShowResults(false);
      setProcessingStage(0);
    }
  };

  const simulateProcessing = () => {
    setShowResults(false);
    setProcessingStage(0);
    
    const interval = setInterval(() => {
      setProcessingStage(prev => {
        if (prev >= 3) {
          clearInterval(interval);
          setTimeout(() => setShowResults(true), 1000);
          return 3;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'processed': return 'text-green-600 bg-green-50';
      case 'processing': return 'text-yellow-600 bg-yellow-50';  
      case 'pending': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const renderTreatmentPlan = (patient) => {
    if (patient.diagnosis.includes('Lung Cancer')) {
      return (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Primary Recommendation
            </h4>
            <p className="text-green-800 font-medium mb-2">Osimertinib 80mg PO daily</p>
            <p className="text-green-700 text-sm">Third-generation EGFR TKI with superior CNS penetration and efficacy in EGFR exon 19 deletion mutations</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Alternative Options</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Erlotinib 150mg daily (if osimertinib unavailable)</li>
                <li>• Gefitinib 250mg daily (alternative first-gen TKI)</li>
                <li>• Afatinib 40mg daily (second-generation option)</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Monitoring Plan</h4>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• CT chest every 6-8 weeks initially</li>
                <li>• ECOG performance status assessment</li>
                <li>• Liver function tests monthly</li>
                <li>• ECG monitoring for QTc prolongation</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 mb-2">Resistance Monitoring</h4>
            <p className="text-amber-800 text-sm">Plan for T790M mutation testing at progression. Consider liquid biopsy every 3-4 months to detect emerging resistance mutations early.</p>
          </div>
        </div>
      );
    } else if (patient.diagnosis.includes('Breast Cancer')) {
      return (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              Neoadjuvant Chemotherapy
            </h4>
            <p className="text-green-800 font-medium mb-2">AC-T + Carboplatin (dose-dense)</p>
            <p className="text-green-700 text-sm">Doxorubicin 60mg/m² + Cyclophosphamide 600mg/m² q2weeks x4 → Paclitaxel 80mg/m² + Carboplatin AUC 6 weekly x12</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">BRCA-Directed Therapy</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Consider carboplatin-containing regimen</li>
                <li>• PARP inhibitor (Olaparib) post-surgery if high-risk</li>
                <li>• Enhanced surveillance protocol</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Surgical Planning</h4>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• Assess response after 4 cycles AC</li>
                <li>• Consider breast-conserving surgery if good response</li>
                <li>• Sentinel lymph node biopsy after chemotherapy</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">Risk Reduction</h4>
            <p className="text-red-800 text-sm">Given BRCA1 mutation: discuss prophylactic contralateral mastectomy and risk-reducing salpingo-oophorectomy after completion of childbearing (recommended by age 35-40).</p>
          </div>
        </div>
      );
    } else if (patient.diagnosis.includes('Colorectal')) {
      return (
        <div className="space-y-6">
          <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-r-lg">
            <h4 className="font-bold text-green-900 mb-3 flex items-center">
              <Target className="w-5 h-5 mr-2" />
              First-Line Systemic Therapy
            </h4>
            <p className="text-green-800 font-medium mb-2">FOLFIRI + Cetuximab</p>
            <p className="text-green-700 text-sm">Irinotecan 180mg/m² + Leucovorin 400mg/m² + 5-FU 400mg/m² bolus + 2400mg/m² infusion + Cetuximab 500mg/m² q2weeks</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Alternative Regimens</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• FOLFOX + Cetuximab (if irinotecan intolerant)</li>
                <li>• FOLFIRI + Panitumumab (alternative anti-EGFR)</li>
                <li>• Consider bevacizumab if anti-EGFR contraindicated</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-900 mb-2">Liver-Directed Therapy</h4>
              <ul className="text-purple-800 text-sm space-y-1">
                <li>• Evaluate for hepatic resection after response</li>
                <li>• Consider ablation for small lesions</li>
                <li>• Hepatic arterial infusion if liver-limited</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <h4 className="font-semibold text-amber-900 mb-2">Molecular Monitoring</h4>
            <p className="text-amber-800 text-sm">Monitor for acquired RAS mutations via liquid biopsy. Consider re-biopsy at progression to assess for molecular evolution and guide subsequent therapy selection.</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Standard Therapy</h4>
            <p className="text-green-800">Evidence-based treatment protocol per Ichilov guidelines</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Monitoring Plan</h4>
            <p className="text-blue-800">Regular assessment with appropriate imaging and laboratory studies</p>
          </div>
        </div>
      );
    }
  };

  const renderIchilovAssessment = (patient) => {
    if (patient.diagnosis.includes('Lung Cancer')) {
      return (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start">
              <BookOpen className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Ichilov Non-Small Cell Lung Cancer Guidelines v4.2024</h4>
                <p className="text-purple-800 mb-3">
                  Case aligns with Category 1 recommendations for EGFR-mutated locally advanced NSCLC. 
                  Osimertinib demonstrates superior progression-free survival and overall survival compared to first-generation EGFR TKIs.
                </p>
                <div className="bg-white rounded p-3 border border-purple-200">
                  <p className="text-purple-700 text-sm font-medium mb-1">Key Evidence:</p>
                  <ul className="text-purple-600 text-xs space-y-1">
                    <li>• FLAURA trial: Osimertinib vs gefitinib/erlotinib (HR 0.80 for OS)</li>
                    <li>• ADAURA trial: Adjuvant osimertinib in resected EGFR+ NSCLC</li>
                    <li>• Superior CNS activity and T790M coverage</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
            <h4 className="font-semibold text-indigo-900 mb-2 flex items-center">
              <Zap className="w-4 h-4 mr-1" />
              Concurrent Considerations
            </h4>
            <p className="text-indigo-800 text-sm">
              Given Stage IIIA disease, consider concurrent chemoradiation followed by consolidation durvalumab per PACIFIC trial paradigm if EGFR TKI therapy fails or patient declines targeted therapy.
            </p>
          </div>
        </div>
      );
    } else if (patient.diagnosis.includes('Breast Cancer')) {
      return (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start">
              <BookOpen className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Ichilov Breast Cancer Guidelines v1.2024</h4>
                <p className="text-purple-800 mb-3">
                  Triple-negative breast cancer with BRCA1 mutation qualifies for Category 1 neoadjuvant chemotherapy 
                  with platinum incorporation and consideration for PARP inhibitor therapy.
                </p>
                <div className="bg-white rounded p-3 border border-purple-200">
                  <p className="text-purple-700 text-sm font-medium mb-1">Supporting Evidence:</p>
                  <ul className="text-purple-600 text-xs space-y-1">
                    <li>• GeparSixto: Carboplatin benefit in TNBC (pCR rate 53.2% vs 36.9%)</li>
                    <li>• KEYNOTE-522: Pembrolizumab + chemotherapy in high-risk early TNBC</li>
                    <li>• OlympiA: Adjuvant olaparib in gBRCA+ HER2- breast cancer</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-pink-50 border border-pink-200 rounded-lg p-4">
            <h4 className="font-semibold text-pink-900 mb-2">Hereditary Cancer Risk Management</h4>
            <p className="text-pink-800 text-sm">
              Ichilov Genetic/Familial High-Risk Assessment Guidelines recommend enhanced surveillance and risk-reducing interventions for BRCA1 carriers, including consideration of prophylactic surgeries.
            </p>
          </div>
        </div>
      );
    } else if (patient.diagnosis.includes('Colorectal')) {
      return (
        <div className="space-y-4">
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start">
              <BookOpen className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-purple-900 mb-2">Ichilov Colon Cancer Guidelines v2.2024</h4>
                <p className="text-purple-800 mb-3">
                  KRAS wild-type metastatic colorectal cancer with liver-limited disease qualifies for Category 1 
                  anti-EGFR therapy in combination with chemotherapy backbone.
                </p>
                <div className="bg-white rounded p-3 border border-purple-200">
                  <p className="text-purple-700 text-sm font-medium mb-1">Key Clinical Trials:</p>
                  <ul className="text-purple-600 text-xs space-y-1">
                    <li>• CRYSTAL: FOLFIRI + cetuximab vs FOLFIRI alone</li>
                    <li>• PRIME: FOLFOX + panitumumab in KRAS WT patients</li>
                    <li>• FIRE-3: Superior OS with cetuximab vs bevacizumab in KRAS WT</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h4 className="font-semibold text-green-900 mb-2">Conversion to Resectability</h4>
            <p className="text-green-800 text-sm">
              Higher response rates with anti-EGFR therapy may enable hepatic resection in initially unresectable liver metastases, per Ichilov Category 2A recommendations.
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start">
            <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-purple-900 mb-2">Guideline Alignment</h4>
              <p className="text-purple-800">
                Case reviewed against relevant Ichilov guidelines. Molecular markers and staging information 
                support current standard of care recommendations.
              </p>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Brain className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Co-Doc AI Platform</h1>
                <p className="text-sm text-gray-600">Tel Aviv Sourasky Medical Center - Oncology Department</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Activity className="w-4 h-4" />
              <span>Ichilov Guidelines v2024.1</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient List - Enhanced height */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 h-[calc(100vh-200px)]">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Patient Cases
                </h2>
                <p className="text-sm text-gray-600 mt-1">Select a patient to view analysis ({patients.length} total)</p>
              </div>
              <div className="h-full overflow-y-auto pb-24">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    onClick={() => handlePatientSelect(patient)}
                    className={`p-4 border-b border-gray-100 cursor-pointer transition-all duration-200 hover:bg-blue-50 ${
                      selectedPatient?.id === patient.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{patient.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(patient.status)}`}>
                        {patient.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{patient.diagnosis}</p>
                    <p className="text-xs text-gray-500 mb-2">Age: {patient.age} • MRN: {patient.mrn}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      Admitted: {patient.admissionDate}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {!selectedPatient ? (
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-12 text-center">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Patient</h3>
                <p className="text-gray-600">Choose a patient from the list to view their admission notes analysis</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Patient Header */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h2>
                      <p className="text-gray-600">MRN: {selectedPatient.mrn} • Age: {selectedPatient.age}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{selectedPatient.diagnosis}</p>
                      <p className="text-sm text-gray-600">Admitted: {selectedPatient.admissionDate}</p>
                    </div>
                  </div>
                  
                  {selectedPatient.status === 'pending' && (
                    <div className="mt-4">
                      <button
                        onClick={simulateProcessing}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 flex items-center"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Process Admission Notes
                      </button>
                    </div>
                  )}
                </div>

                {/* Processing Animation */}
                {(selectedPatient.status === 'processing' || processingStage > 0) && !showResults && (
                  <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Processing Admission Notes</h3>
                    <div className="space-y-4">
                      {processingStages.map((stage, index) => {
                        const Icon = stage.icon;
                        const isActive = index === processingStage;
                        const isCompleted = index < processingStage;
                        
                        return (
                          <div key={index} className={`flex items-center p-4 rounded-lg transition-all duration-500 ${
                            isActive ? 'bg-blue-50 border border-blue-200' : 
                            isCompleted ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                          }`}>
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 ${
                              isActive ? 'bg-blue-500 animate-pulse' : 
                              isCompleted ? 'bg-green-500' : 'bg-gray-300'
                            }`}>
                              {isCompleted ? <Check className="w-5 h-5 text-white" /> : 
                               isActive ? <Icon className="w-5 h-5 text-white" /> :
                               <Icon className="w-5 h-5 text-gray-500" />}
                            </div>
                            <span className={`font-medium ${
                              isActive ? 'text-blue-700' : 
                              isCompleted ? 'text-green-700' : 'text-gray-600'
                            }`}>
                              {stage.text}
                            </span>
                            {isActive && <Clock className="w-4 h-4 ml-auto text-blue-500 animate-spin" />}
                          </div>
                        );
                      })}
                    </div>
                    <div className="mt-6 text-center text-sm text-gray-600">
                      <div className="flex items-center justify-center">
                        <Search className="w-4 h-4 mr-2" />
                        Accessing Ichilov guidelines from AWS OpenSearch clusters...
                      </div>
                    </div>
                  </div>
                )}

                {/* Results with Tabs */}
                {showResults && selectedPatient.rawNotes && (
                  <div className="space-y-6">
                    {/* Tab Navigation */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
                      <div className="border-b border-gray-200">
                        <nav className="flex space-x-8 px-6" aria-label="Tabs">
                          {[
                            { id: 'summary', name: 'Clinical Summary', icon: FileText },
                            { id: 'raw', name: 'Raw Admission Notes', icon: BookOpen },
                            { id: 'Ichilov', name: 'Ichilov Assessment', icon: Brain },
                            { id: 'treatment', name: 'Treatment Plan', icon: Stethoscope }
                          ].map(tab => {
                            const Icon = tab.icon;
                            return (
                              <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                                  activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                              >
                                <Icon className="w-4 h-4 mr-2" />
                                {tab.name}
                              </button>
                            );
                          })}
                        </nav>
                      </div>

                      <div className="p-6">
                        {/* Clinical Summary Tab */}
                        {activeTab === 'summary' && (
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                              <FileText className="w-5 h-5 mr-2 text-blue-600" />
                              Clinical Summary
                            </h3>
                            <div className="prose max-w-none">
                              <p className="text-gray-700 leading-relaxed">
                                {selectedPatient.summary && selectedPatient.summary.split('.').map((sentence, index) => {
                                  const keywords = ['adenocarcinoma', 'EGFR', 'KRAS', 'BRCA', 'metastases', 'Grade', 'Stage', 'mutation', 'positive', 'negative'];
                                  let highlightedSentence = sentence;
                                  keywords.forEach(keyword => {
                                    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                                    highlightedSentence = highlightedSentence.replace(regex, `<mark class="bg-yellow-200 px-1 rounded">${keyword}</mark>`);
                                  });
                                  return (
                                    <span key={index} dangerouslySetInnerHTML={{ __html: highlightedSentence + (index < selectedPatient.summary.split('.').length - 1 ? '. ' : '') }} />
                                  );
                                })}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Raw Admission Notes Tab */}
                        {activeTab === 'raw' && (
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                              <BookOpen className="w-5 h-5 mr-2 text-green-600" />
                              Raw Admission Notes
                            </h3>
                            <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                              <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
                                {selectedPatient.rawNotes}
                              </pre>
                            </div>
                          </div>
                        )}

                        {/* Ichilov Assessment Tab */}
                        {activeTab === 'Ichilov' && (
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                              <Brain className="w-5 h-5 mr-2 text-purple-600" />
                              Ichilov Guidelines Assessment
                            </h3>
                            {renderIchilovAssessment(selectedPatient)}
                          </div>
                        )}

                        {/* Treatment Plan Tab */}
                        {activeTab === 'treatment' && (
                          <div>
                            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                              <Stethoscope className="w-5 h-5 mr-2 text-green-600" />
                              Recommended Treatment Plan
                            </h3>
                            {renderTreatmentPlan(selectedPatient)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoDocApp;
