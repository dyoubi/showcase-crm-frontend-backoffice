import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

import { ThemeProvider } from '@emotion/react';

import { Select } from './index';
import { light } from '../../theme/index';

const mockOptions = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];

const renderWithTheme = (component: React.ReactNode) => {
  return render(<ThemeProvider theme={light}>{component}</ThemeProvider>);
};

jest.mock('uuid', () => ({
  v4: jest.fn().mockReturnValue('1234-5678-90ab-cdef'),
}));
describe('Select', () => {
  it('renders without crashing', () => {
    renderWithTheme(
      <Select
        options={mockOptions}
        value={null}
        onChange={jest.fn()}
        placeholder="Select an option"
      />,
    );

    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('shows loading indicator when isLoading is true', () => {
    renderWithTheme(
      <Select
        options={mockOptions}
        value={null}
        onChange={jest.fn()}
        isLoading
        placeholder="Loading select"
      />,
    );

    expect(screen.getByText('Loading select')).toBeInTheDocument();
    expect(screen.getByTestId('loading-icon')).toBeInTheDocument();
  });

  it('displays the label when provided', () => {
    renderWithTheme(
      <Select
        label="Test Label"
        options={mockOptions}
        value={null}
        onChange={jest.fn()}
        placeholder="Select an option"
      />,
    );

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', async () => {
    const handleChange = jest.fn();

    renderWithTheme(
      <Select
        options={mockOptions}
        value={null}
        onChange={handleChange}
        placeholder="Select an option"
      />,
    );

    const input = screen.getByRole('combobox');
    fireEvent.keyDown(input, { key: 'ArrowDown' });

    const option = await screen.findByText('Option 1');
    fireEvent.click(option);

    expect(handleChange).toHaveBeenCalled();
  });

  it('shows caption when provided', () => {
    renderWithTheme(
      <Select
        caption="This is a caption"
        options={mockOptions}
        value={null}
        onChange={jest.fn()}
        placeholder="Select an option"
      />,
    );

    expect(screen.getByText('This is a caption')).toBeInTheDocument();
  });
});
