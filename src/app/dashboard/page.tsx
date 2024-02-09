'use client';

import { useEffect, useState } from 'react';
import { getUserDetails } from '../../utils/auth';

export default function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    (async () => {
      const userDetails = await getUserDetails();
      setData(userDetails);
    })();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
