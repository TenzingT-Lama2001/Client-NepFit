function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";
const MEMBER_DASHBOARD = path("/member", ROOTS_DASHBOARD);
const ADMIN_DASHBOARD = path("/admin", ROOTS_DASHBOARD);
const STAFF_DASHBOARD = path("/staff", ROOTS_DASHBOARD);
const TRAINER_DASHBOARD = path("/trainer", ROOTS_DASHBOARD);
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
  // member: {
  //   schedule: path(ROOTS_DASHBOARD, "/member/schedule"),
  //   membership: path(ROOTS_DASHBOARD, "/member/membership"),
  //   trainer: path(ROOTS_DASHBOARD, "/member/trainer"),
  //   payment: path(ROOTS_DASHBOARD, "/member/payment"),
  //   report: path(ROOTS_DASHBOARD, "/member/report"),
  // },
  dashboard: {
    member: {
      root: MEMBER_DASHBOARD,
      schedule: path(ROOTS_DASHBOARD, "/member/schedule"),
      membership: path(ROOTS_DASHBOARD, "/member/membership"),
      trainer: path(ROOTS_DASHBOARD, "/member/trainer"),
      payment: path(ROOTS_DASHBOARD, "/member/payment"),
      report: path(ROOTS_DASHBOARD, "/member/report"),
    },

    trainer: {
      root: TRAINER_DASHBOARD,
      members: path(ROOTS_DASHBOARD, "/trainer/members"),
      workout: path(ROOTS_DASHBOARD, "/trainer/workout"),
      report: path(ROOTS_DASHBOARD, "/trainer/report"),
    },

    staff: {
      root: STAFF_DASHBOARD,
      products: path(ROOTS_DASHBOARD, "/staff/products"),
      members: path(ROOTS_DASHBOARD, "/staff/members"),
      notification: path(ROOTS_DASHBOARD, "/staff/notification"),
      invoice: path(ROOTS_DASHBOARD, "/staff/invoice"),
      orders: path(ROOTS_DASHBOARD, "/staff/orders"),
    },
    admin: {
      root: ADMIN_DASHBOARD,
      products: path(ROOTS_DASHBOARD, "/admin/products"),
      members: path(ROOTS_DASHBOARD, "/admin/members"),
      trainers: path(ROOTS_DASHBOARD, "/admin/members"),
      staffs: path(ROOTS_DASHBOARD, "/admin/members"),
      orders: path(ROOTS_DASHBOARD, "/admin/orders"),
    },
  },
};
