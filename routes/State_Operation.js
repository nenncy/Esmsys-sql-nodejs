const config = require('../db_config');
const sql= require('mssql');
const express= require('express');
const app = express();
const router= require('express').Router();

//State Stored procedure call

//select query 

router.route('/getState').get(async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result= await pool.request()
        .input('Operation',req.query.op)
        .execute('sp_state')
            const statedata=result.recordsets;
            res.status(200).json({success:statedata});
    
    }
    catch(err){
        res.status(500).json(err);
    }
})

//update query 
router.route('/UpdateState').post(async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result= await pool.request()
        .input('Operation',req.query.op)
        .input('State_Id',req.query.id)
        .input('StateName',req.body.statename)
        .input('LangStateName',req.body.lname)
        .input('StateShortCode',req.body.code)
        .input('Country_ID',req.body.countryid)
        .input('Language',req.body.lan)
        .input('ModifiedBy',req.body.modifyby)

        .execute('sp_state')
           
        const statedata= result;
        if (result.rowsAffected<=0){
            res.status(400).json({err: 'Invalid data entry'})
        }
        else{
            res.status(200).json(" number of row :"+ result.rowsAffected +"affected");
        }
        //console.log(res);
        
        //res.status(200).json(statedata);
    
    }
    catch(err){
        res.status(500).json(err);
    }
})

//insert query 
router.route('/InsertState').post(async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result= await pool.request()
        .input('Operation',req.query.op)
        // .input('State_Id',req.body.id)
        .input('StateName',req.body.statename)
        .input('LangStateName',req.body.lname)
        .input('StateShortCode',req.body.code)
        .input('Country_ID',req.body.countryid)
        .input('Language',req.body.lan)
       

        .execute('sp_state')
           
        const statedata= result;
        if (result.rowsAffected<=0){
            res.status(400).json({err: 'Duplicate data not allowed!'})
        }
        else{
            res.status(200).json(" number of row :"+ result.rowsAffected +"affected");
        }
        //console.log(res);
        
        //res.status(200).json(statedata);
    
    }
    catch(err){
        res.status(500).json(err);
    }
})

//delete query
router.route('/DeleteState').post(async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result= await pool.request()
        .input('Operation',req.query.op)
        .input('State_Id',req.query.id)
        // .input('StateName',req.query.statename)
        // .input('LangStateName',req.query.lname)
        // .input('StateShortCode',req.query.code)
        // .input('Country_ID',req.query.countryid)
        // .input('Language',req.query.lan)
       

        .execute('sp_state')
           
        const statedata= result;
        if (result.rowsAffected<=0){
            res.status(400).json({err: 'There is some invalid details' })
        }
        else{
            res.status(200).json(" number of row :"+ result.rowsAffected +"affected");
        }
      
        //res.status(200).json(statedata);
    
    }
    catch(err){
        res.status(500).json(err);
    }
})




module.exports=router;