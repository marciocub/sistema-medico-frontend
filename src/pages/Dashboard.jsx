import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';

export default function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Bienvenido, {user?.username}
          </h1>
          <p className="text-gray-500 mt-1">
            Rol: <span className="font-semibold text-blue-600">{user?.rol}</span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-gray-700">Turnos</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">—</p>
            <p className="text-sm text-gray-500 mt-1">Turnos programados</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-gray-700">Pacientes</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">—</p>
            <p className="text-sm text-gray-500 mt-1">Pacientes registrados</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-cyan-500">
            <h3 className="text-lg font-semibold text-gray-700">Médicos</h3>
            <p className="text-3xl font-bold text-cyan-600 mt-2">—</p>
            <p className="text-sm text-gray-500 mt-1">Profesionales activos</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Acciones rápidas</h2>
          <div className="flex flex-wrap gap-3">
            <a
              href="/turnos"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium"
            >
              Ver Turnos
            </a>
            {user?.rol === 'ADMIN' && (
              <a
                href="/admin"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
              >
                Panel Admin
              </a>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
