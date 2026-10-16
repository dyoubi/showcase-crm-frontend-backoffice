import { Dispatch, SetStateAction } from "react";

export enum EAccountActions {
  ACTIVATE = 'Activate',
  BAN = 'Ban',
  FREEZE = 'Freeze',
}

export type AccountActions = `${EAccountActions}`;

export interface AccountConfirmationModalProps {
  confirmationType: AccountActions,
  playerId: string,
  setConfirmationType: Dispatch<SetStateAction<EAccountActions | null>>,
};
