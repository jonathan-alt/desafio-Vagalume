import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { EyeFill, EyeSlashFill } from 'bootstrap-icons-react';

import { api } from '../../../services/api';
import styles from './styles.module.css';
import logo from './logo.png';

export function LoginForm() {
  const history = useHistory();
  const [seePassword, setSeePassword] = useState(false);
  const [requestBody, setRequestBody] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    setRequestBody({ ...requestBody, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!requestBody.username || !requestBody.password) {
      toast.error('Necessário preencher todos os campos!');
      return;
    }
    api
      .post('/login', requestBody)
      .then(({ data: { success, token, message } }) => {
        if (success) {
          sessionStorage.setItem('userToken', token);
          history.push('/client-list');
        } else {
          toast.error(message);
        }
      });
  };

  return (
    <div className={`row ${styles['d-flex']}`}>
      <div className={`col-md-3 ${styles.center}`}>
        <Form onSubmit={handleSubmit}>
          <div className={styles.img}>
            {' '}
            <img src={logo} alt='Logo' />
          </div>

          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              name='username'
              id='username'
              value={requestBody.username}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <div className='position-relative'>
              <Form.Control
                type={seePassword ? 'text' : 'password'}
                name='password'
                id='password'
                value={requestBody.password}
                onChange={handleChange}
              />

              <button
                type='button'
                onClick={() => setSeePassword((prevValue) => !prevValue)}
                className={styles.passIcon}
              >
                {seePassword ? <EyeSlashFill /> : <EyeFill />}
              </button>
            </div>
          </Form.Group>
          <div className='d-flex justify-content-end'>
            <Button className='mt-4' variant='primary' type='submit'>
              Enviar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
