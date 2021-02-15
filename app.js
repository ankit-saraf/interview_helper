const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const topicRoutes = require('./routes/topicRoutes');
const interviewRoutes = require('./routes/interviewRoutes');
const buildRouter = require('./Admin/adminRoutes');
const app = express();
const cookieParser = require("cookie-parser")
const { requireAuth, checkUser, adminCheck } = require('./middleware/authMiddleware');
const  uploadConfig  = require('./middleware/uploadConfig');
const AdminBro = require('admin-bro')
const AdminBroMongoose = require('@admin-bro/mongoose')
const AdminBroOptions = require('./Admin/options');

// middleware
AdminBro.registerAdapter(AdminBroMongoose)
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(uploadConfig);

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://akkey:test123@cluster0.ba99p.mongodb.net/node-auth?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => {
    
    app.listen(3000);
  }
  
  )
  .catch((err) => console.log(err));

// routes

app.get('*', checkUser);
const adminBro = new AdminBro(AdminBroOptions);
const router = buildRouter(adminBro);
app.get('/admin',adminCheck);
app.use(adminBro.options.rootPath, router);
app.get('/', (req, res) => res.render('home'));
app.use(authRoutes);
app.use(interviewRoutes);
app.use(topicRoutes);
