import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/Register'
import LoginPage from './pages/Login'
import AddBikePage from './pages/AddBike'
import {Dashboard, EditBike} from './pages/Dashboard'
import MaintenanceLog from './pages/MaintenanceLog'
import MaintenanceAdd from './pages/AddMaintenance'
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

        <Route
          path='/edit-bike/:id'
          element={<EditBike/>}
        />

        <Route
          path='/logs/:pk'
          element={<MaintenanceLog/>}
        />

        <Route
          path='/add-log/:pk'
          element={<MaintenanceAdd/>}
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App