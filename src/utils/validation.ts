import { PersonalInfo, Experience, Education, Skill } from '../types/Resume';

// Regex patterns for validation
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[\+]?[1-9][\d]{0,15}$/;
export const URL_REGEX = /^https?:\/\/.+\..+/;

export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

export const validatePhone = (phone: string): boolean => {
  // Remove all non-digit characters except +
  const cleanPhone = phone.replace(/[^\d+]/g, '');
  return PHONE_REGEX.test(cleanPhone);
};

export const validateUrl = (url: string): boolean => {
  if (!url) return true; // Optional field
  return URL_REGEX.test(url);
};

export const validatePersonalInfo = (data: PersonalInfo) => {
  const errors: Array<{ field: string; message: string }> = [];

  if (!data.fullName.trim()) {
    errors.push({ field: 'fullName', message: 'Full name is required' });
  }

  if (!data.email.trim()) {
    errors.push({ field: 'email', message: 'Email address is required' });
  } else if (!validateEmail(data.email)) {
    errors.push({ field: 'email', message: 'Please enter a valid email address' });
  }

  if (!data.phone.trim()) {
    errors.push({ field: 'phone', message: 'Phone number is required' });
  } else if (!validatePhone(data.phone)) {
    errors.push({ field: 'phone', message: 'Please enter a valid phone number' });
  }

  if (!data.location.trim()) {
    errors.push({ field: 'location', message: 'Location is required' });
  }

  if (data.linkedin && !validateUrl(data.linkedin)) {
    errors.push({ field: 'linkedin', message: 'Please enter a valid LinkedIn URL' });
  }

  if (data.website && !validateUrl(data.website)) {
    errors.push({ field: 'website', message: 'Please enter a valid website URL' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateSummary = (summary: string) => {
  const errors: Array<{ field: string; message: string }> = [];

  if (!summary.trim()) {
    errors.push({ field: 'summary', message: 'Professional summary is required' });
  } else if (summary.trim().length < 50) {
    errors.push({ field: 'summary', message: 'Summary should be at least 50 characters long' });
  } else if (summary.trim().length > 500) {
    errors.push({ field: 'summary', message: 'Summary should not exceed 500 characters' });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateExperience = (experiences: Experience[]) => {
  const errors: Array<{ field: string; message: string }> = [];

  experiences.forEach((exp, index) => {
    if (!exp.company.trim()) {
      errors.push({ field: `experience.${index}.company`, message: `Company name is required for experience #${index + 1}` });
    }

    if (!exp.position.trim()) {
      errors.push({ field: `experience.${index}.position`, message: `Position is required for experience #${index + 1}` });
    }

    if (!exp.startDate) {
      errors.push({ field: `experience.${index}.startDate`, message: `Start date is required for experience #${index + 1}` });
    }

    if (!exp.isCurrentRole && !exp.endDate) {
      errors.push({ field: `experience.${index}.endDate`, message: `End date is required for experience #${index + 1}` });
    }

    // Validate date logic
    if (exp.startDate && exp.endDate && !exp.isCurrentRole) {
      const startDate = new Date(exp.startDate + '-01');
      const endDate = new Date(exp.endDate + '-01');
      
      if (endDate < startDate) {
        errors.push({ field: `experience.${index}.endDate`, message: `End date cannot be before start date for experience #${index + 1}` });
      }
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateEducation = (educations: Education[]) => {
  const errors: Array<{ field: string; message: string }> = [];

  educations.forEach((edu, index) => {
    if (!edu.institution.trim()) {
      errors.push({ field: `education.${index}.institution`, message: `Institution is required for education #${index + 1}` });
    }

    if (!edu.degree.trim()) {
      errors.push({ field: `education.${index}.degree`, message: `Degree is required for education #${index + 1}` });
    }

    if (!edu.field.trim()) {
      errors.push({ field: `education.${index}.field`, message: `Field of study is required for education #${index + 1}` });
    }

    if (!edu.graduationDate) {
      errors.push({ field: `education.${index}.graduationDate`, message: `Graduation date is required for education #${index + 1}` });
    }

    // Validate GPA format if provided
    if (edu.gpa && !/^\d+(\.\d+)?(\s*\/\s*\d+(\.\d+)?)?$/.test(edu.gpa)) {
      errors.push({ field: `education.${index}.gpa`, message: `Please enter a valid GPA format (e.g., 3.8 or 3.8/4.0) for education #${index + 1}` });
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateSkills = (skills: Skill[]) => {
  const errors: Array<{ field: string; message: string }> = [];

  skills.forEach((skill, index) => {
    if (!skill.name.trim()) {
      errors.push({ field: `skills.${index}.name`, message: `Skill name is required for skill #${index + 1}` });
    }
  });

  return {
    isValid: errors.length === 0,
    errors
  };
};