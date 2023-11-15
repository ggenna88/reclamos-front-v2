import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useAuth } from './AuthContext';

const useAuthRoute = (requiredPermissions = []) => {
  const history = useHistory();
  const { isAuthenticated, userPermissions, logout } = useAuth();

  useEffect(() => {
    const isAuthorized = () => {
      // Check if the user is authenticated
      if (!isAuthenticated) {
        return false;
      }

      // Check if the user has the required permissions
      if (requiredPermissions.length > 0 && !userPermissions.some(permission => requiredPermissions.includes(permission))) {
        return false;
      }

      // Additional custom authorization logic can be added here

      return true;
    };

    if (!isAuthorized()) {
      // Redirect to the login page or another route if not authorized
      history.push('/HomePage');

      // Optionally, you can perform actions like logging out the user
      //logout(); !!!! implementar logout
    }
  }, [isAuthenticated, userPermissions, history, requiredPermissions, logout]);

  return {
    isAuthenticated,
    userPermissions,
  };
};

export default useAuthRoute;
