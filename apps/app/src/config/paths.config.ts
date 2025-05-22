const pathsConfig = {
  auth: {
    signIn: '/sign-in',
    signUp: '/sign-up',
    verifyMfa: '/auth/verify',
    callback: '/auth/callback',
    passwordReset: '/auth/password-reset',
    passwordUpdate: '/update-password',
  },
  app: {
    home: '/',
    personalAccountSettings: '/console/settings',
    personalAccountBilling: '/console/billing',
    personalAccountBillingReturn: '/console/billing/return',
    accountHome: '/console/[account]',
    accountSettings: `/console/[account]/settings`,
    accountBilling: `/console/[account]/billing`,
    accountMembers: `/console/[account]/members`,
    accountBillingReturn: `/console/[account]/billing/return`,
    joinTeam: '/join',
  },
};

export default pathsConfig;
