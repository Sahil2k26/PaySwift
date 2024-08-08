

const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://sahil:VK8i5cpXcHTCHTls@cluster0.qigbjuo.mongodb.net/PayTM");

const userSchema=mongoose.Schema({
    firstName:String,
    lastName:String,
    username:String,
    password:String,
  
    
})

const accountSchema=mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
})

const transactionSchema=mongoose.Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    reciverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true
    },
    senderName:{
        type:String,
        required:true
    },
    reciverName:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    timeInSec:{
        type:Number,
        required:true
    }
})


const Users=mongoose.model("Users",userSchema); 
const Account=mongoose.model("Account",accountSchema);
const Transactions=mongoose.model("Transactions",transactionSchema);

module.exports={
    Users,
    Account,
    Transactions
}