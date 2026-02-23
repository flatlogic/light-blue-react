import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { AdminRoute, UserRoute, AuthRoute } from './RouteComponents';

/* eslint-disable */
import ErrorPage from '../pages/error';
/* eslint-enable */

import '../styles/theme.scss';
import LayoutComponent from '../components/Layout';
import DocumentationLayoutComponent from '../documentation/DocumentationLayout';
import Login from '../pages/auth/login';
import Verify from '../pages/auth/verify';
import Register from '../pages/auth/register';
import Reset from '../pages/auth/reset';
import Forgot from '../pages/auth/forgot';

const CloseButton = ({ closeToast }) => (
  <button
    type="button"
    onClick={closeToast}
    className="Toastify__close-button notifications-close"
    aria-label="Close notification"
  >
    <i className="la la-close" />
  </button>
);

const App = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector((store) => store.auth.currentUser);

  return (
    <div>
      <ToastContainer
        autoClose={5000}
        hideProgressBar
        closeButton={<CloseButton />}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/app/main" replace />} />
          <Route path="/app" element={<Navigate to="/app/main" replace />} />
          <Route
            path="/app/*"
            element={(
              <UserRoute dispatch={dispatch}>
                <LayoutComponent />
              </UserRoute>
            )}
          />
          <Route
            path="/admin/*"
            element={(
              <AdminRoute currentUser={currentUser}>
                <LayoutComponent />
              </AdminRoute>
            )}
          />
          <Route
            path="/documentation"
            element={<Navigate to="/documentation/getting-started/overview" replace />}
          />
          <Route path="/documentation/*" element={<DocumentationLayoutComponent />} />
          <Route
            path="/register"
            element={(
              <AuthRoute>
                <Register />
              </AuthRoute>
            )}
          />
          <Route
            path="/login"
            element={(
              <AuthRoute>
                <Login />
              </AuthRoute>
            )}
          />
          <Route
            path="/verify-email"
            element={(
              <AuthRoute>
                <Verify />
              </AuthRoute>
            )}
          />
          <Route
            path="/password-reset"
            element={(
              <AuthRoute>
                <Reset />
              </AuthRoute>
            )}
          />
          <Route
            path="/forgot"
            element={(
              <AuthRoute>
                <Forgot />
              </AuthRoute>
            )}
          />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<Navigate to="/app/main/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
