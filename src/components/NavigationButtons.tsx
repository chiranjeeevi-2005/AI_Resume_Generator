import React from 'react';
import { ChevronLeft, ChevronRight, Download, Eye } from 'lucide-react';

interface NavigationButtonsProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onPreview: () => void;
  onDownload: () => void;
  isFormValid: boolean;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onPreview,
  onDownload,
  isFormValid
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
          <button
            onClick={onDownload}
            className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>
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