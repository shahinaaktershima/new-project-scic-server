const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express();
const port =process.env.port||5000;

// middleware
app.use(cors());
app.use(express.json());

app.use(cors({
  origin: ['http://localhost:5173',"https://scic-project-ee829.web.app","https://scic-project-ee829.firebaseapp.com"],
  credentials: true,
}))
// connection to mongodb


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hfsk54e.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const tasksCOllection=client.db('TodoTask').collection('tasks');
    const AddCOllection=client.db('AddedTask').collection('added');


    app.get('/tasks',async(req,res)=>{
      const cursor=tasksCOllection.find();
      const result=await cursor.toArray();
      res.send(result)
    })

    app.post('/added',async(req,res)=>{
    const created=req.body;
    console.log(created);
    const result=await AddCOllection.insertOne(created);
    res.send(result);
})
app.get('/added',async(req,res)=>{
   const cursor=AddCOllection.find();
      const result=await cursor.toArray();
      res.send(result)
})
app.delete('/added/:id',async(req,res)=>{
    const id=req.params.id;
    const query={_id: new ObjectId(id)}
    const result=await AddCOllection.deleteOne(query)
  res.send(result)}
    )
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',(req,res)=>{
    res.send('new project is running')
})

app.listen(port,()=>{
    console.log(`new project is running on port ${port}`);
})