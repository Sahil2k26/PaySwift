import { atom, selector } from "recoil";


export const isTransfer=atom({
    key:"isTransfer",
    default:0
})


export const popupToggle=atom({
    key:"popupToggle",
    default:false
})

export const sideToggle=atom({
    key:"sideToggle",
    default:false
})

export const userData=atom({
    key:"userData",
    default:{
        myData:{
            firstName:"User",
            lastName:""

        },
        balance: 0
    }
})
export const Transactions=atom({
    key:"Transactions",
    default:[]
})
export const Filter=atom({
    key:"Filter",
    default:""
})
export const FilteredList=atom({
    key:"FilteredList",
    default:[]
})

export const LastTransaction=selector({
    key:"LastTransaction",
    get:({get})=>{
        const transactions=get(Transactions);
        if(transactions.length>0){
            return {
                status:transactions[0].status,
                amount:transactions[0].amount,
                timeString:transactions[0].timeString
            }
            
        }
        return {
            status:0,
            amount:0
        }

    }
})

export const ProfileToggle=atom({
    key:"profileToggle",
    default:false
})
