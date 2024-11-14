import { useState, useEffect } from 'react';
import { Table, message } from 'antd';
import axios from 'axios';

export const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Apellido',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Nombre de usuario',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: 'Correo electronico',
      dataIndex: 'email',
      key: 'email',
    },
  ];

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://ds2-2024-api-v1ea.onrender.com/api/public/users/');
      setUsers(response.data);
    } catch (error) {
      message.error('Error al cargar los usuarios. Intenta nuevamente.');
      console.error('Error al obtener usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Table
      columns={columns}
      dataSource={users}
      loading={loading}
      rowKey="id"
    />
  );
}

export default UsersList;
