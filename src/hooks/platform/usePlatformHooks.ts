import { useMutation, useQuery } from '@tanstack/react-query';
import { queryKeys } from 'consts/index';
import platformService, { RequestSetPlatFormSetting } from 'services/platformService';

export const useGetPlatformSettings = () => {
  return useQuery({
    queryKey: [queryKeys.getPlatformSettings],
    queryFn: () => platformService.getPlatform(),
  });
};

export const useSetPlatformSettings = () => {
  return useMutation({
    mutationFn: (body: RequestSetPlatFormSetting) => platformService.setPlatform(body),
  });
};
