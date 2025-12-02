import React, { useState } from 'react';
import { Download, FileText, File, ChevronDown } from 'lucide-react';
import { Resume } from '../types/Resume';
import { downloadResume } from '../utils/resumeGenerator';

interface DownloadDropdownProps {
  data: Resume;
  className?: string;
}

const DownloadDropdown: React.FC<DownloadDropdownProps> = ({ data, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (format: 'html' | 'pdf' | 'word') => {
    setIsDownloading(true);
    try {
      await downloadResume(data, format);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
      setIsOpen(false);
    }
  };

  const downloadOptions = [
    {
      format: 'pdf' as const,
      label: 'Download as PDF',
      icon: FileText,
      description: 'Best for printing and sharing'
    },
    {
      format: 'word' as const,
      label: 'Download as Word',
      icon: File,
      description: 'Editable document format'
    },
    {
      format: 'html' as const,
      label: 'Download as HTML',
      icon: Download,
      description: 'Web-friendly format'
    }
  ];

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={isDownloading}
        className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Download className="w-4 h-4" />
        <span>{isDownloading ? 'Downloading...' : 'Download Resume'}</span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
            <div className="py-2">
              {downloadOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.format}
                    onClick={() => handleDownload(option.format)}
                    disabled={isDownloading}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {option.label}
                        </div>
                        <div className="text-xs text-gray-500">
                          {option.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DownloadDropdown;