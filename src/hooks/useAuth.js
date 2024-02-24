import { cookies } from 'next/headers';

const useAuth = () => {
  let isLogin = false;
  if (cookies().get('accessToken')) {
    isLogin = true;
  }

  return {
    isLogin,
  };
};

export default useAuth;
