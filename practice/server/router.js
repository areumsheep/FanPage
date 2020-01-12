module.exports = function(app){
    app.get("/",function(req, res){
        //console.log(req);
        res.end("true");
    })

    app.get("/index/:title",function(req,res){
        res.render("index.html",{
            title:req.params.title
        });
    })

    app.post("/login/:userid/:pw",function(req,res){
        const userid = req.params.userid;
        const pw = req.params.pw;

        console.log(userid);
        console.log(pw);

        res.end();
    })
}
/*
        let add = {
            userid:"test";
            test:"qwer";
            qwery:{
                user:"dfgad";
            }
        }
        add.userid
        add.qwery.user
        */