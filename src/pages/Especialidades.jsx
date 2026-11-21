import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Alert from '../components/common/Alert';
import Spinner from '../components/common/Spinner';
import { listarEspecialidades, crearEspecialidad, actualizarEspecialidad, eliminarEspecialidad } from '../services/api';

export default function Especialidades() {
  const { user } = useContext(AuthContext);
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ id: '', nombre: '' });
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    const fetchEspecialidades = async () => {
      setLoading(true);
      try {
        const res = await listarEspecialidades();
        setEspecialidades(res.data);
      } catch {
        setError('Error al cargar las especialidades.');
      } finally {
        setLoading(false);
      }
    };
    fetchEspecialidades();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setSubmitting(true);
    try {
      if (editingId) {
        await actualizarEspecialidad(editingId, { nombre: form.nombre });
        setSuccess('Especialidad actualizada exitosamente.');
      } else {
        await crearEspecialidad({ nombre: form.nombre });
        setSuccess('Especialidad creada exitosamente.');
      }
      setForm({ id: '', nombre: '' });
      setEditingId(null);
      const res = await listarEspecialidades();
      setEspecialidades(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al guardar la especialidad.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (especialidad) => {
    setForm({ id: especialidad.id, nombre: especialidad.nombre });
    setEditingId(especialidad.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Está seguro de eliminar esta especialidad?')) return;
    setError(''); setSuccess('');
    try {
      await eliminarEspecialidad(id);
      setSuccess('Especialidad eliminada exitosamente.');
      const res = await listarEspecialidades();
      setEspecialidades(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al eliminar la especialidad.');
    }
  };

  const handleCancel = () => {
    setForm({ id: '', nombre: '' });
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Gestion de Especialidades
          </h1>
          {editingId && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 text-sm font-medium"
            >
              Cancelar edicion
            </button>
          )}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 border border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              Especialidades Registradas
            </h2>
            {loading ? (
              <div className="flex justify-center py-8"><Spinner size="lg" /></div>
            ) : especialidades.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                No hay especialidades registradas.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-gray-700">
                      <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-300 font-semibold">
                        ID
                      </th>
                      <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-300 font-semibold">
                        Nombre
                      </th>
                      <th className="text-left py-3 px-2 text-gray-600 dark:text-gray-300 font-semibold">
                        Estado
                      </th>
                      <th className="text-center py-3 px-2 text-gray-600 dark:text-gray-300 font-semibold">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {especialidades.map((e) => (
                      <tr
                        key={e.id || index}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                          {e.id}
                        </td>
                        <td className="py-3 px-2 text-gray-700 dark:text-white">
                          {e.nombre}
                        </td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-0.5 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded-full text-xs font-semibold">
                            Activo
                          </span>
                        </td>
                        <td className="py-3 px-2 text-center space-x-2">
                          <button
                            onClick={() => handleEdit(e)}
                            className="p-1.5 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded-md"
                            title="Editar"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(e.id)}
                            className="p-1.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded-md"
                            title="Eliminar"
                          >
                            <svg
                              className="w-4 h-4"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
