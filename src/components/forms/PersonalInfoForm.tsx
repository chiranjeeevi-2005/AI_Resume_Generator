import React from 'react';
import { PersonalInfo } from '../../types/Resume';
import { User, Mail, Phone, MapPin, Linkedin, Globe, AlertCircle } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  getFieldError?: (fieldName: string) => { field: string; message: string } | undefined;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange, getFieldError }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const renderField = (
    field: keyof PersonalInfo,
    label: string,
    icon: React.ReactNode,
    placeholder: string,
    type: string = 'text',
    required: boolean = false
  ) => {
    const error = getFieldError?.(field);
    const hasError = !!error;

    return (
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400">
            {icon}
          </div>
          <input
            type={type}
            value={data[field] || ''}
            onChange={(e) => handleChange(field, e.target.value)}
            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all duration-200 ${
              hasError
                ? 'border-red-300 focus:ring-red-500 bg-red-50'
                : 'border-gray-300 focus:ring-blue-500'
            }`}
            placeholder={placeholder}
            required={required}
          />
          {hasError && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <AlertCircle className="w-5 h-5 text-red-500" />
            </div>
          )}
        </div>
        {hasError && (
          <p className="mt-1 text-sm text-red-600 flex items-center">
            <AlertCircle className="w-4 h-4 mr-1" />
            {error.message}
          </p>
        )}
      </div>
    );
  };
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          <p className="text-sm text-gray-500">Let's start with your basic contact details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {renderField('fullName', 'Full Name', <User className="w-5 h-5" />, 'John Doe', 'text', true)}
        {renderField('email', 'Email Address', <Mail className="w-5 h-5" />, 'john@example.com', 'email', true)}
        {renderField('phone', 'Phone Number', <Phone className="w-5 h-5" />, '+1 (555) 123-4567', 'tel', true)}
        {renderField('location', 'Location', <MapPin className="w-5 h-5" />, 'New York, NY', 'text', true)}
        {renderField('linkedin', 'LinkedIn Profile', <Linkedin className="w-5 h-5" />, 'https://linkedin.com/in/johndoe', 'url')}
        {renderField('website', 'Website/Portfolio', <Globe className="w-5 h-5" />, 'https://johndoe.com', 'url')}
      </div>
    </div>
  );
};

export default PersonalInfoForm;