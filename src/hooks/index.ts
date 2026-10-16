import { useMemo } from 'react';

import { generateId } from '@/utils';

export const useId = () => useMemo(() => generateId(), []);

export * from './useAppDispatch';
export * from './useAppSelector';
export * from './useHover';
export * from './useToaster';
export * from './useIdsArray';
export * from './useToggle';
export * from './useAppTheme';
export * from './useOnClickOutside';
export * from './useHandleError';
export * from './useAppDateFormat';
export * from './useIsFirstRender';
export * from './useUpdateEffect';
export * from './useTriggerConfirmationModal';
export * from './useQueryParams';
export * from './useDebouncedValue';
