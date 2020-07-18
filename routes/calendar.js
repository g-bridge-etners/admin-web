const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../models/connection');



router.get('/', function(req, res, next) {
    res.render('calendar.ejs');
});


router.get('/create', function(req, res, next) {
    console.log(req.query.today);
    res.render('calendar_input.ejs', {
        id: req.query.id,
        today: req.query.today
    });
});

router.post('/create', function(req, res, next) {
    // insert into db
});

module.exports = router;