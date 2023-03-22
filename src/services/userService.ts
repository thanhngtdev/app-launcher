import { USER_URL } from 'consts/apiUrl';
import { PromiseResponseBase, RequestPagingCommon, ResponsePagingCommon } from 'interfaces/common';
import httpService from './httpService';

export interface RequestUpdateUserInfo {
  firstname: string;
  lastname: string;
  company: string;
  address: string;
  phoneNumber: string;
}

export interface RequestAssignUser {
  username: string;
  role: string;
  appId: string;
}

export interface UserInfo {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
  email: string;
  company: string;
  address: string;
  roles: string[];
  isFirstTimeLogin: boolean;
}

class UserService {
  getUserInfo(): PromiseResponseBase<UserInfo> {
    return httpService.get(`${USER_URL}/get-user-info`);
  }

  updateUserInfo(body: RequestUpdateUserInfo) {
    return httpService.post(`${USER_URL}/update-user-info`, body);
  }

  assignUser(body: RequestAssignUser) {
    return httpService.post(`${USER_URL}/assign-user`, body);
  }

  getListUser({
    skip,
    take,
    filter,
  }: RequestPagingCommon): PromiseResponseBase<ResponsePagingCommon<UserInfo[]>> {
    return httpService.get(`${USER_URL}/list-user?filter=${filter}&skip=${skip}&take=${take}`);
  }

  getUserDetail({ username }: { username: string }) {
    return httpService.get(`${USER_URL}/get-user?username=${username}`);
  }

  updateUser(username: string, body: RequestUpdateUserInfo) {
    return httpService.post(`${USER_URL}/update-user?username=${username}`, body);
  }
}

export default new UserService();
