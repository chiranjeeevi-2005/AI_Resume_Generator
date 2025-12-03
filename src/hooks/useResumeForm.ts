import { useState } from 'react';
import { ResumeFormData, ValidationResult } from '../types/Resume';
import { 
  validatePersonalInfo, 
  validateSummary, 
  validateExperience, 
  validateEducation, 
  validateSkills 
} from '../utils/validation';

const useResumeForm = () => {
  const [formData, setFormData] = useState<ResumeFormData>({
    currentStep: 1,
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: ''
    },
    summary: '',
    experience: [{
      id: '1',
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      description: '',
      achievements: ['']
    }],
    education: [{
      id: '1',
      institution: '',
      degree: '',
      field: '',
      graduationDate: '',
      gpa: ''
    }],
    skills: []
  });

  const [validationErrors, setValidationErrors] = useState<ValidationResult>({
    isValid: true,
    errors: []
  });

  const updatePersonalInfo = (personalInfo: typeof formData.personalInfo) => {
    setFormData(prev => ({ ...prev, personalInfo }));
    // Clear validation errors when user starts typing
    if (validationErrors.errors.some(error => error.field.startsWith('personalInfo') || ['fullName', 'email', 'phone', 'location', 'linkedin', 'website'].includes(error.field))) {
      setValidationErrors({ isValid: true, errors: [] });
    }
  };

  const updateSummary = (summary: string) => {
    setFormData(prev => ({ ...prev, summary }));
    if (validationErrors.errors.some(error => error.field === 'summary')) {
      setValidationErrors({ isValid: true, errors: [] });
    }
  };

  const updateExperience = (experience: typeof formData.experience) => {
    setFormData(prev => ({ ...prev, experience }));
    if (validationErrors.errors.some(error => error.field.startsWith('experience'))) {
      setValidationErrors({ isValid: true, errors: [] });
    }
  };

  const updateEducation = (education: typeof formData.education) => {
    setFormData(prev => ({ ...prev, education }));
    if (validationErrors.errors.some(error => error.field.startsWith('education'))) {
      setValidationErrors({ isValid: true, errors: [] });
    }
  };

  const updateSkills = (skills: typeof formData.skills) => {
    setFormData(prev => ({ ...prev, skills }));
    if (validationErrors.errors.some(error => error.field.startsWith('skills'))) {
      setValidationErrors({ isValid: true, errors: [] });
    }
  };

  const nextStep = () => {
    const validation = validateCurrentStep();
    if (validation.isValid) {
      setFormData(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
      setValidationErrors({ isValid: true, errors: [] });
    } else {
      setValidationErrors(validation);
    }
  };

  const previousStep = () => {
    setFormData(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
    setValidationErrors({ isValid: true, errors: [] });
  };

  const validateCurrentStep = (): ValidationResult => {
    switch (formData.currentStep) {
      case 1:
        return validatePersonalInfo(formData.personalInfo);
      case 2:
        return validateSummary(formData.summary);
      case 3:
        return validateExperience(formData.experience);
      case 4:
        return validateEducation(formData.education);
      case 5:
        return validateSkills(formData.skills);
      default:
        return { isValid: true, errors: [] };
    }
  };

  const getFieldError = (fieldName: string) => {
    return validationErrors.errors.find(error => error.field === fieldName);
  };

  return {
    formData,
    validationErrors,
    updatePersonalInfo,
    updateSummary,
    updateExperience,
    updateEducation,
    updateSkills,
    nextStep,
    previousStep,
    validateCurrentStep,
    getFieldError
  };
};

export default useResumeForm;