#!/bin/bash

# PortfolioHub Setup Script

echo "🚀 PortfolioHub Setup Started"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo "✅ Node.js version: $(node -v)"
echo "✅ npm version: $(npm -v)"
echo ""

# Backend Setup
echo "📦 Setting up Backend..."
cd backend

if [ ! -f .env ]; then
    echo "Creating .env file..."
    cp .env.example .env
    echo "⚠️  Please update backend/.env with your configuration"
fi

echo "Installing backend dependencies..."
npm install

echo ""
echo "✅ Backend setup complete!"
echo ""

# Frontend Setup
echo "📦 Setting up Frontend..."
cd ../frontend

if [ ! -f .env ]; then
    echo "Creating .env file (optional)..."
    echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
fi

echo "Installing frontend dependencies..."
npm install

echo ""
echo "✅ Frontend setup complete!"
echo ""

# Summary
echo "═══════════════════════════════════════════"
echo "✅ Setup Complete!"
echo "═══════════════════════════════════════════"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
echo "📚 Documentation: See README.md in backend/ and frontend/ folders"
echo ""
