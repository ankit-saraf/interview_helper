const jwt = require('jsonwebtoken');
const User = require('../models/user');
const admins = require('../Admin/admins');
const { useResource } = require('admin-bro');
const users = require('../Admin/admins');

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'akkey secret', (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();
      }
    });
  } else {
    res.redirect('/login');
  }
};

const adminCheck = (req, res, next) => {
  const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'akkey secret', async (err, decodedToken) => {
        if (err) {
          res.redirect('/login');
          
        } else {
          let user = await User.findById(decodedToken.id);
        if (users.includes(user.email)){
          next();
        }
        else{
          res.send("Please login with admin account");
        }
        }
      });
    } else {
      res.redirect('/login');
    }
}
// check current user
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
      jwt.verify(token, 'akkey secret', async (err, decodedToken) => {
        if (err) {
          res.locals.user = null;
          next();
        } else {
          let user = await User.findById(decodedToken.id);
          res.locals.user = user;
          next();
        }
      });
    } else {
      res.locals.user = null;
      next();
    }
  };
  
  
  module.exports = { requireAuth, checkUser, adminCheck};