
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from './Register'
import Login from './Login'
import ProtectedRoute from './Protectedroute'
import Admin from './Admin'
import User from './User'

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRoles={["User", "Admin"]}>
              <User />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App