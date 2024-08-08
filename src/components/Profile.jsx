import { useRecoilValue, useSetRecoilState } from "recoil";
import { isTransfer, ProfileToggle, userData } from "../atom";
import { useState } from "react";
import axios from "axios";

export function Profile() {
    const userdata = useRecoilValue(userData);
    const [errtoggle, setErrorToggle] = useState(false);
    const [errMsg, setErrMsg] = useState("");
    const [fname, setfname] = useState(userdata.myData.firstName);
    const [lname, setlname] = useState(userdata.myData.lastName);
    const Setprofiletoggle = useSetRecoilState(ProfileToggle);
    const setT = useSetRecoilState(isTransfer);
    const [oldpassword, setoldPassword] = useState("");
    const [newpassword, setnewpassword] = useState("");
    const [err2toggle, setError2Toggle] = useState(false);
    const [err2Msg, setErr2Msg] = useState("");
    const [passToggle1, setpassToggle1] = useState(false);
    const [in1, setin1] = useState(false);
    const [passToggle2, setpassToggle2] = useState(false);
    const [in2, setin2] = useState(false);
    const [donetoggle,setdonetoggle]=useState(false);
    const [Donemsg,setdonemsg]=useState("");

    const handleClick = async () => {

        if (fname == "" || lname == "") {
            setErrorToggle(true);
            setErrMsg("All fields are required")
            return;
        }
        if (fname == userdata.myData.firstName && lname == userdata.myData.lastName) {
            setErrorToggle(false)
            setdonetoggle(true)
            setdonemsg("Saved Successfully")
            return;

        }
        setErrorToggle(false)

        try {
            console.log(fname);
            console.log(lname);
            const res = await axios.put("http://localhost:3000/api/v1/user", {
                firstName: fname,
                lastName: lname
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setErrorToggle(false)
            setdonetoggle(true)
            setdonemsg(res.data.msg)
           
            setT((t) => t + 1)


        } catch (e) {
            console.log(e);
        }


    }

    const handlepass = async () => {
        console.log("enter2");
        
        setError2Toggle(false)
        if (oldpassword == "" || newpassword == "") {
            setError2Toggle(true);
            setErr2Msg("All fields are required")
            return;

        }
        if (oldpassword != userdata.myData.password) {
            setError2Toggle(true);
            setErr2Msg("Password is wrong ")
            return;
        }

        if (oldpassword == newpassword) {
            setError2Toggle(true);
            setErr2Msg("Enter a new Password");
            return;

        }
        setError2Toggle(false)

        try {
            console.log(fname);
            console.log(lname);
            const res = await axios.put("http://localhost:3000/api/v1/user", {
                password: newpassword
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            setError2Toggle(false)
            alert(res.data.msg)
            setT((t) => t + 1)


        } catch (e) {
            console.log(e);
        }



    }

    return <div className="w-full flex flex-col gap-4 p-8 relative z-0">
        <button className="bg-black px-3 py-2 text-white w-[100px] font-semibold text-base rounded-xl relative top-0 left-0 z-0" onClick={() => {
            Setprofiletoggle(false);
        }}>Go Back</button>
        <span className="text-bold text-3xl font-extrabold ">My Profile</span>
        <span className={`${donetoggle?"block":"hidden"} border-2 border-green px-5 text-center w-[300px] py-3 text-xl font-bold text-green-700 `}>{Donemsg}</span>

        <div className="flex w-full p-4 md:p-7 flex-wrap justify-evenly items-center ">
            <div className=" flex flex-col justify-evenly p-4 w-full  md:w-[40%] ">
                <span className="  text-2xl text-gray-500 font-bold justify-self-start ">Basic Information</span>
                <div className={`${errtoggle == true ? "block" : "hidden"} text-red-600 text-base font-semibold `} >{errMsg}</div>

                <div className="flex flex-col p-4 gap-2">
                    <label className="text-sm text-black font-bold" htmlFor="fname">First Name</label>
                    <div className="w-full p-2 bg-gray-100 rounded-lg"><input className="focus:outline-none w-full text-xl text-black font-bold bg-transparent p-2" type="text" name="fname," id="fname" value={fname} onInput={(e) => {
                        setfname(e.target.value)
                    }} /></div>
                </div>
                <div className="flex flex-col p-4 gap-2">
                    <label className="text-sm text-black font-bold" htmlFor="lname">Last Name</label>
                    <div className="w-full p-2 bg-gray-100 rounded-lg"><input className="focus:outline-none w-full text-xl text-black bg-transparent font-bold p-2" type="text" name="lname," id="lname" value={lname} onInput={(e) => {
                        setlname(e.target.value)
                    }} /></div>
                </div>
                <button className="bg-black text-white px-3 py-3 rounded-xl w-[300px] text-xl font-bold" onClick={handleClick} >Save Changes</button>



            </div>
            <div className="md:w-[3px] md:h-full bg-black rounded-3xl border-2 border-black"></div>
            <div className=" flex flex-col justify-evenly p-4 md:w-[40%] w-full">
                <span className="  text-2xl text-gray-500 font-bold justify-self-start ">Password</span>
                <div className={`${err2toggle == true ? "block" : "hidden"} text-red-600 text-base font-semibold `} >{err2Msg}</div>

                <div className="flex flex-col p-4 gap-2">
                    <label className="text-sm text-black font-bold" htmlFor="opass">Old Password</label>
                    <div className="w-full p-2 bg-gray-100 rounded-lg flex relative items-center">
                        <input className="focus:outline-none w-full text-xl text-black font-bold bg-transparent p-2" type={passToggle1?"text":"password"} name="opass" id="opass" value={oldpassword} onInput={(e) => {
                            setin1(true)
                            setoldPassword(e.target.value)
                        }} />
                        <button className="absolute right-[15px] " onClick={()=>{setpassToggle1((t)=>!t)}}>
                            {in1 ? passToggle1 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                : <></>}
                        </button>

                    </div>
                </div>
                <div className="flex flex-col p-4 gap-2">
                    <label className="text-sm text-black font-bold" htmlFor="npass">New Password</label>
                    <div className="w-full p-2 bg-gray-100 rounded-lg flex relative items-center">
                        <input className="focus:outline-none w-full text-xl text-black bg-transparent font-bold p-2" type={passToggle2 ? "text" : "password"} name="npass" id="npass" value={newpassword} onInput={(e) => {
                            setin2(true);
                            setnewpassword(e.target.value)
                        }} />
                        <button className="absolute right-[15px] " onClick={()=>{setpassToggle2((t)=>!t)}}>
                            {in2 ? passToggle2 ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                            </svg>
                                : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                                </svg>
                                : <></>}
                        </button>


                    </div>
                </div>
                <button className="bg-black text-white px-3 py-3 rounded-xl w-[300px] text-xl font-bold" onClick={handlepass} >Change Password</button>



            </div>

        </div>

    </div>
}