var express = require('express');
var router = express.Router();
const Employee = require("../models/Employee");
const Manager = require("../models/Manager");
const Company = require("../models/Company");
const Department = require("../models/Department");
const withAuth = require("../helpers/middleware");


router.get('/audit', async(req, res, next)=>{
    try {
        const dept = await Department.find();
        res.render("audit", { dept });
      } catch (error) {
        console.log(error);
      }
  });

  router.post("/audit", async (req, res, next) => {
    const {name, description} = req.body;
    // if (req.body.name === "" || req.body.description === "") {
    //     res.render("audit", {
    //       errorMessage: "Indicate a name and a description",
    //     });
    //     return;
    //   }
    try{
        await Department.create({
            name: name,
            description: description
        })
        res.redirect("audit");
    } catch (error) {
      next(error);
    }
  });

  router.get("/audit/:id", (req, res, next) =>{
        Department.findById(req.params.id)
          .then(dept => {
            res.render('valorate', { dept: dept });
          })
          .catch(error => {
            console.log('Error while retrieving movie details: ', error);
          })
    });


module.exports = router;