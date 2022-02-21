const config=require('../db_config');
const sql = require('mssql');
const express=require('express');
const app=express();
const router=require('express').Router();

//select query
router.route('/getDistrict').get(async (req,res)=>{
    try{
        let pool=await sql.connect(config);
        const result=await pool.request()
        .input('Operation', req.query.op)
        .execute(`sp_Districtmaster`);
        const districtdata = result.recordsets;
        //console.log(districtdata);
    
    res.status(200).json(districtdata);

    }
    catch(err){
        res.status(501).json(err)
    }
})


//update query
router.route('/updateDistrict').post( async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('District_ID', req.query.id)
        .input('DistrictName', req.body.districtname)
        .input('LangDistrictName', req.body.lname)
        .input('IsVerified', req.body.verify)
        .input('State_ID', req.body.stateid)
        .input('Region_ID', req.body.regionid)
        .input('ModifiedBy', req.body.modifyby)
        .execute('sp_Districtmaster')
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

router.route('/InsertDistrict').post( async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('DistrictName', req.body.districtname)
        .input('LangDistrictName', req.body.lname)
        .input('IsVerified', req.body.verify)
        .input('State_ID', req.body.stateid)
        .input('Region_ID', req.body.regionid)
        .input('CreatedBy',req.body.cb)
    
        .execute('sp_Districtmaster')
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
router.route('/DeleteDistrict').post( async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('District_ID', req.query.id)
     
        .execute('sp_Districtmaster')
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