const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const fs = require("fs");
const multer = require("multer");
const http = require("http");

const axios = require("axios");
const async = require("async");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);

const server = app.listen(553,function(){
    console.log("Server Started!");
});

// io.on('connection', function(socket){
//     socket.on('chat', (data)=>{
//     });
// })

app.set('views',__dirname + "/views");
app.set('view engine','ejs');
app.engine('html',require('ejs').renderFile);

app.use(express.static(__dirname +'views/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(session({
    key: "gyjkl",
    secret: "dfg",
    resave: false,
    saveUninitialized: true,
    cookie:{
        maxAge:600000
    }
}))

const router = require('./router')(app,fs,multer,axios,async);
