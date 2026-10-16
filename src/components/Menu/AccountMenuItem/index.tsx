import { useMemo, useState } from 'react';
import { useAuth } from 'react-oidc-context';

import { DATE_FORMATS } from '@/domains/account/dateFormat';
import { setCurrentCasino } from '@/domains/account/slice';
import { useCurrentCasino } from '@/domains/casino/hooks';
import { FiatCodes, useAppFiatCurrency } from '@/domains/currency';
import { FiatCurrenciesSelectOptions } from '@/domains/currency/constants';

import { Checkbox } from '@/shared/Checkbox';
import { Drawer } from '@/shared/Drawer';
import { IconUser, IconSettings } from '@/shared/Icons';
import { Select, getOptionFromValue } from '@/shared/Select';
import { Spacer } from '@/shared/Spacer';

import { useAppDateFormat, useAppDispatch, useAppSelector, useAppTheme } from '../../../hooks';

import { MenuItem } from '../MenuItem';

interface AccountMenuItemProps {
  isCollapsed: boolean;
}

const datesOptions = DATE_FORMATS.map((a) => ({
  label: `${a.country} (${a.dateFormat})`,
  value: a.country,
}));

const iconLeftProps = {
  size: 'l',
  color: 'currentColor',
} as const;

export const AccountMenuItem = ({ isCollapsed }: AccountMenuItemProps) => {
  const [displayDrawer, setDisplayDrawer] = useState(false);

  const { country, setCountryDateFormat } = useAppDateFormat();
  const dispatch = useAppDispatch();
  const { setUserFiatCurrency, userFiatCurrency } = useAppFiatCurrency();
  const casinosList = useAppSelector((app) => app?.account?.casinosList);
  const { toggle, isDarkMode } = useAppTheme();
  const { user } = useAuth();
  const currentCasino = useCurrentCasino();
  const casinosListOptions = useMemo(
    () => casinosList?.map((casino) => ({ label: casino?.name, value: casino?.id })),
    [casinosList],
  );

  return (
    <MenuItem
      iconLeft={IconUser}
      onClick={() => setDisplayDrawer(true)}
      isCollapsed={isCollapsed}
      iconLeftProps={iconLeftProps}
    >
      <Drawer
        icon={<IconSettings size="l" />}
        title="Settings"
        open={displayDrawer}
        onClose={() => setDisplayDrawer(false)}
      >
        <Select
          label="Select Casino"
          value={getOptionFromValue(currentCasino?.id, casinosListOptions)}
          options={casinosListOptions}
          onChange={(value) => {
            if (!value?.value) return null;

            const selectedCasino = casinosList.find(casino => casino.id === value.value);

            if (!selectedCasino) return null;

            return dispatch(setCurrentCasino(selectedCasino));
          }}
        />
        <Spacer size="l" />
        <Select
          label="Date Format"
          value={getOptionFromValue(country, datesOptions)}
          options={datesOptions}
          onChange={(value) => setCountryDateFormat(value?.value)}
        />
        <Spacer size="m" />

        <Checkbox label="Dark Mode?" checked={isDarkMode} onChange={toggle} />
        <Spacer size="m" />

        <Select
          label="Fiat Currency"
          value={getOptionFromValue(userFiatCurrency, FiatCurrenciesSelectOptions)}
          options={FiatCurrenciesSelectOptions}
          onChange={(value) => setUserFiatCurrency(value?.value as FiatCodes)}
        />
        <Spacer size="l" />
      </Drawer>

      <p>
        Hello <strong>{user?.profile?.name}</strong>!
      </p>
    </MenuItem>
  );
};
