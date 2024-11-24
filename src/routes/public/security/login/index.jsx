// LoginView.jsx
import { useState } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { FaUser, FaLock} from 'react-icons/fa';
import '../../../../assets/styles/login.css';
import axios from 'axios';
import logo from '../../../../../public/logo1.png';
import { API } from '../../../../constants';
import { useAuth } from '../../../../context/AuthProvider';
import { useNavigate } from "react-router-dom";
const { Title } = Typography;

export const LoginView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {saveUserData} = useAuth();

  const onFinish = async (values) => {
    setLoading(true);
    try {
    
      const response = await axios.post(API.public + 'users/login/', {
        username: values.username,
        password: values.password,
      });

      message.success('¡Inicio de sesión exitoso!');
      console.log('Respuesta del servidor:', response.data);
      saveUserData(response.data);
      navigate("/admin/dashboard");

    } catch (error) {
      setLoading(false);
      if (error.response && error.response.status === 401) {
        message.error('Usuario o contraseña incorrectos.');
      } else {
        message.error('Error al iniciar sesión. Intenta nuevamente.');
      }
      console.error('Error al iniciar sesión:', error);
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = (errorInfo) => {
    message.error('Por favor, completa correctamente el formulario.');
    console.log('Error en el formulario:', errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-image">
        {/* Puedes reemplazar la URL con una imagen de tu elección */}
        <img src={logo} alt="Login" />
      </div>
      <div className="login-form">
        <Title level={2} className="login-title">Iniciar Sesión</Title>
        <Form
          name="login_form"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          className="form-container"
        >
          <Form.Item
            label="Usuario"
            name="username"
            rules={[{ required: true, message: 'Por favor, ingresa tu nombre de usuario!' }]}
          >
            <Input prefix={<FaUser className="input-icon" />} placeholder="Nombre de Usuario" />
          </Form.Item>

          <Form.Item
            label="Contraseña"
            name="password"
            rules={[{ required: true, message: 'Por favor, ingresa tu contraseña!' }]}
          >
            <Input.Password prefix={<FaLock className="input-icon" />} placeholder="Contraseña" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block loading={loading}>
              Iniciar Sesión
            </Button>
          </Form.Item>
          
        </Form>
      </div>
    </div>
  );
};

export default LoginView;
