// interaction with  database:
const express = require("express")
const app = express();
const connectDB = require("./config/connectDB");

// // d: parse data:
app.use(express.json());
// c : les routes :  
app.use('/api/persons', require('./routes/person'))
// b :connexion database
connectDB();

// a : run server:
const port = process.env.PORT || 6000;
app.listen(port,(err)=>{
    err?console.log(err):console.log(`the server is running on http://localhost:${port}` )
})