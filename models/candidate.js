const mongoose = require('mongoose');
const config = require('../config/database');

// candidate schema
const CandidateSchema = mongoose.Schema({
    name: {
        type: String
    },
    position: {
        type: String
    },
    status: {
        type: String
    }
});

const Candidate = module.exports = mongoose.model('Candidate', CandidateSchema);

// function to use outside
module.exports.getCandidateById = function(id, callback) {
    Candidate.findById(id, callback);
}

module.exports.getUserByName = function(name, callback) {
    const query = {name: name}
    Candidate.findOne(query, callback);
}