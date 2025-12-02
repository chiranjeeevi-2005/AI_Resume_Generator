import React, { useState } from 'react';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import PersonalInfoForm from './components/forms/PersonalInfoForm';
import SummaryForm from './components/forms/SummaryForm';
import ExperienceForm from './components/forms/ExperienceForm';
import EducationForm from './components/forms/EducationForm';
import SkillsForm from './components/forms/SkillsForm';
import ResumePreview from './components/ResumePreview';
import NavigationButtons from './components/NavigationButtons';
import useResumeForm from './hooks/useResumeForm';
import DownloadDropdown from './components/DownloadDropdown';

const STEPS = ['Personal', 'Summary', 'Experience', 'Education', 'Skills'];

function App() {
  const {
    formData,
    updatePersonalInfo,
    updateSummary,
    updateExperience,
    updateEducation,
    updateSkills,
    nextStep,
    previousStep,
    validateCurrentStep
  } = useResumeForm();

  const [showPreview, setShowPreview] = useState(false);

  const renderCurrentStep = () => {
    switch (formData.currentStep) {
      case 1:
        return (
          <PersonalInfoForm
            data={formData.personalInfo}
            onChange={updatePersonalInfo}
          />
        );
      case 2:
        return (
          <SummaryForm
            data={formData.summary}
            onChange={updateSummary}
          />
        );
      case 3:
        return (
          <ExperienceForm
            data={formData.experience}
            onChange={updateExperience}
          />
        );
      case 4:
        return (
          <EducationForm
            data={formData.education}
            onChange={updateEducation}
          />
        );
      case 5:
        return (
          <SkillsForm
            data={formData.skills}
            onChange={updateSkills}
          />
        );
      default:
        return null;
    }
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showPreview ? (
          <>
            <ProgressBar
              currentStep={formData.currentStep}
              totalSteps={STEPS.length}
              steps={STEPS}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                {renderCurrentStep()}
              </div>
              
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Live Preview
                    </h3>
                    <div className="bg-gray-50 rounded-lg p-4 text-center text-gray-500">
                      <p className="text-sm">
                        Complete the form to see your resume preview here.
                      </p>
                      <button
                        onClick={handlePreview}
                        className="mt-3 text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        View Full Preview →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <NavigationButtons
              currentStep={formData.currentStep}
              totalSteps={STEPS.length}
              onPrevious={previousStep}
              onNext={nextStep}
              onPreview={handlePreview}
              isFormValid={validateCurrentStep()}
              resumeData={formData}
            />
          </>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Resume Preview</h2>
              <div className="flex items-center space-x-3">
                <DownloadDropdown data={formData} />
                <button
                  onClick={handlePreview}
                  className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                >
                  <span>Back to Editor</span>
                </button>
              </div>
            </div>
            
            <ResumePreview data={formData} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;