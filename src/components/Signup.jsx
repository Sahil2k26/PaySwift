
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { popupToggle } from "../atom";
import Loader from "./Loader"

export function Signup() {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [visible, setVisible] = useState(false);
    const [isInput, setInput] = useState(false);
    const [errorToggle,setErrorToggle]=useState(false);
    const [errMsg,setErrMsg]=useState("")
    const setpToggle=useSetRecoilState(popupToggle);
    const navigate = useNavigate();
    const [load,setload]=useState(false)

    const handleSignup = async () => {
        
        if (!firstname || !lastname || !username || !password) {
            setErrorToggle(true)
            setErrMsg("All fields are required")
        
            return;
        }
        

        try {
            const res = await axios.post("http://localhost:3000/api/v1/user/signup", {
                username,
                password,
                firstName: firstname,
                lastName: lastname,
            });

            if(!res.data.token){
                setErrorToggle(true)
                setErrMsg(res.data.msg)
               
                return;
            }



            console.log(res.data);
            localStorage.setItem("token",res.data.token)
            setErrorToggle(false);
            setpToggle(true)
            setTimeout(()=>setpToggle(false),10000);
           

            navigate("/dashboard");
        } catch (e) {
            alert("Something went wrong");
        }
    };

    return (
        <div className="w-full h-[100vh] flex justify-center items-center bg-zinc-600">
            <div className="p-4 flex flex-col items-center justify-center gap-4 bg-white rounded-xl w-[350px] h-[80vh] shadow-2xl">
                <div className="flex flex-col gap-2">
                    <span className="text-center text-black font-bold text-3xl">Sign Up</span>
                    <span className="text-center text-gray-500 font-semibold text-lg">
                        Enter your information to create an account
                    </span>
                </div>
                <div className={`bg-rose-200 border-2 border-red-600 w-[80%] text-red-600 text-lg px-3 py-3 flex justify-center items-center ${errorToggle ? "block h-[36px]" : "hidden h-0"}  `}>{errMsg}</div>

                <div className="flex flex-col w-[90%]">
                    <label htmlFor="fname" className="text-black text-md font-semibold">
                        First Name
                    </label>
                    <div className="border-2 border-gray-200 rounded-lg">
                        <input
                            className="w-full px-4 py-2 border-3 border-solid border-black rounded-lg"
                            type="text"
                            name="fname"
                            id="fname"
                            placeholder="John"
                            onInput={(e) => setFirstname(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-[90%]">
                    <label htmlFor="lname" className="text-black text-md font-semibold">
                        Last Name
                    </label>
                    <div className="border-2 border-gray-200 rounded-lg">
                        <input
                            className="w-full px-4 py-2 border-1 border-black rounded-lg"
                            type="text"
                            name="lname"
                            id="lname"
                            placeholder="Doe"
                            onInput={(e) => setLastname(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-[90%]">
                    <label htmlFor="email" className="text-black text-md font-semibold">
                        Email
                    </label>
                    <div className="border-2 border-gray-200 rounded-lg">
                        <input
                            className="w-full px-4 py-2 border-1 border-black rounded-lg"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="john@example.com"
                            onInput={(e) => setUsername(e.target.value)}
                        />
                    </div>
                </div>

                <div className="flex flex-col w-[90%]">
                    <label htmlFor="password" className="text-black text-md font-semibold">
                        Password
                    </label>
                    <div className="border-2 border-gray-200 rounded-lg flex items-center">
                        <input
                            className="focus:outline-none w-full px-4 py-2 border-1 border-black rounded-lg"
                            type={visible ? "text" : "password"}
                            name="password"
                            id="password"
                            onInput={(e) => {
                                setInput(true);
                                setPassword(e.target.value);
                            }}
                        />
                        {isInput && (
                            <button
                                className="flex justify-center items-center relative right-[3px] w-10 h-9 bg-transparent rounded-full hover:bg-gray-200"
                                onClick={() => setVisible((v) => !v)}
                            >
                                {visible ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                        />
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="size-6"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                                        />
                                    </svg>
                                )}
                            </button>
                        )}
                    </div>
                </div>

                <div className="w-[90%] flex flex-col">
                    <button
                        className="px-4 py-2 rounded-lg w-full bg-black text-white font-semibold"
                        onClick={ async()=>{ setload(true);
                            await handleSignup()
                        setload(false)}  }
                    >
                       {load?<Loader></Loader>:" Sign Up"}
                    </button>
                    <div className="text-center text-black text-md font-medium">
                        Already have an account?
                        <a className="underline" href="" onClick={() => navigate("/signin")}>
                            Login
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
