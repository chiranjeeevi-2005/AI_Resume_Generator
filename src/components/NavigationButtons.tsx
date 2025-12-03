import React from 'react';
import { ChevronLeft, ChevronRight, Eye, AlertCircle } from 'lucide-react';
import DownloadDropdown from './DownloadDropdown';
import { Resume, ValidationResult } from '../types/Resume';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onPreview: () => void;
  validationResult: ValidationResult;
  resumeData: Resume;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onPreview,
  validationResult,
  resumeData
}) => {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="bg-white border-t border-gray-200">
      {!validationResult.isValid && (
        <div className="px-6 py-3 bg-red-50 border-b border-red-200">
          <div className="flex items-center space-x-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span className="text-sm font-medium">
              Please fix the following errors before continuing:
            </span>
          </div>
          <ul className="mt-2 text-sm text-red-600 space-y-1">
            {validationResult.errors.map((error, index) => (
              <li key={index} className="flex items-center space-x-1">
                <span>•</span>
                <span>{error.message}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="flex items-center justify-between p-6">
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
        disabled={isLastStep || !validationResult.isValid}
        className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
          isLastStep || !validationResult.isValid
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm hover:shadow-md'
        }`}
      >
        <span>Next</span>
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    </div>
  );
};

export default NavigationButtons;