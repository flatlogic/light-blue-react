import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { verifyEmail } from '../../../actions/auth';

function Verify() {
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (token) {
      dispatch(verifyEmail(token));
    }
  }, [dispatch, location.search]);

  return null;
}

export default Verify;
