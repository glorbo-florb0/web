import { useEffect, useState } from 'react';

export default function CommentForm() {
  const [formData, setFormData] = useState({
    comment: '',
    name: '',
    email: '',
    saveInfo: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Load saved name/email if user has opted to save info
  useEffect(() => {
    const savedName = localStorage.getItem('commentName');
    const savedEmail = localStorage.getItem('commentEmail');
    if (savedName || savedEmail) {
      setFormData((prev) => ({
        ...prev,
        name: savedName || '',
        email: savedEmail || '',
        saveInfo: true
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        alert('You must be logged in to submit a comment.');
        return;
      }

      const response = await fetch('http://localhost:3000/api/comment/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: formData.comment,
          page: window.location.pathname || 'Unknown',
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to submit comment');
      }

      // Success: optionally store name/email
      if (formData.saveInfo) {
        localStorage.setItem('commentName', formData.name);
        localStorage.setItem('commentEmail', formData.email);
      }

      setIsSubmitted(true);
      setFormData({
        comment: '',
        name: '',
        email: '',
        saveInfo: false
      });

    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mt-12 border-t border-gray-200 pt-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Comment Submitted!</h3>
          <p className="text-gray-600">Thank you for your comment. It will be reviewed before being published.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 border-t border-gray-200 pt-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Leave a Reply</h3>
      <p className="text-sm text-gray-600 text-center mb-6">
        Your comment will be submitted for review. Required fields are marked *
      </p>

      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Comment *</label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-md h-32 resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Write your comment here..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="saveInfo"
              checked={formData.saveInfo}
              onChange={handleChange}
              className="mr-2"
            />
            <span className="text-sm text-gray-600">Save my name and email for next time I comment.</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-yellow-400 hover:bg-yellow-500 disabled:bg-yellow-300 text-black px-6 py-2 rounded-md font-medium transition-colors flex items-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
              Posting...
            </>
          ) : (
            'Post Comment'
          )}
        </button>
      </form>
    </div>
  );
}
