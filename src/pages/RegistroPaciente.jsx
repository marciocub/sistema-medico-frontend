import RegistroPacienteForm from '../components/forms/RegistroPacienteForm';

export default function RegistroPaciente() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-8">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Registro de Paciente</h1>
          <p className="text-gray-500 text-sm mt-1">Completa tus datos para crear una cuenta</p>
        </div>
        <RegistroPacienteForm />
        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
}
