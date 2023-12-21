const express = require('express');
const cors = require('cors');
require('dotenv').config()
const app=express();
const port =process.env.port||5000;

// middleware
app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send('new project is running')
})

app.listen(port,()=>{
    console.log(`new project is running on port ${port}`);
})