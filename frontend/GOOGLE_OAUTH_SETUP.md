# Google OAuth Setup Instructions

## Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing (required for OAuth)

## Step 2: Enable Google+ API

1. Go to "APIs & Services" > "Library"
2. Search for "Google+ API" or "Google Identity"
3. Click on it and press "Enable"

## Step 3: Create OAuth 2.0 Credentials

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth 2.0 Client IDs"
3. Choose "Web application" as the application type
4. Set the following:
   - **Name**: AI Lawyer Consultation
   - **Authorized JavaScript origins**: 
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)
   - **Authorized redirect URIs**:
     - `http://localhost:5173` (for development)
     - `https://yourdomain.com` (for production)

## Step 4: Get Your Client ID

1. After creating the credentials, you'll get a Client ID
2. Copy the Client ID
3. Replace `YOUR_GOOGLE_CLIENT_ID_HERE` in `src/App.jsx` with your actual Client ID

## Step 5: Test the Application

1. Start your development server: `npm run dev`
2. Open `http://localhost:5173`
3. You should see a "Sign in with Google" button
4. Click it and complete the OAuth flow

## Troubleshooting

- Make sure your domain is exactly `http://localhost:5173` (not `http://localhost:3000`)
- Check that the Google+ API is enabled
- Verify your Client ID is correct
- Check browser console for any errors

## Security Notes

- Never commit your Client ID to public repositories
- Use environment variables for production
- Set up proper redirect URIs for your production domain 