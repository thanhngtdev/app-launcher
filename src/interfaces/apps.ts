export interface AppIntegration {
  id: string;
  ownerUserId: string;
  developerName: string;
  developerDescription: string;
  appType: number;
  loginRedirectUri: string;
  logoutRedirectUri: string;
  scopes: string;
  name: string;
  icon: string;
  supportEmail: string;
  phone: string;
  homepage: string;
  launchUri: string;
  termsConditionsUri: string;
  privacyPolicyUri: string;
  summary: string;
  description: string;
  isLive?: boolean;
  isApproved?: boolean;
  isAssigned?: boolean;
  appClientName?: string;
  appClientId?: string;
  appClientSecret?: string;
  requestCount?: number;
}

export type App = Pick<
  AppIntegration,
  | 'id'
  | 'name'
  | 'developerName'
  | 'summary'
  | 'icon'
  | 'isLive'
  | 'isApproved'
  | 'launchUri'
  | 'requestCount'
  | 'isAssigned'
>;
