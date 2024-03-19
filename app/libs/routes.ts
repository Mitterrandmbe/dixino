export const routes = {
    home: "/",
    login: "/connexion",
    signup: "/rejoindre",
    dashboard: "/dashboard",
    checkout: "/checkout",
    resetPassword: "/reset-password",
    account: "/account",
    help: "/help",
    terms: "/terms",
    privacy: "/privacy",
    admin: "/admin",
    legal: "/legal",
    cookies: "/cookies"
};

export const singleLevelNestedRoutes = {
    dashboard: {
        profile: routes.dashboard + "/profile",
        listings: routes.dashboard + "/listings",
        payments: routes.dashboard + "/payments",
        offers: routes.dashboard + "/offers",
        wallet: routes.dashboard + "/wallet",
        admin: routes.dashboard + "/admin"
    },
    checkout: {
        success: routes.checkout + "/thank-you",
        failure: routes.checkout = "/failure"
    },
    terms: {
        fr: routes.terms + "/conditions-generales",
        nl: routes.terms + "/servicevoorwaarden",
    },
    legal: {
        fr: routes.legal + "/mentions-legales",
        nl: routes.legal + "/juridische-vermeldingen"
    },
    cookies: {
        en: routes.cookies + "/en",
        fr: routes.cookies + "/fr",
        nl: routes.cookies + "/nl",

    }
}