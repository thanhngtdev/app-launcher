import { isDevelopment } from 'consts/index';

// const ROOT_URL = `${
//   isDevelopment ? 'http://103.104.122.210:10000/api' : window.location.origin
// }/api`;
const ROOT_URL = 'http://103.104.122.210:10000/api';

// Dont remove this command
// ImportAPIURL
export const APP_MANAGEMENT_URL = `${ROOT_URL}/app-management`;
export const APP_INTEGRATION_URL = `${ROOT_URL}/app-integration`;
export const USER_URL = `${ROOT_URL}/user`;
export const PLATFORM_URL = `${ROOT_URL}/platform-management`;
