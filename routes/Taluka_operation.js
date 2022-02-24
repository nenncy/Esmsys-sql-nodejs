const express=require('express');
const sql=require('mssql');
const app= express();
const config= require('../db_config');
const router= require('express').Router();


//select query
router.route('/gettaluka').get(async (req,res)=> {
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation',req.query.op)
        .execute('Sp_Talukamaster')
        const Talukadata= result.recordsets;
        res.status(200).json({success: Talukadata});

    }
    catch(err){
        res.status(501).json(err)

    }
})


//update query
router.route('/UpdateTaluka').post( async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('Taluka_ID', req.query.id)
        .input('District_ID', req.body.districtid)
        .input('TalukaName', req.body.talukaname)
        .input('LangTalukaName', req.body.lname)
        .input('ModifiedBy', req.body.modifyby)
        .execute('sp_Talukamaster')
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
router.route('/InsertTaluka').post( async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('District_ID', req.body.districtid)
        .input('TalukaName', req.body.talukaname)
        .input('LangTalukaName', req.body.lname)
        .input('CreatedBy', req.body.cb)
        .execute('sp_Talukamaster')
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
router.route('/DeleteTaluka').post( async(req,res)=>{
    try{
        let pool= await sql.connect(config);
        const result = await pool.request()
        .input('Operation', req.query.op)
        .input('Taluka_ID', req.query.id)
        .execute('sp_Talukamaster')
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