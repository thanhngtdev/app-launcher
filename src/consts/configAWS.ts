import { isDevelopment } from 'consts';

const config = {
  authority:
    'https://cognito-idp.ap-southeast-1.amazonaws.com/ap-southeast-1_7wzWV6yyL/.well-known/openid-configuration',
  clientId: '450mbafbnrds0p8e5rk3jf4jt5',
  clientSecret: '3tl8inakfht7kf2nktso58ighcr0t6v3fm9t69kh71sj3vn4htv',
  redirectUri: isDevelopment
    ? 'http://localhost:3000/login/callback'
    : `${window.location.origin}/login/callback`,
  scope: 'openid email profile',
  responseType: 'code',
  autoSignIn: false,
};

export default config;
