function errHandler(err,req,res,next){
    if(err.name ==='UnautorizedError'){
        return res.status(401).json({message:'the User is not authorized'});
    }if(err.name ==='ValidationError'){
        return res.status(401).json({message:err});
    }
    else{
        return res.status(500).json({ error:err});
    }

}
module.exports=errHandler;