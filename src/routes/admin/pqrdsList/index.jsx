import { useState, useEffect } from 'react';
import { Table, message, Button, Modal, Space } from 'antd';
import axios from 'axios';

import { STATUS_LABELS, TYPE_PQRSD_LABELS, TYPE_DOCUMENTS } from '../../../constants';

const productionUrl = 'https://ds2-2024-api-v1ea.onrender.com/api/public/'
const developUrl = 'http://localhost:3000/api/public/'

export const PqrsdList = () => {
  const [pqrsd, setPqrsd] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPqrsd, setSelectedPqrsd] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id' },
    { title: 'Nombre', dataIndex: 'first_name', key: 'first_name' },
    { title: 'Apellido', dataIndex: 'last_name', key: 'last_name' },
    { title: 'Tipo de Documento', dataIndex: 'type_document', key: 'type_document', render: (typeDocumentId) => TYPE_DOCUMENTS[typeDocumentId] },
    { title: 'Número de Documento', dataIndex: 'number_document', key: 'number_document' },
    { title: 'Objeto PQRSD', dataIndex: 'object_pqrsd', key: 'object_pqrsd' },
    { title: 'Estado', dataIndex: 'status', key: 'status', render: (statusId) => STATUS_LABELS[statusId] },
    { title: 'Correo', dataIndex: 'email', key: 'email' },
    { title: 'Fecha de Creación', dataIndex: 'created_at', key: 'created_at' },
    { title: 'Tipo de PQRSD', dataIndex: 'type_pqrsd', key: 'type_pqrsd', render: (pqrsdId) => TYPE_PQRSD_LABELS[pqrsdId] },
    {
      title: 'Acciones',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => showModal(record)}>
            Opciones
          </Button>
        </Space>
      ),
    },
  ];

  const getPqrsd = async () => {
    setLoading(true);
    try {
      const response = await axios.get(developUrl + 'pqrsd/');
      setPqrsd(response.data);
    } catch (error) {
      message.error('Error al cargar las PQRSD.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPqrsd();
  }, []);

  const showModal = (record) => {
    setSelectedPqrsd(record);
    setIsProcessing(record.status === 1);
    setIsModalVisible(true);
  };

  const handleProcessPqrsd = async () => {
    if (!selectedPqrsd) return;
    
    const updatedPqrsd = {
      ...selectedPqrsd,
      status: 1
    };

    try {
      await axios.put(developUrl + 'pqrsd/' + selectedPqrsd.id, updatedPqrsd);
      message.success('PQRSD procesada exitosamente.');
      setIsModalVisible(false);
      getPqrsd();
    } catch (error) {
      console.error('Error al actualizar PQRSD:', error);
      message.error('Error al actualizar el estado de la PQRSD.');
    }
  };

  return (
    <div>
      <h2 style={{ marginBottom: 16 }}>Lista de PQRSD</h2>
      <Table
        columns={columns}
        dataSource={pqrsd}
        loading={loading}
        rowKey="id"
      />

      <Modal
        title={isProcessing ? "Pqrsd procesada" : "Pqrsd pendiente"}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        <p><strong>ID:</strong> {selectedPqrsd?.id}</p>
        <p><strong>Objeto:</strong> {selectedPqrsd?.object_pqrsd}</p>
        <p><strong>Estado actual:</strong> {TYPE_PQRSD_LABELS[selectedPqrsd?.type_pqrsd]}</p>
        <p><strong>{isProcessing ? "La PQRSD ya está procesada" : "¿Procesar esta PQRSD?"}</strong></p>
        {!isProcessing && (
          <Button type="primary" onClick={() => handleProcessPqrsd()}>
            Procesar
          </Button>
        )}
      </Modal>
    </div>
  );
};

export default PqrsdList;
