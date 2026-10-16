import { useFormContext } from 'react-hook-form';

import { SegmentBuilderForm } from './types';

export const useSegmentBuilderForm = () => useFormContext<SegmentBuilderForm>();
