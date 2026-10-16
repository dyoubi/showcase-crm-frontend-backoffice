import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { StoreState } from '@/libs/store';

export const useAppSelector: TypedUseSelectorHook<StoreState> = useSelector;
