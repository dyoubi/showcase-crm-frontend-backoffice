import { GetPlayerBalances } from "@/domains/casino/player/balance";
import { GetPlayerAddresses } from "@/domains/casino/player/deposits";

type AddressBalanceTableColumns = 'address' | 'currencyCodes' | 'currentBalance' | 'hiddenBalance' | 'totalDeposited' | 'totalWithdrawn';

export type AddressBalanceData = Record<AddressBalanceTableColumns, JSX.Element[]>;
export type GetAddressBalanceData = {
  addresses: GetPlayerAddresses,
  balances: GetPlayerBalances,
};
