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

  router.get("/audit/:id", async (req, res, next) =>{
      try{
         const deptFound = await Department.findById(req.params.id)
          .populate('manager')
          if(deptFound){
              res.render('valorate', { dept: deptFound });
          }
        }catch(error){
         (error => {
              console.log('Error while retrieving movie details: ', error);
            })
      }
    });

    router.post("/audit/:id", async (req, res, next) => {
    const {name, lastName, departmentId} = req.body;

    try{
       const newManager = await Manager.create({
            name: name,
            lastName: lastName,
            departmentId: departmentId
        })
       
        const addManager = await Department.findByIdAndUpdate(req.params.id, {$push: {manager: newManager._id}})

        res.redirect("/audit");

    } catch (error) {
      next(error);
    }
    });

module.exports = router;