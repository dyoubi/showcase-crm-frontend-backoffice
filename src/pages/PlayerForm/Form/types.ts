export interface PlayerFormType {
  birth?: string;
  city?: string;
  country?: string;
  firstname?: string;
  gender?: 'm' | 'f';
  ghostMode?: boolean;
  lastname?: string;
  rainMode?: boolean;
  rank?: { level?: number; points?: number };
  marketingAcceptation?: boolean;
  lastLogin?: string;
  dateRegistered?: string;
  ipAddress?: string;
  showStats?: boolean;
  affiliateToken?: string;
}
