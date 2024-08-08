import { useRecoilValue } from "recoil";
import { popupToggle } from "../atom";

export function Popup(){
    const ptoggle=useRecoilValue(popupToggle)
    if(!ptoggle){
        return <></>
    }
    return <div className="ml-[5vw] w-[250px] h-[120px] p-5 bg-purple-200  border-black border-3 rounded-2xl outline-2 outline-offset-2 outline-purple-950 flex justify-center items-center text-black text-2xl font-mono font-bold  ">
        Welcome Back!
    </div>
}