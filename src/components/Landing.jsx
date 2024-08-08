
import { useNavigate } from "react-router-dom";
import Logo from "./Logo";

export function Landing() {
  const navigate=useNavigate();
  return (
    <div className="w-full h-[100vh] bgpartten  flex flex-col items-center  ">
      <header className="flex w-[80%]  p-3 rounded-full justify-between backdrop-blur-sm  brightness-100 relative shadow-full shadow-[#DFDBE5]">

        <div className="z-30"><Logo></Logo></div>
        <div className="flex  bg-white rounded-full relative z-30">
            <button className="border-none px-3 py-1 text-black font-semibold text-base hover:font-bold rounded-full" onClick={()=>navigate("/signup")}>Sign Up</button>
            <button className="bg-black text-white px-4 py-1 rounded-full font-semibold text-base hover:font-bold" onClick={()=>navigate("/signin")}>Sign In</button>

        </div>
        

      </header>
      <main className="flex w-full p-7 h-[70vh] justify-center items-center">
          <div className="w-[50%] p-7 flex flex-col justify-center items-center h-full gap-5 ">
            <h1 className="text-purple-950 text-4xl font-bold font-mono backdrop-blur-xl backdrop-brightness-100 ">Welcome to</h1>
            <span className="text-black text-6xl font-extrabold backdrop-blur-xl backdrop-brightness-100">PaySwift</span>
            <p className="text-lg font-mono font-bold text-black backdrop-blur-xl backdrop-brightness-100">PaySwift is a payments app that allows you to transfer money to other users safely. You can see all your transaction history and many more features to come.</p>
            <button className="px-5 py-3 rounded-lg bg-black text-white text-xl font-bold backdrop-blur-xl backdrop-brightness-100 hover:bg-gray-800 " onClick={()=>{navigate("/signup")}}>{"Get Started > "}</button>
            </div>
        </main>

    </div>
  );
}


