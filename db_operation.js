const config = require('./db_config');
const sql=require('mssql');
const express = require('express');
const app= express();
const db_operation = require('./db_operation');
const router = require('express').Router();


//Getting country data api (select query)
router.route('/getcountry').get( async (req,res)=>{
    
    try{
        // display stored procedure with parameter 
        let pool=  await sql.connect(config);
        const result = await pool.request()
            .input('Country_name', req.query.name)
            .input('code', req.query.code)
            .execute(`insertCountry`);
        const countrydata = result.recordset;
        // console.log(res);
        res.json(countrydata);

    }
    //exception
    catch(err){
      console.log(err);
    }
    
})


module.exports=router;


