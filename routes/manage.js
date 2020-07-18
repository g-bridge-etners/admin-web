const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const router = express.Router();
const mysql = require('mysql');
const connection = require('../models/connection');

const ManagePrint = (req, res) => {
    let htmlstream = '';
    let sql_str;

    htmlstream = fs.readFileSync(__dirname + '/../views/header.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/nav.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/manage.ejs', 'utf8');
    htmlstream = htmlstream + fs.readFileSync(__dirname + '/../views/footer.ejs', 'utf8');

    res.writeHead(200, { 'Content-Type': 'text/html; charset=utf8' });
    res.write('<meta charset=utf8>');

    sql_str = "select u_employee_number, u_name from gb_user;";
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

router.get('/list', ManagePrint);

module.exports = router;
