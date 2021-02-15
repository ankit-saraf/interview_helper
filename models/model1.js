const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');


const topicSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter topic name'],
        unique: true,
    },

});

const questionSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter question name'],
    },
    link: {
        type: String,
        require: [true, 'Please enter question url'],
    },
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'Topic',
    },
    
});

const myTopicSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter topic name'],
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }

});

const myQuestionSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter question name'],
    },
    link: {
        type: String,
        require: [true, 'Please enter question url'],
    },
    topic: {
        type: Schema.Types.ObjectId,
        ref: 'myTopic',
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }
    
});


const Topic = mongoose.model('Topic', topicSchema);
const Question = mongoose.model('Question', questionSchema);
const myTopic = mongoose.model('myTopic', myTopicSchema);
const myQuestion = mongoose.model('myQuestion', myQuestionSchema);

module.exports = {Topic, Question, myTopic, myQuestion};