const restify = require("restify");
const dotenv  = require("dotenv");
const app = restify.createServer();
const connect = require("./mySql.js");
const { faker } = require('@faker-js/faker');
const moment = require("moment");
const {v4 : uuidv4} = require('uuid')

app.use(restify.plugins.bodyParser());
app.use(restify.plugins.queryParser());

dotenv.config();

const port = process.env.PORT;

// function createTable(){
// connect.query("CREATE TABLE allUsers (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), jobLevel varchar(255), register varchar(255), login varchar(255), logout varchar(255))");
// }
// createTable();

// function createTable(){
//     connect.query("CREATE TABLE loggerReport (id INT AUTO_INCREMENT PRIMARY KEY,agent_name VARCHAR(255),campaign_name VARCHAR(255),process_name VARCHAR(255),disposeName VARCHAR(255),leadset VARCHAR(255),customerUUID VARCHAR(255),referenceUUID VARCHAR(255),call_time VARCHAR(255),hold_time VARCHAR(255), mute_time VARCHAR(255),ringing VARCHAR(255),transfer VARCHAR(255),conference VARCHAR(255), duration VARCHAR(255),call_type VARCHAR(255),disposeType VARCHAR(255),disposeTime VARCHAR(255),datetime VARCHAR(255))");
//         console.log("Table created");
//     }
// createTable();

app.get("/mysql", async(req, res)=> {
    const result =await connect.query("Select * from users");
    console.log(result);
    res.send(result);
});


app.post("/mysql/create", async (req, res)=> {
    let data = req.body;
    let {name,email} = data;
    let result =    await connect.query("INSERT INTO users (name, email) VALUES (?,?)", [name,email]); 
    console.log(result);
    res.send("Data received");
});

app.put("/mysql/update/:id",async (req,res)=>{
    let id = req.params.id;
    let result = await connect.query("UPDATE users SET ? WHERE id = ?", [req.body,id]);
    res.send(result);
});

app.del("/mysql/delete/:id", async (req,res)=>{
    let id = req.params.id;
    let result = await connect.query("DELETE FROM users WHERE id = ?", [id]);
    res.send(result);
});

// const data =async ()=>{
//     let data = [] 
//     for(let i=0;i<=100000;i++){ 
//       let name = faker.internet.username();
//       let email = faker.internet.email();
//       let register = faker.date.past();
//       let job = faker.person.jobType();
//       let login = Date.now();
//       let logout = (Date.now() + 100000);
//       data.push([name,email,job,register,login,logout]);
//     }
    
//     let sql= `INSERT INTO allUsers (name,email,jobLevel,register,login,logout) VALUES ?`;
//     try {
//       connect.query(sql,[data]); 
//     } catch (error) {
//         console.log(error.message);
//     }
//     console.log(data);
// }
// data();

app.get("/mysql/createSumm/:job",async (req,res)=>{
    let summarydata = []
    let job = req.params.job
     //let sql = "Select jobLevel, count(*) as Total_Count ,AVG(login) as login , AVG(logout) as logout from allUsers group by jobLevel "
    let sql = "Select * from allUsers where jobLevel = ?"; 
    try {
      const result = await connect.query(sql,[job]);
      if(result){
         result[0].forEach(element => {
            let logouttime = moment(element.logout).format("h:mm:ss A");
            let logintime = moment(element.login).format("h:mm:ss A");
            let count = element.Total_Count;
            let job = element.jobLevel;
            summarydata.push({job,logintime,logouttime,count});
        })
         res.status(200);
         res.send(summarydata);
         //console.log(result);
      }    
    } catch (error) {
        console.log(error.message);
    }
})


app.listen(port, function () {
    console.log("Server is running on port 3000");
});