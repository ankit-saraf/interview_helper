const {Topic, Question, myTopic, myQuestion}= require('../models/model1');
const users = require('../Admin/admins');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

let loggedUser = null;

const topic_get = (req, res) => {
  Topic.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('topic', { topics: result, title: 'All topics' });
    })
    .catch(err => {
      console.log(err);
    });
}

const question_get = async (req, res) => {
  const topicName = req.params.id;
  const topicId = await Topic.find({name: topicName}).exec();
  topics = await Topic.find().sort({ createdAt: -1 });
  Question.find({topic: topicId[0]._id})
    .then(result => {
      res.render('question', { questions: result, topics: topics, title: 'Questions' });
    })
    .catch(err => {
      console.log(err);
    //   res.render('404', { title: 'Blog not found' });
    });
}

const add_question_get = (req, res) => {
  Topic.find()
    .then(result=>{
      res.render('addQuestion', {topics: result, title: "Add question"});

    })
    .catch(err=>{
      console.log(err);
      //   res.render('404', { title: 'Blog not found' });
    })
  
}

const add_question_post = async (req, res) => {
  
  const { Qname, link, topicName } = req.body;
  console.log(topicName)
  const topic = await Topic.find({name: topicName}).exec();
  console.log(topic);
  try {
    if(topic[0]){
      console.log("1111");
      const topicId = topic[0];
      const question = await Question.create({ name: Qname, link: link, topic: topicId});
      res.status(201).json({ question: question._id });
    }
    else{
      console.log("2111");
      console.log(topicName)
      const newTopic = await Topic.create({name: topicName});
      const question = await Question.create({ name: Qname, link: link, topic: newTopic });
      res.status(201).json({ question: question._id });
    }
      

  }

  catch (err) {
   
      res.status(400).json({ error :"Question not created" });
  }
}

const my_topic_get = (req, res) => {
  const current_user = res.locals.user;
  loggedUser = current_user;
  myTopic.find({person: current_user._id}).sort({ createdAt: -1 })
    .then(result => {
      res.render('myTopic', { topics: result, title: 'My topics' });
    })
    .catch(err => {
      console.log(err);
    });
}
const my_question_get = async (req, res) => {
  const current_user = res.locals.user;
  loggedUser = current_user;
  const topicName = req.params.id;
  const topicId = await myTopic.find({name: topicName}).exec();
  topics = await myTopic.find({person: current_user._id}).sort({ createdAt: -1 });
  myQuestion.find({topic: topicId[0]._id, person: current_user._id})
    .then(result => {
      res.render('myQuestion', { questions: result, topics: topics, title: 'Questions' });
    })
    .catch(err => {
      console.log(err);
    //   res.render('404', { title: 'Blog not found' });
    });
}

const add_myQuestion_post = async (req, res) => {
  const current_user = loggedUser
  const { Qname, link, topicName } = req.body;
  console.log(topicName);
  console.log('Current user',current_user)
  const topic = await myTopic.find({name: topicName, person: current_user._id}).exec();
  console.log(topic);
  try {
    if(topic[0]){
      console.log("1111");
      const topicId = topic[0];
      const question = await myQuestion.create({ name: Qname, link: link, topic: topicId, person: current_user._id});
      res.status(201).json({ question: question._id });
    }
    else{
      console.log("2111");
      console.log(topicName)
      const newTopic = await myTopic.create({name: topicName, person: current_user._id});
      const question = await myQuestion.create({ name: Qname, link: link, topic: newTopic, person: current_user._id });
      res.status(201).json({ question: question._id });
    }
      

  }

  catch (err) {
   
      res.status(400).json({ error :"Question not created" });
  }
}

module.exports = {
  topic_get,
  question_get,
  add_question_get,
  add_question_post,
  my_topic_get,
  my_question_get,
  add_myQuestion_post
}