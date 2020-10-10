const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost/Subscriber",{ useUnifiedTopology: true } )
db =mongoose.connection
db.on("error",(err)=>{console.log("could not connect to db")})
db.once("open",()=>{console.log("connected to  db")})

app.use(express.json())
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
const SubscribersRoute =require("./REST API/rest route.js")
app.use('/api/subscribers',SubscribersRoute)

app.post('/',(req,res)=>{
    console.log(req.body.a)
    res.send(req.body.a)
})

app.listen(3000,()=>{console.log("server started")})
