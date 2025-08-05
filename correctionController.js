const Correction = require('../model/correctionModel');
const UserAccount = require('../model/userModel');

const correctionController = {
    // Create a new correction suggestion
    createCorrection: async (req, res) => {
        try {
            const { page, section, currentContent, suggestedContent, reason } = req.body;
            const userId = req.user.id;

            const user = await UserAccount.findByPk(userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }

            const correction = await Correction.create({
                page,
                section,
                currentContent,
                suggestedContent,
                reason,
                userId,
                userName: user.username
            });

            res.status(201).json({
                message: 'Correction suggestion submitted successfully',
                correction
            });
        } catch (error) {
            console.error('Error creating correction:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Admin: Get all correction suggestions
    getAllCorrections: async (req, res) => {
        try {
            const corrections = await Correction.findAll({
                order: [['createdAt', 'DESC']]
            });

            res.json(corrections);
        } catch (error) {
            console.error('Error fetching corrections:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Admin: Get corrections by status
    getCorrectionsByStatus: async (req, res) => {
        try {
            const { status } = req.params;
            
            const corrections = await Correction.findAll({
                where: { status },
                order: [['createdAt', 'DESC']]
            });

            res.json(corrections);
        } catch (error) {
            console.error('Error fetching corrections by status:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Admin: Update correction status
    updateCorrectionStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status, adminNotes } = req.body;

            const correction = await Correction.findByPk(id);
            if (!correction) {
                return res.status(404).json({ message: 'Correction not found' });
            }

            correction.status = status;
            if (adminNotes) {
                correction.adminNotes = adminNotes;
            }
            await correction.save();

            res.json({
                message: `Correction ${status} successfully`,
                correction
            });
        } catch (error) {
            console.error('Error updating correction status:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Admin: Delete correction
    deleteCorrection: async (req, res) => {
        try {
            const { id } = req.params;

            const correction = await Correction.findByPk(id);
            if (!correction) {
                return res.status(404).json({ message: 'Correction not found' });
            }

            await correction.destroy();

            res.json({ message: 'Correction deleted successfully' });
        } catch (error) {
            console.error('Error deleting correction:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = correctionController; 