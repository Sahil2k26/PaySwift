

const {Router}=require("express");
const router=Router();
const jwt=require("jsonwebtoken");
const z=require("zod");
const {Users, Account, Transactions}=require("../db/user.cjs")
const {JWT_SECRET}=require("../config.cjs");
const {authMiddleware}=require("../middleware/authMiddleware.cjs");

const nameSchema=z.string();
const usernameSchema=z.string().email();
const passwordSchema=z.string();

const userSchema=z.object({
    firstName:nameSchema,
    lastName:nameSchema,
    username:usernameSchema,
    password:passwordSchema

})





router.post("/signup",async (req,res)=>{
    const userdata=req.body;
    const response=userSchema.safeParse(userdata);
    if(!response.success){
        res.json({
            msg:"Invalid Inputs"
        })
        return;
    }
    const u= await Users.findOne({
        username:userdata.username
    });
    if(u){
        res.json({
            msg:"User already exists"
        })
        return;
    }

   const user= await Users.create({username:userdata.username,
    password:userdata.password,
    lastName:userdata.lastName,
    firstName:userdata.firstName

   });

   await Account.create({userId:user._id,
    balance:Math.floor(1+Math.random()*10000)
   })

   const token=jwt.sign({username:user._id},JWT_SECRET);

   res.json({
        msg:"user created successfully",
        token:token
   })

    

})


router.post("/signin",async (req,res)=>{
    const {username,password}=req.body;
    const response1=usernameSchema.safeParse(username);
    const response2=passwordSchema.safeParse(password);

    if(!(response1.success && response2.success)){
        res.json({
            msg:"Invalid Inputs"
        })
        return;
    }
    

    const u=await Users.findOne({username:username,password:password});
    
    if(u){

        const token = jwt.sign({ username: u._id }, JWT_SECRET);
        res.json({
            token: token
        })
        
        return;
    }
    res.json({
        msg:"User Doesnt exists"
    })
    
})

router.use(authMiddleware);
const updateSchema=z.object({
    firstName:z.string().optional(),
    lastName:z.string().optional(),
    password:z.string().optional()
})


router.get("/me",async (req,res)=>{
    const data=await Users.findOne({
        _id:req.userId
    })
    const {balance}=await Account.findOne({
        userId:req.userId
    })
    res.json({myData:data,
        balance:balance
    });
})



router.put("/",async (req,res)=>{
    const data=req.body;
    const {success}=updateSchema.safeParse(data);
    if(!success){
        res.json({
            msg:"Error while updating "
        })
        return;
    }

    await Users.updateOne({
        _id:req.userId
    },data)

    res.json({msg:"updated successfully "});



})

router.get("/bulk",async (req,res)=>{
    const filter=req.query.filter || "";

    // const users=await Users.find({});
    // console.log(users);

    // const filterdlist=users.filter((user)=>{
    //     return user.firstName.includes(filter) || user.lastName.includes(filter);
    // })


    //regex for pattern
    const filterdlist=await Users.find({
        $and:[
            {
             _id:{$ne:req.userId}
        },{
            $or:[{
                firstName:{
                    "$regex":filter
                }
            },{
                lastName:{
                    "$regex":filter
                }
            }]


        }]  
    })

    // console.log(filterdlist);


    res.json({users:filterdlist.map((user)=>{
        return {username:user.username,
            firstname:user.firstName,
            lastname:user.lastName,
            _id:user._id
        }
    })});
    // res.json({
    //     users:users
    // })

})

router.get("/transactions",async(req,res)=>{
    const tlist=await Transactions.find({
        $or:[{
            senderId:req.userId
        },{
            reciverId:req.userId
        }]
    })
    


    res.json({
        transactions:tlist.map( (t)=>{
            const status=(t.senderId==req.userId?-1:1)
            // const u=await Users.findOne({
            //     _id:oid
            // })
            const otherName=(t.senderId!=req.userId?t.senderName:t.reciverName);

            return {
                // recived:t.reciverId==req.userId?true:false,
                // sent:t.senderId==req.userId?true:false,
                // to:t.senderId==req.userId?t.reciverId:"",
                // from:t.reciverId==req.userId?t.senderId:"",

                status:status,
                name:otherName,
                amount:t.amount,
                time:t.time,
                timeInSec:t.timeInSec
            }
        })
    })

    
})












module.exports=router