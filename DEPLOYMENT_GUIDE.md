# SkillNest LMS - Vercel Deployment Guide

This guide will help you deploy your SkillNest LMS project to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Your project should be on GitHub
3. **MongoDB Atlas**: Cloud database (free tier available)
4. **Cloudinary Account**: For image/video uploads
5. **Razorpay Account**: For payment processing
6. **Email Service**: For sending emails (Gmail, SendGrid, etc.)

## Step 1: Prepare Your Environment Variables

### Backend Environment Variables
Create a `.env` file in the `backend` folder with:

```env
# Database Configuration
MONGODB_URL=your_mongodb_atlas_connection_string

# JWT Configuration
JWT_SECRET=your_secure_jwt_secret_key

# Cloudinary Configuration
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name

# Email Configuration
MAIL_HOST=smtp.gmail.com
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password

# Razorpay Configuration
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret

# Server Configuration
PORT=4000
NODE_ENV=production

# Frontend URL (update after frontend deployment)
FRONTEND_URL=https://your-frontend-domain.vercel.app
```

### Frontend Environment Variables
Create a `.env` file in the `frontend` folder with:

```env
# Backend API URL (update after backend deployment)
VITE_APP_BASE_URL=https://your-backend-domain.vercel.app/api/v1
```

## Step 2: Deploy Backend to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign in
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - **Framework Preset**: Node.js
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Output Directory**: Leave empty
   - **Install Command**: `npm install`
   - **Development Command**: `npm run dev`

5. **Add Environment Variables:**
   - Go to Project Settings → Environment Variables
   - Add all the backend environment variables from Step 1

6. **Deploy**: Click "Deploy"

7. **Note the deployment URL** (e.g., `https://your-backend.vercel.app`)

## Step 3: Deploy Frontend to Vercel

1. **Create another project** in Vercel
2. **Import the same GitHub repository**
3. **Configure the project:**
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
   - **Development Command**: `npm run dev`

4. **Add Environment Variables:**
   - `VITE_APP_BASE_URL`: Your backend deployment URL + `/api/v1`

5. **Deploy**: Click "Deploy"

6. **Note the deployment URL** (e.g., `https://your-frontend.vercel.app`)

## Step 4: Update Environment Variables

After both deployments are complete:

1. **Update Backend Environment Variables:**
   - Go to your backend project settings
   - Update `FRONTEND_URL` to your frontend deployment URL

2. **Update Frontend Environment Variables:**
   - Go to your frontend project settings
   - Update `VITE_APP_BASE_URL` to your backend deployment URL + `/api/v1`

3. **Redeploy both projects** to apply the changes

## Step 5: Test Your Deployment

1. **Visit your frontend URL**
2. **Test user registration and login**
3. **Test course creation (instructor features)**
4. **Test course enrollment (student features)**
5. **Test payment integration**
6. **Test file uploads**

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure `FRONTEND_URL` is correctly set in backend environment variables
2. **API Connection Errors**: Check if `VITE_APP_BASE_URL` is correctly set in frontend
3. **Database Connection**: Verify MongoDB Atlas connection string and network access
4. **File Upload Issues**: Check Cloudinary credentials
5. **Email Issues**: Verify email service credentials

### Environment Variables Checklist:

**Backend:**
- [ ] MONGODB_URL
- [ ] JWT_SECRET
- [ ] CLOUDINARY_API_KEY
- [ ] CLOUDINARY_API_SECRET
- [ ] CLOUDINARY_CLOUD_NAME
- [ ] MAIL_HOST
- [ ] MAIL_USER
- [ ] MAIL_PASS
- [ ] RAZORPAY_KEY
- [ ] RAZORPAY_SECRET
- [ ] FRONTEND_URL

**Frontend:**
- [ ] VITE_APP_BASE_URL

## Additional Notes

- **Free Tier Limits**: Vercel has usage limits on the free tier
- **Custom Domain**: You can add custom domains in Vercel project settings
- **Environment Variables**: Keep sensitive data in environment variables, never in code
- **Monitoring**: Use Vercel's built-in monitoring and analytics

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Verify all environment variables are set correctly
3. Test API endpoints using tools like Postman
4. Check browser console for frontend errors 