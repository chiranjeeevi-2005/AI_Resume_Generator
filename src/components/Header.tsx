import React from 'react';
import { FileText, Sparkles } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">ResumeAI</h1>
              <p className="text-sm text-gray-500">Professional Resume Generator</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-purple-600">
            <Sparkles className="w-5 h-5" />
            <span className="text-sm font-medium">AI-Powered</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;