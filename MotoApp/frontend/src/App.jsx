import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddBikePage from './pages/AddBike'
import { useState } from 'react'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        
        <Route
          path='/register'
          element={<RegisterPage/>}
        />

        <Route
          path='/login'
          element={<LoginPage/>}
        />

        <Route
          path='/dashboard'
          element={<Dashboard/>}
        />
        <Route
          path='/add-bike'
          element={<AddBikePage/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
