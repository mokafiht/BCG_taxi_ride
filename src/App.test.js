import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/BCG taxi ride mini demo/i);
  expect(linkElement).toBeInTheDocument();
});
