import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Edit, X } from 'lucide-react';

export default function CorrectionPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [correctionData, setCorrectionData] = useState({
    page: '',
    section: '',
    currentContent: '',
    suggestedContent: '',
    reason: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useState(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:3000/api/correction/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(correctionData)
      });

      if (response.ok) {
        alert('Correction suggestion submitted successfully!');
        setCorrectionData({
          page: '',
          section: '',
          currentContent: '',
          suggestedContent: '',
          reason: ''
        });
        setIsOpen(false);
      } else {
        alert('Error submitting correction suggestion');
      }
    } catch (error) {
      console.error('Error submitting correction:', error);
      alert('Error submitting correction suggestion');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCorrectionData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      {/* Floating Correction Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors z-50"
        title="Suggest a correction"
      >
        <AlertTriangle size={24} />
      </button>

      {/* Correction Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                <Edit className="mr-2" size={24} />
                Suggest a Correction
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Page *
                </label>
                <select
                  name="page"
                  value={correctionData.page}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a page</option>
                  <option value="worldwar1">World War I</option>
                  <option value="worldwar2">World War II</option>
                  <option value="worldwar3">Cold War</option>
                  <option value="modernera">Modern Era</option>
                  <option value="homepage">Homepage</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Section/Content Area *
                </label>
                <input
                  type="text"
                  name="section"
                  value={correctionData.section}
                  onChange={handleInputChange}
                  placeholder="e.g., Tank specifications, Historical context, etc."
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Current Content *
                </label>
                <textarea
                  name="currentContent"
                  value={correctionData.currentContent}
                  onChange={handleInputChange}
                  placeholder="Copy the current content that needs correction..."
                  required
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Suggested Correction *
                </label>
                <textarea
                  name="suggestedContent"
                  value={correctionData.suggestedContent}
                  onChange={handleInputChange}
                  placeholder="Provide your suggested correction..."
                  required
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Correction *
                </label>
                <textarea
                  name="reason"
                  value={correctionData.reason}
                  onChange={handleInputChange}
                  placeholder="Explain why this correction is needed (historical accuracy, typo, etc.)..."
                  required
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Submit Correction
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
} 