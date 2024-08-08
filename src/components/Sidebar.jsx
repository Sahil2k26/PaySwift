import { useRecoilValue, useSetRecoilState } from "recoil";
import { ProfileToggle, sideToggle, userData } from "../atom";

export function Sidebar() {
    const sToggle = useRecoilValue(sideToggle);
    const userdata = useRecoilValue(userData);
    const Setprofiletoggle = useSetRecoilState(ProfileToggle);
    const setSideToggle=useSetRecoilState(sideToggle);
    if (!sToggle) {
        return <></>
    }
    return <div className=" w-[45%]  md:w-[15%] bg-black fixed top-0 h-[100vh] border-2 border-black flex flex-col box-border p-4 gap-[40px] z-20" >
        <button className="w-7 h-7 flex justify-center items-center absolute top-[10px] left-[10px]" onClick={()=>{setSideToggle(false)}}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
        </button>
        <div className="w-full h-[200px] flex flex-col gap-2 p-4 justify-center items-center  border-white pb-8 rounded-lg ">
            <div className="w-40 h-40 rounded-full border-2 border-black bg-purple-200 flex justify-center items-center text-black text-4xl font-bold">{userdata.myData.firstName.toUpperCase()[0]}</div>
            <span className="text-white text-2xl font-mono font-bold">{userdata.myData.firstName.toUpperCase() + " " + userdata.myData.lastName.toUpperCase()}</span>
            <div className=" w-full flex justify-center items-center gap-2">
                <span className="text-white text-sm font-medium">{userdata.myData.username}</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z" />
                </svg>
            </div>

        </div>
        <button className="w-full box-border px-3 py-3 flex gap-2 border-t-2 border-b-2 border-white text-white text-md hover:bg-gray-900  cursor-pointer rounded-lg" onClick={() => { Setprofiletoggle(true) }} >
            <div className="w-[45px] h-[45px] flex justify-center items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="size-7">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
            </div>

            <div className="w-[80%]  flex flex-col gap-2">
                <span className="text-lg ">Profile Settings</span>
                <span className="text-gray-400 text-xs hover:font-semibold hover:text-gray-200">change password, change name</span>
            </div>



        </button>




    </div>
}