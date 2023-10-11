const express = require('express');
const ejs = require('ejs');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const { User } = require('./models/user')
const mainRouter = require('./routes/main');
const signRouter = require('./routes/user')
const { userController } = require('./controllers/usercontroller');


const app = express();

// // Replace with your actual Flutterwave API credentials
// const FLUTTERWAVE_PUBLIC_KEY = 'YOUR_FLUTTERWAVE_PUBLIC_KEY';
// const FLUTTERWAVE_SECRET_KEY = 'YOUR_FLUTTERWAVE_SECRET_KEY';

// Connect to MongoDB
// mongoose.connect('mongodb+srv://Adeoluwa123:09014078564Feranmi@cluster0.r8sg61r.mongodb.net/?retryWrites=true&w=majority', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

//middlewares
app.set("view engine", "ejs");


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/css')));
app.use(bodyParser.urlencoded ({ extended: false} ));

app.use(
  session({
    secret: 'myappsecret',
    resave: false,
    saveUninitialized: true,
  })
 );



//routes
app.use('/', mainRouter);
app.use('/about', mainRouter);
app.use('/contact', mainRouter);
app.use('/orphanage', mainRouter);
app.use('/donate', mainRouter);
app.use('/thank', mainRouter);

app.use('/user', signRouter);


// for dashboard username display
app.get('/user/getUsername', async (req, res) => {
  if (req.session.userId) {
    const user = await User.findOne({ _id: req.session.userId });
    if (user) {
      res.json({ username: user.username });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } else {
    res.status(401).json({ error: 'User not logged in' });
  }
});



//start the server 
const PORT = 4040
app.listen (PORT, 
  console.log(`You are being heard on port ${PORT}`));


















