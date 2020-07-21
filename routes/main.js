const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const router = express.Router();
const connection = require('../models/connection')
const moment = require('moment');
const { RateLimiter } = require('limiter');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 

const GetMainUI = (req, res) => {  
     let htmlstream = '';
     htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs', 'utf8');   
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/nav.ejs', 'utf8');
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/report.ejs', 'utf8');
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs', 'utf8');  

     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
     res.write('<meta charset=utf8>');

     var sql_str = "select * from gb_user as u left join gb_commute as t on t.c_employee_number = u.u_employee_number  ;";
     connection.query(sql_str , (error, results, fields) => {
         if (error) {
             res.status(1064).end(" Can not insert data to DB. ");
         } else {

            for(var i=0; i < results.length; i++){
         
            console.log( moment(results[i].c_date).format("YYYY년 MM월 DD일") );  

            results[i].c_date = moment(results[i].c_date).format('YYYY년 MM월 DD일');

            var now = moment();

            var since_hour = moment.duration(now.diff(results[i].c_clock_in)).hours();
            
            var rate = new Array();

            rate[i] = (since_hour / 9) * 100;
            if (rate[i] > 100){
                rate[i] = 100;
            }
    
            rate[i] = Math.round(rate[i]);
            console.log(rate[i]);

            results[i].rate = rate[i];
            results[i].c_clock_in = moment(results[i].c_clock_in).format('LTS');
            results[i].c_clock_out = moment(results[i].c_clock_out).format('LTS');

             }
             res.end(ejs.render(htmlstream, {
                 title: 'Eteners Admin',
                 data: results
             }));
         
        }
     });
};

router.get('/', GetMainUI);

module.exports = router
