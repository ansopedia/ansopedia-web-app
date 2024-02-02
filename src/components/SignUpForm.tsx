'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';

export default function SignUpForm() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      return alert('Please fill in all fields');
    }

    if (password !== confirmPassword) {
      return alert('Passwords do not match');
    }

    // Create a new user account
    const user = {
      name,
      email,
      password,
      confirmPassword,
    };

    // Send the user data to the backend
    const response = await fetch('http://localhost:8000/api/v1/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const data = await response.json();
    alert(data.message);

    const accessToken: string = response.headers.get('authorization') || '';
    if (response.ok) {
      localStorage.setItem('accessToken', accessToken);
      router.push('/dashboard');
    }
  };

  return (
    <div className="sign-up-form">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <br />
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
        <div>
          <input
            type="text"
            name="text"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <Link href="/login">Login</Link>
    </div>
  );
}
