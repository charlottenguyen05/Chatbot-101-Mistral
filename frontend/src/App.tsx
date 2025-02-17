import NavBar from "./components/NavBar"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import NotFound from "./pages/NotFound"
import Home from "./pages/Home"
import {Routes, Route} from "react-router"
import Footer from "./pages/Footer"


function App() {
  return (
    <main>
      <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/inscription" element={<Signup/>}/>
        <Route path="/connexion" element={<Login/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
      <Footer/>
    </main>
  )
}

export default App
