import { useState } from 'react';

import { Select } from '@/shared/Select';
import * as c from './contants';

interface SelectLangProps {
  lang: 'fr' | 'en';
  onChange: (newLang: 'fr' | 'en') => void;
  width?: string | number;
  className?: string;
}

export const SelectLang = ({ lang, onChange, width, className }: SelectLangProps) => {
  const value = c.optionsList.find((option) => option.value === lang);
  return (
    <Select
      className={className}
      label="Current Language"
      value={value}
      onChange={(newValue) =>
        newValue && onChange(newValue.value.toString() as SelectLangProps['lang'])
      }
      options={c.optionsList}
      width={width || 240}
    />
  );
};

export const useLangState = (defaultValue: 'fr' | 'en') => {
  const [lang, onChange] = useState(defaultValue);

  return { lang, onChange };
};
