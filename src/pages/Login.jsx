import LoginForm from '../components/forms/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-cyan-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Iniciar Sesión</h1>
          <p className="text-gray-500 text-sm mt-1">Sistema de Gestión Médica</p>
        </div>
        <LoginForm />
        <p className="text-center text-sm text-gray-500 mt-4">
          ¿No tienes cuenta?{' '}
          <a href="/register" className="text-blue-600 hover:underline">
            Regístrate aquí
          </a>
        </p>
      </div>
    </div>
  );
}
