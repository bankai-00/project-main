# PortfolioHub - Modern Portfolio Hosting Platform

A comprehensive, modern portfolio-hosting web application where users can sign up, create profiles, upload their portfolio projects, and share them publicly.

## 🌟 Features

### Core Features
- **User Authentication**: Secure signup, login, and password reset
- **Portfolio Management**: Create, edit, delete, and manage portfolio projects
- **Public Sharing**: Share portfolios with a unique public link
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Contact Form**: Users can contact the site creator

### User Features
- User dashboard with portfolio management
- Profile settings (username, bio, social links)
- Project uploads with images, descriptions, and links
- Technology tagging for projects
- Featured projects on homepage
- View tracking for portfolios

### Admin Features
- Contact message management
- Featured portfolio management

## 📁 Project Structure

```
portfolio-hosting/
├── backend/                 # Node.js/Express API
│   ├── config/             # Database configuration
│   ├── models/             # MongoDB schemas
│   ├── routes/             # API routes
│   ├── controllers/        # Route handlers
│   ├── middleware/         # Auth middleware
│   ├── utils/              # Helper functions
│   ├── uploads/            # File storage
│   ├── server.js           # Main server file
│   ├── package.json        # Dependencies
│   └── README.md           # Backend docs
│
└── frontend/               # React application
    ├── public/             # Static files
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/          # Page components
    │   ├── context/        # Context providers
    │   ├── utils/          # Helper functions
    │   ├── styles/         # Global styles
    │   ├── App.js          # Main component
    │   └── index.js        # Entry point
    ├── package.json        # Dependencies
    └── README.md           # Frontend docs
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update `.env` with your configuration:
   ```
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/portfolio-hosting
   JWT_SECRET=your_secret_key_here
   GMAIL_USER=your_email@gmail.com
   GMAIL_PASS=your_app_password
   ```

5. Start the server:
   ```bash
   npm run dev
   ```

The API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

## 📖 API Documentation

### Authentication Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/profile` - Get user profile (requires token)
- `PUT /api/auth/profile` - Update user profile (requires token)
- `POST /api/auth/profile-picture` - Update profile picture (requires token)

### Portfolio Endpoints
- `POST /api/portfolio` - Create portfolio (requires token)
- `GET /api/portfolio/user` - Get user's portfolios (requires token)
- `GET /api/portfolio/featured` - Get featured portfolios
- `GET /api/portfolio/:id` - Get portfolio details
- `PUT /api/portfolio/:id` - Update portfolio (requires token)
- `DELETE /api/portfolio/:id` - Delete portfolio (requires token)
- `GET /api/portfolio/public/:username` - Get user's public portfolios

### Contact Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contacts
- `PUT /api/contact/:id/read` - Mark contact as read
- `DELETE /api/contact/:id` - Delete contact

## 🎨 Design Features

- **Modern UI**: Clean, contemporary design with smooth animations
- **Responsive Layout**: Mobile-first approach with perfect responsiveness
- **Color Scheme**: 
  - Primary: Indigo (#6366f1)
  - Secondary: Pink (#ec4899)
  - Supports light and dark modes
- **Typography**: System fonts for fast loading and consistency
- **Animations**: Smooth transitions and hover effects throughout

## 🔐 Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Protected API routes
- CORS configuration
- Input validation and sanitization
- Secure file uploads

## 📦 Technologies Used

### Backend
- **Node.js & Express**: Server framework
- **MongoDB & Mongoose**: Database
- **JWT**: Authentication
- **Bcryptjs**: Password hashing
- **Multer**: File uploads
- **Nodemailer**: Email sending
- **Dotenv**: Environment variables

### Frontend
- **React 18**: UI library
- **React Router**: Client-side routing
- **Axios**: HTTP client
- **CSS3**: Styling with CSS variables
- **Context API**: State management

## 🌐 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio-hosting
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_app_password
NODE_ENV=development
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📱 Supported Browsers

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🚢 Deployment

### Frontend Deployment (Vercel/Netlify)
```bash
npm run build
```

### Backend Deployment (Heroku/Railway)
1. Set environment variables in hosting platform
2. Push code to repository
3. Connect and deploy

## 📝 Page Features

### Home Page
- Hero section with call-to-action
- Feature showcase
- Featured portfolios carousel
- Clear navigation

### Login/Signup Pages
- Form validation
- Password confirmation
- Error handling
- Links to forgot password and sign up/login

### Dashboard
- Portfolio management table
- Create, edit, delete portfolios
- Profile settings management
- Public portfolio link
- Tab navigation

### Portfolio Form
- Rich form with validation
- Image upload
- Technology tagging
- Project links management
- Featured toggle

### Public Portfolio
- User profile display
- Social links
- Portfolio grid
- Project details
- View counter

### Contact Page
- Contact form
- Contact information display
- Email integration

### About Page
- Platform information
- Creator details
- Feature showcase

## 🔄 Workflow

1. User visits home page
2. User creates account or logs in
3. User uploads portfolio projects
4. User customizes profile
5. User can mark projects as featured
6. User shares public portfolio link
7. Public can view and interact with portfolio

## 🐛 Common Issues & Solutions

### MongoDB Connection Error
- Ensure MongoDB is running locally or use cloud MongoDB
- Check `MONGODB_URI` in `.env`

### Email Not Sending
- Enable "Less secure app access" in Gmail (if using Gmail)
- Use app-specific password
- Check `GMAIL_USER` and `GMAIL_PASS` in `.env`

### Port Already in Use
- Change port in `.env` file
- Or kill process: `lsof -ti:5000 | xargs kill -9` (Mac/Linux)

### CORS Errors
- Ensure frontend and backend URLs match
- Check proxy setting in frontend `package.json`

## 📞 Support

For issues or questions:
1. Check existing issues in the repository
2. Create a new issue with detailed description
3. Contact via the contact form on the website

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

Built with modern web technologies and best practices in mind. Special thanks to the open-source community.

---

**Happy Portfolioing! 🚀**

## Manual Upload to GitHub (Quick)

If you prefer to upload the site to GitHub manually (no CLI), follow these steps:

1. Open https://github.com and sign in to your account.
2. Click **New repository**.
3. Enter a repository name (for example `PortfolioHub-demo`) and set it to **Public**.
4. Do NOT initialize with a README (you already have files). Create the repo.
5. On the repository page, click **Add file** → **Upload files**.
6. Drag-and-drop the following files and folders from your workspace root into the upload area:
   - `index.html`
   - `portfolio.html`
   - `.gitignore`
   - `README.md`
   - `DEPLOY_INSTRUCTIONS.md`
   - any other files you want to include (e.g., `index_backup.html`).
7. Commit the changes at the bottom of the page.
8. Enable GitHub Pages: Go to **Settings** → **Pages** → Under "Build and deployment" choose **Deploy from a branch**, select the `main` branch and `/ (root)` folder, then Save.
9. Visit `https://<your-username>.github.io/<repo-name>/` after a minute to see the site.

If you want me to generate the exact commands for Git (or to try using `gh` here), tell me your preferred approach and I will prepare the commands for you.
