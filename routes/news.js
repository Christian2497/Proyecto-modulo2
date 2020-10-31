var express = require('express');
var router = express.Router();

const Employee = require("../models/Employee");
const Manager = require("../models/Manager");
const Company = require("../models/Company");
const withAuth = require("../helpers/middleware");

router.get('/news', withAuth, function(req, res, next) {
    res.render('news');
  });


module.exports = router;