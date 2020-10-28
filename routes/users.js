var express = require('express');
var router = express.Router();

const Employee = require("../models/Employee");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
/* GET users listing. */
router.get('/signup', function(req, res, next) {
  res.render('users/signup');
});


router.post("/signup", async (req, res, next) => {
  if (req.body.name === "" || req.body.email === "" || req.body.password === "") {
    res.render("users/signup", {
      errorMessage: "Indicate a username and a password to sign up",
    });
    return;
  }
const { name, email, password } = req.body;

const salt = bcrypt.genSaltSync(10);
const hashPass = bcrypt.hashSync(password, salt);


try {
 // if( req.body.select === "employee")
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
    email: email,
    password: hashPass,
  });
  res.redirect("/");
} catch (error) {
  next(error);
}
});

router.get('/login', function(req, res, next) {
  res.render('users/login');
});



module.exports = router;
