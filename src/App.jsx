import React from 'react'
import { Route, Routes } from 'react-router'
import ForgotPassword from './components/ForgotPassword'
import HomePage from './Pages/HomePage'
import RestaurantLogin from './Pages/RestaurantLogin'
import UserLogin from './Pages/UserLogin'
import RestaurantSignup from './Pages/RestaurantSignup'
import UserSignup from './Pages/UserSignup'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path='/forgot-password' element={<ForgotPassword/>} />
        <Route path="/restaurant-login" element={<RestaurantLogin/>} />
        <Route path="/user-login" element={<UserLogin/>} />
        <Route path='/restaurant-signup' element={<RestaurantSignup/>} />
        <Route path='/user-signup'element={<UserSignup/>} />

      </Routes>
      
    </div>
  )
}

export default App