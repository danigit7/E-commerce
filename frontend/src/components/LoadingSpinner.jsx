function LoadingSpinner({ size = 'default' }) {
  const sizeClasses = {
    small: 'w-6 h-6',
    default: 'w-12 h-12',
    large: 'w-16 h-16',
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`spinner ${sizeClasses[size]}`}></div>
    </div>
  );
}

export default LoadingSpinner;

