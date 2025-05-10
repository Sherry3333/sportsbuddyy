import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import LoginPage from '../index';

// Mock the user store
vi.mock('@/domain/user/store/user.store', () => ({
  userStore: () => ({
    userLogin: vi.fn().mockResolvedValue({ message: 'Login successful' })
  })
}));

describe('LoginPage', () => {
  const renderLoginPage = () => {
    return render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );
  };

  it('renders login form correctly', () => {
    renderLoginPage();
    
    // Check title
    expect(screen.getByRole('heading', { name: 'Sign in' })).toBeInTheDocument();
    // Check description
    expect(screen.getByText('Please login to continue to your account.')).toBeInTheDocument();
    // Check input fields
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    // Check button
    expect(screen.getByRole('button', { name: 'Sign in' })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderLoginPage();
    
    // Click login button
    const loginButton = screen.getByRole('button', { name: 'Sign in' });
    await userEvent.click(loginButton);

    // Check validation error messages
    expect(await screen.findByText('Please input your email!')).toBeInTheDocument();
    expect(await screen.findByText('Please input your password!')).toBeInTheDocument();
  });

  it('shows validation error for invalid email', async () => {
    renderLoginPage();
    
    // Enter invalid email
    const emailInput = screen.getByLabelText('Email');
    await userEvent.type(emailInput, 'invalid-email');

    // Click login button
    const loginButton = screen.getByRole('button', { name: 'Sign in' });
    await userEvent.click(loginButton);

    // Check validation error message
    expect(await screen.findByText('Please enter a valid email!')).toBeInTheDocument();
  });

  it('navigates to register page when clicking create account', async () => {
    renderLoginPage();
    
    // Click register button
    const registerButton = screen.getByRole('button', { name: 'Create one' });
    await userEvent.click(registerButton);

    // Check if URL has changed
    expect(window.location.pathname).toBe('/register');
  });
}); 