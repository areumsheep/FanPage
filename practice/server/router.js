module.exports = function(app, fs,multer,axios,async){

    const upload = multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, __dirname);
            },
            filename: (req, file, cb) => {
                cb(null, file.fieldname);
            }
        })
    })

    app.get("/",function(req, res){
        //console.log(req);
        res.end("true");
    })

    app.get("/chat",(req,res)=>{
        res.render("chat.html");
    })

    app.get("/index/:title",function(req,res){
        res.render("index.html",{
            title:req.params.title
        });
    })

//     app.post("/login/:userid/:pw",function(req,res){
//         const userid = req.params.userid;
//         const pw = req.params.pw;

//         console.log(userid);
//         console.log(pw);

//         res.end();
//     })
// 

    app.post("/login",function(req,res){
        const userid = req.body.userid;
        const pw = req.body.pw;

    //file load
        fs.readFile(__dirname + "/userinfo.json",{encoding: "UTF-8"},function(err,data){
            if(req.session != undefined && req.session.login != undefined){
                res.end("Already logined");
            }
            else{
                const jdata = JSON.parse(data);
                console.log(jdata);
                if(jdata.userid == userid){
                    
                    req.session.login = {
                        userid,
                        pw
                    }
                    console.log(req.session);
                    console.log("true");
                    res.end("TRUE");
                }
                else{
                    console.log("no");
                    res.end("END");
                }
            }
        })
    })

    app.post("/logout", (req,res)=>{
        req.session.destroy(function(){
            req.session;
        })
        console.log(req.session);
        res.end();
    })
    
    app.post("/upload",upload.any(),(req,res)=>{
        console.log(req.files);
    })

    app.get("/async", (req,res)=>{
        async.waterfall([
            function(callback){
                axios.get("https://www.naver.com")
                .then(function(res){
                    callback(null, res);
                })
                .catch(function(e){
                    console.error(e);
                })
            }
        ], function(err,result){
            if(err){
                console.log(err);
            } else{
                // console.log
                res.end(result);
            }
        })
    })
}