const redis  = require("ioredis")
const dotenv  = require("dotenv")
const restify = require("restify")  
const bodyParser = require("body-parser")

const app = restify.createServer();

app.use(bodyParser.json());

dotenv.config()
let PORT = process.env.PORT;
const data = new redis({
    host: process.env.LOCALHOST,
    port: 6379
})

data.set("name", "Anupam");
data.set("", "Anupam");
data.get("name", (err, reply) => {
  console.log(reply);
})

app.get("/redis", async (req, res) => {
  const result = await data.hget(req.body.name);
  console.log(result);
  res.send(result);
});

app.post("/redis/create", async (req, res) => {
  const result = await data.hset(req.body.name,req.body);
  console.log(result);
  res.send("Data Received");
}); 

app.put("/redis/update/:id", async (req, res) => {
  const result = await data.hset("userAnupam",req.body);
  console.log(result);
  res.send("Data Updated");
});

app.del(encodeURI("/redis/delete/:name"), async (req, res) => {
  const result = await data.del(req.params.name);
  console.log(result);
  res.send("Data Deleted");
});

app.listen(PORT,function(){
  console.log(`Server is running on port ${PORT}`)
})

