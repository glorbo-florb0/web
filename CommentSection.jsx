import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, MessageCircle, Send } from 'lucide-react';
import { api } from '../services/api';

export default function CommentSection({ page }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setIsLoggedIn(true);
          setUser(parsedUser);
        } catch (error) {
          console.error('Error parsing user data:', error);
          setIsLoggedIn(false);
          setUser(null);
        }
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    };

    checkAuth();
    // Load comments for this page
    loadComments();
  }, [page]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const response = await api.getCommentsByPage(page);
      setComments(response);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    if (!newComment.trim()) return;

    try {
      setSubmitting(true);
      const token = localStorage.getItem('token');
      
      const response = await api.createComment({
        content: newComment,
        page: page
      }, token);

      if (response.message) {
        setNewComment('');
        loadComments(); // Reload comments
      } else {
        alert('Error submitting comment. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error submitting comment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading comments...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-12 bg-gray-50 rounded-lg p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <MessageCircle className="mr-2" size={24} />
        Comments
      </h3>

      {/* Comment Form */}
      <div className="mb-8">
        <form onSubmit={handleSubmitComment} className="space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={isLoggedIn ? "Share your thoughts about this page..." : "Please log in to comment"}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows="4"
            disabled={!isLoggedIn || submitting}
          />
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              {isLoggedIn ? `Commenting as ${user?.username || user?.firstName || 'User'}` : 'Please log in to comment'}
            </div>
            <button
              type="submit"
              disabled={!isLoggedIn || !newComment.trim() || submitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center"
            >
              {submitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Posting...
                </>
              ) : (
                <>
                  <Send className="mr-2" size={16} />
                  Post Comment
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Comments List */}
      <div className="space-y-6">
        {comments.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No comments yet. Be the first to share your thoughts!</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.id} className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {comment.userName?.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-semibold text-gray-900">{comment.userName}</span>
                    <span className="text-sm text-gray-500">{formatDate(comment.createdAt)}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{comment.content}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 