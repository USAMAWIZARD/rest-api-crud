const express = require("express")
const router = express.Router()
const subscribers= require('../model/models')

router.get('/',async (req,res)=>{
    try{
    allsubscribers= await subscribers.find()         //to get all 
    res.json(allsubscribers)
    }
    catch(err){
        a={'subscribers':"notfound"+err.message}
        res.json(a)
    }
}) 

router.get('/:id',async(req,res)=>{
                           
    try{
    const subscriber =await subscribers.findById(req.params.id)
    res.json({"subscriber":subscriber})                    // to get one
    }catch(err){
        res.status("404").json({"subscriber":"not found"})
    }
 
})

router.post('/',async(req,res)=>{
    console.log(req.body.name,req.body.subscribedto)
    const newSubscriber =new subscribers({
        name:req.body.name,
        subscribedto:req.body.subscribedto,                   //to create
        datesubscribed:req.body.datesubscribed
    })    
    
    try{
    
        const created =await newSubscriber.save() 
        res.status('201').json(newSubscriber)
    }
    catch(err){
        res.status('400').json({"faild":'user not added'+err.message})
    }
})

router.patch('/:id',async(req,res)=>{
    toupdate={}
    if(req.body.name!=undefined)
    toupdate["name"]=req.body.name
    if(req.body.subscribedto)
    toupdate["subscribedto"]=req.body.subscribedto
    try{
    subscriber=await subscribers.update({_id:req.params.id},{$set:toupdate},function(err,suc){
        res.json({"subscriber":suc})
    })
    }
    catch(err){
        console.log(err)
    }
    
})     


router.delete('/:id',async(req,res)=>{
    try{
    subscriber =await subscribers.find({_id:req.params.id}).deleteOne()
    if(subscriber["deletedCount"]>0)
    res.json({"subscriber":subscriber})            //delete
    else{
        res.json({"subscriber":"notfound"})
    }
    }
    catch(err){
        res.json({"subscriber":"notfound"})
    }
})




module.exports= router