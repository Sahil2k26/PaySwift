const jwt=require("jsonwebtoken");
const {JWT_SECRET}=require("../config.cjs");


const authMiddleware= (req,res,next)=>{
    const auth=req.headers.authorization;
    if(!auth || !(auth.startsWith("Bearer")) || !(auth.split(" ").length==2)){

        res.sendStatus(403);
        return;
    }

    const arr=auth.split(" ");
    const token=arr[1]; 

    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        const userId=decoded.username;
        req.userId=userId;
        next();
    }
    catch(e){
        res.sendStatus(403);
        return;
    }
}

module.exports={
    authMiddleware
}

