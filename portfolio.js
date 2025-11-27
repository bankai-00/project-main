const express = require('express');
const router = express.Router();
const portfolioController = require('../controllers/portfolioController');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');

// Configure multer for portfolio images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `portfolio-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ storage, limits: { fileSize: 10000000 } });

// Portfolio routes
router.post('/', auth, upload.single('image'), portfolioController.createPortfolio);
router.get('/user', auth, portfolioController.getUserPortfolios);
router.get('/featured', portfolioController.getFeaturedPortfolios);
router.get('/:id', portfolioController.getPortfolioById);
router.put('/:id', auth, upload.single('image'), portfolioController.updatePortfolio);
router.delete('/:id', auth, portfolioController.deletePortfolio);
router.get('/public/:username', portfolioController.getPublicPortfolio);

module.exports = router;
