const Comment = require('../model/commentModel');
const UserAccount = require('../model/userModel');

const commentController = {
    // Create a new comment
    createComment: async (req, res) => {
        try {
            const { content, page } = req.body;
            const userId = req.user.id;

            const user = await UserAccount.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const comment = await Comment.create({
                content,
                page,
                userId,
                userName: user.username,
                userImage: user.image
            });

            res.status(201).json({
                message: 'Comment submitted successfully',
                comment
            });
        } catch (error) {
            console.error('Error creating comment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Get comments for a specific page
    getCommentsByPage: async (req, res) => {
        try {
            const { page } = req.params;
            
            const comments = await Comment.findAll({
                where: { 
                    page,
                    isApproved: true 
                },
                order: [['createdAt', 'DESC']]
            });

            res.json(comments);
        } catch (error) {
            console.error('Error fetching comments:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Admin: Get all pending comments
    getPendingComments: async (req, res) => {
        try {
            const comments = await Comment.findAll({
                where: { isApproved: false },
                order: [['createdAt', 'DESC']]
            });

            res.json(comments);
        } catch (error) {
            console.error('Error fetching pending comments:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Admin: Approve/reject comment
    updateCommentStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { isApproved } = req.body;

            const comment = await Comment.findByPk(id);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            comment.isApproved = isApproved;
            await comment.save();

            res.json({
                message: `Comment ${isApproved ? 'approved' : 'rejected'} successfully`,
                comment
            });
        } catch (error) {
            console.error('Error updating comment status:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Admin: Delete comment
    deleteComment: async (req, res) => {
        try {
            const { id } = req.params;

            const comment = await Comment.findByPk(id);
            if (!comment) {
                return res.status(404).json({ message: 'Comment not found' });
            }

            await comment.destroy();

            res.json({ message: 'Comment deleted successfully' });
        } catch (error) {
            console.error('Error deleting comment:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = commentController; 