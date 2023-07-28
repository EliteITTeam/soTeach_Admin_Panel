import { BsGraphUpArrow } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { MdRoomService, MdRateReview } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { SiEventstore } from "react-icons/si";
import { BiEdit } from "react-icons/bi";
import { VscLock } from "react-icons/vsc";

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
    name: "Subjects",
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
    icon: <BiEdit />,
  },
  {
    id: 8,
    path: "/blog/list",
    name: "Blog List",
    icon: <HiUserGroup />,
  },
  {
    id: 9,
    path: "/password-reset",
    name: "Password Reset",
    icon: <VscLock />,
  },
];
