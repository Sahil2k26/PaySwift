import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Filter, FilteredList, isTransfer, LastTransaction, ProfileToggle, sideToggle, Transactions, userData } from "../atom";
import { Popup } from "./Popup";
import { Sidebar } from "./Sidebar"
import { Profile } from "./Profile";
import Logo from "./Logo"
export function Dashboard() {
    const setUserData = useSetRecoilState(userData);
    const filter=useRecoilValue(Filter);
    const setFilteredList = useSetRecoilState(FilteredList)
    const setTransactions = useSetRecoilState(Transactions)
    const t = useRecoilValue(isTransfer)
    const sToggle = useRecoilValue(sideToggle);
    const ptoggle=useRecoilValue(ProfileToggle)

    console.log(ptoggle);




    useEffect(() => {
        try {
            axios.get("http://localhost:3000/api/v1/user/bulk/?filter=" + filter, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            }).then((res) => {
                // console.log(res.data.users);
                setFilteredList(res.data.users)
            })
        } catch (e) {
            alert("Something's Wrong")
        }
    }, [filter])

    useEffect(() => {
        try {
            axios.get("http://localhost:3000/api/v1/user/me", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")} `
                }
            }).then((res) => {
                console.log(res.data);
                setUserData(res.data);
            })
        } catch (e) {
            alert("You have to login first")
        }

    }, [t])

    useEffect(() => {
        try {
            axios.get("http://localhost:3000/api/v1/user/transactions", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")} `
                }
            }).then((res) => {
                let transec = res.data.transactions;

                transec.sort((a, b) => {
                    return b.timeInSec - a.timeInSec;
                })


                let today = (new Date()).toLocaleString()
                today=today.split(',')
                today=today[0].split('/')
                today=today[1];

                transec= transec.map((t)=>{
                    let time = t.time.split(' ')
                    let timeString = "";
                    
                    console.log(today);
                    if(today.length ==time[2].length && (today==time[2])){
                    
                        timeString += "Today,"
                        
                    }
                    else if(today.length<time[2].length && time[2][0]=='0' && time[2][1]==today ){
                        timeString += "Today"
                    }
                    else {
                        timeString += "On "
                        timeString += time[2] + "/";
                        timeString += time[1] + "/";
                        timeString += time[3];
                    }
                    timeString += ",";
                    timeString += "at ";
                    const timehr = time[4].split(':')
                    let end = "AM";
                    if (timehr[0] >= "12") {
                        end = "PM";
                        timehr[0] = timehr[0] - "12"
                    }
                    timeString += timehr.join(":") + " " + end

                    return {
                        timeString:timeString,
                        amount:t.amount,
                        name:t.name,
                        status:t.status
                    }

                })
                console.log(transec);
                setTransactions(transec)
            })
        } catch (e) {
            alert("You have to login first")
        }

    }, [t])



    const token = localStorage.getItem("token");
    if (!token || token == "") {
        return <div></div>
    }
    return <div className="w-[100vw] h-[100vh] bg-white flex">
        <Sidebar></Sidebar>
        <div className={`${(sToggle == true) ? " w-full left-0  md:w-[85%] relative md:left-[15%] box-border" : "w-full"} h-[100vh] bg-white flex flex-col gap-6 relative top-0`}>

            <TopBar></TopBar>
            <Popup></Popup>
            {
                ptoggle==true?<Profile></Profile>:<MainComps></MainComps>
            }
            <span className="text-base text-center font-bold p-4">Powered by PaySwift ©</span>
            

        </div>

    </div>
}

function MainComps(){
    const setFilter=useSetRecoilState(Filter)
    return <div className="flex w-full  flex-wrap">
    <div className="flex flex-col w-full md:w-[70%] p-4 gap-3  md:p-8 md:gap-6">
        <div className="flex gap-4 flex-wrap">
            <Box1></Box1>
            <Box2></Box2>
        </div>
        <span className="text-black text-3xl font-bold font-mono">Users</span>
        <div className="w-full px-4 py-2 border-2 rounded-xl border-gray-400">
            <input className=" w-full h-full focus:outline-none text-gray-500 text-lg " type="search" name="search" id="filter" placeholder="Search users.. " onInput={(e) => {
                setFilter(e.target.value)
            }} />
        </div>
        <UserList></UserList>

    </div>
    <MyTransactions></MyTransactions>

</div>
}



function TopBar() {
    const userdata = useRecoilValue(userData);
    const setSideToggle = useSetRecoilState(sideToggle);
    const navigate = useNavigate()
    return <div className={`w-full bg-white shadow-lg flex justify-between px-3 md:px-6 py-4 items-center sticky top-0 left-0 flex-wrap box-border z-10`} >
        <div className="flex gap-2 items-center">
            <button onClick={() => { setSideToggle((t) => !t) }}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg></button>
            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 8.25H9m6 3H9m3 6-3-3h1.5a3 3 0 1 0 0-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg> */}
            {/* <span className="text-2xl font-bold text-black text-pretty" >
                PaySwift </span> */}
            <Logo></Logo>
        </div>

        <div className="flex gap-4 items-center">
            <span className="hidden  md:block text-xl text-balance font-semibold">Hi,{userdata.myData.firstName}</span>
            <div className="hidden   w-12 h-12 rounded-full bg-purple-300 text-black text-xl font-semibold md:flex justify-center items-center">{userdata.myData.firstName.toUpperCase()[0]}</div>
            <button className="px-4 py-2 bg-black text-white text-lg text-bold rounded-3xl" onClick={() => {
                localStorage.setItem("token", "");
                navigate("/")
            }}>Logout</button>
        </div>
    </div>
}

function Box1() {
    const userdata = useRecoilValue(userData);

    return <div className="flex flex-col w-[180px] h-[150px] bg-purple-200 rounded-2xl  p-4 gap-4  shadow-lg  border-white  ">
        <span className="text-lg text-black font-semibold font-mono">Your Balance</span>
        <span className="text-center text-4xl text-black font-bold font-sans">₹ {userdata.balance}</span>
    </div>
}

function Box2() {
    const lastTrans = useRecoilValue(LastTransaction)
    return <div className="flex flex-col w-[200px] h-[150px] bg-black rounded-2xl  p-4 gap-4  shadow-lg  border-white  ">
        <span className="text-md text-white font-semibold font-mono ">Last Transaction</span>
        <div className="text-center text-4xl text-white font-bold font-sans">{lastTrans.status == 1 ? "+ " : lastTrans.status == -1 ? "- " : ""}₹ {lastTrans.amount}</div>
        <span className=" text-white text-xs font-mono text-end" >{lastTrans.timeString}</span>
    </div>
}

function UserList() {
    const filteredList = useRecoilValue(FilteredList)
    return <div className="w-full flex flex-col p-3 md:p-5 box-border  ">
        {
            filteredList.map((user, i) => {
                return <User key={i} user={user}></User>
            })
        }

    </div>
}

function User({ user }) {
    const navigate = useNavigate();
    return <div className="w-full p-4 flex justify-between items-center border-b-2 border-gray-600 rounded-xl">
        <div className="flex gap-4 items-center">
            <div className="w-12 h-12 bg-purple-300 rounded-full text-black text-lg flex justify-center items-center font-semibold ">{user.firstname.toUpperCase()[0]}</div>
            <span className="text-lg  md:text-xl text-black font-bold">{user.firstname + "  " + user.lastname}</span>
        </div>

        <button className="px-2  md:px-4 py-2 bg-black text-white border-0 shadow-xl rounded-lg " onClick={() => {
            localStorage.setItem("reciver", JSON.stringify(user));
            navigate("/send");


        }}>
            Send Money
        </button>

    </div>

}
function MyTransactions() {
    const transactions = useRecoilValue(Transactions);
    if(transactions.length==0){
        return <></>
    }
  
    return <div className="mx-[2%] w-full md:w-[25%]  h-[80vh] pt-0 rounded-t-2xl rounded-b-lg border-1 border-black flex flex-col ">
        <div className=" rounded-t-xl text-center w-full px-5 py-4 bg-black text-2xl text-white font-semibold">My Transactions</div>
        <div className="w-full flex flex-col   box-border overflow-y-auto">
            {
                transactions.map((t, i) => {
                    




                    return <div key={i} className="w-full border-2 border-black py-2 px-3 flex flex-col gap-3 flex-wrap bg-white rounded-lg" >
                        <div className="text-black text-xl font-bold flex justify-between items-center  font-mono">
                            <div className="flex gap-4 items-center">
                                <div className="w-10 h-10 bg-purple-300 rounded-full text-black text-lg flex justify-center items-center font-semibold ">{t.name.toUpperCase()[0]}</div>
                                <span className="text-xl text-black font-bold">{t.name}</span>
                            </div>
                            <span className="text-black text-2xl md:text-xl font-bold" >{t.status==1?"+":"-"} ₹ {t.amount}</span>
                            

                        </div>
                        <div className="flex text-sm text-black font-normal font-mono">
                                <span >{t.status == 1 ? "sent :" : t.status == -1 ? "Paid :" : ""}</span>
                                <span className="">{t.timeString}</span>
                            </div>


                    </div>
                })
            }

        </div>
    </div>
}
