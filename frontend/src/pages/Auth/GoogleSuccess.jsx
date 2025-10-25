import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { handleGoogleSuccess } from '../../store/slices/authSlice';
import LoadingSpinner from '../../components/LoadingSpinner';

function GoogleSuccess() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { loading, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      dispatch(handleGoogleSuccess(token));
    } else {
      navigate('/login?error=no_token');
    }
  }, [dispatch, navigate, searchParams]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gradient-luxury flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-charcoal-600">
          Completing Google authentication...
        </p>
      </div>
    </div>
  );
}

export default GoogleSuccess;
