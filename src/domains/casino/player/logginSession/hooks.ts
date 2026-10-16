import { ActionTypeEnum, Session } from '../balance';

export const useSessionBets = () => {
  const calculateSessionBets = (session: Session[]) => {
    const { totalBets, totalWins, maxBet } = session.reduce(
      (bets, currentSession) => {
        if (!currentSession.actions) {
          return bets;
        }
        currentSession.actions.forEach((action) => {
          const value = Number(action.operation?.value) * (action.operation?.type ?? 1);

          if (action.type === ActionTypeEnum.BET) {
            bets.totalBets += value;

            if (value > bets.maxBet) {
              bets.maxBet = value;
            }
          }

          if (action.type === ActionTypeEnum.WIN) {
            bets.totalWins += value;
          }
        });

        return bets;
      },
      {
        totalBets: 0,
        totalWins: 0,
        maxBet: 0,
      },
    );

    const income = totalWins - totalBets;

    return { totalBets, totalWins, income, maxBet };
  };

  return { calculateSessionBets };
};

export const useSessionIp = () => {
  const getSessionIp = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    session: Session[],
  ) => {
    // const firstIp = session[0].ip;

    // const isUnique = session.every((item) => item.ip === firstIp);

    // if (isUnique) {
    //   return firstIp;
    // }

    // return 'MULTIPLE';

    return 'XX.XX.XX.XX';
  };

  return { getSessionIp };
};
