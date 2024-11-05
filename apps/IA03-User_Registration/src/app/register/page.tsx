'use client';

import { useForm, SubmitHandler } from 'react-hook-form';

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => console.log(data);

  const passwordValue = watch('password');

  console.log('--> errs', errors);

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
            {...register('password', { required: 'Password is required' })}
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
