import React from 'react';
import { Experience } from '../../types/Resume';
import { Briefcase, Plus, Trash2, Calendar } from 'lucide-react';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      isCurrentRole: false,
      description: '',
      achievements: ['']
    };
    onChange([...data, newExperience]);
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const updateAchievement = (expId: string, achIndex: number, value: string) => {
    onChange(data.map(exp => {
      if (exp.id === expId) {
        const newAchievements = [...exp.achievements];
        newAchievements[achIndex] = value;
        return { ...exp, achievements: newAchievements };
      }
      return exp;
    }));
  };

  const addAchievement = (expId: string) => {
    onChange(data.map(exp => 
      exp.id === expId 
        ? { ...exp, achievements: [...exp.achievements, ''] }
        : exp
    ));
  };

  const removeAchievement = (expId: string, achIndex: number) => {
    onChange(data.map(exp => 
      exp.id === expId 
        ? { ...exp, achievements: exp.achievements.filter((_, i) => i !== achIndex) }
        : exp
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
            <Briefcase className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Work Experience</h2>
            <p className="text-sm text-gray-500">Add your professional experience</p>
          </div>
        </div>
        
        <button
          onClick={addExperience}
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Experience</span>
        </button>
      </div>

      <div className="space-y-8">
        {data.map((experience, index) => (
          <div key={experience.id} className="p-6 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Experience #{index + 1}
              </h3>
              {data.length > 1 && (
                <button
                  onClick={() => removeExperience(experience.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company *
                </label>
                <input
                  type="text"
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Google Inc."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position *
                </label>
                <input
                  type="text"
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Senior Software Engineer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Start Date *
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  End Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    disabled={experience.isCurrentRole}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <label className="flex items-center mt-2">
                  <input
                    type="checkbox"
                    checked={experience.isCurrentRole}
                    onChange={(e) => {
                      updateExperience(experience.id, 'isCurrentRole', e.target.checked);
                      if (e.target.checked) {
                        updateExperience(experience.id, 'endDate', '');
                      }
                    }}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <span className="ml-2 text-sm text-gray-700">Current role</span>
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Job Description
              </label>
              <textarea
                value={experience.description}
                onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
                placeholder="Brief description of your role and responsibilities..."
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="block text-sm font-medium text-gray-700">
                  Key Achievements
                </label>
                <button
                  onClick={() => addAchievement(experience.id)}
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  + Add Achievement
                </button>
              </div>
              
              {experience.achievements.map((achievement, achIndex) => (
                <div key={achIndex} className="flex items-center space-x-2 mb-2">
                  <span className="text-gray-400">•</span>
                  <input
                    type="text"
                    value={achievement}
                    onChange={(e) => updateAchievement(experience.id, achIndex, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Increased team productivity by 25% through process optimization"
                  />
                  {experience.achievements.length > 1 && (
                    <button
                      onClick={() => removeAchievement(experience.id, achIndex)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceForm;