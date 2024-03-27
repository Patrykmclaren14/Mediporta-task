import TagList from "./TagList"
import Header from "./Header"
import Footer from "./Footer"
import Home from "./Home"
import { Routes, Route, Navigate } from "react-router-dom"

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Navigate to="/" />} />
        <Route path="/task" element={<TagList />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App
