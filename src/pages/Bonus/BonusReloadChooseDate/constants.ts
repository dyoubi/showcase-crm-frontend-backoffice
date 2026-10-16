export const intervalUnityOption: ReadonlyArray<{
  label: string;
  value: 'm' | 'h' | 'd';
}> = [
  { label: 'Minute', value: 'm' },
  { label: 'Hour', value: 'h' },
  { label: 'Day', value: 'd' },
] as const;
