import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';

import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from '../../services/store';
import { fetchRegistration } from '../../services/slices/userSlice';

import { appPath } from '@utils-types';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(fetchRegistration({ email, name, password }));
    navigate(appPath.main);
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={name}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
