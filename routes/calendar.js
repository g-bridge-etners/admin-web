const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../models/connection');
const moment = require('moment');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 


router.get('/', function(req, res, next) {
    
    let sql_str;
    var htmlstream='';
    
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/calendar.ejs', 'utf8');

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
    res.write('<meta charset=utf8>');

    sql_str = "select * from gb_attendance;";
    
    connection.query(sql_str, (error, results, fields) => {
        if (error) {
            res.status(1064).end(" Can not load data from DB. ");
        } else {
            console.log(results);
            res.end(ejs.render(htmlstream, {
                title: 'Eteners Admin',
                data: results
            }));
        }
    });
});

router.get('/create', function(req, res, next) {

    console.log(req.query.id)

    res.render('calendar_input.ejs', {
        id: req.query.id,
        today: req.query.today
    });

});

router.post('/create', function(req, res, next) {
   
    req.body.end_date = moment(req.body.end_date).format('YYYY-MM-DD');

    console.log(req.body);

    connection.query('INSERT INTO gb_attendance'
    +'(a_employee_number , a_title , a_description, a_start_date,a_end_date, a_start_time, a_end_time)'
    +' VALUES (?, ?, ?, ?, ?, ?, ?)',
    [req.body.id, req.body.title, req.body.content, req.body.start_date, req.body.end_date,
        req.body.start_time, req.body.end_time], (error, results, fields) => {

        if (error) {

            console.log(' Error : DB data duplicated. ')

            var sql_str = "UPDATE gb_attendance SET a_title='"+ req.body.title + "', a_description='"+ req.body.content +
            "', a_start_date='"+ req.body.start_date+"', a_end_date='"+req.body.end_date+"', a_start_time='"+req.body.start_time+
            "', a_end_time='"+req.body.end_time +
            "'where a_employee_number='"+ req.body.id + "';";
        
            connection.query(sql_str, (error, results, fields) => {
                console.log(results);
                res.redirect('/manage/list');
            });

        } else {
            console.log(' Success : DB data successly changed. ')
            console.log(results);
            res.redirect('/manage/list');
        }
    });
});

module.exports = router;