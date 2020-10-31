var express = require('express');
var router = express.Router();

const Employee = require("../models/Employee");
const Manager = require("../models/Manager");
const Company = require("../models/Company");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const withAuth = require("../helpers/middleware");

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
      res.redirect("/login");
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


router.post("/login", async (req, res, next) => {
  const {select} = req.body;
  // si alguna de estas variables no tiene un valor, renderizamos la vista de auth/signup con un mensaje de error
  if (req.body.email === "" || req.body.password === "") {
    res.render("users/login", {
      errorMessage: "Please enter both, username and password to sign up.",
    });
    return;
  }
  // desestructuramos el email y el password de req.body
  const { email, password } = req.body;

  if(select == "company"){
  try {
    // revisamos si el usuario existe en BD
    const user = await Company.findOne({ email });
    // si el usuario no existe, renderizamos la vista de auth/login con un mensaje de error
    if (!user) {
      res.render("users/login", {
        errorMessage: "The email doesn't exist",
      });
      return;
    } else if (bcrypt.compareSync(password, user.password)) {
      // generamos el token
      const userWithoutPass = await Company.findOne({ email }).select("-password");
      const payload = { userWithoutPass };
      // creamos el token usando el método sign, el string de secret session y el expiring time
      const token = jwt.sign(payload, process.env.SECRET_SESSION, {
        expiresIn: "1h"
      });
      // enviamos en la respuesta una cookie con el token y luego redirigimos a la home
      res.cookie("token", token, { httpOnly: true });
      res.status(200).redirect("/");
    } else {
      // en caso contrario, renderizamos la vista de auth/login con un mensaje de error
      res.render("users/login", {
        errorMessage: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

if(select == "manager"){
  try {
    // revisamos si el usuario existe en BD
    const user = await Manager.findOne({ email });
    // si el usuario no existe, renderizamos la vista de auth/login con un mensaje de error
    if (!user) {
      res.render("users/login", {
        errorMessage: "The email doesn't exist",
      });
      return;
    } else if (bcrypt.compareSync(password, user.password)) {
      // generamos el token
      const userWithoutPass = await Manager.findOne({ email }).select("-password");
      const payload = { userWithoutPass };
      // creamos el token usando el método sign, el string de secret session y el expiring time
      const token = jwt.sign(payload, process.env.SECRET_SESSION, {
        expiresIn: "1h"
      });
      // enviamos en la respuesta una cookie con el token y luego redirigimos a la home
      res.cookie("token", token, { httpOnly: true });
      res.status(200).redirect("/");
    } else {
      // en caso contrario, renderizamos la vista de auth/login con un mensaje de error
      res.render("users/login", {
        errorMessage: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}

if(select == "employee"){
  try {
    // revisamos si el usuario existe en BD
    const user = await Employee.findOne({ email });
    // si el usuario no existe, renderizamos la vista de auth/login con un mensaje de error
    if (!user) {
      res.render("users/login", {
        errorMessage: "The email doesn't exist",
      });
      return;
    } else if (bcrypt.compareSync(password, user.password)) {
      // generamos el token
      const userWithoutPass = await Employee.findOne({ email }).select("-password");
      const payload = { userWithoutPass };
      // creamos el token usando el método sign, el string de secret session y el expiring time
      const token = jwt.sign(payload, process.env.SECRET_SESSION, {
        expiresIn: "1h"
      });
      // enviamos en la respuesta una cookie con el token y luego redirigimos a la home
      res.cookie("token", token, { httpOnly: true });
      res.status(200).redirect("/");
    } else {
      // en caso contrario, renderizamos la vista de auth/login con un mensaje de error
      res.render("users/login", {
        errorMessage: "Incorrect password",
      });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
}
    if(select === ""){
      res.render("users/login", {
        errorMessage: "Select one option!",
    });
    return;
    }
});

router.get("/logout", withAuth, (req, res, next) => {
  // seteamos el token con un valor vacío y una fecha de expiración en el pasado (Jan 1st 1970 00:00:00 GMT)
  res.cookie("token", "", { expires: new Date(0) });
  res.redirect("/");
});


module.exports = router;
