import { useState } from 'react';
import { ResumeFormData } from '../types/Resume';

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

  const updatePersonalInfo = (personalInfo: typeof formData.personalInfo) => {
    setFormData(prev => ({ ...prev, personalInfo }));
  };

  const updateSummary = (summary: string) => {
    setFormData(prev => ({ ...prev, summary }));
  };

  const updateExperience = (experience: typeof formData.experience) => {
    setFormData(prev => ({ ...prev, experience }));
  };

  const updateEducation = (education: typeof formData.education) => {
    setFormData(prev => ({ ...prev, education }));
  };

  const updateSkills = (skills: typeof formData.skills) => {
    setFormData(prev => ({ ...prev, skills }));
  };

  const nextStep = () => {
    setFormData(prev => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const previousStep = () => {
    setFormData(prev => ({ ...prev, currentStep: prev.currentStep - 1 }));
  };

  const validateCurrentStep = () => {
    switch (formData.currentStep) {
      case 1:
        return !!(formData.personalInfo.fullName && 
                 formData.personalInfo.email && 
                 formData.personalInfo.phone && 
                 formData.personalInfo.location);
      case 2:
        return !!formData.summary.trim();
      case 3:
        return formData.experience.every(exp => 
          exp.company && exp.position && exp.startDate
        );
      case 4:
        return formData.education.every(edu => 
          edu.institution && edu.degree && edu.field && edu.graduationDate
        );
      case 5:
        return true; // Skills are optional
      default:
        return true;
    }
  };

  return {
    formData,
    updatePersonalInfo,
    updateSummary,
    updateExperience,
    updateEducation,
    updateSkills,
    nextStep,
    previousStep,
    validateCurrentStep
  };
};

export default useResumeForm;