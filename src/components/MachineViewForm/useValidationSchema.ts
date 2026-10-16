import * as yup from 'yup';

import { useGetIsMachineViewSlugIsAvailable } from '@/domains/casino/machineView';

import * as t from './types';

export const useValidationSchema = (
  machineViewToEditId?: string,
  isEditMode?: boolean,
): yup.SchemaOf<Omit<t.MachineViewForm, 'maxPayout' | 'provider' | 'providerId' | 'rtp' | 'volatility'>> => {
  const { mutateAsync } = useGetIsMachineViewSlugIsAvailable(machineViewToEditId);

  return yup.object({
    title: yup.string().required('Required'),
    description: yup.string().required('Required'),
    slug: yup.string().required('Required').slug(mutateAsync),
    machineId: isEditMode ? yup.string() : yup.string().required('Required'),
    type: yup.mixed().oneOf(['slot', 'video-slot', undefined]),
    status: yup.mixed().oneOf(['enabled', 'disabled', undefined]),
    width: yup.string(),
    height: yup.string(),
    image: yup.object({
      desktop: yup.object({ url: yup.string() }),
      mobile: yup.object({ url: yup.string() }),
    }),
    slot: yup.string(),
  });
};
