// PqrsForm.jsx
import React from 'react';
import {
  Form,
  Input,
  Select,
  Button,
  Radio,
  Typography,
  message,
} from 'antd';
import {
  FaEnvelopeOpenText,
  FaExclamationTriangle,
  FaBullhorn,
  FaInfoCircle,
  FaQuestionCircle,
} from 'react-icons/fa';
import axios from 'axios';
import '../../../../assets/styles/pqrsd.css';

const { Title } = Typography;
const { Option } = Select;

const pqrsdOptions = [
  { type: 'Petición', icon: <FaEnvelopeOpenText /> , value: 1},
  { type: 'Queja', icon: <FaExclamationTriangle /> , value: 2},
  { type: 'Reclamo', icon: <FaBullhorn /> , value: 3},
  { type: 'Sugerencia', icon: <FaInfoCircle /> , value: 4},
  { type: 'Denuncia', icon: <FaQuestionCircle /> , value: 5},
];

export const PqrsdView = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    
    console.log(values)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Error en el formulario:', errorInfo);
    message.error('Por favor, completa correctamente el formulario.');
  };

  return (
    <div className="pqrs-form-container">
      <Title level={2} style={{ textAlign: 'center', marginBottom: '20px' }}>
        Formulario de PQRS
      </Title>

      <Form
        form={form}
        layout="vertical"
        name="pqrs_form"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        {/* Selección de Tipo de PQRS */}
        <Form.Item
          name="type_pqrsd"
          label="Tipo de PQRS"
          rules={[{ required: true, message: 'Por favor, selecciona un tipo de PQRS!' }]}
        >
          <Radio.Group>
            {pqrsdOptions.map((option) => (
              <Radio.Button
                key={option.type}
                value={option.value}
                className="pqrs-radio-button"
              >
                <div className="pqrs-icon">{option.icon} {option.type}</div>
              </Radio.Button>
            ))}
          </Radio.Group>
        </Form.Item>

        {/* Campos del Formulario */}
        <Form.Item
          name="first_name"
          label="Nombre"
          rules={[{ required: true, message: 'Por favor, ingresa tu nombre!' }]}
        >
          <Input placeholder="Nombre" />
        </Form.Item>

        <Form.Item
          name="last_name"
          label="Apellido"
          rules={[{ required: true, message: 'Por favor, ingresa tu apellido!' }]}
        >
          <Input placeholder="Apellido" />
        </Form.Item>

        <Form.Item
          name="type_document"
          label="Tipo de Documento"
          rules={[{ required: true, message: 'Por favor, selecciona tu tipo de documento!' }]}
        >
          <Select placeholder="Selecciona un tipo de documento">
            <Option value={1}>Cédula</Option>
            <Option value={2}>Pasaporte</Option>
            <Option value={3}>Otro</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="number_document"
          label="Número de Documento"
          rules={[{ required: true, message: 'Por favor, ingresa tu número de documento!' }]}
        >
          <Input placeholder="Número de Documento" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Correo Electrónico"
          rules={[
            { required: true, message: 'Por favor, ingresa tu correo electrónico!' },
            { type: 'email', message: 'Por favor, ingresa un correo electrónico válido!' },
          ]}
        >
          <Input placeholder="Correo Electrónico" />
        </Form.Item>

        <Form.Item
          name="object_pqrsd"
          label="Objeto de PQRS"
          rules={[{ required: true, message: 'Por favor, describe el objeto de tu PQRS!' }]}
        >
          <Input.TextArea rows={4} placeholder="Describe tu PQRS aquí..." />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Enviar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

