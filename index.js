const express = require('express');
const cors= require('cors');
const app= express();
var bodyparser=require('body-parser');
const db_operation = require('./db_operation');
const router=express.Router();


app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(cors());


//importing router

 const Countrydata= require('./routes/Country_Operation');
 const StateData=require('./routes/State_Operation');
 const DistrictData=require('./routes/District_Operation');
 const RegionData=require('./routes/Region_Operation');

 //call api 
 app.use('/country',Countrydata);
 app.use('/state',StateData);
 app.use('/district',DistrictData);
 app.use('/region',RegionData);


//server started
var port= process.env.port || 8000 ;
app.listen(port);
console.log('Api is running at '+ port);
app.listen()