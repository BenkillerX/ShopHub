import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Products from './components/Products'
import Login from './components/Login'
import Signup from './components/Signup'
import { ToastContainer } from 'react-toastify'
import Admin from './components/admin/Admin'
import { useAuthRole } from './hooks/useAuthRole'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  
  const {user, role, loading} = useAuthRole()
  console.log(user?.email, role);
  
  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <>
    <Navbar/>
    <ToastContainer/>
      <Routes>
        <Route path='/' element={<Products/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
          <Route path='/admin' 
          element={         
          <ProtectedRoute user={user} role={role} requiredRole='admin'>
            <Admin/>
          </ProtectedRoute>
          }/>
      </Routes>
    </>
  )
}

export default App
