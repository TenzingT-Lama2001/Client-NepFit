import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BadgeIcon from "@mui/icons-material/Badge";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PaidIcon from "@mui/icons-material/Paid";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { PATH_DASHBOARD } from "../../../routes/path";
const navConfig = [
  {
    items: [
      {
        title: "Schedule",
        path: PATH_DASHBOARD.member.schedule,
        icon: <CalendarMonthIcon />,
      },
      {
        title: "Membership",
        path: PATH_DASHBOARD.member.membership,
        icon: <BadgeIcon />,
      },
      {
        title: "Trainer",
        path: PATH_DASHBOARD.member.trainer,
        icon: <FitnessCenterIcon />,
      },
      {
        title: "Payment",
        path: PATH_DASHBOARD.member.payment,
        icon: <PaidIcon />,
      },
      {
        title: "Report",
        path: PATH_DASHBOARD.member.report,
        icon: <AssessmentIcon />,
      },
    ],
  },
];

export default navConfig;
