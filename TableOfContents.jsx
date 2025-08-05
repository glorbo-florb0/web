import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function TableOfContents() {
  const [isExpanded, setIsExpanded] = useState(false);

    const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-6 mb-8 bg-white">
      <div 
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-bold text-gray-900">Contents:</h2>
        {isExpanded ? (
          <ChevronDown className="w-5 h-5 text-gray-500" />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-500" />
        )}
      </div>
      
      {isExpanded && (
        <div className="mt-4 space-y-2">
          {sections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => scrollToSection(section.id)}
                className="text-blue-600 hover:text-blue-800 hover:underline text-left font-medium"
              >
                {section.title}
              </button>
              {section.subsections && (
                <ul className="ml-4 mt-1 space-y-1">
                  {section.subsections.map((subsection, index) => (
                    <li key={index}>
                      <span className="text-blue-600 hover:text-blue-800 hover:underline cursor-pointer text-sm">
                        {subsection}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 