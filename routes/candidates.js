const express = require('express');
const router = express.Router();
const candidate = require('../models/candidate');
const config = require('../config/database');

router.get('/candidates', (req, res, next) => {
    //res.send('Candidate API');
    candidate.find( (err, candidate) => {
        if(err) {
            res.send(err);
        }
        res.json(candidate);
    });

});

router.get('/candidates/:_id', (req, res, next) => {
    let id = req.params._id;
    candidate.findById(id, (err, candidate) => {
        if(err) {
            res.send(err);
        }
        res.json(candidate);
    });
});

module.exports = router;
