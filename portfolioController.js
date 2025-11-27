const Portfolio = require('../models/Portfolio');

// Create Portfolio
exports.createPortfolio = async (req, res) => {
  try {
    const { title, description, links, technologies, category, featured } = req.body;

    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

    const portfolio = new Portfolio({
      userId: req.userId,
      title,
      description,
      links: links ? JSON.parse(links) : [],
      technologies: technologies ? JSON.parse(technologies) : [],
      category: category || 'Other',
      featured: featured || false,
      image: req.file ? `/uploads/${req.file.filename}` : null
    });

    await portfolio.save();

    res.status(201).json({
      message: 'Portfolio created successfully',
      portfolio
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get User Portfolios
exports.getUserPortfolios = async (req, res) => {
  try {
    const portfolios = await Portfolio.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.json({
      message: 'Portfolios retrieved',
      count: portfolios.length,
      portfolios
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Single Portfolio
exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id).populate('userId', 'username profilePicture bio');

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    res.json(portfolio);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update Portfolio
exports.updatePortfolio = async (req, res) => {
  try {
    const { title, description, links, technologies, category, featured } = req.body;

    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Check ownership
    if (portfolio.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to update this portfolio' });
    }

    // Update fields
    if (title) portfolio.title = title;
    if (description) portfolio.description = description;
    if (links) portfolio.links = JSON.parse(links);
    if (technologies) portfolio.technologies = JSON.parse(technologies);
    if (category) portfolio.category = category;
    if (featured !== undefined) portfolio.featured = featured;
    if (req.file) portfolio.image = `/uploads/${req.file.filename}`;

    portfolio.updatedAt = Date.now();
    await portfolio.save();

    res.json({
      message: 'Portfolio updated successfully',
      portfolio
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete Portfolio
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({ message: 'Portfolio not found' });
    }

    // Check ownership
    if (portfolio.userId.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized to delete this portfolio' });
    }

    await Portfolio.findByIdAndDelete(req.params.id);

    res.json({ message: 'Portfolio deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Public Portfolio
exports.getPublicPortfolio = async (req, res) => {
  try {
    const { username } = req.params;

    const portfolio = await Portfolio.find()
      .populate('userId', 'username profilePicture bio socialLinks')
      .exec();

    const userPortfolios = portfolio.filter(p => {
      return p.userId.username === username;
    });

    if (userPortfolios.length === 0) {
      return res.status(404).json({ message: 'User or portfolio not found' });
    }

    // Increment view count
    await Portfolio.updateMany(
      { _id: { $in: userPortfolios.map(p => p._id) } },
      { $inc: { views: 1 } }
    );

    res.json({
      message: 'Portfolio retrieved',
      portfolios: userPortfolios
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get Featured Portfolios (for homepage)
exports.getFeaturedPortfolios = async (req, res) => {
  try {
    const featured = await Portfolio.find({ featured: true })
      .limit(6)
      .populate('userId', 'username profilePicture')
      .sort({ createdAt: -1 });

    res.json({
      count: featured.length,
      portfolios: featured
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
