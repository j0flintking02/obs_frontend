import './App.css'
import {Outlet, useNavigate} from "react-router-dom";
import MainNavigation from "./components/MainNavigation.tsx";
import {useEffect} from "react";


function App() {
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate()
    useEffect(() => {
        if (!user){ navigate('/login')}
    }, [])

return (
    <div className="h-screen overflow-hidden">
        <MainNavigation/>
        <Outlet/>
    </div>
)
}

export default App
