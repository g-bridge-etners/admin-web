const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const router = express.Router();
const connection = require('../models/connection')

const GetMainUI = (req, res) => {   // 메인화면을 출력합니다
     let htmlstream = '';
     htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs', 'utf8');    // 헤더부분
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/nav.ejs', 'utf8');
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/report.ejs', 'utf8');
     htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs', 'utf8');  // Footer

     res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
     res.write('<meta charset=utf8>');

     sql_str = "select * from gb_user as u left join gb_temp as t on t.c_employee_number = u.u_employee_number  ;";
     connection.query(sql_str, (error, results, fields) => {
         if (error) {
             res.status(562).end("fail");
         } else {
             console.log(results);
             res.end(ejs.render(htmlstream, {
                 title: 'Eteners Admin',
                 data: results
             }));
         }
     });
};

router.get('/', GetMainUI);

module.exports = router
