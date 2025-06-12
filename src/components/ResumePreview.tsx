import React from 'react';
import { Resume } from '../types/Resume';
import { Mail, Phone, MapPin, Linkedin, Globe, Calendar, Award } from 'lucide-react';

interface ResumePreviewProps {
  data: Resume;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const groupSkillsByCategory = () => {
    return data.skills.reduce((acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = [];
      }
      acc[skill.category].push(skill);
      return acc;
    }, {} as Record<string, typeof data.skills>);
  };

  const skillsByCategory = groupSkillsByCategory();

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto">
      <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <h1 className="text-3xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          {data.personalInfo.email && (
            <div className="flex items-center space-x-1">
              <Mail className="w-4 h-4" />
              <span>{data.personalInfo.email}</span>
            </div>
          )}
          {data.personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <Phone className="w-4 h-4" />
              <span>{data.personalInfo.phone}</span>
            </div>
          )}
          {data.personalInfo.location && (
            <div className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{data.personalInfo.location}</span>
            </div>
          )}
          {data.personalInfo.linkedin && (
            <div className="flex items-center space-x-1">
              <Linkedin className="w-4 h-4" />
              <span className="truncate max-w-32">{data.personalInfo.linkedin.replace('https://', '')}</span>
            </div>
          )}
          {data.personalInfo.website && (
            <div className="flex items-center space-x-1">
              <Globe className="w-4 h-4" />
              <span className="truncate max-w-32">{data.personalInfo.website.replace('https://', '')}</span>
            </div>
          )}
        </div>
      </div>

      <div className="p-8">
        {/* Professional Summary */}
        {data.summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-blue-500">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.summary}</p>
          </section>
        )}

        {/* Experience */}
        {data.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Work Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp) => (
                <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200">
                  <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-500 rounded-full"></div>
                  <div className="mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{exp.position}</h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>
                        {formatDate(exp.startDate)} - {exp.isCurrentRole ? 'Present' : formatDate(exp.endDate)}
                      </span>
                    </div>
                  </div>
                  {exp.description && (
                    <p className="text-gray-700 mb-3">{exp.description}</p>
                  )}
                  {exp.achievements.some(ach => ach.trim()) && (
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {exp.achievements.filter(ach => ach.trim()).map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Education
            </h2>
            <div className="space-y-4">
              {data.education.map((edu) => (
                <div key={edu.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{edu.degree} in {edu.field}</h3>
                    <p className="text-blue-600 font-medium">{edu.institution}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>Graduated {formatDate(edu.graduationDate)}</span>
                      {edu.gpa && <span className="ml-4">GPA: {edu.gpa}</span>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {data.skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-500">
              Skills
            </h2>
            <div className="space-y-4">
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category}>
                  <h3 className="text-md font-semibold text-gray-800 mb-2">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-500">({skill.level})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ResumePreview;