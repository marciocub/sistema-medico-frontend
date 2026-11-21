import { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Alert from '../components/common/Alert';
import Spinner from '../components/common/Spinner';
import { crearMedico, listarProfesionales, listarEspecialidades } from '../services/api';

export default function Admin() {
  const [form, setForm] = useState({ username: '', password: '', nombre: '', apellido: '', matricula: '', especialidad: '' });
  const [medicos, setMedicos] = useState([]);
  const [especialidades, setEspecialidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [medRes, espRes] = await Promise.all([listarProfesionales(), listarEspecialidades()]);
        setMedicos(medRes.data);
        setEspecialidades(espRes.data);
      } catch { setError('Error al cargar datos.'); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setSubmitting(true);
    try {
      await crearMedico(form);
      setSuccess('Medico creado exitosamente.');
      setForm({ username: '', password: '', nombre: '', apellido: '', matricula: '', especialidad: '' });
      const res = await listarProfesionales();
      setMedicos(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el medico.');
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de Administracion</h1>
        <Alert type="error" message={error} onClose={() => setError('')} />
        <Alert type="success" message={success} onClose={() => setSuccess('')} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Alta de Medico</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nombre</label>
                  <input type="text" name="nombre" value={form.nombre} onChange={handleChange} required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Apellido</label>
                  <input type="text" name="apellido" value={form.apellido} onChange={handleChange} required
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Usuario (email)</label>
                <input type="text" name="username" value={form.username} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Contrasena</label>
                <input type="password" name="password" value={form.password} onChange={handleChange} required minLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Matricula</label>
                <input type="text" name="matricula" value={form.matricula} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Especialidad</label>
                <select name="especialidad" value={form.especialidad} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Seleccionar especialidad</option>
                  {especialidades.map((e) => (
                    <option key={e.id} value={e.nombre}>{e.nombre}</option>
                  ))}
                </select>
              </div>
              <button type="submit" disabled={submitting}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 flex items-center justify-center">
                {submitting ? <Spinner size="sm" /> : 'Crear Medico'}
              </button>
            </form>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Medicos Registrados</h2>
            {loading ? (
              <div className="flex justify-center py-8"><Spinner size="lg" /></div>
            ) : medicos.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay medicos registrados.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-gray-600 font-semibold">Nombre</th>
                      <th className="text-left py-3 px-2 text-gray-600 font-semibold">Matricula</th>
                      <th className="text-left py-3 px-2 text-gray-600 font-semibold">Especialidad</th>
                      <th className="text-left py-3 px-2 text-gray-600 font-semibold">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicos.map((m) => (
                      <tr key={m.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2">{m.nombre} {m.apellido}</td>
                        <td className="py-3 px-2">{m.matricula}</td>
                        <td className="py-3 px-2">{m.especialidad}</td>
                        <td className="py-3 px-2">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${m.activo ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {m.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
            <h3 className="text-lg font-semibold text-gray-700">Medicos</h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{medicos.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
            <h3 className="text-lg font-semibold text-gray-700">Especialidades</h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{especialidades.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-cyan-500">
            <h3 className="text-lg font-semibold text-gray-700">Turnos</h3>
            <p className="text-3xl font-bold text-cyan-600 mt-2">-</p>
          </div>
        </div>
      </main>
    </div>
  );
}
