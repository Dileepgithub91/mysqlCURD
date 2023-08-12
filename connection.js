
const mysql=require("mysql2");

//connection
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Dileep91@",
    database:"base"
});
//check connection
con.connect((err)=>{
    // if(err) throw err;
    // console.log("connection created..");
    if(err){
        console.log("connection Error",err);
    }
    else{
        console.log("connection created..")
    }
});
module.exports=con;

