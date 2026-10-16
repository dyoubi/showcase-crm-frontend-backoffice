import { render, screen } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { light } from '@/theme';
import { FeedbackMessage } from './FeedbackMessage';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={light}>{component}</ThemeProvider>);
};

describe('FeedbackMessage', () => {
  it('renders the feedback message text', () => {
    renderWithTheme(<FeedbackMessage>This is a message</FeedbackMessage>);
    expect(screen.getByText('This is a message')).toBeInTheDocument();
  });

  it('renders the info icon by default', () => {
    renderWithTheme(<FeedbackMessage>This is a message</FeedbackMessage>);
    const icon = screen.getByTestId('icon-info-circle');
    expect(icon).toBeInTheDocument();
  });

  it('renders the success icon when color="success"', () => {
    renderWithTheme(<FeedbackMessage color="success">Success message</FeedbackMessage>);
    const icon = screen.getByTestId('icon-circle-check');
    expect(icon).toBeInTheDocument();
  });

  it('renders the danger icon when color="danger"', () => {
    renderWithTheme(<FeedbackMessage color="danger">Error message</FeedbackMessage>);
    const icon = screen.getByTestId('icon-danger');
    expect(icon).toBeInTheDocument();
  });

  it('applies the correct styles based on the color prop', () => {
    const { container } = renderWithTheme(
      <FeedbackMessage color="danger">Styled message</FeedbackMessage>,
    );
    expect(container.firstChild).toHaveAttribute('color', 'danger');
  });
});
