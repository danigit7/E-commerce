import { toast } from 'react-toastify';

// Toast utility functions with consistent styling
export const showToast = {
  // Success toast
  success: (message, options = {}) => {
    return toast.success(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...options,
    });
  },

  // Error toast
  error: (message, options = {}) => {
    return toast.error(message, {
      position: 'top-right',
      autoClose: 7000, // Longer for errors
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...options,
    });
  },

  // Warning toast
  warning: (message, options = {}) => {
    return toast.warning(message, {
      position: 'top-right',
      autoClose: 6000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...options,
    });
  },

  // Info toast
  info: (message, options = {}) => {
    return toast.info(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...options,
    });
  },

  // Default toast
  default: (message, options = {}) => {
    return toast(message, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      ...options,
    });
  },

  // Loading toast
  loading: (message, options = {}) => {
    return toast.loading(message, {
      position: 'top-right',
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      ...options,
    });
  },

  // Promise toast
  promise: (promise, messages, options = {}) => {
    return toast.promise(promise, {
      pending: messages.pending || 'Loading...',
      success: messages.success || 'Success!',
      error: messages.error || 'Something went wrong!',
      ...options,
    });
  },

  // Dismiss toast
  dismiss: (toastId) => {
    return toast.dismiss(toastId);
  },

  // Dismiss all toasts
  dismissAll: () => {
    return toast.dismiss();
  },
};

// Export individual functions for convenience
export const toastSuccess = showToast.success;
export const toastError = showToast.error;
export const toastWarning = showToast.warning;
export const toastInfo = showToast.info;
export const toastDefault = showToast.default;
export const toastLoading = showToast.loading;
export const toastPromise = showToast.promise;
export const toastDismiss = showToast.dismiss;
export const toastDismissAll = showToast.dismissAll;

export default showToast;
