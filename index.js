const restify = require("restify");
const dotenv  = require("dotenv");
const app = restify.createServer();
const connect = require("./mySql.js");

app.use(restify.plugins.bodyParser());
app.use(restify.plugins.queryParser());

dotenv.config();


const port = process.env.PORT;

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

app.listen(port, function () {
    console.log("Server is running on port 3000");
});