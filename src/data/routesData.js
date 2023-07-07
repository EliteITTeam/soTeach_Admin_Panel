import {
  BsFillChatTextFill,
  BsGraphUpArrow,
  BsFillBriefcaseFill,
  BsFillQuestionCircleFill,
} from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { RiDashboardFill } from "react-icons/ri";
import {
  MdRoomService,
  MdRateReview,
  MdVerified,
  MdOutlineAccountBalanceWallet,
} from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { FaPeopleArrows } from "react-icons/fa";
import { SiEventstore } from "react-icons/si";

export const adminRoutes = [
  {
    id: 1,
    path: "/dashboard",
    name: "Dashboard",
    icon: <RiDashboardFill />,
  },
  {
    id: 3,
    path: "/verification",
    name: "Verification",
    icon: <MdRoomService />,
  },
  {
    id: 4,
    path: "/students",
    name: "Students",
    icon: <BsGraphUpArrow />,
  },
  {
    id: 5,
    path: "/assessments",
    name: "Assessments",
    icon: <HiOutlineBars3BottomLeft />,
  },
  {
    id: 2,
    path: "/events",
    name: "Events",
    icon: <SiEventstore />,
  },
  {
    id: 6,
    path: "/inbox",
    name: "Inbox",
    icon: <MdRateReview />,
  },

  {
    id: 7,
    path: "/blog",
    name: "Blog & About us",
    icon: <HiUserGroup />,
  },
  {
    id: 8,
    path: "/password-reset",
    name: "Password Reset",
    icon: <FaPeopleArrows />,
  },
];
