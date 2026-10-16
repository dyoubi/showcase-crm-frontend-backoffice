import { useDispatch } from 'react-redux';

import { AppDispatch } from '@/libs/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
