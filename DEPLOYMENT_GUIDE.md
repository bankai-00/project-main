# Deployment Guide - PortfolioHub

## 🚀 Deploying to Production

This guide will help you deploy PortfolioHub to a production environment.

## Prerequisites

- GitHub account (for version control)
- Vercel or Netlify account (for frontend)
- Railway, Render, or Heroku account (for backend)
- MongoDB Atlas account (cloud database)
- Gmail account with app password (for emails)

---

## Part 1: Prepare for Deployment

### 1.1 Create GitHub Repository

```bash
cd portfolio-hosting
git init
git add .
git commit -m "Initial commit - PortfolioHub"
git branch -M main
git remote add origin https://github.com/yourusername/portfolio-hosting.git
git push -u origin main
```

### 1.2 Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster
4. Get connection string
5. Note: `mongodb+srv://username:password@cluster.mongodb.net/portfolio-hosting`

### 1.3 Prepare Environment Variables

**For Backend (.env):**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio-hosting
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRE=7d
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-app-password
NODE_ENV=production
FRONTEND_URL=https://your-frontend-domain.com
```

**For Frontend (.env):**
```
REACT_APP_API_URL=https://your-backend-domain.com/api
```

---

## Part 2: Deploy Backend

### Option A: Deploy to Railway (Recommended)

1. **Sign up at [Railway.app](https://railway.app)**

2. **Connect GitHub:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize and select your repo

3. **Configure:**
   - Choose `backend` directory as root
   - Add environment variables
   - Set start command: `npm run dev` or `npm start`

4. **Deploy:**
   - Railway automatically deploys
   - Get your backend URL (e.g., `https://portfolio-backend-prod.railway.app`)

### Option B: Deploy to Render

1. **Sign up at [Render.com](https://render.com)**

2. **Create Web Service:**
   - Connect GitHub repo
   - Set root directory to `backend`
   - Set build command: `npm install`
   - Set start command: `npm start`

3. **Add Environment Variables:**
   - Go to "Environment" tab
   - Add all backend .env variables

4. **Deploy:**
   - Render auto-deploys on push
   - Get your service URL

### Option C: Deploy to Heroku (Paid)

```bash
# Install Heroku CLI
heroku login
heroku create portfolio-hosting-api

# Set environment variables
heroku config:set -a portfolio-hosting-api MONGODB_URI="your_mongo_uri"
heroku config:set -a portfolio-hosting-api JWT_SECRET="your_secret"
# ... set other variables

# Deploy
git push heroku main
```

---

## Part 3: Deploy Frontend

### Option A: Deploy to Vercel (Recommended)

1. **Sign up at [Vercel.com](https://vercel.com)**

2. **Import Project:**
   - Click "New Project"
   - Import GitHub repo
   - Select `frontend` as root directory

3. **Configure:**
   ```
   Build Command: npm run build
   Output Directory: build
   ```

4. **Environment Variables:**
   - Add `REACT_APP_API_URL=https://your-backend-url/api`

5. **Deploy:**
   - Vercel auto-deploys on push
   - Get your frontend URL (e.g., `https://portfolio-hub.vercel.app`)

### Option B: Deploy to Netlify

1. **Sign up at [Netlify.com](https://netlify.com)**

2. **Connect Repository:**
   - Click "Add new site"
   - Import Git repository
   - Authorize GitHub

3. **Build Settings:**
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `build`

4. **Environment Variables:**
   - Set `REACT_APP_API_URL`

5. **Deploy:**
   - Netlify auto-deploys
   - Get your site URL

---

## Part 4: Connect Frontend and Backend

### Update Backend URL

1. Update `frontend/.env`:
```
REACT_APP_API_URL=https://your-backend-url.com/api
```

2. Update `backend/.env`:
```
FRONTEND_URL=https://your-frontend-url.com
```

3. Push changes:
```bash
git add .
git commit -m "Update production URLs"
git push origin main
```

4. Both will auto-redeploy

---

## Part 5: Configure CORS

Update backend `server.js` if needed:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
```

---

## Part 6: Set Up Custom Domain

### Vercel Frontend

1. Go to project settings
2. Click "Domains"
3. Add your domain
4. Follow DNS instructions

### Railway/Render Backend

1. Get your platform URL
2. Add custom domain in project settings
3. Update DNS records

---

## Part 7: SSL Certificate

Both Vercel and Railway/Render provide free SSL certificates automatically.

---

## Part 8: Monitor Your Deployment

### Vercel Dashboard
- View deployment logs
- Monitor performance
- See analytics

### Railway/Render Dashboard
- View logs in real-time
- Monitor resource usage
- Restart if needed

---

## Part 9: Post-Deployment Checklist

- [ ] Test signup/login
- [ ] Test portfolio creation
- [ ] Test file upload
- [ ] Test contact form
- [ ] Test email notifications
- [ ] Test theme toggle
- [ ] Test responsive design
- [ ] Check console for errors
- [ ] Verify API calls work
- [ ] Test on mobile device

---

## Troubleshooting

### Issue: CORS Errors
```
Solution: Check FRONTEND_URL in backend .env
Ensure it matches exactly with frontend domain
```

### Issue: 404 on API Calls
```
Solution: Verify REACT_APP_API_URL is correct
Check backend is running and accessible
```

### Issue: Database Connection Error
```
Solution: Verify MongoDB connection string
Check IP whitelist in MongoDB Atlas
Test connection locally first
```

### Issue: Email Not Sending
```
Solution: Verify Gmail credentials
Check Gmail app password (not regular password)
Ensure 2FA is enabled on Gmail
```

### Issue: File Upload Fails
```
Solution: Check file size (max 10MB)
Verify uploads directory exists
Check file permissions
```

---

## Environment Variables Reference

### Backend
| Variable | Example | Notes |
|----------|---------|-------|
| PORT | 5000 | Can be any port |
| MONGODB_URI | mongodb+srv://... | MongoDB connection |
| JWT_SECRET | your-super-secret | Change to random string |
| JWT_EXPIRE | 7d | Token expiration |
| GMAIL_USER | email@gmail.com | Must be Gmail |
| GMAIL_PASS | app-password | Use app password |
| NODE_ENV | production | Set to production |
| FRONTEND_URL | https://example.com | Your frontend URL |

### Frontend
| Variable | Example | Notes |
|----------|---------|-------|
| REACT_APP_API_URL | https://api.example.com/api | Your backend URL |

---

## Performance Optimization

### Frontend
```javascript
// Enable code splitting
import React, { Suspense, lazy } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Add Suspense fallback
<Suspense fallback={<LoadingSpinner />}>
  <Outlet />
</Suspense>
```

### Backend
```javascript
// Add compression
const compression = require('compression');
app.use(compression());

// Add rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});
app.use(limiter);
```

---

## Monitoring & Logging

### Set up error tracking (Optional)
```bash
npm install sentry-sdk
```

### Monitor API performance
- Use backend logs
- Check response times
- Monitor database queries

---

## Backup Strategy

### MongoDB
- Use MongoDB Atlas automated backups
- Configure backup retention

### File Storage
- Consider moving uploads to S3/Cloudinary
- Implement backup frequency

---

## Security Checklist

- [x] Use HTTPS (automatic with Vercel/Railway)
- [x] Set strong JWT_SECRET
- [x] Use app-specific Gmail password
- [x] Enable CORS correctly
- [x] Validate all inputs
- [x] Use environment variables
- [x] Don't commit .env file
- [x] Set appropriate CORS origins
- [x] Use secure database connection
- [x] Monitor for suspicious activity

---

## Scaling Considerations

### Database
- MongoDB Atlas auto-scales
- Monitor connection pool

### Backend
- Railway/Render auto-scales with plan
- Monitor resource usage
- Consider caching

### Frontend
- Vercel/Netlify have global CDN
- Performance is optimized automatically

---

## Maintenance

### Regular Tasks
- Monitor logs for errors
- Check database usage
- Review security logs
- Update dependencies (npm audit)
- Test critical flows

### Scheduled Backups
- Enable MongoDB backup
- Archive user data
- Test restore procedures

---

## Cost Estimation

| Service | Free Tier | Paid Tier |
|---------|-----------|-----------|
| Railway | ✓ (Limited) | $5+/month |
| Vercel | ✓ (Full) | Variable |
| Netlify | ✓ (Full) | Variable |
| MongoDB Atlas | ✓ (512MB) | Variable |
| Gmail | ✓ | N/A |

---

## Final Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] Backend deployed
- [ ] Frontend deployed
- [ ] Environment variables set
- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Email working
- [ ] Database connected
- [ ] File uploads working
- [ ] All features tested
- [ ] Monitoring enabled
- [ ] Backup enabled

---

## Support

- Railway Support: [railway.app/docs](https://railway.app/docs)
- Vercel Support: [vercel.com/docs](https://vercel.com/docs)
- MongoDB Support: [docs.mongodb.com](https://docs.mongodb.com)

---

**Deployment Complete! 🎉**

Your PortfolioHub is now live and accessible to the world.

Remember to:
- Monitor your application
- Update dependencies regularly
- Implement security updates
- Back up your data
- Scale as needed

**Happy Hosting!** 🚀
