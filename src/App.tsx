import { Route, Routes } from 'react-router-dom'
import Login from './commponents/Login'
import Signup from './commponents/Signup'
import Navbar from './commponents/Navbar'
import Products from './commponents/Products'
function App() {

  return (
    <>
      <Navbar/>
      <Routes>
      <Route path='/' element={<Products/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>
      </Routes>
    </>
  )
}

export default App
