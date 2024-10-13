import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  test('renders Vite and React logos', () => {
    render(<App />);
    
    const viteLogo = screen.getByAltText(/Vite logo/i);
    const reactLogo = screen.getByAltText(/React logo/i);
    
    expect(viteLogo).toBeInTheDocument();
    expect(reactLogo).toBeInTheDocument();
  });

  test('increments count when button is clicked', () => {
    render(<App />);
    
    const button = screen.getByRole('button', { name: /count is 0/i });
    
    fireEvent.click(button);
    
    expect(button).toHaveTextContent('count is 1');
    
    fireEvent.click(button);
    
    expect(button).toHaveTextContent('count is 2');
  });

  test('contains links to Vite and React', () => {
    render(<App />);
    
    const viteLink = screen.getByRole('link', { name: /Vite logo/i });
    const reactLink = screen.getByRole('link', { name: /React logo/i });
    
    expect(viteLink).toHaveAttribute('href', 'https://vitejs.dev');
    expect(reactLink).toHaveAttribute('href', 'https://react.dev');
  });
});
