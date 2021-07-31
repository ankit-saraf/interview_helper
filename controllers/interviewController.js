const {Company, Experience}= require('../models/model2');
const users = require('../Admin/admins');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const fs = require('fs');
const path = require('path');

const company_get = (req, res) => {
  Company.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('company', { companies: result, title: 'All Companies' });
    })
    .catch(err => {
      console.log(err);
    });
}

const experience_get = async (req, res) => {
  const companyName = req.params.id;
  const companyId = await Company.find({name: companyName}).exec();
  Companies = await Company.find().sort({ createdAt: -1 });
  Experience.find({company: companyId[0]._id,approved: true})
    .then(result => {
      res.render('experience', { experiences: result, companies: Companies, title: 'Experience' });
    })
    .catch(err => {
      console.log(err);
    //   res.render('404', { title: 'Blog not found' });
    });
}


const add_experience_post = async (req, res) => {
  // console.log(req.files);
  // const name= req.body.name;
  // const branch= req.body.branch;
  // const year = req.body.year;
  // const profile = req.body.profile;
  // const experience = req.body.experience;
  // const company = req.body.company;
  const { name, branch, year, profile, experience, company } = req.body;
  const img={
    data:fs.readFileSync(path.join('/home/akkey/Desktop/NodeJs/interview_helper/public/uploads/' + req.files['img'][0].filename)),
    contentType: 'image/png'
  }
  var cimg;
  if('cimg' in req.body){
    console.log("in");
    cimg=1;
  }
  else{
    cimg={
      data:fs.readFileSync(path.join('/home/akkey/Desktop/NodeJs/interview_helper/public/uploads/' + req.files['cimg'][0].filename)),
      contentType: 'image/png'
    }
  }
  console.log(company)
  const companyX = await Company.find({name: company}).exec();
  console.log(companyX);
  try {
    if(companyX[0]){
      console.log("1111");
      const companyId = companyX[0];
      const experienceX = await Experience.create({ name: name, branch: branch,year: year, profile:profile, experience: experience, company: companyId, img: img});
      res.status(201).json({ experience: experienceX._id });
    }
    else{
      console.log("2111");
      console.log(company)
      const newcompany = await Company.create({name: company, img: cimg });
      const experienceX = await Experience.create({ name: name, branch: branch,year: year, profile:profile, experience: experience, company: newcompany, img: img });
      res.status(201).json({ experience: experienceX._id });
    }
  }

  catch (err) {
      console.log(err);
      res.status(400).json({ error :"Experience not created" });
  }
}


module.exports = {
    company_get,
    experience_get,
    add_experience_post

}