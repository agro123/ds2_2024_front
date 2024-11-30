import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { PqrsdView } from '../../routes/public/security/pqrsd/index.jsx';
import axios from 'axios';
import { message } from 'antd';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock de axios y message
vi.mock('axios');
vi.mock('antd', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Typography: actual.Typography,
    message: {
      success: vi.fn(),
      error: vi.fn(),
    },
  };
});

describe('PqrsForm Component', () => {


  it('should render the form correctly', () => {
    render(<PqrsdView />);
    expect(screen.getByText('Formulario de PQRS')).toBeDefined();
    expect(screen.getByLabelText(/Tipo de PQRS/i)).toBeDefined();
    expect(screen.getByLabelText(/Nombre/i)).toBeDefined();
    expect(screen.getByLabelText(/Apellido/i)).toBeDefined();
    expect(screen.getByLabelText(/Tipo de Documento/i)).toBeDefined();
    expect(screen.getByLabelText(/Número de Documento/i)).toBeDefined();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeDefined();
    expect(screen.getByLabelText(/Objeto de PQRS/i)).toBeDefined();
    expect(screen.getByRole('button', { name: /Enviar/i })).toBeDefined();
  });

  it('should show error messages for invalid fields', async () => {
    
    const submitButton = screen.getAllByRole('button', { name: 'Enviar' })[0];

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText('Por favor, selecciona un tipo de PQRS!')).toBeInTheDocument();
      expect(screen.getByText('Por favor, ingresa tu nombre!')).toBeInTheDocument();
      expect(screen.getByText('Por favor, ingresa tu apellido!')).toBeInTheDocument();
    });
  });

  it('should submit the form successfully', async () => {
    axios.post.mockResolvedValueOnce({ data: { status: 201 } }); // Mock exitoso

    fireEvent.click(screen.getByLabelText(/Petición/i));
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'Pérez' } });
    fireEvent.mouseDown(screen.getByLabelText(/Tipo de Documento/i));
    await waitFor(() => {
      fireEvent.click(screen.getByText('Cédula'));
    });
    fireEvent.change(screen.getByLabelText(/Número de Documento/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'juan@example.com' } });
    fireEvent.change(screen.getByLabelText(/Objeto de PQRS/i), { target: { value: 'Mi petición' } });

    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://ds2-2024-api-v1ea.onrender.com/api/public/pqrsd/",
        expect.objectContaining({
          first_name: "Juan",
          last_name: "Pérez",
          number_document: 12345678,
          email: "juan@example.com",
          object_pqrsd: "Mi petición",
          type_document: 1,
          type_pqrsd: 1,
        })
      );
    });
  
    expect(message.success).toHaveBeenCalledWith('Se ha agregado correctamente.');
  });
  

  it('should show error on form submission failure', async () => {
    axios.post.mockRejectedValueOnce(new Error('Network error'));

    

    fireEvent.click(screen.getByLabelText(/Petición/i));
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'Juan' } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'Pérez' } });
    fireEvent.mouseDown(screen.getByLabelText(/Tipo de Documento/i));
    await waitFor(() => {
      fireEvent.click(screen.getByText('Cédula'));
    });
    fireEvent.change(screen.getByLabelText(/Número de Documento/i), { target: { value: '12345678' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'juan@example.com' } });
    fireEvent.change(screen.getByLabelText(/Objeto de PQRS/i), { target: { value: 'Mi petición' } });

    fireEvent.click(screen.getByRole('button', { name: 'Enviar' }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        "https://ds2-2024-api-v1ea.onrender.com/api/public/pqrsd/",
        expect.objectContaining({
          first_name: "Juan",
          last_name: "Pérez",
          number_document: 12345678,
          email: "juan@example.com",
          object_pqrsd: "Mi petición",
          type_document: 1,
          type_pqrsd: 1,
        })
      );
    });

    await waitFor(() => {
      expect(message.error).toHaveBeenCalledWith('Error al agregar la PQRSD.');
    });
  });
});
