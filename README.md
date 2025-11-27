# Portfolio Hosting Backend

Node.js/Express backend for the portfolio hosting web application.

## Setup Instructions

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Create a \`.env\` file based on \`.env.example\`:
   \`\`\`bash
   cp .env.example .env
   \`\`\`

3. Update \`.env\` with your configuration:
   - MongoDB connection string
   - JWT secret key
   - Gmail credentials for email sending

4. Make sure MongoDB is running on your system

5. Start the server:
   \`\`\`bash
   npm run dev
   \`\`\`

The server will run on \`http://localhost:5000\`

## API Endpoints

### Authentication
- POST /api/auth/signup
- POST /api/auth/login
- POST /api/auth/forgot-password
- POST /api/auth/reset-password
- GET /api/auth/profile (requires token)
- PUT /api/auth/profile (requires token)
- POST /api/auth/profile-picture (requires token)

### Portfolio
- POST /api/portfolio (requires token)
- GET /api/portfolio/user (requires token)
- GET /api/portfolio/featured
- GET /api/portfolio/:id
- PUT /api/portfolio/:id (requires token)
- DELETE /api/portfolio/:id (requires token)
- GET /api/portfolio/public/:username

### Contact
- POST /api/contact
- GET /api/contact
- PUT /api/contact/:id/read
- DELETE /api/contact/:id

## Environment Variables

See \`.env.example\` for all required environment variables.
