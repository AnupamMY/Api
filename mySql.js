const mysql = require("mysql2/promise");
const dotenv = require("dotenv");



dotenv.config();

let con = mysql.createPool({
    host: process.env.LOCALHOST,
    user: process.env.USER,
    password: "",
    database: process.env.DATABASE,
  });
  
 
//   let sql = "CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255))";
//     con.query(sql, function (err, result){
//         if(err) throw err;
//         console.log("CREATED TABLE");
//     });
  
// const insertData = (name,email)=>{
// let sql= "INSERT INTO users (name, email) VALUES (?,?)";
//   con.query(sql, [name,email],(err)=>{
//      if(err) throw err;
//      console.log("Data inserted");
//   }
//  );
// }

// const getData = ()=>{
//     let sql = "SELECT * FROM users";
//     con.query(sql, function (err, result) {
//         if (err) throw err;
//         console.log(result);
//       });
// }


module.exports = con;

