import React from 'react';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { light } from '@/theme';
import { FormGroup } from './index';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={light}>{component}</ThemeProvider>);
};

describe('FormGroup component', () => {
  it('renders the title when provided', () => {
    renderWithTheme(<FormGroup title="User Details" />);
    expect(screen.getByText('User Details')).toBeInTheDocument();
  });

  it('renders children correctly', () => {
    renderWithTheme(
      <FormGroup>
        <div data-testid="child">Child content</div>
      </FormGroup>,
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Child content')).toBeInTheDocument();
  });
});
