let express = require('express'); // include the express module here, and store in the variable "express"
let app = express();
app.use(express.json());

let datastore = require('nedb');
let db = new datastore('data.db');
db.loadDatabase();

let messageTraker = [];

app.use("/", express.static("public"));


//POST route for message
app.post("/message", (req,res) => {
  console.log(req.body);
  let NowDate = Date();
  let obj = {
    date: NowDate,
    msg: req.body.msg
  }

  db.insert(obj,(err,nweDocs)=>{
    if(err){
      res,json({status:"failed"});
    }else{
      res.json({status: "success"});
    }
    //console.log('new info insert');
    
  })


  //messageTraker.push(obj);
  //console.log(messageTraker);
  
})

//Where can we see the app running
app.listen(3000, () => {
  console.log("app is running at localhost:3000");
})

app.get('/getmessage',(req,res)=>{

  db.find({},(err,docs)=>{
    if(err){
      res,json({status:"failed"});
    }else{
      let objq = {headerone:docs};
      res.json(objq);
    }
    //console.log(docs);
   
  
  })
  
})