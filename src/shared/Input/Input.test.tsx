import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { light } from '@/theme';
import { Input } from './index';

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={light}>{component}</ThemeProvider>);
};

describe('Input component', () => {
  it('renders the input with correct props', () => {
    renderWithTheme(
      <Input type="text" placeholder="Test input" value="Hello World" />,
    );

    const input = screen.getByTestId('test-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Test input');
    expect(input).toHaveValue('Hello World');
  });

  it('renders the label when passed', () => {
    renderWithTheme(<Input label="Username" />);

    const label = screen.getByText('Username');
    expect(label).toBeInTheDocument();
  });

  it('renders the left icon when passed', () => {
    const LeftIcon = () => <span data-testid="left-icon">Left</span>;

    renderWithTheme(<Input leftIcon={LeftIcon} />);

    const leftIcon = screen.getByTestId('left-icon');
    expect(leftIcon).toBeInTheDocument();
  });

  it('renders the right icon when passed', () => {
    const RightIcon = () => <span data-testid="right-icon">Right</span>;

    renderWithTheme(<Input rightIcon={RightIcon} />);

    const rightIcon = screen.getByTestId('right-icon');
    expect(rightIcon).toBeInTheDocument();
  });

  it('renders the button content when passed', () => {
    renderWithTheme(<Input buttonContent="Click me" buttonProps={{ onClick: jest.fn() }} />);

    const button = screen.getByText('Click me');
    expect(button).toBeInTheDocument();
  });

  it('renders the caption/feedback message when passed', () => {
    renderWithTheme(<Input caption="This is a feedback message" />);

    const caption = screen.getByText('This is a feedback message');
    expect(caption).toBeInTheDocument();
  });

  it('applies custom styles to the input container and input', () => {
    renderWithTheme(
      <Input
        style={{ backgroundColor: 'lightgray' }}
        inputstyle={{ color: 'red' }}
        buttonContent="Styled Button"
      />,
    );
    const inputRoot = screen.getByTestId('input-root');
    expect(inputRoot).toHaveStyle('backgroundColor: lightgray');

    const inputContainer = screen.getByTestId('input-container');
    expect(inputContainer).toHaveStyle('color: red');
  });

  it('calls the button onClick when clicked', () => {
    const onClick = jest.fn();
    renderWithTheme(<Input buttonContent="Click me" buttonProps={{ onClick }} />);

    const button = screen.getByText('Click me');
    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('handles ref forwarding correctly', () => {
    const ref = React.createRef<HTMLInputElement>();

    renderWithTheme(<Input ref={ref} />);

    const input = screen.getByTestId('test-input');
    expect(ref.current).toBe(input);
  });
});
