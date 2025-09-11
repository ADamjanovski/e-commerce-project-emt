import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type LoginForm = { username: string; password: string };

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginForm>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (d: LoginForm) => {
    await login(d.username, d.password);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input placeholder="username" {...register('username')} />
      <input placeholder="password" type="password" {...register('password')} />
      <button>Login</button>
    </form>
  );
}