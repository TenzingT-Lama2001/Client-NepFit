import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BadgeIcon from "@mui/icons-material/Badge";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PaidIcon from "@mui/icons-material/Paid";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { PATH_DASHBOARD } from "../../../routes/path";
// const navConfig = [
//   {
//     items: [
//       {
//         title: "Schedule",
//         path: PATH_DASHBOARD.member.schedule,
//         icon: <CalendarMonthIcon />,
//       },
//       {
//         title: "Membership",
//         path: PATH_DASHBOARD.member.membership,
//         icon: <BadgeIcon />,
//       },
//       {
//         title: "Trainer",
//         path: PATH_DASHBOARD.member.trainer,
//         icon: <FitnessCenterIcon />,
//       },
//       {
//         title: "Payment",
//         path: PATH_DASHBOARD.member.payment,
//         icon: <PaidIcon />,
//       },
//       {
//         title: "Report",
//         path: PATH_DASHBOARD.member.report,
//         icon: <AssessmentIcon />,
//       },
//     ],
//   },
// ];

const memberNavConfig = [
  {
    items: [
      {
        title: "Schedule",
        path: PATH_DASHBOARD.dashboard.member.schedule,
        icon: <CalendarMonthIcon />,
      },
      {
        title: "Membership",
        path: PATH_DASHBOARD.dashboard.member.membership,
        icon: <BadgeIcon />,
      },
      {
        title: "Trainer",
        path: PATH_DASHBOARD.dashboard.member.trainer,
        icon: <FitnessCenterIcon />,
      },
      {
        title: "Payment",
        path: PATH_DASHBOARD.dashboard.member.payment,
        icon: <PaidIcon />,
      },
      {
        title: "Report",
        path: PATH_DASHBOARD.dashboard.member.report,
        icon: <AssessmentIcon />,
      },
    ],
  },
];
const adminNavConfig = [
  {
    items: [
      {
        title: "Products",
        path: PATH_DASHBOARD.dashboard.admin.products,
        icon: <CalendarMonthIcon />,
      },
      {
        title: "Members",
        path: PATH_DASHBOARD.dashboard.admin.members,
        icon: <BadgeIcon />,
      },
      {
        title: "Trainers",
        path: PATH_DASHBOARD.dashboard.admin.trainers,
        icon: <FitnessCenterIcon />,
      },
      {
        title: "Staffs",
        path: PATH_DASHBOARD.dashboard.admin.staffs,
        icon: <PaidIcon />,
      },
      {
        title: "Orders",
        path: PATH_DASHBOARD.dashboard.admin.orders,
        icon: <AssessmentIcon />,
      },
    ],
  },
];
const trainerNavConfig = [
  {
    items: [
      {
        title: "Members",
        path: PATH_DASHBOARD.dashboard.trainer.members,
        icon: <BadgeIcon />,
      },
      {
        title: "Workout",
        path: PATH_DASHBOARD.dashboard.trainer.workout,
        icon: <FitnessCenterIcon />,
      },
      {
        title: "Report",
        path: PATH_DASHBOARD.dashboard.trainer.report,
        icon: <PaidIcon />,
      },
    ],
  },
];
const staffNavConfig = [
  {
    items: [
      {
        title: "Members",
        path: PATH_DASHBOARD.dashboard.staff.members,
        icon: <BadgeIcon />,
      },
      {
        title: "Products",
        path: PATH_DASHBOARD.dashboard.staff.products,
        icon: <FitnessCenterIcon />,
      },
      {
        title: "Notification",
        path: PATH_DASHBOARD.dashboard.staff.notification,
        icon: <PaidIcon />,
      },
      {
        title: "Invoice",
        path: PATH_DASHBOARD.dashboard.staff.invoice,
        icon: <PaidIcon />,
      },
      {
        title: "Orders",
        path: PATH_DASHBOARD.dashboard.staff.orders,
        icon: <PaidIcon />,
      },
    ],
  },
];
const navConfig = {
  memberNavConfig,
  adminNavConfig,
  trainerNavConfig,
  staffNavConfig,
};
export default navConfig;
