import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLoginMutation } from 'services/login/api';
import { useAuth } from 'services/login/hooks';
import { setCredentials } from 'services/login/slice';

export function PrivateOutlet() {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login] = useLoginMutation();

  useEffect(() => {
    if (!auth.user) {
      login({}).unwrap()
        .then(user => {
          dispatch(setCredentials({ user }));
        })
        .catch(() => navigate('/login'));
    }
  }, [auth.user]);

  return auth.user && (
    <Outlet />
  );
}
