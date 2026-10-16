export type GetCasinoMachinesResponse = Array<Machine>;

export type GetCasinoMachineResponse = Machine;

export type GetOperatorMachineResponse = Machine;

export interface Machine {
  id: string;
  key: string;
  externalId: string;
  studio: string;
  info: {
    hd: boolean;
    theme: string;
    title: string;
    payout: number;
    devices: Readonly<string>;
    category: string;
    licenses: Readonly<string>;
    producer: string;
    provider: string;
    bonus_buy: boolean;
    identifier: string;
    multiplier: number;
    description?: string;
    identifier2: string;
    restrictions: {
      default: {
        blacklist: [];
      };
    };
    feature_group: string;
    has_freespins: boolean;
    volatility_rating: string;
  };
  providerId: string;
}
