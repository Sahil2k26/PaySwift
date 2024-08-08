const {Router, application}=require("express");
const { authMiddleware } = require("../middleware/authMiddleware.cjs");
const { Account, Users, Transactions } = require("../db/user.cjs");
const z=require("zod");
const { default: mongoose } = require("mongoose");
const router=Router();



router.get("/balance",authMiddleware,async(req,res)=>{
    const userId=req.userId;
    const acc=await Account.findOne({
        userId:userId
    });

    res.json({
        balance:acc.balance
    })
})


const transferSchema=z.object({
    to:z.string(),
    amount:z.number()
})


router.post("/transfer",authMiddleware,async (req,res)=>{
    const d=req.body;
    const {success}=transferSchema.safeParse(d);

    //bad sol-without trancsactions
    // if(!success){
    //     res.status(411).json("Invalid Inputs")
    //     return;
    // }


    // const reciver=await Users.findOne({
    //     _id:d.to
    // })
    // if(!reciver){
    //     res.status(404).json({
    //         msg:"user not found"
    //     })
    //     return;

    // }
    // const userId=req.userId;
    // const acc=await Account.findOne({
    //     userId:userId
    // })

    // if(d.amount>acc.balance){
    //     res.status(400).json({
    //         msg:"Insufficent balance"
    //     })
    // }

    // await Account.updateOne({
    //     userId:userId
    // },{
    //     $inc:{
    //         balance:-amount
    //     }
    // })

    // await Account.updateOne({
    //     userId:d.to
    // },{
    //     $inc:{
    //         balance:d.amount
    //     }
    // });

    const session=await mongoose.startSession();
    session.startTransaction();

    if(!success){
        await session.abortTransaction();
        res.json("Invalid Inputs")
        return;
    }


    const reciver=await Users.findOne({
        _id:d.to
    }).session(session);
    if(!reciver){
        await session.abortTransaction();
        res.json({
            msg:"user not found"
        })
        return;

    }
    const userId=req.userId;
    const acc=await Account.findOne({
        userId:userId
    }).session(session)

    if(d.amount>acc.balance){
        await session.abortTransaction();
        res.json({

            msg:"Insufficent balance"
        })
        return;
    }

    await Account.updateOne({
        userId:userId
    },{
        $inc:{
            balance:-d.amount
        }
    }).session(session)

    await Account.updateOne({
        userId:d.to
    },{
        $inc:{
            balance:d.amount
        }
    }).session(session);

    

    await session.commitTransaction();

    const senderdata=await Users.findOne({
        _id:userId
    })

    await Transactions.create({
        senderName:senderdata.firstName+" "+senderdata.lastName,
        reciverName:reciver.firstName+" "+reciver.lastName,
        senderId:userId,
        reciverId:d.to,
        amount:d.amount,
        time:(new Date()).toString(),
        timeInSec:(new Date()).getTime()

    })
    res.json({
        msg:"Transfer Successful"
    })

})








module.exports=router