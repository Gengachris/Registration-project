# Student Authentication System

Full-stack authentication application using Node.js, Express, MongoDB, and JWT.

## Features

- User Registration with detailed information (name, residence, phone, level, sex)
- User Login with JWT authentication
- Password hashing with bcrypt
- Protected routes
- User profile display

## Technologies Used

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- HTML5
- CSS3
- Vanilla JavaScript
- Fetch API

## Project Structure

```
registration/
├── backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection
│   ├── controllers/
│   │   └── authController.js  # Authentication logic
│   ├── middleware/
│   │   └── auth.js            # JWT verification middleware
│   ├── models/
│   │   └── User.js            # User model schema
│   └── routes/
│       └── authRoutes.js      # API routes
├── public/
│   ├── about.html             # User profile page
│   ├── about.js               # Profile page logic
│   ├── login.html             # Login page
│   ├── login.js               # Login logic
│   ├── reg.html               # Registration page
│   ├── reg.js                 # Registration logic
│   └── styles.css             # Styling
├── .env                       # Environment variables
├── .gitignore                 # Git ignore file
├── package.json               # Dependencies
└── server.js                  # Entry point
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB installed and running locally OR MongoDB Atlas account

### Installation

1. **Install MongoDB** (if not already installed)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   - The `.env` file is already created with default values
   - Update `MONGODB_URI` if using a different MongoDB connection
   - Change `JWT_SECRET` to a secure random string for production

4. **Start MongoDB** (if using local installation)
   ```bash
   # Windows
   net start MongoDB
   
   # Or manually
   mongod
   ```

5. **Run the application**
   ```bash
   # Production mode
   npm start
   
   # Development mode (with auto-reload)
   npm run dev
   ```

6. **Access the application**
   - Open your browser and go to: `http://localhost:5000`
   - You'll see the login page
   - Click "Create One" to register a new account

## API Endpoints

### Authentication Routes

#### Register User
- **POST** `/api/auth/register`
- **Body:**
  ```json
  {
    "fullName": "John Doe",
    "residence": "New York",
    "phone": "+1234567890",
    "level": "Bachelor",
    "sex": "Male",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Login User
- **POST** `/api/auth/login`
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

#### Get Current User
- **GET** `/api/auth/me`
- **Headers:** `Authorization: Bearer <token>`

## Usage Flow

1. **Registration**
   - Navigate to the registration page
   - Fill in all required fields
   - Submit the form
   - You'll be redirected to the profile page

2. **Login**
   - Navigate to the login page
   - Enter your email and password
   - Submit the form
   - You'll be redirected to the profile page

3. **View Profile**
   - After login/registration, you'll see your profile information
   - Click "Logout" to end your session

## Database Schema

### User Model
```javascript
{
  fullName: String (required),
  residence: String (required),
  phone: String (required),
  level: String (enum: ['High School', 'Diploma', 'Bachelor', 'Masters', 'PhD']),
  sex: String (enum: ['Male', 'Female']),
  email: String (required, unique),
  password: String (required, hashed),
  createdAt: Date (default: now)
}
```

## Security Features

- Passwords are hashed using bcrypt before storage
- JWT tokens for stateless authentication
- Protected routes require valid authentication
- Environment variables for sensitive data
- CORS enabled for secure cross-origin requests

## Viewing Data in MongoDB

### Using MongoDB Compass (GUI)
1. Download MongoDB Compass: https://www.mongodb.com/products/compass
2. Connect to: `mongodb://localhost:27017`
3. Select database: `studentauthdb`
4. Browse the `users` collection

### Using MongoDB Shell
```bash
# Connect to MongoDB
mongosh

# Switch to database
use studentauthdb

# View all users
db.users.find().pretty()

# Count users
db.users.countDocuments()

# Find specific user
db.users.findOne({ email: "john@example.com" })
```

## Troubleshooting

### MongoDB Connection Error
- Make sure MongoDB is running
- Check if the connection string in `.env` is correct
- For local MongoDB, ensure it's running on port 27017

### Port Already in Use
- Change the PORT in `.env` file
- Or stop the process using port 5000

### CORS Issues
- Make sure the frontend and backend URLs match
- CORS is already enabled in the server

## Development Notes

- The backend automatically creates the database and collections
- Passwords are never stored in plain text
- JWT tokens expire after 7 days (configurable in `.env`)
- All API responses follow a consistent format with `success` and `data/message` fields

## License

ISC
