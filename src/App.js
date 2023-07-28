import Home from "./components/home";
import Chat from "./components/chat";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css'
function App() {
    return (
        <BrowserRouter>
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/chat" element={<Chat/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App