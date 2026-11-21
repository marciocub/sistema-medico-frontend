import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import RoleRoute from './components/common/RoleRoute';
import Login from './pages/Login';
import RegistroPaciente from './pages/RegistroPaciente';
import Dashboard from './pages/Dashboard';
import Turnos from './pages/Turnos';
import Admin from './pages/Admin';
import Especialidades from './pages/Especialidades';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegistroPaciente />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/turnos"
            element={
              <ProtectedRoute>
                <Turnos />
              </ProtectedRoute>
            }
          />
          <Route
            path="/especialidades"
            element={
              <RoleRoute allowedRoles={['ADMIN']}>
                <Especialidades />
              </RoleRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <RoleRoute allowedRoles={['ADMIN']}>
                <Admin />
              </RoleRoute>
            }
          />
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

