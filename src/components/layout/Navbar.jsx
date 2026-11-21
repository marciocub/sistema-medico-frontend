import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ThemeContext } from '../../context/ThemeContext';
import { LogOut, LayoutDashboard, Calendar, Settings, User, Moon, Sun } from 'lucide-react';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className={darkMode ? 'bg-gray-900 shadow-md border-b border-gray-700' : 'bg-white shadow-md border-b border-gray-200'}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="text-xl font-bold text-blue-600 dark:text-blue-400">
              🏥 Sistema Médico
            </Link>
            <div className="hidden md:flex space-x-4">
              <Link
                to="/dashboard"
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                <LayoutDashboard size={16} />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/turnos"
                className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                <Calendar size={16} />
                <span>Turnos</span>
              </Link>
              {user.rol === 'ADMIN' && (
                <>
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <Settings size={16} />
                    <span>Admin</span>
                  </Link>
                  <Link
                    to="/especialidades"
                    className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <Calendar size={16} />
                    <span>Especialidades</span>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              title={darkMode ? 'Modo claro' : 'Modo oscuro'}
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
              <User size={16} />
              <span>{user.username}</span>
              <span className="px-2 py-0.5 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs font-semibold">
                {user.rol}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 px-3 py-2 rounded-md text-sm font-medium"
            >
              <LogOut size={16} />
              <span>Salir</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
