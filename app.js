var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var cors = require('cors');
var mongojs = require('mongojs');
var db = mongojs('expenseapp', ['users']);
var app=express();
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());

var users=[
    {
        id:1,
        firstname:"Pragun",
        lastname:"Pradhan",
        email:"pragse_p@live.com",
        password:"Pragun12"
    }
]


    app.get('/',function(req,res){
        res.json(users);
        });


        app.post('/api/auth',function(req,res){
            db.users.find({
                email: req.body.email,
                password:req.body.password
            }, function(err, doc) {
               res.json(doc);
            });
            
                     
         });


    app.post('/api/user',function(req,res){

        var newUser={
            firstname:req.body.firstName,
            lastname:req.body.lastName,
            email:req.body.email,
            password:req.body.password,
            type:req.body.type
       };


       db.users.insert(newUser, function(err,result){
        res.json(result);

    });
    
    //res.json(users[0]);
     });

    app.listen(3200,function(){
        console.log('Server running on port 3200');
    });