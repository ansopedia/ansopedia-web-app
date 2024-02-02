'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { saveLogin } from '../utils/login';

export default function LoginInForm() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!email || !password) {
      return alert('Please fill in all fields');
    }

    // Create a new user account
    const user = {
      email,
      password,
    };

    await saveLogin(user);
    router.push('/dashboard');
  };

  return (
    <div className="sign-up-form">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <br />
        <div>
          <input
            type="text"
            name="text"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
      <Link href="/sign-up">Sign up</Link>
    </div>
  );
}
