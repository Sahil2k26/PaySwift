
import { BrowserRouter, Route, Routes } from "react-router-dom"
import {Signup} from "./components/Signup"
import {Signin} from "./components/Signin"
import {Send} from "./components/Send"
import {Dashboard} from "./components/Dashboard"
import {Popup} from "./components/Popup"
import "./App.css"
import { RecoilRoot } from "recoil"
import { Landing } from "./components/Landing"


function App() {


  return <div >
    <RecoilRoot>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup></Signup>} ></Route>
        <Route path="/signin" element={<Signin></Signin>}></Route>
        <Route path="/dashboard" element={ <Dashboard></Dashboard>}></Route>
        <Route path="/send" element={<Send></Send>}></Route>
        <Route path="/" element={<Landing></Landing>}></Route>
      </Routes>
     
      
    </BrowserRouter>
    </RecoilRoot>
    
  
    
  </div>
    
}

export default App
