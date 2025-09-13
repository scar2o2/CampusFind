import { BrowserRouter, Route, Routes } from "react-router-dom"
import Auth from "./components/Auth"
import Home from "./components/Home"
import LostItemPage from "./components/LostItemPage"
import FoundItemPage from "./components/FoundItemPage"
import { AuthProvider} from "./utils/AuthContext"
import PageNotFound from "./components/PageNotFound"
import PostItem from "./components/PostItem"
import PersonalDetails from "./components/PersonalDetails"


const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/lostitem" element={<LostItemPage/>}/>
          <Route path="/founditem" element={<FoundItemPage/>}/>
          <Route path="/postitem" element={<PostItem/>}/>
          <Route path="/details" element={<PersonalDetails/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App