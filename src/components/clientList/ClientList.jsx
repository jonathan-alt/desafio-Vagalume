import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import styles from './styles.module.css';

import { api } from '../../services/api';

export default function ClientList() {
  const history = useHistory();
  const [clientTable, setClientTable] = useState([]);

  const fetchData = async () => {
    await api
      .get('/get_clients')
      .then(({ data: { clients } }) => {
        setClientTable(clients);
      })
      .catch((e) => toast.error(e.response.data.error.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={`row ${styles['d-flex']}`}>
      <div className={`col-md-3 ${styles.center}`}>
        <Table responsive='sm' striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Clientes</th>
            </tr>
          </thead>
          <tbody>
            {clientTable.map(({ id, name }) => (
              // <tr>
              //   <td>{id}</td>
              //   <td>{name}</td>
              // </tr>
              <tr
                key={id}
                style={{ cursor: 'pointer' }}
                onClick={() => history.push(`/client-data/${id}`)}
              >
                <td>{id}</td>
                <td>{name}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
