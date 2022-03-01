const config = require('../db_config');
const sql=require('mssql');
const express = require('express');
const app= express();
//const db_operation = require('../db_operation');
const res = require('express/lib/response');
const router = require('express').Router();


//sp_country stored procedure call

// select query ==>
router.route('/getcountry').get( async (req,res)=>{
  
  try{
    let pool= await sql.connect(config);
    const result = await pool.request()
    .input('Operation', req.query.op)
     .execute('sp_country')
     const countrydata=result.recordsets;
      console.log(countrydata);
      res.status(200).json({success:countrydata});
  }
  catch(err){
       res.status(500).json(err);
  }
})


//update query 
router.route('/updatecountry').post( async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('CountryName', req.body.countryname)
        .input('Country_ID', req.body.id)
        .input('LangCountryName', req.body.lname)
        .input('CountryShortCode', req.body.code)
        .input('ModifiedBy', req.body.modifyby)
        .execute('sp_country')
        const countrydata = result;
        if (result.rowsAffected<=0){
            res.status(400).json({err: 'Invalid data entry'})
        }
        else{
            res.status(200).json(" number of row :"+ result.rowsAffected +"affected");
        }
        //console.log(res);
        
        res.status(200).json(countrydata);

    }
    catch(err){
        res.status(500).json(err);
    }
})



//insert query 
router.route('/insertcountry').post(async(req,res)=>{
 
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('CountryName', req.body.countryname)
        .input('LangCountryName', req.body.lgname)
        .input('CountryShortCode',req.body.csc)
        .input('CreatedBy', req.body.cb)
        
        .execute('sp_country')

        const detail= result;
        if (result.rowsAffected<=0){
            res.status(400).json({err: 'Duplicate data not allowed!'})
        }
        else{
            res.status(200).json("number of row :"+ result.rowsAffected +"affected");
        }


        // res.status(200).json(detail);

    }
    catch(err){
      res.status(500).json(err);
    }

});


//delete query 
router.route('/deletecountry').post(async (req, res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('Country_ID',req.query.id)
        .execute('sp_country')

        const update= result;
        if (result.rowsAffected<=0){
            res.status(400).json({err: 'There is some invalid details'})
        }
        else{
            res.status(200).json(" number of row :"+ result.rowsAffected +" deleted");
        }

    }
    catch(err){
         res.status(500).json(err);
    }

})


module.exports=router;


