// src/pages/RegisterPage.tsx
import { useForm } from 'react-hook-form';
import { AuthApi } from '../api/endpoints';
import { useNavigate } from 'react-router-dom';

type RegisterForm = {
  username: string;
  password: string;
  repeat_password: string;
  name: string;
  surname: string;
  role: 'ROLE_USER' | 'ROLE_ADMIN';
};

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<RegisterForm>({
    defaultValues: { role: 'ROLE_USER' },
  });
  const navigate = useNavigate();

  const onSubmit = async (d: RegisterForm) => {
    await AuthApi.register(d);
    navigate('/login');
  };

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <h2 style={{ textAlign: 'center', marginBottom: 4 }}>Register</h2>
      <input placeholder="Username" {...register('username', { required: true })} />
      <input placeholder="Password" type="password" {...register('password', { required: true })} />
      <input placeholder="Repeat password" type="password" {...register('repeat_password', { required: true })} />
      <input placeholder="Name" {...register('name', { required: true })} />
      <input placeholder="Surname" {...register('surname', { required: true })} />
      <select {...register('role')}>
        <option value="ROLE_USER">User</option>
        <option value="ROLE_ADMIN">Admin</option>
      </select>
      <button>Register</button>
    </form>
  );
}

