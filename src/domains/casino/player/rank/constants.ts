export const PlayerRanks = [
  { label: 'None', id: 0 },
  { label: 'Rank 1', id: 1 },
  { label: 'Rank 2', id: 2 },
  { label: 'Rank 3', id: 3 },
  { label: 'Rank 4', id: 4 },
  { label: 'Rank 5', id: 5 },
  { label: 'Rank 6', id: 6 },
  { label: 'Rank 7', id: 7 },
] as const;

export const VipRanks = PlayerRanks.filter((rank) => rank.id !== 0);
