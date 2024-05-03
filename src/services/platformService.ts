import { PLATFORM_URL } from 'consts/apiUrl';
import { PromiseResponseBase } from 'interfaces/common';
import { get } from 'lodash';
import httpService from './httpService';

export interface RequestSetPlatFormSetting {
  launcherLogo: string;
  brandLogo: string;
  mainColour: string;
  detailText: string;
  summaryHeading: string;
}

export interface Platform {
  launcherLogo: string;
  brandLogo: string;
  mainColour: string;
  detailText: string;
  summaryHeading: string;
}

class PlatformService {
  setPlatform(body: RequestSetPlatFormSetting) {
    const formData = new FormData();
    for (const key in body) {
      formData.append(key, get(body, key));
    }

    return httpService.post(`${PLATFORM_URL}/set-platform-settings`, formData);
  }

  getPlatform(): PromiseResponseBase<Platform> {
    return httpService.get(`${PLATFORM_URL}/get-platform-settings`);
  }
}

export default new PlatformService();
