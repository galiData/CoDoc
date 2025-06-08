import React, { useState, useEffect } from 'react';
import { ArrowRight, Calendar, FileText, Search, User, Database, Activity, MessageSquare, PlusCircle, CheckCircle, AlertTriangle, X, Beaker } from 'lucide-react';

const OncoAssistantDemo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [treatmentPlans, setTreatmentPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [userMessage, setUserMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState({ title: '', content: '' });
  const [patientSearchQuery, setPatientSearchQuery] = useState('');

  // Demo patient data
  const demoPatient = {
    id: "PT10045678",
    name: "Sarah Cohen",
    age: 62,
    gender: "Female",
    diagnosis: "Stage II Breast Cancer (ER+/PR+, HER2-)",
    diagnosisDate: "2024-12-15",
    comorbidities: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Metformin 500mg BID", "Lisinopril 10mg QD"],
    allergies: ["Penicillin"],
    previousTreatments: ["Lumpectomy (2025-01-10)"],
    geneticMarkers: {
      BRCA1: "Negative",
      BRCA2: "Negative",
      PIK3CA: "Positive"
    }
  };

  // Demo treatment plans based on NCCN guidelines
  const demoTreatmentPlans = [
    {
      id: 1,
      name: "Standard Adjuvant Therapy",
      description: "Standard evidence-based approach for Stage II ER+/PR+ breast cancer",
      therapies: [
        { type: "Chemotherapy", regimen: "AC-T (Doxorubicin, Cyclophosphamide, followed by Paclitaxel)", duration: "4 cycles AC, followed by 12 weekly cycles of T" },
        { type: "Hormone Therapy", regimen: "Aromatase Inhibitor (Letrozole)", duration: "5-10 years" },
        { type: "Radiation Therapy", regimen: "Whole breast radiation", duration: "3-4 weeks" }
      ],
      nccnCategory: "Category 1",
      evidenceLevel: "High",
      suitabilityScore: 0.92
    },
    {
      id: 2,
      name: "De-escalated Therapy",
      description: "Reduced intensity approach for selected patients based on genomic testing",
      therapies: [
        { type: "Hormone Therapy", regimen: "Aromatase Inhibitor (Anastrozole)", duration: "5-10 years" },
        { type: "Radiation Therapy", regimen: "Whole breast radiation", duration: "3-4 weeks" }
      ],
      nccnCategory: "Category 2A",
      evidenceLevel: "Moderate",
      suitabilityScore: 0.85,
      requiredTests: ["Oncotype DX", "MammaPrint"]
    },
    {
      id: 3,
      name: "Clinical Trial Option",
      description: "Innovative approach targeting PIK3CA mutation",
      therapies: [
        { type: "Targeted Therapy", regimen: "Alpelisib + Fulvestrant", duration: "Until progression or intolerance" },
        { type: "Hormone Therapy", regimen: "Aromatase Inhibitor (Letrozole)", duration: "5 years" },
        { type: "Radiation Therapy", regimen: "Whole breast radiation", duration: "3-4 weeks" }
      ],
      nccnCategory: "Category 2B",
      evidenceLevel: "Moderate",
      suitabilityScore: 0.78,
      clinicalTrial: "NCTX1234567"
    }
  ];

  // Demo AI assistant responses
  const getAIResponse = (message) => {
    const lowercaseMsg = message.toLowerCase();
    
    if (lowercaseMsg.includes("side effect") || lowercaseMsg.includes("adverse")) {
      return "For the standard adjuvant therapy plan, common side effects include fatigue, hair loss, and nausea during chemotherapy. Hormone therapy may cause hot flashes, joint pain, and bone density loss. We can discuss management strategies for each of these and adjust the treatment plan accordingly.";
    } else if (lowercaseMsg.includes("alternative") || lowercaseMsg.includes("other option")) {
      return "Based on the patient's PIK3CA mutation status, we could consider the clinical trial option (Plan 3). Alternatively, if we perform Oncotype DX testing and the score is low, we might be able to safely pursue the de-escalated approach without chemotherapy.";
    } else if (lowercaseMsg.includes("success") || lowercaseMsg.includes("outcome") || lowercaseMsg.includes("survival")) {
      return "The 5-year disease-free survival rate for Stage II ER+/PR+ breast cancer treated with the standard adjuvant approach is approximately 85-90%. For this specific patient, considering her age and comorbidities, we would expect outcomes in line with these statistics.";
    } else if (lowercaseMsg.includes("schedule") || lowercaseMsg.includes("timeline") || lowercaseMsg.includes("when")) {
      return "If we proceed with Plan 1, chemotherapy would begin in 2-3 weeks, lasting approximately 5 months, followed by radiation for 3-4 weeks, and then hormone therapy. The total active treatment phase would be about 7-8 months, followed by ongoing hormone therapy.";
    } else {
      return "I understand you're asking about " + message + ". Based on the NCCN guidelines for Stage II ER+/PR+ breast cancer and this patient's specific characteristics, I recommend we proceed with the standard adjuvant therapy plan. Would you like more specific information about dosing, scheduling, or potential modifications?";
    }
  };

  // Simulated loading time
  const simulateLoading = (callback, time = 1500) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (callback) callback();
    }, time);
  };

  // Handle step navigation
  const goToNextStep = () => {
    if (activeStep < 4) {
      simulateLoading(() => {
        if (activeStep === 0) {
          setPatientData(demoPatient);
        } else if (activeStep === 1) {
          setTreatmentPlans(demoTreatmentPlans);
        } else if (activeStep === 2 && !selectedPlan) {
          setSelectedPlan(demoTreatmentPlans[0]);
        } else if (activeStep === 3) {
          setChatMessages([
            { sender: 'ai', message: "Hello Dr. Levy, I'm your OncoAssistant. I've analyzed Sarah Cohen's data and the selected treatment plan. How can I help you finalize the treatment approach?" }
          ]);
        }
        setActiveStep(prevStep => prevStep + 1);
      });
    }
  };

  const goToPreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep(prevStep => prevStep - 1);
    }
  };

  // Handle chat interactions
  const handleSendMessage = () => {
    if (!userMessage.trim()) return;
    
    const newMessages = [
      ...chatMessages,
      { sender: 'user', message: userMessage }
    ];
    
    setChatMessages(newMessages);
    setUserMessage('');
    
    // Simulate AI response
    setTimeout(() => {
      setChatMessages([
        ...newMessages,
        { sender: 'ai', message: getAIResponse(userMessage) }
      ]);
    }, 1000);
  };

  // Handle treatment plan selection
  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
  };

  // Show information modal
  const showInfo = (title, content) => {
    setModalContent({ title, content });
    setShowModal(true);
  };

  // Render patient search step
  const renderPatientSearch = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Patient Search</h2>
      <div className="flex items-center mb-6">
        <input
          type="text"
          placeholder="Search patient by name or ID..."
          className="flex-grow p-2 border rounded-l-md"
          value={patientSearchQuery}
          onChange={(e) => setPatientSearchQuery(e.target.value)}
        />
        <button 
          className="bg-blue-600 text-white p-2 rounded-r-md flex items-center justify-center"
          onClick={goToNextStep}
        >
          <Search size={20} />
        </button>
      </div>
      
      <div className="border rounded-md p-4 mb-4 cursor-pointer hover:bg-blue-50" onClick={goToNextStep}>
        <div className="flex items-start">
          <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <User size={20} />
          </div>
          <div>
            <h3 className="font-semibold">Sarah Cohen</h3>
            <p className="text-sm text-gray-600">ID: PT10045678 • 62F</p>
            <p className="text-sm text-gray-600">Stage II Breast Cancer (ER+/PR+, HER2-)</p>
          </div>
        </div>
      </div>
      
      <div className="border rounded-md p-4 cursor-pointer hover:bg-blue-50 opacity-50">
        <div className="flex items-start">
          <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center mr-3">
            <User size={20} />
          </div>
          <div>
            <h3 className="font-semibold">David Cohen</h3>
            <p className="text-sm text-gray-600">ID: PT10087312 • 58M</p>
            <p className="text-sm text-gray-600">Colorectal Cancer, Stage III</p>
          </div>
        </div>
      </div>
    </div>
  );

  // Render patient information step
  const renderPatientInfo = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Patient Information</h2>
        <button 
          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm"
          onClick={() => showInfo('EMR Integration', 'Data is being pulled from the Chameleon EMR system. This includes patient demographics, diagnosis details, previous treatments, and lab results.')}
        >
          EMR Source
        </button>
      </div>
      
      {patientData && (
        <div>
          <div className="bg-blue-50 p-4 rounded-md mb-4">
            <div className="flex items-start">
              <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mr-4">
                <User size={24} className="text-blue-600" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{patientData.name}</h3>
                <p className="text-gray-600">ID: {patientData.id} • {patientData.age}{patientData.gender.charAt(0)}</p>
                <p className="text-gray-600">Diagnosis: <span className="font-semibold">{patientData.diagnosis}</span></p>
                <p className="text-sm text-gray-500">Diagnosed: {patientData.diagnosisDate}</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border rounded-md p-3">
              <h4 className="font-semibold text-sm text-gray-600 mb-2">Comorbidities</h4>
              <ul className="text-sm">
                {patientData.comorbidities.map((item, index) => (
                  <li key={index} className="mb-1">{item}</li>
                ))}
              </ul>
            </div>
            <div className="border rounded-md p-3">
              <h4 className="font-semibold text-sm text-gray-600 mb-2">Current Medications</h4>
              <ul className="text-sm">
                {patientData.medications.map((item, index) => (
                  <li key={index} className="mb-1">{item}</li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border rounded-md p-3">
              <h4 className="font-semibold text-sm text-gray-600 mb-2">Previous Treatments</h4>
              <ul className="text-sm">
                {patientData.previousTreatments.map((item, index) => (
                  <li key={index} className="mb-1">{item}</li>
                ))}
              </ul>
            </div>
            <div className="border rounded-md p-3">
              <h4 className="font-semibold text-sm text-gray-600 mb-2">Genetic Markers</h4>
              <ul className="text-sm">
                {Object.entries(patientData.geneticMarkers).map(([key, value], index) => (
                  <li key={index} className="mb-1">
                    <span className="font-medium">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <button 
              className="flex items-center text-blue-600"
              onClick={() => showInfo('Lab Results', 'Recent laboratory results show normal CBC values. Chemistry panel indicates well-controlled glucose levels (HbA1c: 6.8%). Liver and kidney function tests are within normal limits.')}
            >
              <Beaker size={16} className="mr-1" />
              <span className="text-sm">View Lab Results</span>
            </button>
            
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
              onClick={goToNextStep}
            >
              Get Treatment Recommendations
              <ArrowRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Render treatment plans step
  const renderTreatmentPlans = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Treatment Recommendations</h2>
        <button 
          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm"
          onClick={() => showInfo('NCCN Guidelines', 'These treatment recommendations are sourced from the National Comprehensive Cancer Network (NCCN) guidelines for breast cancer, version 1.2025, with personalization based on patient-specific factors.')}
        >
          NCCN Source
        </button>
      </div>
      
      {treatmentPlans.map((plan) => (
        <div 
          key={plan.id}
          className={`border rounded-md p-4 mb-4 cursor-pointer transition-all ${selectedPlan?.id === plan.id ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}
          onClick={() => handleSelectPlan(plan)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold">{plan.name}</h3>
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded-full text-xs ${plan.suitabilityScore > 0.9 ? 'bg-green-100 text-green-800' : plan.suitabilityScore > 0.8 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {Math.round(plan.suitabilityScore * 100)}% Match
              </span>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mb-3">{plan.description}</p>
          
          <div className="mb-3">
            {plan.therapies.map((therapy, index) => (
              <div key={index} className="text-sm mb-2">
                <span className="font-medium">{therapy.type}:</span> {therapy.regimen} ({therapy.duration})
              </div>
            ))}
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <span className="mr-3">NCCN: {plan.nccnCategory}</span>
            <span>Evidence: {plan.evidenceLevel}</span>
            {plan.clinicalTrial && (
              <span className="ml-3 text-purple-600">Clinical Trial Available</span>
            )}
          </div>
          
          {selectedPlan?.id === plan.id && (
            <div className="mt-3 flex justify-end">
              <button 
                className="px-4 py-2 bg-blue-600 text-white rounded-md"
                onClick={goToNextStep}
              >
                Select Plan
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  // Render treatment plan details step
  const renderPlanDetails = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      {selectedPlan && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Treatment Plan Details</h2>
            <div className="flex items-center">
              <span className={`px-2 py-1 rounded-full text-xs mr-2 ${selectedPlan.suitabilityScore > 0.9 ? 'bg-green-100 text-green-800' : selectedPlan.suitabilityScore > 0.8 ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {Math.round(selectedPlan.suitabilityScore * 100)}% Match
              </span>
              <span className="text-sm text-gray-600">{selectedPlan.nccnCategory}</span>
            </div>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-md mb-4">
            <h3 className="font-bold mb-2">{selectedPlan.name}</h3>
            <p className="text-gray-700 mb-3">{selectedPlan.description}</p>
            <div className="flex items-center text-sm">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Personalized for {patientData?.name}</span>
            </div>
          </div>
          
          <div className="mb-4">
            <h4 className="font-semibold mb-2">Treatment Components</h4>
            {selectedPlan.therapies.map((therapy, index) => (
              <div key={index} className="border-l-4 border-blue-400 pl-3 mb-3 py-1">
                <div className="font-medium">{therapy.type}</div>
                <div className="text-sm">{therapy.regimen}</div>
                <div className="text-sm text-gray-600">{therapy.duration}</div>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="border rounded-md p-3">
              <h4 className="font-semibold text-sm text-gray-600 mb-2">Expected Timeline</h4>
              <div className="text-sm space-y-2">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2 text-blue-600" />
                  <span>Start: April 15, 2025</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2 text-blue-600" />
                  <span>Active treatment: 6-7 months</span>
                </div>
                <div className="flex items-center">
                  <Calendar size={14} className="mr-2 text-blue-600" />
                  <span>Follow-up: 5+ years</span>
                </div>
              </div>
            </div>
            <div className="border rounded-md p-3">
              <h4 className="font-semibold text-sm text-gray-600 mb-2">Considerations</h4>
              <ul className="text-sm space-y-1">
                <li className="flex items-start">
                  <AlertTriangle size={14} className="mr-2 text-yellow-500 mt-0.5" />
                  <span>Monitor for diabetes complications</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle size={14} className="mr-2 text-yellow-500 mt-0.5" />
                  <span>Adjust therapy for hypertension</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle size={14} className="mr-2 text-green-500 mt-0.5" />
                  <span>PIK3CA mutation responsive</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="flex justify-end">
            <button 
              className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center"
              onClick={goToNextStep}
            >
              Discuss with OncoAssistant
              <MessageSquare size={16} className="ml-2" />
            </button>
          </div>
        </>
      )}
    </div>
  );

  // Render chat interaction step
  const renderChatInteraction = () => (
    <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col" style={{ height: '500px' }}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">OncoAssistant Chat</h2>
        <button 
          className="bg-blue-100 text-blue-600 px-3 py-1 rounded-md text-sm"
          onClick={() => showInfo('AI Assistance', 'OncoAssistant uses a multiagent system to provide evidence-based recommendations and answer questions based on NCCN guidelines, patient EMR data, and the latest clinical research.')}
        >
          AI Info
        </button>
      </div>
      
      <div className="flex-grow overflow-y-auto mb-4 p-2">
        {chatMessages.map((msg, index) => (
          <div key={index} className={`mb-3 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`rounded-lg p-3 max-w-3/4 ${msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
              {msg.message}
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Ask about treatment plan, side effects, or alternatives..."
          className="flex-grow p-2 border rounded-l-md"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
        />
        <button 
          className="bg-blue-600 text-white p-2 rounded-r-md"
          onClick={handleSendMessage}
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );

  // Render progress indicator
  const renderProgressIndicator = () => {
    const steps = [
      { label: "Patient Selection", icon: <User size={16} /> },
      { label: "Patient Information", icon: <FileText size={16} /> },
      { label: "Treatment Options", icon: <Database size={16} /> },
      { label: "Plan Details", icon: <Activity size={16} /> },
      { label: "AI Discussion", icon: <MessageSquare size={16} /> }
    ];
    
    return (
      <div className="flex justify-between mb-6">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`flex flex-col items-center ${index <= activeStep ? 'text-blue-600' : 'text-gray-400'}`}
            style={{ width: `${100/steps.length}%` }}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${index < activeStep ? 'bg-blue-600 text-white' : index === activeStep ? 'border-2 border-blue-600' : 'border-2 border-gray-300'}`}>
              {step.icon}
            </div>
            <span className="text-xs text-center">{step.label}</span>
            {index < steps.length - 1 && (
              <div className={`h-0.5 absolute ${index < activeStep ? 'bg-blue-600' : 'bg-gray-300'}`} style={{ width: `${100/steps.length - 8}%`, marginLeft: '100%' }}></div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Render information modal
  const renderInfoModal = () => (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${showModal ? 'block' : 'hidden'}`}>
      <div className="bg-white rounded-lg p-6 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold">{modalContent.title}</h3>
          <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <p className="text-gray-700">{modalContent.content}</p>
        <div className="mt-4 flex justify-end">
          <button 
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  // Render loading overlay
  const renderLoading = () => (
    <div className={`absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-40 ${loading ? 'block' : 'hidden'}`}>
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-blue-600 font-medium">
          {activeStep === 0 ? "Retrieving patient data..." : 
           activeStep === 1 ? "Analyzing medical history..." : 
           activeStep === 2 ? "Generating treatment recommendations..." : 
           "Processing information..."}
        </p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
              TA
            </div>
            <div>
              <h1 className="text-2xl font-bold">Tel-Aviv Sourasky Medical Center</h1>
              <p className="text-gray-600">OncoAssistant - Cancer Treatment Planning System</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            Dr. David Levy | Oncology Department
          </div>
        </div>
        
        {/* Progress indicator */}
        {renderProgressIndicator()}
        
        {/* Main content */}
        <div className="relative">
          {activeStep === 0 && renderPatientSearch()}
          {activeStep === 1 && renderPatientInfo()}
          {activeStep === 2 && renderTreatmentPlans()}
          {activeStep === 3 && renderPlanDetails()}
          {activeStep === 4 && renderChatInteraction()}
          
          {/* Navigation buttons */}
          {activeStep < 4 && activeStep > 0 && (
            <div className="mt-4 flex justify-between">
              <button 
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-600"
                onClick={goToPreviousStep}
                disabled={loading}
              >
                Back
              </button>
            </div>
          )}
          
          {/* Loading overlay */}
          {renderLoading()}
        </div>
      </div>
      
      {/* Information modal */}
      {renderInfoModal()}
    </div>
  );
};

export default OncoAssistantDemo;