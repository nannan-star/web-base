import { TOKEN_KEY } from '@/constants';
import { Outlet, history } from '@umijs/max';

export default () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    return <Outlet />;
  } else {
    history.push('/login');
    return '';
  }
};
