import { render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { light } from '@/theme';
import { InputMask } from './index';

jest.mock('react-imask', () => {
  const MockIMaskInput = ({ value, placeholder }: { value: string; placeholder?: string }) => (
    <input data-testid="masked-input" value={value} placeholder={placeholder} />
  );

  return {
    __esModule: true,
    IMaskInput: MockIMaskInput,
    default: {
      MaskedRange: jest.fn(),
      MaskedDate: jest.fn(),
      createMask: jest.fn(),
    },
    IMask: {
      MaskedRange: jest.fn(),
      MaskedDate: jest.fn(),
      createMask: jest.fn(),
    },
  };
});

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={light}>{component}</ThemeProvider>);
};

describe('InputMask', () => {
  it('renders correctly with a string mask', () => {
    renderWithTheme(<InputMask mask="000000" value="123456" placeholder="Enter value" />);

    const input = screen.getByTestId('masked-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter value');
    expect(input).toHaveValue('123456');
  });

  it('renders correctly with a Date mask', () => {
    const mockParse = jest.fn().mockReturnValue(new Date(2025, 0, 1));
    const mockFormat = jest.fn().mockReturnValue('2025-01-01');

    renderWithTheme(
      <InputMask mask={Date} value="2025-01-01" parse={mockParse} format={mockFormat} />,
    );

    const input = screen.getByTestId('masked-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('2025-01-01');
  });
});
