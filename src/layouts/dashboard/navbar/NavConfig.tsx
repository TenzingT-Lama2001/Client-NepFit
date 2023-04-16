import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BadgeIcon from "@mui/icons-material/Badge";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PaidIcon from "@mui/icons-material/Paid";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DirectionsBikeIcon from "@mui/icons-material/DirectionsBike";
import ClassIcon from "@mui/icons-material/Class";
import CallIcon from "@mui/icons-material/Call";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import ApprovalIcon from "@mui/icons-material/Approval";
import { PATH_DASHBOARD } from "../../../routes/path";
import EventNoteIcon from "@mui/icons-material/EventNote";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import InventoryIcon from "@mui/icons-material/Inventory";
import Face3Icon from "@mui/icons-material/Face3";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import FlightClassIcon from "@mui/icons-material/FlightClass";
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
        title: "Shop",
        path: PATH_DASHBOARD.dashboard.member.products.shop,
        icon: <InventoryIcon />,
      },
      {
        title: "Packages",
        path: PATH_DASHBOARD.dashboard.member.packages,
        icon: <ClassIcon />,
      },
      {
        title: "Programs",
        path: PATH_DASHBOARD.dashboard.member.programs,
        icon: <FitnessCenterIcon />,
      },
      {
        title: "Trainers",
        path: PATH_DASHBOARD.dashboard.member.trainers,
        icon: <SportsGymnasticsIcon />,
      },
      {
        title: "Purchase history",
        path: PATH_DASHBOARD.dashboard.member.purchaseHistory,
        icon: <PaidIcon />,
      },
      {
        title: "Report",
        path: PATH_DASHBOARD.dashboard.member.report,
        icon: <AssessmentIcon />,
      },
      {
        title: "Book a trainer",
        path: PATH_DASHBOARD.dashboard.member.booking,
        icon: <CallIcon />,
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
        icon: <InventoryIcon />,
        children: [
          { title: "shop", path: PATH_DASHBOARD.dashboard.admin.products.shop },
          { title: "list", path: PATH_DASHBOARD.dashboard.admin.products.list },
          {
            title: "create",
            path: PATH_DASHBOARD.dashboard.admin.products.new,
          },
        ],
      },
      {
        title: "Package",
        path: PATH_DASHBOARD.dashboard.admin.packages.root,
        icon: <ClassIcon />,
        children: [
          { title: "list", path: PATH_DASHBOARD.dashboard.admin.packages.list },
          {
            title: "create",
            path: PATH_DASHBOARD.dashboard.admin.packages.new,
          },
        ],
      },
      {
        title: "Programs",
        path: PATH_DASHBOARD.dashboard.admin.programs.root,
        icon: <FitnessCenterIcon />,
        children: [
          { title: "list", path: PATH_DASHBOARD.dashboard.admin.programs.list },
          {
            title: "create",
            path: PATH_DASHBOARD.dashboard.admin.programs.new,
          },
        ],
      },
      {
        title: "Members",
        path: PATH_DASHBOARD.dashboard.admin.members.root,
        icon: <PeopleAltIcon />,
        children: [
          { title: "list", path: PATH_DASHBOARD.dashboard.admin.members.list },
          { title: "create", path: PATH_DASHBOARD.dashboard.admin.members.new },
        ],
      },

      {
        title: "Trainers",
        path: PATH_DASHBOARD.dashboard.admin.trainers,
        icon: <SportsGymnasticsIcon />,
        children: [
          { title: "list", path: PATH_DASHBOARD.dashboard.admin.trainers.list },
          {
            title: "create",
            path: PATH_DASHBOARD.dashboard.admin.trainers.new,
          },
        ],
      },
      {
        title: "Staffs",
        path: PATH_DASHBOARD.dashboard.admin.staffs,
        icon: <Face3Icon />,
        children: [
          { title: "list", path: PATH_DASHBOARD.dashboard.admin.staffs.list },
          { title: "create", path: PATH_DASHBOARD.dashboard.admin.staffs.new },
        ],
      },
      {
        title: "Orders",
        path: PATH_DASHBOARD.dashboard.admin.orders,
        icon: <AddShoppingCartIcon />,
      },
      // {
      //   title: "Purchase History",
      //   path: PATH_DASHBOARD.dashboard.admin.purchaseHistory,
      //   icon: <ShoppingBasketIcon />,
      // },
      {
        title: "Booking",
        path: PATH_DASHBOARD.dashboard.admin.booking,
        icon: <ApprovalIcon />,
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
        icon: <PeopleAltIcon />,
      },
      {
        title: "Workout",
        path: PATH_DASHBOARD.dashboard.trainer.workout,
        icon: <FitnessCenterIcon />,
      },
      {
        title: "Report",
        path: PATH_DASHBOARD.dashboard.trainer.report,
        icon: <AssessmentIcon />,
        children: [
          {
            title: "create",
            path: PATH_DASHBOARD.dashboard.trainer.report.create,
          },
        ],
      },
      {
        title: "Booking",
        path: PATH_DASHBOARD.dashboard.trainer.request,
        icon: <EventNoteIcon />,
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
        icon: <PeopleAltIcon />,
        children: [
          { title: "list", path: PATH_DASHBOARD.dashboard.staff.members.list },
          { title: "create", path: PATH_DASHBOARD.dashboard.staff.members.new },
        ],
      },
      {
        title: "Products",
        path: PATH_DASHBOARD.dashboard.staff.products,
        icon: <InventoryIcon />,
        children: [
          { title: "shop", path: PATH_DASHBOARD.dashboard.staff.products.shop },
          { title: "list", path: PATH_DASHBOARD.dashboard.staff.products.list },
          {
            title: "create",
            path: PATH_DASHBOARD.dashboard.staff.products.new,
          },
        ],
      },
      {
        title: "Notification",
        path: PATH_DASHBOARD.dashboard.staff.notification,
        icon: <NotificationsActiveIcon />,
      },

      {
        title: "Orders",
        path: PATH_DASHBOARD.dashboard.staff.orders,
        icon: <AddShoppingCartIcon />,
      },

      {
        title: "Attendance",
        path: PATH_DASHBOARD.dashboard.staff.attendance,
        icon: <CoPresentIcon />,
        children: [
          {
            title: "list",
            path: PATH_DASHBOARD.dashboard.staff.attendance.list,
          },
          {
            title: "create",
            path: PATH_DASHBOARD.dashboard.staff.attendance.create,
          },
        ],
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
