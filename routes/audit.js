var express = require('express');
const Employee = require("../models/Employee");
const Company = require("../models/Company");
const Department = require("../models/Department");
const withAuth = require("../helpers/middleware");

const uploadCloud = require('../config/cloudinary.js');

var router = express.Router();
// Show Department  //
router.get('/audit',withAuth, async(req, res, next)=>{
    try {
        const dept = await Department.find();
        res.render("audit", { dept });
      } catch (error) {
        console.log(error);
      }
  });

  router.post("/audit",withAuth, async (req, res, next) => {
    const {name, description} = req.body;
    // if (req.body.name === "") {
    //   res.render("audit" , {
    //     errorMessage: "Introduce a department name",
    //   });
    //   return;
    // }

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
  router.get("/audit/edit", withAuth,(req, res, next) => {
    Department.findOne({ _id: req.query.dept_id})
    .then((dept) => {
      res.render('dept-edit', {dept});
    })
    .catch((err) =>{
      console.log(err)
    })
  });

  router.post("/audit/edit", withAuth,(req, res, next) => {
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
    router.post("/audit/:id/delete", withAuth,(req, res, next) => {
      Department.findByIdAndRemove({_id: req.params.id})
      .then((department)=>{
        res.redirect('/audit');
      })
      .catch((error) =>{
        console.log(error);
      });
    });

// Show employees and create new employees  //
  router.get("/audit/:id", withAuth,async (req, res, next) =>{
      try{
         const deptFound = await Department.findById(req.params.id)
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

    router.post("/audit/:id",withAuth, async (req, res, next) => {
      try{
        const {name, lastName, starterDate, phone, position, email} = req.body;
        const user = await Employee.findOne({ email: email });
       
        if (user !== null) {
          const deptFound = await Department.findById(req.params.id)
          .populate('employee')
          res.render(`department-details`, {dept: deptFound, errorMessage: "The email already exists!"});
        }
      
        const newEmployee = await Employee.create({
              name: name,
              lastName: lastName,
              email: email,
              phone: phone,
              position: position,
              starterDate: starterDate,
              department: req.params.id
        }) 
        const addEmployee = await Department.findByIdAndUpdate(req.params.id, {$push: {employee: newEmployee._id}});
        res.redirect("/audit/" + req.params.id);
  
      } catch (error) {
        next(error);
      }
  });

// Show Details employees  //
  router.get("/audit/auditory/:id", withAuth,async (req, res, next) => {
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
    var date = new Date(employeeFound.starterDate);
    const formatDate = date.toLocaleDateString('es-ES');
    
    if(employeeFound.rate.length > 0){
      let arrayVacia = [];

    const rateTeamManagement = employeeFound.rate.map(data=>{
      arrayVacia.push(data.teamManagement)
      arrayVacia.push(data.communication)
      arrayVacia.push(data.puntuality)
      arrayVacia.push(data.project)
      arrayVacia.push(data.performance)
    })
    let totalRate = arrayVacia.reduce((acc, crr)=> acc + crr)

      let averageRate = (employeeFound.rate[0].teamManagement + employeeFound.rate[0].communication + employeeFound.rate[0].puntuality + employeeFound.rate[0].project + employeeFound.rate[0].performance)/5

      res.render('valorate-user', {formatDate, employee: employeeFound , avgRate: averageRate, totalRate:Math.round(totalRate/arrayVacia.length)});
    }

    if(employeeFound){
        res.render('valorate-user', {formatDate, employee: employeeFound} );
    }

    }catch(error) {
      next(error);
    }
  });

  router.post("/audit/auditory/:id", withAuth,async (req, res, next) => {
    try{
    let newRate = {
      teamManagement: req.body.teamManagement,
      communication: req.body.communication,
      puntuality: req.body.puntuality,
      project: req.body.project,
      performance: req.body.performance
    }
    let comment = {
      comments: req.body.comments
    }
    let{id} = req.params;
      const addRate = await Employee.findByIdAndUpdate(id, {$push: {rate: newRate, comments: comment}});

      res.redirect("/audit/auditory/" + req.params.id)
  }catch(error){
    console.log(error);
  }
  })
 

  // Edit info employees   //
  router.get("/audit/auditory/:id/edit",withAuth, (req, res, next) => {
    Employee.findOne({ _id: req.query.employee_id})
    .then((employee) => {
      res.render('employee-edit', {employee});
    })
    .catch((err) =>{
      console.log(err)
    })
  });

 
  router.post("/audit/auditory/:id/edit",withAuth, uploadCloud.single("img"),(req, res, next) => {
    const { email, phone, position , previousImg} = req.body;
  
    if(!req.file || req.file === '' || req.file === undefined){
       imgPath = previousImg
    }else{
       imgPath = req.file.url 
    }

    Employee.updateOne({ _id: req.query.employee_id }, { $set: { email, phone, position, imgPath} }, { new: true })
    .then((employee)=>{
      res.redirect("/audit/auditory/" + req.params.id);
    })
    .catch((error) =>{
      console.log(error);
    });
  });

    // Delete Employee  //
    router.post("/audit/auditory/:id/delete",withAuth, (req, res, next) => {
    Employee.findByIdAndRemove({_id: req.params.id})
    .then((employee)=>{
      res.redirect("/audit/" + employee.department);
    })
    .catch((error) =>{
      console.log(error);
    });
  });

module.exports = router;