function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";
const ROOTS_SHOP = "/shop";

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  newPassword: (token: string) => path(ROOTS_AUTH, `/setup-password/${token}`),
};

export const PATH_PAGE = {
  pricing: "/pricing",
  payment: "/payment",
  about: "/about-us",
  contact: "/contact-us",
  page403: "/403",
  page404: "/404",
  page500: "/500",
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  member: {
    schedule: path(ROOTS_DASHBOARD, "/member/schedule"),
    membership: path(ROOTS_DASHBOARD, "/member/membership"),
    trainer: path(ROOTS_DASHBOARD, "/member/trainer"),
    payment: path(ROOTS_DASHBOARD, "/member/payment"),
    report: path(ROOTS_DASHBOARD, "/member/report"),
  },
};
