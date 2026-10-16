export interface MachineViewForm {
  description?: string;
  height?: string;
  image?: {
    desktop?: { url?: string };
    mobile?: { url?: string };
  };
  machineId?: string;
  maxPayout?: number;
  provider?: string;
  providerId?: string;
  rtp?: number;
  slot?: string;
  slug?: string;
  status?: 'enabled' | 'disabled';
  title?: string;
  type?: 'slot' | 'video-slot';
  volatility?: string;
  width?: string;
}
