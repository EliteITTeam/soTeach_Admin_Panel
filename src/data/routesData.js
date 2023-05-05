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

export const adminRoutes = [
  {
    id: 1,
    path: "/dashboard",
    name: "Dashboard",
    icon: <RiDashboardFill />,
  },
  {
    id: 2,
    path: "/verification",
    name: "Verification",
    icon: <MdRoomService />,
  },
  {
    id: 3,
    path: "/students",
    name: "Students",
    icon: <BsGraphUpArrow />,
  },
  {
    id: 4,
    path: "/assessments",
    name: "Assessments",
    icon: <HiOutlineBars3BottomLeft />,
  },
  {
    id: 7,
    path: "/inbox",
    name: "Inbox",
    icon: <MdRateReview />,
  },

  {
    id: 5,
    path: "/blog",
    name: "Blog & About us",
    icon: <HiUserGroup />,
  },
  {
    id: 6,
    path: "/password-reset",
    name: "Password Reset",
    icon: <FaPeopleArrows />,
  },
];
