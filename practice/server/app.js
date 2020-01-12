const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
const server = app.listen(80,function(){
    console.log("Server Started!");
});

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

const router = require('./router')(app);
