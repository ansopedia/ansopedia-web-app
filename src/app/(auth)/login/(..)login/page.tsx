import Link from 'next/link';
import LoginInForm from '../../../../components/LoginInForm';

export default function LoginModal() {
  return (
    <div>
      <h2>LoginModal</h2>
      <LoginInForm />
      <Link href="/sign-up">Sign Up</Link>
    </div>
  );
}
