const restify = require('restify');
const bodyParser = require('body-parser');
const { Client } = require('@elastic/elasticsearch');
const { faker } = require('@faker-js/faker');
const app = restify.createServer();


app.use(bodyParser.json());

const client = new Client({ node: 'http://192.168.0.128:9200' });

// client.indices.create({
//     index: 'anupam'
// })

app.get("/elastic/get", async (req, res) => {
    const response  = await client.search({
        index: 'anupam',
        // 

    })
    res.send(response);
    console.log(response);
})


app.post("/elastic/create", async (req,res) => {
    
    const result = await client.index({
       index: 'yadav',
       body:req.body
   })
   console.log(result)
   res.send("Data inserted "); 
})

app.put("/elastic/update/:id",async (req,res)=>{
    const id = req.params.id;
   await client.update({
        index: 'yadav',
        id:id,
        doc: req.body
    })
    res.send("Data Updated Successfully");
})

app.del("/elastic/delete/:id",async (req,res)=>{    
    const id = req.params.id;
    await client.delete({
        index: 'yadav',
        id:id
    })
    res.send("Data Deleted Successfully");
})


// function createRandomUser() {
//     return {
//       userId: faker.string.uuid(),
//       username: faker.internet.username(), // before version 9.1.0, use userName()
//       email: faker.internet.email(),
//     };
//   }
// const users = faker.helpers.multiple(createRandomUser, {
//     count:100,
// });



app.post("/elastic/createBulk", async (req, res) => { 
    let bulkData = []; 
    for (let i = 0; i < 500000; i++) { 
      const firstname = faker.internet.username(); 
      const email = faker.internet.email();    
      const register = faker.date.past();
      const time = faker.date.past().getTime();
      
      bulkData.push({ index: { _index: 'anupam' } });
      bulkData.push({ firstname, email,register, time}); 
    } 
  
   try {
    const response = await client.bulk({
        index: 'yadav',
        body: bulkData,
      });
      console.log(response);
      res.send("Data inserted ");
   } catch (error) {
       console.log(error);
   }

   
  })

  
app.listen(3000,function(req,res){
    console.log("Listening on port 3000");

}) 