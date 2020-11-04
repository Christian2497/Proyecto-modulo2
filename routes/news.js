var express = require('express');
var router = express.Router();

const Employee = require("../models/Employee");
const Company = require("../models/Company");
const withAuth = require("../helpers/middleware");
const New = require("../models/New");
const Event = require("../models/Event");
const uploadCloud = require('../config/cloudinary.js');

router.get('/news', withAuth, async (req, res, next) => {
  try {
    const news = await New.find();
    const events = await Event.find();
    res.render("news", { news, events });
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
      const {titleEvent , place, date, time, descriptionEvent} = req.body
      const imgPathEvent = req.file.url 
      
      await Event.create({
            titleEvent: titleEvent,
            place: place,
            date: date,
            time: time,
            descriptionEvent: descriptionEvent,
            imgPathEvent: imgPathEvent,
        })
        res.redirect("/news");
    }
     
} catch (error) {
  next(error);
}
});

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


module.exports = router;