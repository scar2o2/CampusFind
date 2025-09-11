import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "./components/Auth"
import Home from "./components/Home"
import LostItemPage from "./components/LostItemPage"
import FoundItemPage from "./components/FoundItemPage"



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/auth" element={<Auth/>}/>
        <Route path="/lostitem" element={<LostItemPage/>}/>
        <Route path="founditem" element={<FoundItemPage/>}/>

      </Routes>
    </BrowserRouter>
  
  )
}

export default App