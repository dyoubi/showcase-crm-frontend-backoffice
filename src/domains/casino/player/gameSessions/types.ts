import { CryptoCodes } from "@/domains/currency";

export type GetSessionsFilter = {
  coin?: CryptoCodes;
  begin?: string;
  end?: string;
  limit?: number;
  offset?: number;

  details?: boolean;
  grouped?: boolean;
};
