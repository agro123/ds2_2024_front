import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UsersList from '../../routes/admin/users/index.jsx';
import axios from 'axios';
import { message } from 'antd';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock('axios');
vi.mock('antd', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe('UsersList Component', () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada prueba
    vi.clearAllMocks();
  });

  it('should fetch and display users in the table', async () => {
    const mockUsers = [
      {
        id: 1,
        name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        role: 'Administrador',
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mockUsers });

    render(<UsersList />);

    // Esperar que los datos se carguen y se muestren en la tabla
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
      expect(screen.getByText('Doe')).toBeInTheDocument();
      expect(screen.getByText('johndoe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
    });
  });

  it('should render the table and "Agregar usuario" button', () => {

    expect(screen.getByText('Lista de usuarios')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Agregar usuario/i })).toBeInTheDocument();
    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  it('should open "Agregar Usuario" modal when button is clicked', () => {
    

    const addButton = screen.getByRole('button', { name: /Agregar usuario/i });
    fireEvent.click(addButton);

    // Verificar que el modal se abra
    expect(screen.getByText('Agregar Usuario')).toBeInTheDocument();
  });

  it('should submit "Agregar Usuario" form successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { id: 2, name: 'Jane', last_name: 'Doe' } });

    

    // Abrir el modal
    fireEvent.click(screen.getByRole('button', { name: /Agregar usuario/i }));

    // Completar y enviar el formulario
    fireEvent.change(screen.getAllByLabelText(/Nombre/i)[0], { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Nombre de usuario/i), { target: { value: 'janedoe' } });
    fireEvent.change(screen.getByLabelText(/Correo electrónico/i), { target: { value: 'jane.doe@example.com' } });
    fireEvent.mouseDown(screen.getByLabelText(/Rol/i));
    fireEvent.click(screen.getByText('Administrador'));
    fireEvent.change(screen.getByLabelText(/Contraseña/i), { target: { value: 'password123' } });

    // fireEvent.click(screen.getByRole('button', { name: 'Aceptar' }));
    fireEvent.click(screen.getByRole('button', { name: /OK/i }));

    // Verificar que la API fue llamada correctamente
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        expect.stringContaining('/users/'),
        expect.objectContaining({
          name: 'Jane',
          last_name: 'Doe',
          username: 'janedoe',
          email: 'jane.doe@example.com',
          role: 1,
          password: 'password123',
        }),
        { headers: expect.any(Object) }
      );
    });

    expect(message.success).toHaveBeenCalledWith('Usuario agregado exitosamente.');
  });

  it('should open "Editar Usuario" modal and submit changes successfully', async () => {
    const mockUsers = [
      {
        id: 4,
        name: 'John',
        last_name: 'Doe',
        username: 'johndoe',
        email: 'john.doe@example.com',
        role: 'Administrador',
      },
    ];
    axios.get.mockResolvedValueOnce({ data: mockUsers });
    axios.put.mockResolvedValueOnce({ data: { id: 4, name: 'Johnny' } });

    

    // Esperar que los datos se carguen
    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    // Abrir modal de edición
    const editButton = screen.getAllByRole('button', { name: /Editar/i })[0];
    fireEvent.click(editButton);

    // Cambiar el nombre
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'apellido' } });

    // Enviar formulario
    // fireEvent.click(screen.getByRole('button', { name: 'Aceptar' }));
    fireEvent.click(screen.getByRole('button', { name: /OK/i }));

    // Verificar que la API fue llamada correctamente
    await waitFor(() => {
      expect(axios.put).toHaveBeenCalledWith(
        "https://ds2-2024-api-v1ea.onrender.com/api/private/users/1",
        {
          name: 'John',
          last_name: 'Doe',
          username: 'johndoe',
          email: 'john.doe@example.com',
          role: 'Administrador',
          created_by: undefined,
        },
        { headers: {Authorization: 'Bearer null'} }
      );
    });

    expect(message.success).toHaveBeenCalledWith('Usuario actualizado exitosamente.');
  });

  it('should delete a user successfully', async () => {
    axios.delete.mockResolvedValueOnce();

    

    // Simular clic en "Eliminar"
    const deleteButton = screen.getByRole('button', { name: /Eliminar/i });
    fireEvent.click(deleteButton);

    // Verificar que la API fue llamada
    await waitFor(() => {
      expect(axios.delete).toHaveBeenCalledWith("https://ds2-2024-api-v1ea.onrender.com/api/private/users/4", {
        headers: {Authorization: 'Bearer null'},
      });
    });

    expect(message.success).toHaveBeenCalledWith('Usuario eliminado exitosamente.');
  });
});
