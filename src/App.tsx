import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Products from './components/Products'
import Login from './components/Login'
import Signup from './components/Signup'
import { ToastContainer } from 'react-toastify'
import Admin from './components/admin/Admin'
import { useAuthRole } from './hooks/useAuthRole'
import ProtectedRoute from './components/ProtectedRoute'
import Cart from './components/Cart'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import Accounts from './components/Accounts'
import { useState } from 'react'
import Search from './components/Search'

function App() {
  
  const {user, role, loading} = useAuthRole();
  const [search, setSearch]= useState<string>("")
 if (loading) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>
        <p className="text-black font-semibold">Loading...</p>
      </div>
    </div>
  );
}


  return (
    <>
    <Navbar search={search} setSearch={setSearch}/>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/cart' element={<Cart/>}/>
          <Route path='/admin' 
          element={         
          <ProtectedRoute user={user} role={role} requiredRole='admin'>
            <Admin/>
          </ProtectedRoute>
          }/>
          <Route path='/account' element={<Accounts/>}/>
          <Route path='/search' element={<Search/>}/>
      </Routes>
      <BottomNav/>
      <Footer/>
    </>
  )
}

export default App
