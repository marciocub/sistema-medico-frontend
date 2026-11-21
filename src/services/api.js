import axios from 'axios';

// Configuración de URLs por microservicio (Option A: puertos individuales)
const API_URLS = {
  orquestador: import.meta.env.VITE_API_ORQUESTADOR_URL || 'http://localhost:8080',
  seguridad: import.meta.env.VITE_API_SEGURIDAD_URL || 'http://localhost:8081',
  pacientes: import.meta.env.VITE_API_PACIENTES_URL || 'http://localhost:8082',
  profesionales: import.meta.env.VITE_API_PROFESIONALES_URL || 'http://localhost:8083',
  turnos: import.meta.env.VITE_API_TURNOS_URL || 'http://localhost:8084',
};

// Interceptor común para manejar 401 (no autenticado)
const authInterceptor = (error) => {
  if (error.response && error.response.status === 401) {
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }
  return Promise.reject(error);
};

// === Auth (Seguridad - Puerto 8081) ===
const apiAuth = axios.create({
  baseURL: API_URLS.seguridad,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiAuth.interceptors.response.use((response) => response, authInterceptor);

export const login = (credentials) => apiAuth.post('/api/auth/login', credentials);
export const logout = () => apiAuth.post('/api/auth/logout');
export const getMe = () => apiAuth.get('/api/auth/me');

// === Pacientes (Puerto 8082) ===
const apiPacientes = axios.create({
  baseURL: API_URLS.pacientes,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiPacientes.interceptors.response.use((response) => response, authInterceptor);

export const registroPaciente = (data) => apiPacientes.post('/api/pacientes/registro', data);
export const listarPacientes = () => apiPacientes.get('/api/pacientes');
export const obtenerPaciente = (id) => apiPacientes.get(`/api/pacientes/${id}`);

// === Profesionales (Puerto 8083) ===
const apiProfesionales = axios.create({
  baseURL: API_URLS.profesionales,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiProfesionales.interceptors.response.use((response) => response, authInterceptor);

export const listarProfesionales = () => apiProfesionales.get('/api/profesionales');
export const obtenerProfesional = (id) => apiProfesionales.get(`/api/profesionales/${id}`);
export const listarEspecialidades = () => apiProfesionales.get('/api/especialidades');
export const crearMedico = (data) => apiProfesionales.post('/api/medicos', data);

// === Especialidades (Puerto 8083) ===
export const crearEspecialidad = (data) => apiProfesionales.post('/api/especialidades', data);
export const actualizarEspecialidad = (id, data) => apiProfesionales.put(`/api/especialidades/${id}`, data);
export const eliminarEspecialidad = (id) => apiProfesionales.delete(`/api/especialidades/${id}`);

// === Turnos (Puerto 8084) ===
const apiTurnos = axios.create({
  baseURL: API_URLS.turnos,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiTurnos.interceptors.response.use((response) => response, authInterceptor);

export const listarTurnos = () => apiTurnos.get('/api/turnos');
export const obtenerTurno = (id) => apiTurnos.get(`/api/turnos/${id}`);
export const crearTurno = (data) => apiTurnos.post('/api/turnos', data);
export const cancelarTurno = (id) => apiTurnos.delete(`/api/turnos/${id}`);
export const listarTurnosPorPaciente = (pacienteId) => apiTurnos.get(`/api/turnos/paciente/${pacienteId}`);

// === Orquestador (Puerto 8080) ===
const apiOrquestador = axios.create({
  baseURL: API_URLS.orquestador,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
apiOrquestador.interceptors.response.use((response) => response, authInterceptor);

export default { apiAuth, apiPacientes, apiProfesionales, apiTurnos, apiOrquestador };
