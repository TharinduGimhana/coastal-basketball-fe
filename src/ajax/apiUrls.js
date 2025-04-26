export const BASE_URL = process.env.REACT_APP_API_BASE_URL;

//User Api No Token
export const UrlSignin = BASE_URL + "api/signin";
export const UrlSignup = BASE_URL + "api/signup";
export const UrlSignout = BASE_URL + "api/signout";
export const UrlUpdateUserProfile = BASE_URL + "api/user/update-profile";
export const UrlChangePassword = BASE_URL + "api/change-password";
export const UrlForgotPassword = BASE_URL + "api/forgot-password";
export const UrlVerifyOtpCode = BASE_URL + "api/verify-otp";
export const UrlSendOtpCode = BASE_URL + "api/send-otp";
export const UrlReSendOtpCode = BASE_URL + "api/resend-otp";
export const UrlVerifyLink = BASE_URL + "api/verify/link";
export const UrlGetSubscriptionSetting = BASE_URL + "api/subscription-packages";
export const UrlAddSubscription = BASE_URL + "api/add-subscription";
export const UrlSubscribe = BASE_URL + "api/subscribe";
export const UrlGetBranch = BASE_URL + "api/branch";
export const UrlGetEvent = BASE_URL + "api/event";

//User Api Token
export const UrlGetSubscription = BASE_URL + "api/get-subscription";

export const UrlUpdateSubscription = BASE_URL + "api/user/update-subscribe";
export const UrlCancelSubscription = BASE_URL + "api/user/cancel-subscribe";
export const UrlDownloadInvoice = BASE_URL + "api/payment/download-invoice";

export const UrlGetOpenSeason = BASE_URL + "api/open-season";
export const UrlGetPrevRegistrationInfo = BASE_URL + "api/user/register_info";
export const UrlAddIndividualPlayer = BASE_URL + "api/user/add-individual-player";
export const UrlAddTeamPlayer = BASE_URL + "api/user/add-team-player";


export const UrlGetUserPayment = BASE_URL + "api/user/payment";


//Admin Api No Token
export const UrlAdminLogin = BASE_URL + "api/admin/signin";


//Admin Api Token
export const UrlAdminDashboard = BASE_URL + "api/admin/dashboard";

export const UrlAdminGetSeasonType = BASE_URL + "api/type-season";
export const UrlAdminGetInvidualPlayerSeason = BASE_URL + "api/individual-player/season";
export const UrlAdminUpdateInvidualPlayer = BASE_URL + "api/individual-player/";
export const UrlAdminDeleteInvidualPlayer = BASE_URL + "api/individual-player/";
export const UrlAdminSelectSeason = BASE_URL + "api/individual-player/season-select";

export const UrlAdminDeleteTeamPlayer = BASE_URL + "api/team-player/";

export const UrlAdminGetBranch = BASE_URL + "api/branch";
export const UrlAdminSaveBranch = BASE_URL + "api/save-branch";
export const UrlAdminDeleteBranch = BASE_URL + "api/branch/";

export const UrlAdminGetEvent = BASE_URL + "api/event";
export const UrlAdminSaveEvent = BASE_URL + "api/save-event";
export const UrlAdminDeleteEvent = BASE_URL + "api/event/";

export const UrlAdminGetSeason = BASE_URL + "api/admin/season";
export const UrlAdminSaveSeason = BASE_URL + "api/admin/save-season";
export const UrlAdminDeleteSeason = BASE_URL + "api/admin/delete-season/";



export const UrlAdminGetUsers = BASE_URL + "api/admin/user";
export const UrlAdminCreateUser = BASE_URL + "api/admin/create-user";
export const UrlAdminBuilkDeleteUser = BASE_URL + "api/admin/user/bulk-delete";
export const UrlAdminDeleteUser = BASE_URL + "api/admin/user/delete/";

export const UrlAdminGetWaitingUsers = BASE_URL + "api/admin/get-waiting-users";

export const UrlAdminGetCoporatePartners = BASE_URL + "api/partner-corporate";
export const UrlAdminGetPlayerPartners = BASE_URL + "api/partner-player";
export const UrlAdminDeleteCoporatePartner = BASE_URL + "api/delete-partner-corporate/";
export const UrlAdminDeletePlayerPartner = BASE_URL + "api/delete-partner-player/";
export const UrlAdminSaveCoporatePartner = BASE_URL + "api/save-partner-corporate";
export const UrlAdminSavePlayerPartner = BASE_URL + "api/save-partner-player";

export const UrlAdminGetSubscriptionSetting = BASE_URL + "api/admin/subscription-settings";
export const UrlAdminSaveSubscriptionSetting = BASE_URL + "api/admin/save-subscription-setting";
export const UrlAdminDeleteSubscriptionSetting = BASE_URL + "api/admin/delete-subscription-setting/";

export const UrlAdminSaveBillingFrequency = BASE_URL + "api/save-billing-frequency";
export const UrlAdminDeleteBillingFrequency = BASE_URL + "api/delete-billing-frequency/";

export const UrlAdminSavePackageType = BASE_URL + "api/save-package-type";
export const UrlAdminDeletePackageType = BASE_URL + "api/delete-package-type/";

export const UrlAdminSaveBenefit = BASE_URL + "api/save-package-benefit";
export const UrlAdminDeleteBenefit = BASE_URL + "api/delete-package-benefit/";


export const UrlAdminGetPayment = BASE_URL + "api/payment";
export const UrlAdminDownloadInvoice = BASE_URL + "api/payment/download-invoice";

export const UrlAdminUpdateProfile = BASE_URL + "api/admin/update-profile";

export const UrlCreatePaymentIntent = BASE_URL + "api/create-payment-intent";