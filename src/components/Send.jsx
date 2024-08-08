import axios from "axios";
import { useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isTransfer } from "../atom"
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";


export function Send() {
    const user = JSON.parse(localStorage.getItem("reciver"));
    const [amt, setamt] = useState("");
    const navigate = useNavigate();
    const set = useSetRecoilState(isTransfer);
    const [errorToggle, setErrorToggle] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [isDone, setIsDone] = useState(false);
    const [load,setload]=useState(false)


    const handleClick = async () => {
        
        try {
            if (!amt || amt == "0") {
                // alert("Please enter amount")
                setErrorToggle(true);
                setErrMsg("Please enter amount")
                return;
            }
            const res = await axios.post("http://localhost:3000/api/v1/account/transfer", {
                to: user._id,
                amount: parseInt(amt)
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            console.log(res.data);

            set((t) => { return (t + 1) });
            // localStorage.setItem("reciver","");
            // alert("Transfered Successfully")
            // navigate("/dashboard");
            if (res.data.msg != "Transfer Successful") {
                setErrorToggle(true);
                // console.log(res.data.msg);
                // console.log(typeof(res.data.msg));
                setErrMsg(res.data.msg);
            }
            else {
                setErrorToggle(false);
                setIsDone(true);

            }
        } catch (e) {
            localStorage.setItem("reciver", "");
            console.log(e);
            alert("Something went wrong ")
            //     navigate("/dashboard")
        }


    }

    const handleBack = () => {
        localStorage.setItem("reciver", "")
        navigate("/dashboard")
    }
    const token = localStorage.getItem("token");
    const reciver = localStorage.getItem("reciver");
    if (!token || !reciver || token == "" || reciver == "") {
        return <div></div>
    }
    return <div className=" w-full h-[100vh] flex justify-center items-center bg-green-100">
        <div className="bg-white w-[350px] h-[60vh] p-4 rounded-xl shadow-2xl flex flex-col justify-center items-center gap-9  relative">

            <span className="text-3xl text-black font-extrabold ">Send Money</span>
            <div className={`bg-rose-200 border-2 border-red-600 w-[80%] text-red-600 text-lg px-3 py-3 flex justify-center items-center ${errorToggle ? "block h-[36px]" : "hidden h-0"}  `}>{errMsg}</div>
            <div className="flex flex-col gap-2  w-[80%] items-center">
                <div className="flex w-[80%] gap-4 items-center mb-4">
                    <div className="w-12 h-12 flex justify-center items-center rounded-full text-xl bg-green-400 text-white font-bold">{user.firstname.toUpperCase()[0]}</div>
                    <span className="text-2xl font-bold text-black">{user.firstname + " " + user.lastname}</span>
                </div>
                <span className="text-black text-md font-semibold w-full ">{isDone ? "" : "Amount(in Rs.)"}</span>

                {isDone ? <div className=" text-4xl text-green-500 font-bold  flex px-3 py-2 gap-2 items-center ">
                    <span className="text-black text-xl font-bold mr-4">Sent:</span>
                    <span>₹ {amt}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                    </svg>

                </div> : <div className="w-full border-2 border-gray-400 rounded-lg flex bg-gray-100 ">
                    <div className="text-lg p-2 " >₹</div>
                    <input className=" bg-transparent w-full focus:outline-none px-4 py-2 text-gray-500 rounded-lg" type="text" placeholder="Enter amount" onInput={(e) => {
                        setamt(e.target.value)
                    }} /> </div>}

                <button className="w-full py-3 bg-green-500 text-white text-xl font-bold rounded-lg" onClick={isDone ?  handleBack : async()=>{setload(true)
                    await handleClick()
                    setload(false)
                 }}>{isDone ? <div className=" w-full justify-center text-2xl flex gap-2 items-center"> <span> Back</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                    </svg>
                </div> : load?<Loader></Loader>:"Initiate Transfer"}</button>

            </div>


        </div>

    </div>

}