function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";
const MEMBER_DASHBOARD = path(ROOTS_DASHBOARD, "/member");
const ADMIN_DASHBOARD = path(ROOTS_DASHBOARD, "/admin");
const STAFF_DASHBOARD = path(ROOTS_DASHBOARD, "/staff");
const TRAINER_DASHBOARD = path(ROOTS_DASHBOARD, "/trainer");

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
      members: {
        root: path(ROOTS_DASHBOARD, "/admin/members"),
        new: path(ROOTS_DASHBOARD, "/admin/members/new"),
        list: path(ROOTS_DASHBOARD, "/admin/members/list"),
        edit: (memberId: string) =>
          path(ROOTS_DASHBOARD, `/admin/members/${memberId}/edit`),
      },
      trainers: path(ROOTS_DASHBOARD, "/admin/trainers"),
      staffs: path(ROOTS_DASHBOARD, "/admin/staffs"),
      orders: path(ROOTS_DASHBOARD, "/admin/orders"),
    },
  },
};
