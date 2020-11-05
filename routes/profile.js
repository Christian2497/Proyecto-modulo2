var express = require('express');
const Employee = require("../models/Employee");
const Company = require("../models/Company");
const Department = require("../models/Department");
const withAuth = require("../helpers/middleware");

const uploadCloud = require('../config/cloudinary.js');

var router = express.Router();


router.get('/profile',withAuth, async(req, res, next)=>{
    if(!res.locals.isEmployee){
      res.redirect('/signup')
    }
      try {
          const employee = await Employee.find();
          res.render("profile", { employee });
        } catch (error) {
          console.log(error);
        }
    });



module.exports = router;