import React from 'react';
import { Skill } from '../../types/Resume';
import { Award, Plus, Trash2 } from 'lucide-react';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange }) => {
  const addSkill = () => {
    const newSkill: Skill = {
      name: '',
      level: 'Intermediate',
      category: 'Technical'
    };
    onChange([...data, newSkill]);
  };

  const removeSkill = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    onChange(data.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    ));
  };

  const skillCategories = ['Technical', 'Soft Skills', 'Languages', 'Tools & Software', 'Other'];
  const skillLevels: Skill['level'][] = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

  const addPresetSkills = (category: string, skills: string[]) => {
    const newSkills = skills.map(skill => ({
      name: skill,
      level: 'Intermediate' as Skill['level'],
      category
    }));
    onChange([...data, ...newSkills]);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-orange-100 rounded-lg">
            <Award className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
            <p className="text-sm text-gray-500">Showcase your technical and soft skills</p>
          </div>
        </div>
        
        <button
          onClick={addSkill}
          className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">Add Skill</span>
        </button>
      </div>

      {/* Quick Add Buttons */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-3">Quick Add Skills:</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => addPresetSkills('Technical', ['JavaScript', 'React', 'Node.js', 'Python'])}
            className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200 transition-colors duration-200"
          >
            Frontend Dev
          </button>
          <button
            onClick={() => addPresetSkills('Technical', ['Java', 'Spring Boot', 'MySQL', 'AWS'])}
            className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full hover:bg-green-200 transition-colors duration-200"
          >
            Backend Dev
          </button>
          <button
            onClick={() => addPresetSkills('Soft Skills', ['Leadership', 'Communication', 'Problem Solving', 'Teamwork'])}
            className="px-3 py-1 text-xs bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200 transition-colors duration-200"
          >
            Soft Skills
          </button>
          <button
            onClick={() => addPresetSkills('Tools & Software', ['Git', 'Docker', 'Figma', 'Jira'])}
            className="px-3 py-1 text-xs bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors duration-200"
          >
            Tools
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((skill, index) => (
          <div key={index} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex-1">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(index, 'name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Skill name (e.g., JavaScript)"
                required
              />
            </div>

            <div className="w-32">
              <select
                value={skill.category}
                onChange={(e) => updateSkill(index, 'category', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              >
                {skillCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="w-32">
              <select
                value={skill.level}
                onChange={(e) => updateSkill(index, 'level', e.target.value as Skill['level'])}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
              >
                {skillLevels.map(level => (
                  <option key={level} value={level}>{level}</option>
                ))}
              </select>
            </div>

            <button
              onClick={() => removeSkill(index)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No skills added yet. Click "Add Skill" to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsForm;