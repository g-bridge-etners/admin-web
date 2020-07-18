const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const ejs = require('ejs');
const app = express();
const mainui = require('./routes/main');
const manageRouter = require('./routes/manage')
const calendarRouter = require('./routes/calendar');

app.set('views', path.join(__dirname, 'views'));  
app.set('view engine', 'ejs');                    
app.use(express.static(path.join(__dirname, 'public')));   
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());


app.use('/', mainui);
app.use('/manage', manageRouter);
app.use('/calendar', calendarRouter);

const PORT = 80;

app.listen(PORT, function () {
       console.log('server is listening on port' + PORT);
});
