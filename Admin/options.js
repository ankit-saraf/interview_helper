const User = require('../models/user');
const {Topic, Question, myTopic, myQuestion} = require('../models/model1');
const {Company, Experience}= require('../models/model2');

const AdminBroOptions = {
    resources: [User, Topic, Question, myTopic, myQuestion, Company, Experience],
}

module.exports= AdminBroOptions;