const router = require('express').Router();
const lostController = require('../controllers/lostController');
const upload = require('../middleware/multerConfig');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/add', verifyToken, upload.single('image'), lostController.createLost);
router.get('/', lostController.getAllLost);
router.patch('/status/:lost_id', verifyToken, lostController.updateStatus); // allowed for admin or owner; check role in controller if needed

module.exports = router;
