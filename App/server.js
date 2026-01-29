let express = require('express');
let path = require('path');
let MongoClient = require('mongodb').MongoClient;
let bodyParser = require('body-parser');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
let cors = require('cors');
let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Enable CORS
app.use(cors());

// Serve static files
app.use(express.static('public'));

// use when starting application locally
let mongoUrlLocal = "mongodb://admin:password@localhost:27017/?authSource=admin";

// use when starting application as docker container
let mongoUrlDocker = "mongodb://admin:password@mongo:27017/?authSource=admin";

// Auto-detect environment: use 'mongo' hostname if in Docker, otherwise 'localhost'
let mongoUrl = process.env.NODE_ENV === 'production' ? mongoUrlDocker : mongoUrlLocal;

// pass these options to mongo client connect request
let mongoClientOptions = {
  serverSelectionTimeoutMS: 5000,
  connectTimeoutMS: 10000
};

// database name
let databaseName = "studentauthdb";

// JWT secret
let jwtSecret = "your_jwt_secret_key_here_change_in_production";

// Root route - serve login page
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, "public/login.html"));
});

// Register route
app.post('/api/auth/register', async function (req, res) {
  console.log('Register request received:', req.body);
  let userObj = req.body;

  let client;

  try {
    // Connect to MongoDB
    client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    // console.log('Connected to MongoDB for registration');

    let db = client.db(databaseName);

    // Check if user already exists
    let existingUser = await db.collection("users").findOne({ email: userObj.email });

    if (existingUser) {
      client.close();
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    // Hash password
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(userObj.password, salt);

    userObj.password = hash;
    userObj.createdAt = new Date();

    // Insert user
    let result = await db.collection("users").insertOne(userObj);

    // Generate token
    let token = jwt.sign({ id: result.insertedId }, jwtSecret, { expiresIn: '7d' });

    client.close();
    console.log('User registered successfully!');

    res.status(201).json({
      success: true,
      data: {
        _id: result.insertedId,
        fullName: userObj.fullName,
        residence: userObj.residence,
        phone: userObj.phone,
        level: userObj.level,
        sex: userObj.sex,
        email: userObj.email,
        token: token
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    if (client) client.close();
    res.status(500).json({
      success: false,
      message: 'Registration failed: ' + error.message
    });
  }
});

// Login route
app.post('/api/auth/login', async function (req, res) {
  console.log('Login request received:', req.body);
  let loginData = req.body;

  let client;

  try {
    // Connect to MongoDB
    client = await MongoClient.connect(mongoUrl, mongoClientOptions);
    // console.log('Connected to MongoDB for login');

    let db = client.db(databaseName);

    // Find user
    let user = await db.collection("users").findOne({ email: loginData.email });

    if (!user) {
      client.close();
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Compare password
    let isMatch = await bcrypt.compare(loginData.password, user.password);

    if (!isMatch) {
      client.close();
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    let token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '7d' });

    client.close();
    console.log('User logged in successfully!');

    res.json({
      success: true,
      data: {
        _id: user._id,
        fullName: user.fullName,
        residence: user.residence,
        phone: user.phone,
        level: user.level,
        sex: user.sex,
        email: user.email,
        token: token
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    if (client) client.close();
    res.status(500).json({
      success: false,
      message: 'Login failed: ' + error.message
    });
  }
});

app.listen(5000, function () {
  console.log("app listening on port 5000!");
});
