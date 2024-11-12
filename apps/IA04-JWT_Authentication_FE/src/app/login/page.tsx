'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

type LoginFormData = {
  username: string;
  password: string;
};

type ApiResponse = {
  message: string;
  success: boolean;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setLoading(true);
    setApiResponse(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
          credentials: 'include',
        },
      );

      const result = await response.json();

      if (response.ok) {
        setApiResponse({
          message: result.message,
          success: true,
        });
        router.replace('/profile');
      } else {
        setApiResponse({
          message: result.message || 'Login failed',
          success: false,
        });
      }
    } catch (error) {
      console.error('Error during login:', error);
      setApiResponse({
        message: 'An unexpected error occurred',
        success: false,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="input-wrapper">
          <label>Username</label>
          <input
            {...register('username', { required: 'Username is required' })}
          />
          {errors.username && (
            <p className="error-text">{errors.username.message}</p>
          )}
        </div>

        <div className="input-wrapper">
          <label>Password</label>
          <input
            type="password"
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Submit'}
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
