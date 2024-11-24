import { useState, useEffect } from 'react';
import { Table, message, Button, Modal, Form, Input, Space, Select } from 'antd';
import axios from 'axios';
import { API } from '../../../constants';

export const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [formAdd] = Form.useForm();
  const [formEdit] = Form.useForm();

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'name', key: 'name' },
    { title: 'Apellido', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Nombre de usuario', dataIndex: 'username', key: 'username' },
    { title: 'Correo electrónico', dataIndex: 'email', key: 'email' },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => showEditModal(record)}>
            Editar
          </Button>
          <Button type="primary" danger onClick={() => handleDeleteUser(record.id)}>
            Eliminar
          </Button>
        </Space>
      ),
    },
  ];

  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API.private + 'users/',{headers: API.authHeaders});
      setUsers(response.data);
    } catch (error) {
      message.error('Error al cargar los usuarios.',error?.message);
    } finally {
      setLoading(false);
    }
  };

  const buildRoles = async () => {
    const roles = [
      { label: 'Administrador', id: 1},
      { label: 'Gestor', id: 2}
    ]

    setRoles(roles);
  };

  useEffect(() => {
    getUsers();
    buildRoles();
  }, []);

  const showAddModal = () => {
    formAdd.resetFields();
    setIsAddModalVisible(true);
  };

  const handleAddUser = async (values) => {
    const currentDate = new Date().toISOString();
    try {
      const response = await axios.post(API.private + 'users/', {
        ...values,
        created_by: 'Sebastian Rey',
        created_at: currentDate,
      },{headers: API.authHeaders});
      setUsers([...users, response.data]);
      message.success('Usuario agregado exitosamente.');
      getUsers()
      setIsAddModalVisible(false);
    } catch (error) {
      message.error('Error al agregar usuario.', error?.message);
    }
  };

  const showEditModal = (user) => {
    setEditingUser(user);
    formEdit.setFieldsValue({
      name: user.name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      role: user.role,
      created_by: { label: user.created_by, value: user.id },
    });
    setIsEditModalVisible(true);
  };

  const handleEditUser = async (values) => {
    try {
      await axios.put(API.private + `users/${editingUser.id}`, {
        ...values,
        created_by: values.created_by.label,
      },{headers: API.authHeaders});
      getUsers()
      message.success('Usuario actualizado exitosamente.');
      setIsEditModalVisible(false);
      setEditingUser(null);
    } catch (error) {
      message.error('Error al actualizar usuario.', error?.message);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(API.private + `users/${userId}`,{headers: API.authHeaders});
      getUsers()
      message.success('Usuario eliminado exitosamente.');
    } catch (error) {
      message.error('Error al eliminar usuario.', error?.message);
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, alignItems: 'center' }}>
        <h2>Lista de usuarios</h2>
        <Button type="primary" onClick={showAddModal}>Agregar usuario</Button>
      </div>

      <Table columns={columns} dataSource={users} loading={loading} rowKey="id" />

      <Modal
        title="Agregar Usuario"
        open={isAddModalVisible}
        onCancel={() => setIsAddModalVisible(false)}
        onOk={() => formAdd.submit()}
      >
        <Form form={formAdd} layout="vertical" onFinish={handleAddUser}>
          <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="last_name" label="Apellido" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="username" label="Nombre de usuario" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Correo electrónico" rules={[{ required: true, type: 'email', message: 'Ingresa un correo válido' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Rol" rules={[{ required: true, message: 'Selecciona un rol' }]}>
            <Select
              placeholder="Selecciona un rol"
              options={roles.map((role) => ({
                label: role.label,
                value: role.id,
              }))}
            />
          </Form.Item>
          {/* <Form.Item name="created_by" label="Creado por" rules={[{ required: true, message: 'Selecciona el creador' }]}>
            <Select
              placeholder="Selecciona el creador"
              labelInValue
              options={users.map((user) => ({
                label: `${user.name} ${user.last_name}`,
                value: user.id,
              }))}
            />
          </Form.Item> */}
          <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Ingresa una contraseña' }]}>
            <Input.Password />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Editar Usuario"
        open={isEditModalVisible}
        onCancel={() => setIsEditModalVisible(false)}
        onOk={() => formEdit.submit()}
      >
        <Form form={formEdit} layout="vertical" onFinish={handleEditUser}>
        <Form.Item name="name" label="Nombre" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="last_name" label="Apellido" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="username" label="Nombre de usuario" rules={[{ required: true, message: 'Este campo es obligatorio' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Correo electrónico" rules={[{ required: true, type: 'email', message: 'Ingresa un correo válido' }]}>
            <Input />
          </Form.Item>
          <Form.Item name="role" label="Rol" rules={[{ required: true, message: 'Selecciona un rol' }]}>
          <Select
              placeholder="Selecciona un rol"
              options={roles.map((role) => ({
                label: role.label,
                value: role.id,
              }))}
            />
          </Form.Item>
          <Form.Item name="created_by" label="Creado por" rules={[{ required: true, message: 'Selecciona el creador' }]}>
            <Select
              placeholder="Selecciona el creador"
              labelInValue
              options={users.map((user) => ({
                label: `${user.name} ${user.last_name}`,
                value: user.id,
              }))}
            />
          </Form.Item>
          {/* <Form.Item name="password" label="Contraseña" rules={[{ required: true, message: 'Ingresa una contraseña' }]}>
            <Input.Password />
          </Form.Item> */}
        </Form>
      </Modal>
    </div>
  );
};

export default UsersList;
