const config=require('../db_config');
const sql = require('mssql');
const express=require('express');
const app=express();
const router=require('express').Router();

//select query
router.route('/getRegion').get(async (req,res)=>{
    try{
        let pool=await sql.connect(config);
        const result=await pool.request()
        .input('Operation', req.query.op)
        .execute(`sp_Regionmaster`);
        const regiondata = result.recordsets;
        //console.log(districtdata);
    
    res.status(200).json({success:regiondata});

    }
    catch(err){
        res.status(501).json(err)
    }
})


//update query
router.route('/UpdateRegion').post( async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('Region_ID', req.query.id)
        .input('State_ID', req.body.stateid)
        .input('RegionName', req.body.regionname)
        .input('LangRegionName', req.body.lname)
        .input('ModifiedBy', req.body.modifyby)
        .execute('sp_Regionmaster')
        const distritctdata = result;
        if (result.rowsAffected<=0){
            res.status(400).json({err: 'Invalid data entry'})
        }
        else{
            res.status(200).json(" number of row :"+ result.rowsAffected +"affected");
        }
        //console.log(res);
        
        // res.status(200).json(distritctdata);

    }
    catch(err){
        res.status(500).json(err);
    }
})


//insert query
router.route('/InsertRegion').post( async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('State_ID', req.body.stateid)
        .input('RegionName', req.body.regionname)
        .input('LangRegionName', req.body.lname)
        .input('CreatedBy', req.body.cb)
        .execute('sp_Regionmaster')
        const distritctdata = result;
        if (result.rowsAffected<=0){
            res.status(400).json({err: 'Duplicate data not allowed!'})
        }
        else{
            res.status(200).json(" number of row :"+ result.rowsAffected +"affected");
        }
        //console.log(res);
        
        // res.status(200).json(distritctdata);

    }
    catch(err){
        res.status(500).json(err);
    }
})

//delete query
router.route('/DeleteRegion').post( async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('Region_ID', req.body.id)
        .execute('sp_Regionmaster')
        const distritctdata = result;
        if (result.rowsAffected<=0){
            res.status(400).json({err: 'There is some invalid details!'})
        }
        else{
            res.status(200).json(" number of row :"+ result.rowsAffected +"affected");
        }
        //console.log(res);
        
        // res.status(200).json(distritctdata);

    }
    catch(err){
        res.status(500).json(err);
    }
})





module.exports=router;