import Link from 'next/link';
import LoginInForm from '@/components/LoginInForm';
import { redirect } from 'next/navigation';
import useAuth from '../hooks/useAuth';
export default function Page() {
  const { isLogin } = useAuth();
  if (isLogin) {
    redirect('/dashboard');
  }
  return (
    <div>
      <h2>Login</h2>
      <LoginInForm />
      <Link href="/sign-up">Sign Up</Link>
    </div>
  );
}
