var express = require('express');
var router = express.Router();
const Employee = require("../models/Employee");
const Manager = require("../models/Manager");
const Company = require("../models/Company");
const Department = require("../models/Department");
const withAuth = require("../helpers/middleware");

// Show Department  //
router.get('/audit',withAuth, async(req, res, next)=>{
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


// Edit Department  //
  router.get("/audit/edit", (req, res, next) => {
    Department.findOne({ _id: req.query.dept_id})
    .then((dept) => {
      res.render('dept-edit', {dept});
    })
    .catch((err) =>{
      console.log(err)
    })
  });

  router.post("/audit/edit", (req, res, next) => {
    const { name, description} = req.body;
    Department.updateOne({ _id: req.query.dept_id }, { $set: { name, description } }, { new: true })
    .then((dept)=>{
      res.redirect('/audit');
    })
    .catch((error) =>{
      console.log(error);
    });
  });


    // Delete Department  //
    router.post("/audit/:id/delete", (req, res, next) => {
      Department.findByIdAndRemove({_id: req.params.id})
      .then((department)=>{
        res.redirect('/audit');
      })
      .catch((error) =>{
        console.log(error);
      });
    });

// Show Department Details and create new workers  //

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
    const {name, lastName, starterDate, phone, position, email} = req.body;
    
    if(select == "manager"){
    try{
      const newManager = await Manager.create({
              name: name,
              lastName: lastName,
              email: email,
              phone: phone,
              position: position,
              starterDate: starterDate,
      }) 
      
      const addManager = await Department.findByIdAndUpdate(req.params.id, {$push: {manager: newManager._id}});
      res.redirect("/audit/" + req.params.id);
    } catch (error) {
      next(error);
    }
  }
  
    if(select == "employee"){
      try{
        const newEmployee = await Employee.create({
              name: name,
              lastName: lastName,
              email: email,
              phone: phone,
              position: position,
              starterDate: starterDate,
        }) 
        const addEmployee = await Department.findByIdAndUpdate(req.params.id, {$push: {employee: newEmployee._id}});
        res.redirect("/audit/" + req.params.id);
  
      } catch (error) {
        next(error);
      }
      } 
  });

// Show Details employees  //
  router.get("/audit/auditory/:id", async (req, res, next) => {
    try{
    const employeeFound = await Employee.findById(req.params.id)

    employeeFound.rate.sort((a,b) => {
      if(a._id < b._id){
        return 1;
      }
      if(a._id > b._id){
        return -1;
      }return 0;
    });

    if(employeeFound.rate.length >0){
      let averageRate = (employeeFound.rate[0].teamUp + employeeFound.rate[0].communication + employeeFound.rate[0].puntuality + employeeFound.rate[0].project)/4
      res.render('valorate-user', { employee: employeeFound , avgRate: averageRate});
    }
    if(employeeFound){
        res.render('valorate-user', { employee: employeeFound});
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
    let comment = {
      comments: req.body.comments
    }
    let{id} = req.params;
      const addRate = await Employee.findByIdAndUpdate(id, {$push: {rate: newRate}}, {$push: {comments: comment}});

      res.redirect("/audit/auditory/" + req.params.id)
  }catch(error){
    console.log(error);
  }
  })
 

  // Edit info employees   //
  router.get("/audit/auditory/:id/edit", (req, res, next) => {
    Employee.findOne({ _id: req.query.employee_id})
    .then((employee) => {
      res.render('employee-edit', {employee});
    })
    .catch((err) =>{
      console.log(err)
    })
  });

 
  router.post("/audit/auditory/:id/edit", (req, res, next) => {
    const { email, age, position, img } = req.body;
    Employee.updateOne({ _id: req.query.employee_id }, { $set: { email, age, position, img } }, { new: true })
    .then((employee)=>{
      res.redirect("/audit/auditory/" + req.params.id);
    })
    .catch((error) =>{
      console.log(error);
    });
  });


    // Delete Employee  //
    router.post("/audit/auditory/:id/delete", (req, res, next) => {
    Employee.findByIdAndRemove({_id: req.params.id})
    .then((employee)=>{
      res.redirect("/audit");
    })
    .catch((error) =>{
      console.log(error);
    });
  });
  


 
module.exports = router;