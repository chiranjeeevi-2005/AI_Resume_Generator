import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

interface SummaryFormProps {
  data: string;
  onChange: (data: string) => void;
}

const SummaryForm: React.FC<SummaryFormProps> = ({ data, onChange }) => {
  const generateAISummary = () => {
    const samples = [
      "Experienced software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies. Proven track record of leading cross-functional teams and delivering high-quality solutions that drive business growth and improve user experience.",
      "Results-driven marketing professional with expertise in digital marketing, content strategy, and data analytics. Successfully increased brand awareness by 150% and generated $2M+ in revenue through strategic campaigns and customer acquisition initiatives.",
      "Creative graphic designer with 4+ years of experience in branding, UI/UX design, and digital media. Specialized in creating compelling visual identities that enhance brand recognition and user engagement across multiple platforms."
    ];
    
    const randomSample = samples[Math.floor(Math.random() * samples.length)];
    onChange(randomSample);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
            <FileText className="w-5 h-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Professional Summary</h2>
            <p className="text-sm text-gray-500">Craft a compelling overview of your experience</p>
          </div>
        </div>
        
        <button
          onClick={generateAISummary}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-lg hover:from-purple-600 hover:to-blue-700 transition-all duration-200 shadow-sm hover:shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">AI Generate</span>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Professional Summary *
        </label>
        <textarea
          value={data}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
          placeholder="Write a compelling 2-3 sentence summary that highlights your key skills, experience, and career achievements. Focus on what makes you unique and valuable to potential employers."
          required
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-gray-500">
            Tip: Keep it concise but impactful. Aim for 2-3 sentences.
          </p>
          <span className="text-xs text-gray-400">
            {data.length}/500 characters
          </span>
        </div>
      </div>
    </div>
  );
};

export default SummaryForm;