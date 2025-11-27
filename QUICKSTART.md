# Quick Start Guide - PortfolioHub

## 🎯 5-Minute Setup

### Step 1: Prerequisites
Make sure you have:
- ✅ Node.js installed (v14+)
- ✅ MongoDB running (local or cloud)
- ✅ A code editor (VS Code recommended)

### Step 2: Run Setup Script

**On Windows:**
```bash
setup.bat
```

**On Mac/Linux:**
```bash
bash setup.sh
```

This will:
- Install all dependencies
- Create `.env` files
- Set up both frontend and backend

### Step 3: Configure Backend

Edit `backend/.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio-hosting
JWT_SECRET=your-secret-key-here
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
```

**For Gmail:**
1. Enable 2-Factor Authentication
2. Generate an App Password
3. Use the App Password in GMAIL_PASS

### Step 4: Start Backend

```bash
cd backend
npm run dev
```

✅ Server running at `http://localhost:5000`

### Step 5: Start Frontend

In a new terminal:
```bash
cd frontend
npm start
```

✅ App running at `http://localhost:3000`

## 🧪 Test the Application

1. Go to http://localhost:3000
2. Click "Sign Up"
3. Create account with:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `password123`
4. Go to Dashboard
5. Click "Create New" portfolio
6. Add a project
7. View your public portfolio

## 🔗 Important URLs

| Page | URL |
|------|-----|
| Home | http://localhost:3000 |
| Sign Up | http://localhost:3000/signup |
| Login | http://localhost:3000/login |
| Dashboard | http://localhost:3000/dashboard |
| Contact | http://localhost:3000/contact |
| About | http://localhost:3000/about |
| Public Portfolio | http://localhost:3000/portfolio/:username |
| API Health | http://localhost:5000/api/health |

## 📱 Features to Try

- ✅ Sign up and create account
- ✅ Update profile and add social links
- ✅ Create portfolio projects
- ✅ Upload images for projects
- ✅ Add technologies and links
- ✅ Mark as featured
- ✅ View public portfolio
- ✅ Toggle dark/light mode
- ✅ Send contact message

## 🐛 Troubleshooting

### Port 5000/3000 already in use
```bash
# Kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### MongoDB connection error
- Check if MongoDB is running: `mongod`
- Or use MongoDB Atlas cloud database

### Dependencies not installing
```bash
# Clear cache
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Email not sending
- Check Gmail credentials in `.env`
- Ensure 2FA is enabled
- Verify app password is used

## 📚 Useful Commands

```bash
# Backend
npm run dev          # Start with nodemon
npm start           # Start server
npm test            # Run tests (if added)

# Frontend
npm start           # Start dev server
npm run build       # Build for production
npm test            # Run tests
npm eject           # Advanced: eject from create-react-app
```

## 🚀 Deployment

### Frontend (Vercel/Netlify)
1. Run `npm run build`
2. Connect repo to Vercel/Netlify
3. Set `REACT_APP_API_URL` environment variable

### Backend (Heroku/Railway)
1. Set environment variables on platform
2. Push to Git
3. Platform auto-deploys

## 📞 Need Help?

1. Check the detailed README.md
2. Review backend/README.md
3. Review frontend/README.md
4. Check browser console for errors
5. Check backend logs for errors

## ✨ Next Steps

- [ ] Customize colors in `frontend/src/styles/global.css`
- [ ] Add more features (comments, ratings, etc.)
- [ ] Deploy to production
- [ ] Set up custom domain
- [ ] Enable SSL/HTTPS
- [ ] Set up CDN for images
- [ ] Add analytics

---

**Happy Building! 🎉**
