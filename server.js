// Node.JS 내외부 모듈추출
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const  ejs = require('ejs');
const app = express();

const adminRouter = require('./routes/admin')

const PORT = 80;

// 실행환경 설정부분
app.set('views', path.join(__dirname, 'views'));  // views경로 설정
app.set('view engine', 'ejs');                    // view엔진 지정
app.use(express.static(path.join(__dirname, 'public')));   // public설정
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


//admin router
app.use('/', adminRouter);

// 서버를 실행합니다.
app.listen(PORT, function () {
       console.log('서버실행: http://localhost:' + PORT);
});
