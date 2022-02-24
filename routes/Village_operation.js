const config=require('../db_config');
const sql = require('mssql');
const express=require('express');
const app=express();
const router=require('express').Router();

//select query
router.route('/getVillage').get(async (req,res)=>{
    try{
        let pool=await sql.connect(config);
        const result=await pool.request()
        .input('Operation', req.query.op)
        .execute(`sp_Villagemaster`);
        const villagedata = result.recordsets;
        //console.log(districtdata);
    
    res.status(200).json({success:villagedata});

    }
    catch(err){
        res.status(501).json(err)
    }
})


//update query
router.route('/UpdateVillage').post( async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('Village_ID', req.query.id)
        .input('Taluka_ID', req.body.talukaid)
        .input('VillageName', req.body.villagename)
        .input('LangVillageName', req.body.lname)
        .input('ModifiedBy', req.body.modifyby)
        .execute('sp_Villagemaster')
        // const talukadata = result;
        if (result.rowsAffected<=0){
            res.status(400).json({err: 'Invalid data entry'})
        }
        else{
            res.status(200).json(" number of row :"+ result.rowsAffected +"affected");
        }
        //console.log(res);
        // res.status(200).json(talukadata );

    }
    catch(err){
        res.status(500).json(err);
    }
})


//insert query
router.route('/InsertVillage').post( async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('Taluka_ID', req.body.talukaid)
        .input('VillageName', req.body.villagename)
        .input('LangVillageName', req.body.lname)
        .input('CreatedBy', req.body.cb)
        .execute('sp_Villagemaster')
        // const talukadata = result;
        if (result.rowsAffected<=0){
            res.status(400).json({err: 'Duplicate data not allowed!'})
        }
        else{
            res.status(200).json(" number of row :"+ result.rowsAffected +"affected");
        }
        //console.log(res);
        // res.status(200).json(talukadata );

    }
    catch(err){
        res.status(500).json(err);
    }
})


//delete query
router.route('/DeleteVillage').post( async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('Village_ID', req.query.id)
        .execute('sp_Villagemaster')
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