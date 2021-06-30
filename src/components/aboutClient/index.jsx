import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';

import { api } from '../../services/api';

export default function AboutClient() {
  const { id } = useParams();

  const [clientStatus, setClientStatus] = useState([]);

  const fetchData = async () => {
    await api.get(`/get_client_data/${id}`).then(({ data: { data } }) => {
      setClientStatus(
        data.map((point, index) => {
          return {
            point,
            index,
          };
        })
      );
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Card>
        <Card.Header>{id}</Card.Header>
        <Card.Body>
          {clientStatus && (
            <AreaChart
              width={1280}
              height={720}
              data={clientStatus}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <XAxis dataKey='index' />
              <YAxis />
              <Tooltip />
              <Area
                type='linear'
                dataKey='point'
                stroke='#8884d8'
                fill='#8884d8'
              />
            </AreaChart>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
