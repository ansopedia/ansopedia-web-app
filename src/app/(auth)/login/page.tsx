import Link from 'next/link';
import LoginInForm from '../../../components/LoginInForm';

export default function Login() {
  return (
    <div>
      <h2>Login</h2>
      <LoginInForm />
      <Link href="/sign-up">Sign Up</Link>
    </div>
  );
}
