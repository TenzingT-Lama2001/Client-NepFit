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
      packages: path(ROOTS_DASHBOARD, "/member/packages"),
      programs: path(ROOTS_DASHBOARD, "/member/programs"),
      trainers: path(ROOTS_DASHBOARD, "/member/trainers"),
      payment: path(ROOTS_DASHBOARD, "/member/payment"),
      report: path(ROOTS_DASHBOARD, "/member/report"),
      checkout: path(ROOTS_DASHBOARD, "/member/packages/checkout"),
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
      attendance: {
        create: path(ROOTS_DASHBOARD, "/staff/attendance/create"),
        list: path(ROOTS_DASHBOARD, "/staff/attendance/list"),
      },
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
      packages: {
        root: path(ROOTS_DASHBOARD, "/admin/packages"),
        new: path(ROOTS_DASHBOARD, "/admin/packages/new"),
        list: path(ROOTS_DASHBOARD, "/admin/packages/list"),

        edit: (packageId: string) =>
          path(ROOTS_DASHBOARD, `/admin/packages/${packageId}/edit`),
      },
      trainers: {
        root: path(ROOTS_DASHBOARD, "/admin/trainers"),
        new: path(ROOTS_DASHBOARD, "/admin/trainers/new"),
        list: path(ROOTS_DASHBOARD, "/admin/trainers/list"),
        edit: (trainerId: string) =>
          path(ROOTS_DASHBOARD, `/admin/trainers/${trainerId}/edit`),
      },
      staffs: {
        root: path(ROOTS_DASHBOARD, "/admin/staffs"),
        new: path(ROOTS_DASHBOARD, "/admin/staffs/new"),
        list: path(ROOTS_DASHBOARD, "/admin/staffs/list"),
        edit: (staffId: string) =>
          path(ROOTS_DASHBOARD, `/admin/staffs/${staffId}/edit`),
      },
      orders: path(ROOTS_DASHBOARD, "/admin/orders"),
    },
  },
};
