# Profile History Setup Guide

This guide will help you set up the profile history feature for LegalMind with MongoDB Atlas.

## Backend Setup

### 1. Install Dependencies

Navigate to the backend folder and install the new dependencies:

```bash
cd backend
npm install mongoose nodemon
```

### 2. MongoDB Atlas Configuration

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster or use an existing one
3. **No need to manually create database or collection** - they will be created automatically when the first consultation is saved
4. Get your connection string from the cluster

### 3. Update Database Connection

Edit `backend/db.js` and replace the placeholder connection string with your actual MongoDB Atlas connection string:

```javascript
const MONGODB_URI = 'mongodb+srv://your-username:your-password@your-cluster.mongodb.net/legalmind?retryWrites=true&w=majority';
```

Or set it as an environment variable:

```bash
export MONGODB_URI="your-mongodb-connection-string"
```

### 4. Test Database Connection

Run the test script to verify everything is working:

```bash
npm run test-db
```

This will:
- Connect to MongoDB Atlas
- Create the `legalmind` database automatically
- Create the `consultationhistories` collection automatically
- Save a test consultation
- Verify the data was saved correctly
- Clean up the test data

### 5. Start the Profile History Server

Run the profile history server on port 5001:

```bash
npm run profile
```

Or for development with auto-restart:

```bash
npm run dev:profile
```

## Frontend Setup

The frontend components are already created and integrated. The profile history feature will be accessible through the user profile menu.

## API Endpoints

The profile history server provides the following endpoints:

- `POST /api/profile/save-consultation` - Save a new consultation
- `GET /api/profile/history/:userId` - Get consultation history for a user
- `DELETE /api/profile/history/:consultationId` - Delete a specific consultation
- `DELETE /api/profile/history/clear/:userId` - Clear all history for a user

## Integration with Main Application

To integrate the consultation saving with your main application, you'll need to:

1. Modify your consultation form to save consultations to the history
2. Update the main backend to call the profile history API when consultations are completed

## Testing

1. **Test Database Connection:**
   ```bash
   npm run test-db
   ```

2. **Start both servers:**
   - Main server: `npm start` (port 5000)
   - Profile server: `npm run profile` (port 5001)

3. **Test the health endpoint:**
   ```bash
   curl http://localhost:5001/health
   ```

4. **Test saving a consultation:**
   ```bash
   curl -X POST http://localhost:5001/api/profile/save-consultation \
     -H "Content-Type: application/json" \
     -d '{
       "userId": "test@example.com",
       "userEmail": "test@example.com",
       "userName": "Test User",
       "question": "What are my rights as a tenant?",
       "specialization": "Real Estate",
       "jurisdiction": "California",
       "language": "English",
       "response": {
         "message": "As a tenant in California...",
         "legalReferences": ["CA Civil Code § 1940"],
         "recommendations": ["Document all communications"],
         "disclaimers": ["This is not legal advice"],
         "followUp": ["Have you received a notice?"]
       }
     }'
   ```

## Automatic Database Creation

✅ **Database**: `legalmind` - Created automatically on first connection  
✅ **Collection**: `consultationhistories` - Created automatically when first document is saved  
✅ **Indexes**: User ID index created automatically for efficient queries  
✅ **Schema Validation**: Mongoose schema ensures data consistency  

## Security Notes

- The current implementation uses email as userId for simplicity
- In production, consider using a more secure user identification system
- Add authentication middleware to protect the API endpoints
- Use environment variables for sensitive configuration

## Troubleshooting

1. **Connection Error**: Make sure your MongoDB Atlas connection string is correct and the IP address is whitelisted
2. **Port Already in Use**: Change the port in `profileServer.js` if 5001 is already in use
3. **CORS Issues**: The server is configured to allow all origins for development. Configure CORS properly for production
4. **Database Not Created**: Run `npm run test-db` to verify the connection and automatic creation 