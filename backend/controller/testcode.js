const exp=require("express");
const mysql=require("mysql");
const body=require("body-parser");
const bcrypt = require('bcrypt');
//const crypt=require("cryptr");
//const cryptr = new crypt('mykey');
const saltRounds = 10;
//const iv=cryptr.randomBytes(16);
var app=exp.Router();
const dbfile=require("../DB/db")
app.use(body.json());
const connection=mysql.createConnection(
    {
        host:"localhost",
        user:'root',
        password:'',
        database:'mean'
    }
)
connection.connect(function(err) {
    if(err)
    {
        console.log("Not connect ...."+err)
    }
    else
    {
        console.log("connect...")
    }
})
app.get('/createtable',(req,res)=>
{
    var q="create table simple(username varchar(50),email varchar(50))";
    connection.query(q,(err,r)=>
    {
if(err)
{
    console.log("Error..."+err)
}
else
{
    console.log("created");
    res.send("Table Created...");
}
    })
})

app.get('/insertdata',(req,res)=>
{
    var a=req.body.username;
    var b=req.body.email;
    var c=req.body.password;
 
    var sql="select * from simple where username='"+ a +"' and email='"+ b +"'";
  var q=connection.query(sql,(err,out,f)=>
   {
       if(err) throw err
       if(out.length!=0)
       {
         
       console.log("Already Taken");
        res.send("Already Taken This username Email ");
          
        } 
      else
      {
        const hash=bcrypt.hashSync(c, 10)
         //var hash=cryptr.encrypt(c);
         console.log(hash);
            var s="insert into simple (username,email,password) values('"+ a +"','"+ b +"','"+ hash +"')";
            connection.query(s,(err,r)=>
            {
                if(err) throw err;
                
                    console.log("Inserted...");
                    res.send("Inserted....");
                
        });

      }
   }) 


   
})

app.post('/login',(req,res)=>
{
    var user=req.body.email;
    var pass=req.body.password;
  var sql="select * from simple where email='"+ user +"'";
    var q=connection.query(sql,(err,out,f)=>
     {
         if(err) throw err;
        if(out.length>0)
        {
            for(let i=0;i<out.length;i++)
            {
               var pwd=out[i].password;
            //   console.log(pwd);
            }
 
        const has= bcrypt.compareSync(pass, pwd);
            if(has==true)
            {
                console.log("Welcome...");
                res.send(has)
            }
      else
      {
          console.log("invalid Password...")
          res.send("invalid Password");
      }
        }
        else
        {

            console.log("Not account");
            res.send("not account");
        }
     });


})

module.exports=app;