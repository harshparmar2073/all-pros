import React from 'react'
import { Route, Routes } from 'react-router'
import ForgotPassword from './components/ForgotPassword'
import HomePage from './Pages/HomePage'
import RestaurantLogin from './Pages/RestaurantLogin'
import UserLogin from './Pages/UserLogin'
import RestaurantSignup from './Pages/RestaurantSignup'
import UserSignup from './Pages/UserSignup'
import VerificationPage from './components/VerificationPage'
import RestaurantDashboard from './Pages/Dashboard'
import Jobs from './components/Jobs'
import UserDashboard from './Pages/UserDashboard'

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
        <Route path='/verification' element={<VerificationPage/>} />
        <Route path='/dashboard' element={<RestaurantDashboard/>} />
        <Route path='/jobs' element={<Jobs/>} />
        <Route path='/user-dashboard'element={<UserDashboard/>} />

      </Routes>
      
    </div>
  )
}

export default App