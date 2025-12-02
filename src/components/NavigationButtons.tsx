import React from 'react';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import DownloadDropdown from './DownloadDropdown';
import { Resume } from '../types/Resume';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onPreview: () => void;
  isFormValid: boolean;
  resumeData: Resume;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onPreview,
  isFormValid,
  resumeData
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between p-6 bg-white border-t border-gray-200">
      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
          isFirstStep
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-600 text-white hover:bg-gray-700 shadow-sm hover:shadow-md'
        }`}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>Previous</span>
      </button>

      <div className="flex items-center space-x-3">
        <button
          onClick={onPreview}
          className="flex items-center space-x-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
        >
          <Eye className="w-4 h-4" />
          <span>Preview</span>
        </button>

        {isLastStep && (
          <DownloadDropdown data={resumeData} />
        )}
      </div>

      <button
        onClick={onNext}
        disabled={isLastStep || !isFormValid}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
          isLastStep || !isFormValid
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
        }`}
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default NavigationButtons;