'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

type RegisterFormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

type ApiResponse = {
  message: string;
  success: boolean;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<RegisterFormData> = async (data) => {
    setLoading(true);
    setApiResponse(null);

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setApiResponse({ message: 'Registration successful', success: true });
      } else {
        setApiResponse({
          message: result.message || 'Registration failed',
          success: false,
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setApiResponse({
        message: 'An unexpected error occurred',
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  const passwordValue = watch('password');

  return (
    <div className="flex flex-col items-center gap-8">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="input-wrapper">
          <label>Email</label>
          <input
            {...register('email', { required: 'Email is required' })}
            type="email"
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="input-wrapper">
          <label>Password</label>
          <input
            type="password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 4,
                message: 'Password must be at least 4 characters long',
              },
            })}
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        <div className="input-wrapper">
          <label>Re-type Password</label>
          <input
            type="password"
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) =>
                value === passwordValue || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && (
            <p className="error-text">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>

      {apiResponse && (
        <p className={`${apiResponse.success ? 'success-text' : 'error-text'}`}>
          {apiResponse.message}
        </p>
      )}
    </div>
  );
}
