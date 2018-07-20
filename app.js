var express=require('express');
var bodyParser=require('body-parser');
var path=require('path');
var cors = require('cors');
var mongojs = require('mongojs');
var multer=require('multer');
var db = mongojs('expenseapp', ['users','expenses']);
var app=express();
app.use(express.static('public'))

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
var upload = multer({ storage:storage });
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());




    app.get('/',function(req,res){
        res.send('Hello World');
        });

        app.get('/api/expenses',function(req,res){
            
            db.expenses.find({userid:req.query.userid}, function(err, doc) {
                res.json(doc);
             })
            
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



     app.post('/api/expense',upload.single('file'),function(req,res,next){     
         
        

      var expenseInfo={
            userid:req.body.userid,
            merchant:req.body.merchant,
            date:req.body.date,
            total:req.body.total,
            category:req.body.category,
            comment:req.body.comment,
            file:req.file.originalname

            
       };


       db.expenses.insert(expenseInfo, function(err,result){
        res.json(result);

    });
    
   
     });

    app.listen(3200,function(){
        console.log('Server running on port 3200');
    });