const restify = require('restify');
const {MongoClient} = require('mongodb');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const {v4 : uuidv4} = require('uuid')
uuidv4()
dotenv.config();

const app = restify.createServer();

app.use(bodyParser.json());

const PORT = process.env.PORT;


const uri = process.env.MONGOURI;

const client = new MongoClient(uri);

let db;

async function mongoConnection() {
    await client.connect();
    db = client.db('node');
    console.log("Connected to Mongo");
    
}

mongoConnection();

app.get('/mongo/get',async function (req,res){
    const result  = await db.collection('users').find().toArray();
    res.send(result);
})

app.post('/mongo/create', async function (req, res) {
    const userId = uuidv4();
    const {name,email} = req.body;
    await db.collection('users').insertOne({name,email,userId});
    res.send("Data Inserted Sucessfully");
});

app.put("/mongo/update/:id", async function (req, res) {
    const id = req.params.id;
    const {name,email} = req.body;
    await db.collection('users').updateOne({userId:id},{ $set: { name,email}});
    res.send("Data Updated Successfully");
});

app.del("/mongo/delete/:id", async function (req, res) {
    const id = req.params.id;
    await db.collection('users').deleteOne({userId:id});
    res.send("Data Deleted Successfully");
})

app.listen(PORT, function () {
    console.log(`listening on port ${PORT}`);
});