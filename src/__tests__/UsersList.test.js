import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import UsersList from '../routes/admin/users/index.jsx';

jest.mock('axios');
let originalError;

describe('UsersList', () => {
  beforeEach(() => {
     // Guarda el original de console.error antes de sobrescribirlo
     originalError = console.error;

     // Sobrescribe console.error para ignorar ciertas advertencias
    console.error = (...args) => {
      if (/Warning.*not wrapped in act/.test(args[0])) {
         return;
       }
       originalError.call(console, ...args);
    };
    jest.resetAllMocks();
  });


  it('should render the component without error', () => {
    render(<UsersList />);
    expect(screen.getByText('Lista de usuarios')).toBeInTheDocument();
  });

  it('should load and display users when rendering', async () => {
    axios.get.mockResolvedValue({
      data: [{ id: 1, name: 'Juan', last_name: 'Pérez', username: 'juanp', email: 'juan@example.com' }]
    });
    render(<UsersList />);
    expect(axios.get).toHaveBeenCalledTimes(1);
    await waitFor(() => expect(screen.getByText('Juan')).toBeInTheDocument());
  });

  it('should open the add user modal by clicking on the add user button', async () => {
    render(<UsersList />);
    fireEvent.click(screen.getByText('Agregar usuario'));
    await waitFor(() => expect(screen.getByText('Agregar Usuario')).toBeInTheDocument());
  });

it('should open the edit modal when you click edit and allow a user to update', async () => {
    const users = [{ id: 1, name: 'Juan', last_name: 'Pérez', username: 'juanp', email: 'juan@example.com', role: 1 }];
    axios.get.mockResolvedValue({ data: users });
    axios.put.mockResolvedValue({});
    
    render(<UsersList />);
  
    // Espera a que los datos se carguen
    await waitFor(() => expect(screen.getByText('Juan')).toBeInTheDocument());
  
    // Clic en el botón 'Editar'
    fireEvent.click(screen.getAllByText('Editar')[0]);
  
    // Espera a que el modal aparezca
    await waitFor(() => expect(screen.getByLabelText('Nombre')).toBeInTheDocument());
  
    // Cambia el campo 'Nombre'
    const nombreInput = screen.getByLabelText('Nombre');
    fireEvent.change(nombreInput, { target: { value: 'Juan Carlos' } });
  
    // Verifica que el valor ha sido actualizado
    expect(nombreInput.value).toBe('Juan Carlos');
  
    // Envía el formulario haciendo clic en 'OK'
    fireEvent.click(screen.getByText('OK'));
  
    // Espera a que axios.put sea llamado
    await waitFor(() => expect(axios.put).toHaveBeenCalled());
  
    // Verifica que axios.put fue llamado con los parámetros correctos
    expect(axios.put).toHaveBeenCalledWith(
      'https://ds2-2024-api-v1ea.onrender.com/api/public/users/1',
      expect.objectContaining({ name: 'Juan Carlos' })
    );
  
    // Verifica que el mensaje de éxito aparece
    await waitFor(() =>
      expect(screen.getByText(/Usuario actualizado exitosamente\./i)).toBeInTheDocument()
    );
  });
  
  it('you should delete a user by clicking on delete', async () => {
    const users = [{ id: 1, name: 'Juan', last_name: 'Pérez', username: 'juanp', email: 'juan@example.com' }];
    axios.get.mockResolvedValue({ data: users });
    axios.delete.mockResolvedValue({});
    render(<UsersList />);
    await waitFor(() => fireEvent.click(screen.getAllByText('Eliminar')[0]));
    await waitFor(() => expect(axios.delete).toHaveBeenCalledWith('https://ds2-2024-api-v1ea.onrender.com/api/public/users/1'));
    expect(screen.getByText('Usuario eliminado exitosamente.')).toBeInTheDocument();
  });

  afterAll(() => {
    console.error = originalError;
  });
});