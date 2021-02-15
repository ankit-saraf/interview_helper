const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const companySchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter topic name'],
        unique: true,
    },
    img: { 
        data: Buffer, 
        contentType: String 
    }
});

const experienceSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please enter your name'],
    },
    img: { 
        data: Buffer, 
        contentType: String 
    },
    branch: {
        type: String,
        require: [true, 'Please enter your branch'],
    },
    year: {
        type: String,
        require: [true, 'Please enter year of internship'],
    },
    experience: {
        type: String,
        require: [true, 'Please enter experience'],
    },
    profile: {
        type: String,
        require: [true, 'Please enter profile'],
    },
    company: {
        type: Schema.Types.ObjectId,
        ref: 'Company',
    },
    approved: {
        type: Boolean,
        default: false
    }
});


const Company = mongoose.model('Company', companySchema);
const Experience = mongoose.model('Experience', experienceSchema);

module.exports = {Company, Experience};