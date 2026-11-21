export default function Alert({ type = 'error', message, onClose }) {
  if (!message) return null;

  const styles = {
    error: 'bg-red-50 border-red-200 text-red-700',
    success: 'bg-green-50 border-green-200 text-green-700',
    info: 'bg-blue-50 border-blue-200 text-blue-700',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-700',
  };

  return (
    <div className={`border rounded-lg p-3 mb-4 flex items-center justify-between ${styles[type]}`}>
      <span className="text-sm">{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-sm font-bold hover:opacity-70"
        >
          ×
        </button>
      )}
    </div>
  );
}
