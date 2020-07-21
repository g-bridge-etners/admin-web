const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const router = express.Router();
const connection = require('../models/connection')
const moment = require('moment');
const { RateLimiter } = require('limiter');
require('moment-timezone'); 
moment.tz.setDefault("Asia/Seoul"); 


const hoursPrint = (req, res) => {
    let htmlstream = '';
    let sql_str;

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/nav.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/weekhours.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs', 'utf8');

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
    res.write('<meta charset=utf8>');

    sql_str = "select * from gb_user as u left join gb_commute as c on c.c_employee_number = u.u_employee_number"
    +" where c.c_date BETWEEN DATE_ADD(NOW(),INTERVAL -5 DAY ) AND NOW();";

    connection.query(sql_str, (error, results, fields) => {
        if (error) {
            res.status(1064).end(" Can no load data from DB. ");
        } else {

            for(var i=0; i < results.length; i++){

                var t1= results[i].c_clock_in;
                var t2= results[i].c_clock_out;
               
                console.log(t1);
                console.log(t2);

                var hour = new Array();
                hour[i]=moment.duration(moment(t2).diff(moment(t1))).hours();
                
                console.log(hour[i]);

                var weekhour = new Array();
                weekhour += hour[i];

                console.log(weekhour);

                results[i].weekhour = weekhour;
                
                console.log(results[i].weekhour);
            }

            res.end(ejs.render(htmlstream, {
                title: 'Eteners Admin',
                data: results
            }));
        }
    });

};

router.get('/list', hoursPrint);

module.exports = router;
