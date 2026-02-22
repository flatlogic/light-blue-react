import { Navigate } from 'react-router-dom';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { AdminRoute, AuthRoute, UserRoute } from './RouteComponents';
import { logoutUser } from '../actions/auth';
import { isAuthenticated } from '../core/auth';

vi.mock('../core/auth', () => ({
  __esModule: true,
  isAuthenticated: vi.fn(),
}));

vi.mock('../actions/auth', () => ({
  logoutUser: vi.fn(() => ({ type: 'LOGOUT' })),
}));

const DummyComponent = () => null;
const dummyElement = <DummyComponent />;

describe('RouteComponents smoke tests', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('AuthRoute redirects authenticated users to fallback /app when location state is absent', () => {
    isAuthenticated.mockReturnValue(true);

    const element = AuthRoute({
      children: dummyElement,
    });

    expect(element.type).toBe(Navigate);
    expect(element.props.to).toEqual({ pathname: '/app' });
  });

  it('AuthRoute renders children for unauthenticated users', () => {
    isAuthenticated.mockReturnValue(false);

    const element = AuthRoute({
      children: dummyElement,
    });

    expect(element).toBe(dummyElement);
  });

  it('UserRoute logs out and redirects to /login when unauthenticated', () => {
    isAuthenticated.mockReturnValue(false);
    const dispatch = vi.fn();

    const element = UserRoute({
      dispatch,
      children: dummyElement,
    });

    expect(logoutUser).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(element.type).toBe(Navigate);
    expect(element.props.to).toBe('/login');
  });

  it('UserRoute renders children when authenticated', () => {
    isAuthenticated.mockReturnValue(true);

    const element = UserRoute({
      dispatch: vi.fn(),
      children: dummyElement,
    });

    expect(element).toBe(dummyElement);
  });

  it('AdminRoute redirects non-admin users', () => {
    isAuthenticated.mockReturnValue(true);

    const element = AdminRoute({
      currentUser: { role: 'user' },
      children: dummyElement,
    });

    expect(element.type).toBe(Navigate);
    expect(element.props.to).toBe('/app/main');
  });

  it('AdminRoute renders children for authenticated admins', () => {
    isAuthenticated.mockReturnValue(true);

    const element = AdminRoute({
      currentUser: { role: 'admin' },
      children: dummyElement,
    });

    expect(element).toBe(dummyElement);
  });
});
