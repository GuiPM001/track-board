import { render, waitFor } from '@testing-library/react';
import App from './App';
import authService from './services/Auth';

jest.mock('./services/Auth', () => ({
  checkAuth: jest.fn(),
  authUser: jest.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('should authenticate user when render component', async () => {
    render(<App />);

    jest.spyOn(authService, 'checkAuth').mockReturnValue(false);

    await waitFor(() => {
      expect(authService.authUser).toHaveBeenCalled();
    });
  });

  test('should not authenticate user when user already authenticated', async () => {
    jest.spyOn(authService, 'checkAuth').mockReturnValue(true);

    render(<App />);

    await waitFor(() => {
      expect(authService.authUser).not.toHaveBeenCalled();
    });
  });
});
