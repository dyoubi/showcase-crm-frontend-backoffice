import { render, screen } from '@testing-library/react';
import { DATA_TEST_IDS } from '@/constants';
import { useGetCasinoTags } from '@/domains/casino/tag';

import { TagInput } from './index';

jest.mock('@/domains/casino/tag', () => ({
  useGetCasinoTags: jest.fn(),
}));

jest.mock('@/shared/Icons', () => ({
  IconLoader: () => <div data-testid="icon-loader" />,
}));

jest.mock('@/shared/Select', () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Select: ({ options, onChange, ...rest }: any) => (
    <select
      data-testid="mock-select"
      multiple
      onChange={(e) =>
        onChange(
          Array.from(e.target.selectedOptions).map((o) => ({
            label: o.label,
            value: o.value,
          })),
        )
      }
      {...rest}
    >
      {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      options.map((opt: any) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  ),
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getOptionFromValue: (id: string, options: any[]) => options.find((opt) => opt.value === id),
}));

describe('TagInput', () => {
  const mockTags = [
    { id: '1', name: 'Tag A', color: 'red' },
    { id: '2', name: 'Tag B', color: 'blue' },
  ];
  const tagIds = ['1', '2'];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loader while fetching tags', () => {
    (useGetCasinoTags as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
    });

    render(<TagInput tagType="machine" setTagsIds={jest.fn()} tagsIds={tagIds} />);

    expect(screen.getByTestId('icon-loader')).toBeInTheDocument();
  });

  it('renders options after loading', () => {
    (useGetCasinoTags as jest.Mock).mockReturnValue({
      data: mockTags,
      isLoading: false,
    });

    render(<TagInput tagType="machine" setTagsIds={jest.fn()} tagsIds={tagIds} />);

    expect(screen.getByTestId(DATA_TEST_IDS.TAG_INPUT_MACHINE)).toBeInTheDocument();
    expect(screen.getByText('Tag A')).toBeInTheDocument();
    expect(screen.getByText('Tag B')).toBeInTheDocument();
  });
});
