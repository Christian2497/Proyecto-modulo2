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
          .populate('employee')
          if(deptFound){
              res.render('department-details', { dept: deptFound });
          }
        }catch(error){
         (error => {
              console.log('Error while retrieving movie details: ', error);
            })
      }
    });

    router.post("/audit/:id", async (req, res, next) => {
    const {select} = req.body;
    const {name, lastName} = req.body;
    
    if(select == "manager"){
    try{
      
      const newManager = await Manager.create({
            name: name,
            lastName: lastName,
      }) 
      const addManager = await Department.findByIdAndUpdate(req.params.id, {$push: {manager: newManager._id}});
      res.redirect("audit/" + req.params.id);

    } catch (error) {
      next(error);
    }
  }
  

    if(select == "employee"){
      try{
        
        const newEmployee = await Employee.create({
              name: name,
              lastName: lastName,
        }) 
        const addEmployee = await Department.findByIdAndUpdate(req.params.id, {$push: {employee: newEmployee._id}});
        res.redirect("/audit/" + req.params.id);
  
      } catch (error) {
        next(error);
      }
      } 
  });

  router.get("/audit/auditory/:id", async (req, res, next) => {
    try{
    const employeeFound = await Employee.findById(req.params.id)
          if(employeeFound){
              res.render('valorate-user', { employee: employeeFound });
          }
        }catch(error) {
          next(error);
        }
  });

  router.post("/audit/auditory/:id", async (req, res, next) => {
    try{
    let newRate = {
      teamUp: req.body.teamUp,
      communication: req.body.communication,
      puntuality: req.body.puntuality,
      project: req.body.project
    }
    let{id} = req.params;
      const addRate= await Employee.findByIdAndUpdate(id, {$push: {rate: newRate}});
      res.redirect("/audit/auditory/" + req.params.id)
  }catch(error){
    console.log(error);
  }
  })
  
module.exports = router;