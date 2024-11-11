import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { PqrsdView } from '../routes/public/security/pqrsd/index.jsx';

let originalError;

describe('PqrsdView Component', () => {
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
    render(<PqrsdView />);
  });

  test('renders form title correctly', () => {
    const title = screen.getByText(/Formulario de PQRS/i);
    expect(title).toBeInTheDocument();
  });

  test('renders all form fields', () => {
    expect(screen.getByLabelText(/Tipo de PQRS/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Tipo de Documento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número de Documento/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo Electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Objeto de PQRS/i)).toBeInTheDocument();
  });

  test('submits form with correct values', async () => {
    fireEvent.click(screen.getByText('Petición'));
    fireEvent.change(screen.getByLabelText(/Nombre/i), { target: { value: 'John' } });
    fireEvent.change(screen.getByLabelText(/Apellido/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/Tipo de Documento/i), { target: { value: 1 } });
    fireEvent.change(screen.getByLabelText(/Número de Documento/i), { target: { value: '123456' } });
    fireEvent.change(screen.getByLabelText(/Correo Electrónico/i), { target: { value: 'john.doe@example.com' } });
    fireEvent.change(screen.getByLabelText(/Objeto de PQRS/i), { target: { value: 'This is a test PQRS' } });

    const submitButton = screen.getByRole('button', { name: /Enviar/i });
    fireEvent.click(submitButton);

    expect(screen.queryByText(/Por favor, completa correctamente el formulario./i)).not.toBeInTheDocument();
  });

  test('displays validation errors for required fields', async () => {
    const submitButton = screen.getByRole('button', { name: /Enviar/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Por favor, selecciona un tipo de PQRS!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Por favor, ingresa tu nombre!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Por favor, ingresa tu apellido!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Por favor, selecciona tu tipo de documento!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Por favor, ingresa tu número de documento!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Por favor, ingresa tu correo electrónico!/i)).toBeInTheDocument();
    expect(await screen.findByText(/Por favor, describe el objeto de tu PQRS!/i)).toBeInTheDocument();
  });

  test('validates email format', async () => {
    const emailInput = screen.getByLabelText(/Correo Electrónico/i);
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

    const submitButton = screen.getByRole('button', { name: /Enviar/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Por favor, ingresa un correo electrónico válido!/i)).toBeInTheDocument();
  });

  afterAll(() => {
    console.error = originalError;
  });
});
