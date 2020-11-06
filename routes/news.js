var express = require('express');
var router = express.Router();

const Employee = require("../models/Employee");
const Company = require("../models/Company");
const withAuth = require("../helpers/middleware");
const New = require("../models/New");
const Event = require("../models/Event");
const uploadCloud = require('../config/cloudinary.js');

router.get('/news', withAuth, async (req, res, next) => {
  if(!res.locals.isUserLoggedIn){
    res.redirect('/signup')
  }
  try {
    const news = await New.find();
    const events = await Event.find();

    // var date = new Date(events.date);
    // const formatDate = date.toLocaleDateString('es-ES');
    
    
    res.render("news", {news, events });
  } catch (error) {
    console.log(error);
  }
});


router.post('/news', withAuth, uploadCloud.single("img"),  async (req, res, next) => {

  try{
    if(req.body.forms === "news"){
      const {title , description} = req.body
      const imgPath = req.file.url 
      await New.create({
        title: title,
        description: description,
        imgPath: imgPath,
    })
    res.redirect("/news");
    }

    if(req.body.forms === "events"){
      const {titleEvent , descriptionEvent, place, date, time } = req.body

      await Event.create({
            titleEvent: titleEvent,
            descriptionEvent: descriptionEvent,
            place: place,
            date: date,
            time: time,
        })
        res.redirect("/news");
    }
     
} catch (error) {
  next(error);
}
});
// editar noticias
router.get("/news/edit", withAuth,(req, res, next) => {
  New.findOne({ _id: req.query.news_id})
  .then((news) => {
    res.render('new-edit', {news});
  })
  .catch((err) =>{
    console.log(err)
  })
});
router.post("/news/edit",withAuth, uploadCloud.single("img"),(req, res, next) => {
  const { title, description, previousImg} = req.body;

  if(!req.file || req.file === '' || req.file === undefined){
     imgPath = previousImg
  }else{
     imgPath = req.file.url 
  }

  New.updateOne({ _id: req.query.news_id }, { $set: { title, description, imgPath} }, { new: true })
  .then((news)=>{
    res.redirect("/news");
  })
  .catch((error) =>{
    console.log(error);
  });
});

// Editar eventos
router.get("/news/events/edit", withAuth,(req, res, next) => {
  Event.findOne({ _id: req.query.events_id})
  .then((events) => {
    res.render('event-edit', {events});
  })
  .catch((err) =>{
    console.log(err)
  })
});

router.post("/news/events/edit",withAuth,(req, res, next) => {
  const { titleEvent, descriptionEvent, place, date, time} = req.body;

  Event.updateOne({ _id: req.query.events_id }, { $set: { titleEvent, descriptionEvent, place, date, time } }, { new: true })
  .then((events)=>{
    res.redirect("/news");
  })
  .catch((error) =>{
    console.log(error);
  });
});


   // Delete New  //
   router.post("/news/:id/delete",withAuth, (req, res, next) => {
    New.findByIdAndRemove({_id: req.params.id})
    .then((news)=>{
      res.redirect("/news");
    })
    .catch((error) =>{
      console.log(error);
    });
  });

     // Delete event  //
     router.post("/news/events/:id/delete",withAuth, (req, res, next) => {
      Event.findByIdAndRemove({_id: req.params.id})
      .then((events)=>{
        res.redirect("/news");
      })
      .catch((error) =>{
        console.log(error);
      });
    });


module.exports = router;