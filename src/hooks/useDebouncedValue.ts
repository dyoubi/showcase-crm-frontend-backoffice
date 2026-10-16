import { useState, useMemo } from 'react';
import debounce from 'lodash/debounce';

export const useDebouncedValue = <C>(defaultValue?: C, timeOut = 400) => {
  const [state, setState] = useState<C | undefined>(defaultValue);

  const debouncedCallback: (value?: C) => void = useMemo(() => {
    return debounce((value?: C) => setState(value), timeOut);
  }, [setState, timeOut]);

  return [state, debouncedCallback] as const;
};
