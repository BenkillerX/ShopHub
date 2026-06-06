import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import { useAuthRole } from './hooks/useAuthRole'
import ProtectedRoute from './components/ProtectedRoute'
import Footer from './components/Footer'
import BottomNav from './components/BottomNav'
import { useState } from 'react'
import BackToTop from './components/BackToTop'
import { lazy, Suspense } from 'react'
import LoaderSpinner from './components/LoaderSpinner'


  const Products = lazy(()=>import('./components/Products'))
  const Admin = lazy(()=>import('./components/admin/Admin'))
  const Cart = lazy(()=>import('./components/Cart'))
  const Login = lazy(()=>import('./components/Login'))
  const Signup = lazy(()=>import('./components/Signup'))
  const Search = lazy(()=>import('./components/Search'))
  const Accounts = lazy(()=>import('./components/Accounts'))
function App() {
  
  const {user, role, loading} = useAuthRole();
  const [search, setSearch]= useState<string>("")
 if (loading) {
  return (
    <LoaderSpinner/>
  );
}


  return (
    <>
    <Navbar search={search} setSearch={setSearch}/>
    <ToastContainer/>
    <Suspense fallback={
    <LoaderSpinner/>
  }
    >
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
    </Suspense>
      
      <BottomNav/>
      <Footer/>
      <BackToTop/>
    </>
  )
}

export default App
