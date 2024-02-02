import { isDevelopment } from 'consts';

// const ROOT_URL = `${isDevelopment ? 'http://123.30.145.70:10000' : window.location.origin}/api`;
const ROOT_URL = 'http://123.30.145.70:10000';

// Dont remove this command
// ImportAPIURL
export const APP_MANAGEMENT_URL = `${ROOT_URL}/app-management`;
export const APP_INTEGRATION_URL = `${ROOT_URL}/app-integration`;
export const USER_URL = `${ROOT_URL}/user`;
export const PLATFORM_URL = `${ROOT_URL}/platform-management`;
