const express = require('express');
const dontenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB= require('./server/database/connection');

const app = express();

dontenv.config({path: 'config.env'})
const PORT = process.env.PORT || 8080

//log request
app.use(morgan('tiny'));

// mangodb connection
connectDB();

//parse request to bodyparser
app.use(bodyParser.urlencoded({extended:true}))

//set view engine
app.set("view engine", "ejs");
//app.set("views",path.resolve(__dirname, 'views/ejs'))

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
//app.use('/uploads', express.static('uploads'));
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))


 //load router
 app.use('/',require('./server/routes/router'))

app.listen(PORT, ()=> {
    console.log('server is running on http://localhost:' + PORT)
}); 