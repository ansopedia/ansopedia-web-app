export async function isLoggedIn(): Promise<boolean> {
  if (typeof window !== 'undefined') {
    const authHeader = localStorage.getItem('accessToken') || '';
    const response = await fetch('https://your-api.com/verify-access-token', {
      headers: { Authorization: `Bearer ${authHeader}` },
    });

    if (!response.ok) {
      // The token was not valid or there was another error.
      return false;
    }

    // The token was valid.
    return true;
  }
  return false;
}
