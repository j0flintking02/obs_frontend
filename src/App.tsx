import './App.css'
import { Outlet} from "react-router-dom";
import MainNavigation from "./components/MainNavigation.tsx";


function App() {

  return (
    <div className="h-screen overflow-hidden">
      <MainNavigation/>
        <Outlet />
    </div>
  )
}

export default App
