// npm
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('morgan');

// Import routers
const authRouter = require('./controllers/auth');
const testJwtRouter = require('./controllers/test-jwt');
const usersRouter = require('./controllers/users');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

const postRouter = require('./controllers/posts')
const commentRouter = require('./controllers/comments')

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger('dev'));

app.use(cors({origin: 'http://127.0.0.1:5173'}))

// Routes
app.use('/auth', authRouter);
app.use('/test-jwt', testJwtRouter);
app.use('/posts', postRouter)
app.use('/comments', commentRouter)

// if you want to verify whole controllers
// import verifytoken above
// then just set it up as a middleware function like below
// app.use(verifyToken)
app.use('/users', usersRouter);

// Start the server and listen on port 3000
app.listen(3000, () => {
  console.log('The express app is ready!');
});
