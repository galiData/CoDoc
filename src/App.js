import React, { useState } from 'react';
import { Upload, FileText, Brain, Stethoscope, Search, Check, Clock, AlertCircle, User, Calendar, Activity } from 'lucide-react';

const CoDocApp = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [processingStage, setProcessingStage] = useState(0);
  const [showResults, setShowResults] = useState(false);

  // Mock patient data
  const patients = [
    {
      id: 1,
      name: "Sarah Cohen",
      age: 62,
      mrn: "TMC-2024-001",
      diagnosis: "Stage IIIA Non-Small Cell Lung Cancer",
      admissionDate: "2024-05-15",
      status: "processed",
      notes: "Patient presents with progressive dyspnea and chest pain. CT shows 4.2cm mass in right upper lobe with mediastinal lymphadenopathy. Biopsy confirmed adenocarcinoma with EGFR mutation positive. Performance status ECOG 1. Previous smoker, quit 10 years ago."
    },
    {
      id: 2,
      name: "David Levi",
      age: 58,
      mrn: "TMC-2024-002",
      diagnosis: "Stage IV Colorectal Cancer",
      admissionDate: "2024-05-14",
      status: "processed",
      notes: "67-year-old male with metastatic colorectal adenocarcinoma. Primary tumor resected 18 months ago. Now presents with liver metastases and rising CEA. KRAS wild type, MSI stable. Good performance status."
    },
    {
      id: 3,
      name: "Rachel Goldberg",
      age: 45,
      mrn: "TMC-2024-003",
      diagnosis: "Triple Negative Breast Cancer",
      admissionDate: "2024-05-13",
      status: "processing",
      notes: "45-year-old premenopausal woman with newly diagnosed invasive ductal carcinoma. T2N1M0, Grade 3. ER/PR negative, HER2 negative. BRCA1 mutation detected. Family history significant for breast and ovarian cancer."
    },
    {
      id: 4,
      name: "Michael Rosenberg",
      age: 71,
      mrn: "TMC-2024-004",
      diagnosis: "Chronic Lymphocytic Leukemia",
      admissionDate: "2024-05-12",
      status: "pending",
      notes: ""
    },
    {
      id: 5,
      name: "Anna Friedman",
      age: 54,
      mrn: "TMC-2024-005",
      diagnosis: "Stage II Ovarian Cancer",
      admissionDate: "2024-05-11",
      status: "processed",
      notes: "54-year-old woman with high-grade serous ovarian carcinoma. Optimal cytoreduction achieved. CA-125 elevated at 245. BRCA2 mutation positive. Planning adjuvant chemotherapy."
    },
    {
      id: 6,
      name: "Joseph Klein",
      age: 66,
      mrn: "TMC-2024-006",
      diagnosis: "Prostate Adenocarcinoma",
      admissionDate: "2024-05-10",
      status: "processed",
      notes: "Gleason 4+5=9 prostate cancer with PSA 42. Bone scan shows multiple metastases. Castration-resistant disease developed after 14 months of ADT. Good performance status, ambulatory."
    },
    {
      id: 7,
      name: "Esther Katz",
      age: 72,
      mrn: "TMC-2024-007",
      diagnosis: "Pancreatic Adenocarcinoma",
      admissionDate: "2024-05-09",
      status: "processing",
      notes: "Locally advanced pancreatic head mass with vascular involvement. CA 19-9 markedly elevated. Borderline resectable. Planning neoadjuvant therapy."
    },
    {
      id: 8,
      name: "Benjamin Stern",
      age: 39,
      mrn: "TMC-2024-008",
      diagnosis: "Testicular Cancer",
      admissionDate: "2024-05-08",
      status: "processed",
      notes: "Non-seminomatous germ cell tumor with retroperitoneal lymphadenopathy. AFP and beta-HCG elevated. Intermediate risk per IGCCCG classification."
    },
    {
      id: 9,
      name: "Miriam Shapiro",
      age: 68,
      mrn: "TMC-2024-009",
      diagnosis: "Multiple Myeloma",
      admissionDate: "2024-05-07",
      status: "pending",
      notes: ""
    },
    {
      id: 10,
      name: "Abraham Miller",
      age: 75,
      mrn: "TMC-2024-010",
      diagnosis: "Gastric Adenocarcinoma",
      admissionDate: "2024-05-06",
      status: "processed",
      notes: "Advanced gastric adenocarcinoma with peritoneal metastases. HER2 positive by IHC 3+. Previous H. pylori infection. Performance status declining."
    },
    {
      id: 11,
      name: "Rebecca Stone",
      age: 56,
      mrn: "TMC-2024-011",
      diagnosis: "Melanoma",
      admissionDate: "2024-05-05",
      status: "processed",
      notes: "Stage IIIC melanoma with in-transit metastases. BRAF V600E mutation positive. Previous wide excision and sentinel lymph node biopsy. High lactate dehydrogenase."
    }
  ];

  const processingStages = [
    { icon: Upload, text: "Uploading admission notes", color: "text-blue-500" },
    { icon: Brain, text: "AI processing and summarization", color: "text-purple-500" },
    { icon: Search, text: "Cross-referencing NCCN guidelines", color: "text-green-500" },
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
              <span>NCCN Guidelines v2024.1</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient List */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Patient Cases
                </h2>
                <p className="text-sm text-gray-600 mt-1">Select a patient to view analysis</p>
              </div>
              <div className="max-h-96 overflow-y-auto">
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
                    <p className="text-sm text-gray-600 mb-1">{patient.diagnosis}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="w-3 h-3 mr-1" />
                      {patient.admissionDate}
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
                        Accessing NCCN guidelines from AWS OpenSearch clusters...
                      </div>
                    </div>
                  </div>
                )}

                {/* Results */}
                {showResults && selectedPatient.notes && (
                  <div className="space-y-6">
                    {/* Summary */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <FileText className="w-5 h-5 mr-2 text-blue-600" />
                        Clinical Summary
                      </h3>
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {selectedPatient.notes.split('.').map((sentence, index) => {
                            const keywords = ['adenocarcinoma', 'EGFR', 'KRAS', 'BRCA', 'metastases', 'Grade', 'Stage'];
                            let highlightedSentence = sentence;
                            keywords.forEach(keyword => {
                              const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
                              highlightedSentence = highlightedSentence.replace(regex, `<mark class="bg-yellow-200 px-1 rounded">${keyword}</mark>`);
                            });
                            return (
                              <span key={index} dangerouslySetInnerHTML={{ __html: highlightedSentence + (index < selectedPatient.notes.split('.').length - 1 ? '. ' : '') }} />
                            );
                          })}
                        </p>
                      </div>
                    </div>

                    {/* NCCN Assessment */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Brain className="w-5 h-5 mr-2 text-purple-600" />
                        NCCN Guidelines Assessment
                      </h3>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5 mr-3 flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-purple-900 mb-2">Guideline Alignment</h4>
                            {selectedPatient.diagnosis.includes('Lung Cancer') && (
                              <p className="text-purple-800">
                                Case aligns with NCCN Non-Small Cell Lung Cancer Guidelines v4.2024. 
                                EGFR mutation positive tumors are candidates for targeted therapy with tyrosine kinase inhibitors as first-line treatment.
                              </p>
                            )}
                            {selectedPatient.diagnosis.includes('Breast Cancer') && (
                              <p className="text-purple-800">
                                Follows NCCN Breast Cancer Guidelines v1.2024. Triple-negative breast cancer with BRCA1 mutation 
                                indicates consideration for PARP inhibitor therapy and platinum-based chemotherapy.
                              </p>
                            )}
                            {selectedPatient.diagnosis.includes('Colorectal') && (
                              <p className="text-purple-800">
                                Consistent with NCCN Colon Cancer Guidelines v2.2024. KRAS wild-type metastatic disease 
                                is eligible for anti-EGFR therapy in combination with chemotherapy.
                              </p>
                            )}
                            {!selectedPatient.diagnosis.includes('Lung') && !selectedPatient.diagnosis.includes('Breast') && !selectedPatient.diagnosis.includes('Colorectal') && (
                              <p className="text-purple-800">
                                Case reviewed against relevant NCCN guidelines. Molecular markers and staging information 
                                support current standard of care recommendations.
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Treatment Plan */}
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6">
                      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                        <Stethoscope className="w-5 h-5 mr-2 text-green-600" />
                        Recommended Treatment Plan
                      </h3>
                      <div className="space-y-4">
                        {selectedPatient.diagnosis.includes('Lung Cancer') && (
                          <>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <h4 className="font-semibold text-green-900 mb-2">Primary Recommendation</h4>
                              <p className="text-green-800">Osimertinib 80mg daily as first-line therapy for EGFR-mutated NSCLC</p>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-semibold text-blue-900 mb-2">Alternative Options</h4>
                              <p className="text-blue-800">Erlotinib or Gefitinib if Osimertinib not available</p>
                            </div>
                          </>
                        )}
                        {selectedPatient.diagnosis.includes('Breast Cancer') && (
                          <>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <h4 className="font-semibold text-green-900 mb-2">Neoadjuvant Therapy</h4>
                              <p className="text-green-800">AC-T (Doxorubicin/Cyclophosphamide followed by Paclitaxel) with carboplatin for TNBC</p>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-semibold text-blue-900 mb-2">BRCA-Directed Therapy</h4>
                              <p className="text-blue-800">Consider PARP inhibitor (Olaparib) in adjuvant setting post-surgery</p>
                            </div>
                          </>
                        )}
                        {!selectedPatient.diagnosis.includes('Lung') && !selectedPatient.diagnosis.includes('Breast') && (
                          <>
                            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                              <h4 className="font-semibold text-green-900 mb-2">Standard Therapy</h4>
                              <p className="text-green-800">Evidence-based treatment protocol per NCCN guidelines</p>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-semibold text-blue-900 mb-2">Monitoring Plan</h4>
                              <p className="text-blue-800">Regular assessment with appropriate imaging and laboratory studies</p>
                            </div>
                          </>
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