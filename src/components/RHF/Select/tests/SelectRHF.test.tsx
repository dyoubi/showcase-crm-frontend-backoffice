import { act } from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { ThemeProvider } from '@emotion/react';

import { OptionType } from '@/shared/Select';
import { light } from '@/theme';

import { SelectRHF } from '../index';

type TestFormValues = { selectMono: string; selectMulti: string[] };

const TestSelectForm = () => {
  const { control, watch, setValue } = useForm<TestFormValues>({
    defaultValues: {
      selectMono: '1',
      selectMulti: ['a'],
    },
  });

  const monoValue = watch('selectMono');
  const multiValue = watch('selectMulti');

  const options: OptionType[] = [
    { label: 'Value 1', value: '1' },
    { label: 'Value 2', value: '2' },
  ];

  const multiOptions: OptionType[] = [
    { label: 'A', value: 'a' },
    { label: 'B', value: 'b' },
  ];

  return (
    <ThemeProvider theme={light}>
      <SelectRHF
        name="selectMono"
        control={control}
        options={options}
        placeholder="Select mono"
        data-testid="select-mono"
      />

      <SelectRHF
        name="selectMulti"
        control={control}
        isMulti
        options={multiOptions}
        placeholder="Select multi"
        data-testid="select-multi"
      />

      <div data-testid="output-mono">{`mono: ${monoValue}`}</div>
      <div data-testid="output-multi">{`multi: ${multiValue.join(',')}`}</div>

      <button onClick={() => setValue('selectMono', '2')} type="submit">
        Set Mono
      </button>

      <button onClick={() => setValue('selectMulti', ['b'])} type="submit">
        Set Multi
      </button>
    </ThemeProvider>
  );
};
describe('SelectRHF integration', () => {
  it('renders default values and updates via setValue', () => {
    render(<TestSelectForm />);

    expect(screen.getByTestId('output-mono')).toHaveTextContent('mono: 1');
    expect(screen.getByTestId('output-multi')).toHaveTextContent('multi: a');

    act(() => {
      screen.getByText('Set Mono').click();
      screen.getByText('Set Multi').click();
    });

    expect(screen.getByTestId('output-mono')).toHaveTextContent('mono: 2');
    expect(screen.getByTestId('output-multi')).toHaveTextContent('multi: b');
  });
});
