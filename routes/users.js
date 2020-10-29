var express = require('express');
var router = express.Router();

const Employee = require("../models/Employee");
const Manager = require("../models/Manager");
const Company = require("../models/Company");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('users/signup');
});


router.post("/signup", async (req, res, next) => {
const {select} = req.body;

if(select == "employee"){
try {
const { name, lastName, email, password} = req.body;

const salt = bcrypt.genSaltSync(10);
const hashPass = bcrypt.hashSync(password, salt);

 //if( req.body.select === "employee")
  const user = await Employee.findOne({ email: email });
  // si existiera en la base de datos, renderizamos la vista de auth/signup con un mensaje de error
  if (user !== null) {
    res.render("users/signup", {
      errorMessage: "The email already exists!",
    });
    return;
  }

  await Employee.create({
    name: name,
    lastName: lastName,
    email: email,
    password: hashPass,
  });
  res.redirect("/");
} catch (error) {
  next(error);
}
}

if(select == "manager"){
  try {
  const { name, lastName, email, password} = req.body;
  
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);
  
   //if( req.body.select === "employee")
    const user = await Manager.findOne({ email: email });
    // si existiera en la base de datos, renderizamos la vista de auth/signup con un mensaje de error
    if (user !== null) {
      res.render("users/signup", {
        errorMessage: "The email already exists!",
      });
      return;
    }
  
    await Manager.create({
      name: name,
      lastName: lastName,
      email: email,
      password: hashPass,
    });
    res.redirect("/");
  } catch (error) {
    next(error);
  }
  }

  if(select == "company"){
    try {
    const { name, email, password} = req.body;
    
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password, salt);
    
     //if( req.body.select === "employee")
      const user = await Company.findOne({ email: email });
      // si existiera en la base de datos, renderizamos la vista de auth/signup con un mensaje de error
      if (user !== null) {
        res.render("users/signup", {
          errorMessage: "The email already exists!",
        });
        return;
      }
    
    
      await Company.create({
        name: name,
        email: email,
        password: hashPass,
      });
      res.redirect("/");
    } catch (error) {
      next(error);
    }
    }

    if(select === ""){
      res.render("users/signup", {
        errorMessage: "Select one option!",
    });
    return;
    }
});






router.get('/login', function(req, res, next) {
  res.render('users/login');
});



module.exports = router;
