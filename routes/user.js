const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/user')
const { handleRegister, handleLogin, handleLogout, handleDashboard } = require('../controllers/usercontroller')




router.get('/register', (req, res) => {
    res.render('register')
});

router.post('/register', handleRegister)



// //login

router.get('/login', (req, res) => {
    res.render('login');
  });
  
  router.post('/login', handleLogin ) 

  
  //login
  
  //logout

  router.get('/logout', (req, res) => {
    res.render('login');
  });
  
  router.post('/logout', handleLogout )


// Dashboard

  router.get('/dashboard', handleDashboard);
  






module.exports = router;