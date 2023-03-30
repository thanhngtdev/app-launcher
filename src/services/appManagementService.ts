import queryString from 'query-string';
import { APP_INTEGRATION_URL, APP_MANAGEMENT_URL } from 'consts/apiUrl';
import { App, AppIntegration } from 'interfaces/apps';
import { PromiseResponseBase, RequestPagingCommon, ResponseCommonPaging } from 'interfaces/common';
import httpService from './httpService';
import { UserRequestingApp } from 'interfaces/user';
import { get } from 'lodash';

type ResponseListApp = ResponseCommonPaging<App[]>;

export type RequestCreateApp = Omit<
  AppIntegration,
  | 'id'
  | 'ownerUserId'
  | 'developerName'
  | 'developerDescription'
  | 'appClientSecret'
  | 'appClientName'
  | 'appClientId'
>;

export interface RequestApproveApp {
  appId: string;
  isApproved: boolean;
}

export interface RequestLiveApp {
  appId: string;
  isLive: boolean;
}

export interface RequestCheckAppCredential {
  userId: string;
  appClientId: string;
}

export interface RequestApproval {
  requestId: string;
  isApproved: boolean;
}

export interface RequestCreateApproval {
  appId: string;
}

export interface RequestListAppRequesting extends RequestPagingCommon {
  appId: string;
}

export interface ResponseGenerateAppCredentials {
  appClientName: string;
  appClientId: string;
  appClientSecret: string;
}

class AppManagementService {
  getListApp({ skip, take, filter }: RequestPagingCommon): PromiseResponseBase<ResponseListApp> {
    return httpService.get(
      `${APP_MANAGEMENT_URL}/application-listing?filter=${filter}&skip=${skip}&take=${take}`
    );
  }

  getListAppManager(body: RequestPagingCommon): PromiseResponseBase<ResponseListApp> {
    return httpService.get(
      `${APP_MANAGEMENT_URL}/manager-application-listing?${queryString.stringify(body)}`
    );
  }

  getInstalledListApp(body: RequestPagingCommon): PromiseResponseBase<ResponseListApp> {
    return httpService.get(
      `${APP_MANAGEMENT_URL}/installed-application-listing?${queryString.stringify(body)}`
    );
  }

  installApp({ id }: { id: string }) {
    return httpService.post(`${APP_MANAGEMENT_URL}/install`, { id });
  }

  uninstallApp({ id }: { id: string }) {
    return httpService.post(`${APP_MANAGEMENT_URL}/uninstall`, { id });
  }

  getListAppRequesting(
    body: RequestListAppRequesting
  ): PromiseResponseBase<ResponseCommonPaging<UserRequestingApp[]>> {
    return httpService.get(`${APP_MANAGEMENT_URL}/request-listing?${queryString.stringify(body)}`);
  }

  getListAppStore(body: RequestPagingCommon): PromiseResponseBase<ResponseCommonPaging<App[]>> {
    return httpService.get(
      `${APP_MANAGEMENT_URL}/store-application-listing?${queryString.stringify(body)}`
    );
  }

  requestApproval(body: RequestApproval) {
    return httpService.post(`${APP_MANAGEMENT_URL}/request-approve`, body);
  }

  requestCreate(body: RequestCreateApproval) {
    return httpService.post(`${APP_MANAGEMENT_URL}/request-create`, body);
  }

  //* APP INTEGRATION
  getAppIntegration({ id }: { id: string }): PromiseResponseBase<AppIntegration> {
    return httpService.get(`${APP_INTEGRATION_URL}?id=${id}`);
  }

  createApp(body: RequestCreateApp) {
    const formData = new FormData();
    for (const key in body) {
      formData.append(key, get(body, key));
    }
    return httpService.post(`${APP_INTEGRATION_URL}/create`, formData);
  }

  updateApp(id: string, body: RequestCreateApp) {
    const formData = new FormData();
    for (const key in body) {
      formData.append(key, get(body, key));
    }
    return httpService.put(`${APP_INTEGRATION_URL}/update?Id=${id}`, formData);
  }

  setApproveState({ appId, isApproved }: RequestApproveApp) {
    return httpService.post(`${APP_INTEGRATION_URL}/set-app-approval-state`, { appId, isApproved });
  }

  setLiveState({ appId, isLive }: RequestLiveApp) {
    return httpService.post(`${APP_INTEGRATION_URL}/set-app-live-state`, { appId, isLive });
  }

  generateAppCredentials(appId: string): PromiseResponseBase<ResponseGenerateAppCredentials> {
    return httpService.post(`${APP_INTEGRATION_URL}/generate-app-credentials?appId=${appId}`, {});
  }

  checkAppCredential(body: RequestCheckAppCredential) {
    return httpService.post(`${APP_INTEGRATION_URL}/check-app-credential`, body);
  }
}

export default new AppManagementService();
