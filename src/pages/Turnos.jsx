import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Alert from '../components/common/Alert';
import Spinner from '../components/common/Spinner';
import { listarTurnos, crearTurno, listarProfesionales } from '../services/api';

export default function Turnos() {
  const { user } = useContext(AuthContext);
  const [turnos, setTurnos] = useState([]);
  const [profesionales, setProfesionales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [form, setForm] = useState({ profesionalId: '', fechaHora: '', motivo: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [turnosRes, profRes] = await Promise.all([listarTurnos(), listarProfesionales()]);
        setTurnos(turnosRes.data);
        setProfesionales(profRes.data);
      } catch { setError('Error al cargar los datos.'); }
      finally { setLoading(false); }
    };
    fetchData();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setSuccess(''); setSubmitting(true);
    try {
      await crearTurno({ pacienteId: 1, profesionalId: Number(form.profesionalId), fechaHora: form.fechaHora, motivo: form.motivo });
      setSuccess('Turno creado exitosamente.');
      setForm({ profesionalId: '', fechaHora: '', motivo: '' });
      const res = await listarTurnos();
      setTurnos(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error al crear el turno.');
    } finally { setSubmitting(false); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Gestión de Turnos</h1>
        <Alert type="error" message={error} onClose={() => setError('')} />
        <Alert type="success" message={success} onClose={() => setSuccess('')} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Nuevo Turno</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Profesional</label>
                <select name="profesionalId" value={form.profesionalId} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option value="">Seleccionar profesional</option>
                  {profesionales.map((p) => (
                    <option key={p.id} value={p.id}>{p.nombre} {p.apellido} - {p.especialidad}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fecha y Hora</label>
                <input type="datetime-local" name="fechaHora" value={form.fechaHora} onChange={handleChange} required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Motivo</label>
                <textarea name="motivo" value={form.motivo} onChange={handleChange} rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Motivo de la consulta" />
              </div>
              <button type="submit" disabled={submitting}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 flex items-center justify-center">
                {submitting ? <Spinner size="sm" /> : 'Crear Turno'}
              </button>
            </form>
          </div>
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Turnos Existentes</h2>
            {loading ? (
              <div className="flex justify-center py-8"><Spinner size="lg" /></div>
            ) : turnos.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No hay turnos registrados.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-2 text-gray-600 font-semibold">ID</th>
                      <th className="text-left py-3 px-2 text-gray-600 font-semibold">Paciente</th>
                      <th className="text-left py-3 px-2 text-gray-600 font-semibold">Profesional</th>
                      <th className="text-left py-3 px-2 text-gray-600 font-semibold">Fecha/Hora</th>
                      <th className="text-left py-3 px-2 text-gray-600 font-semibold">Estado</th>
                      <th className="text-left py-3 px-2 text-gray-600 font-semibold">Motivo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {turnos.map((t) => (
                      <tr key={t.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-2">{t.id}</td>
                        <td className="py-3 px-2">{t.pacienteId}</td>
                        <td className="py-3 px-2">{t.profesionalId}</td>
                        <td className="py-3 px-2">{new Date(t.fechaHora).toLocaleString('es-AR')}</td>
                        <td className="py-3 px-2">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">{t.estado}</span>
                        </td>
                        <td className="py-3 px-2">{t.motivo}</td>
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
