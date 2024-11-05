'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

type LoginFormData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit: SubmitHandler<LoginFormData> = (data) => console.log(data);

  console.log('--> errs', errors);

  return (
    <div className="flex flex-col items-center gap-8">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
        <div className="input-wrapper">
          <label>Email</label>
          <input
            type="email" // Set type to "email" for validation
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <p className="error-text">{errors.email.message}</p>}
        </div>

        <div className="input-wrapper">
          <label>Password</label>
          <input
            type="password" // Set type to "password" for security
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && (
            <p className="error-text">{errors.password.message}</p>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
