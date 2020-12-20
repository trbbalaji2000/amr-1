/*const exp=require("express");
const mysql=require("mysql");
const app=exp.Router();

app.get('/',function(req,res)
{
//console.log("I am My Sql Server")
res.send("I am My Sql Server");

})


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

module.exports=app;*/