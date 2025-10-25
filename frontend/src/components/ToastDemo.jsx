import { showToast } from '../utils/toast';

function ToastDemo() {
  const handleSuccess = () => {
    showToast.success('Success! Operation completed successfully.');
  };

  const handleError = () => {
    showToast.error('Error! Something went wrong.');
  };

  const handleWarning = () => {
    showToast.warning('Warning! Please check your input.');
  };

  const handleInfo = () => {
    showToast.info('Info: Here is some useful information.');
  };

  const handleLoading = () => {
    const toastId = showToast.loading('Loading... Please wait.');

    // Simulate async operation
    setTimeout(() => {
      showToast.dismiss(toastId);
      showToast.success('Loading complete!');
    }, 3000);
  };

  const handlePromise = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve() : reject();
      }, 2000);
    });

    showToast.promise(promise, {
      pending: 'Processing your request...',
      success: 'Request processed successfully!',
      error: 'Request failed. Please try again.',
    });
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Toast Notification Demo
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button
          onClick={handleSuccess}
          className="btn-primary bg-green-600 hover:bg-green-700"
        >
          Success Toast
        </button>

        <button
          onClick={handleError}
          className="btn-primary bg-red-600 hover:bg-red-700"
        >
          Error Toast
        </button>

        <button
          onClick={handleWarning}
          className="btn-primary bg-yellow-600 hover:bg-yellow-700"
        >
          Warning Toast
        </button>

        <button
          onClick={handleInfo}
          className="btn-primary bg-blue-600 hover:bg-blue-700"
        >
          Info Toast
        </button>

        <button
          onClick={handleLoading}
          className="btn-primary bg-purple-600 hover:bg-purple-700"
        >
          Loading Toast
        </button>

        <button
          onClick={handlePromise}
          className="btn-primary bg-indigo-600 hover:bg-indigo-700"
        >
          Promise Toast
        </button>
      </div>

      <div className="mt-6 text-center text-sm text-gray-600">
        Click any button to see different toast notifications
      </div>
    </div>
  );
}

export default ToastDemo;
