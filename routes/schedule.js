const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const router = express.Router();
const connection = require('../models/connection')
const moment = require('moment');
const { RateLimiter } = require('limiter');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 


const schedulePrint = (req, res) => {
    let htmlstream = '';
    let sql_str;

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/nav.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/schedule.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs', 'utf8');
    
    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
    res.write('<meta charset=utf8>');

    sql_str = "select * from gb_attendance where a_employee_number='"+ req.query.id +"';";

    connection.query(sql_str, (error, results, fields) => {
        if (error) {
            res.status(1064).end(" Can not insert data to DB. ");
        } else {
            console.log(results);
            for(var i=0; i < results.length; i++){

            results[i].a_start_date = moment(results[i].a_start_date).format('YYYY년 MM월 DD일');
            results[i].a_end_date = moment(results[i].a_end_date).format('YYYY년 MM월 DD일');
            }
            res.end(ejs.render(htmlstream, {
                title: 'Eteners Admin',
                data: results
            }));
        }
    });

};

router.get('/', schedulePrint);

module.exports = router;
