import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import AddBikePage from './pages/AddBike'
import { useState } from 'react'
import {Dashboard, EditBike} from './pages/Dashboard'
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
        <Route
          path='/edit-bike/:id'
          element={<EditBike/>}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
