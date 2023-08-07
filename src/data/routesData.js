import { BsGraphUpArrow } from "react-icons/bs";
import { RiDashboardFill } from "react-icons/ri";
import { MdRoomService, MdRateReview } from "react-icons/md";
import { HiUserGroup } from "react-icons/hi";
import { HiOutlineBars3BottomLeft } from "react-icons/hi2";
import { SiEventstore } from "react-icons/si";
import { BiEdit } from "react-icons/bi";
import { VscLock } from "react-icons/vsc";

// New Icons

import { TbLayoutDashboard } from "react-icons/tb";
import { MdPersonAddAlt } from "react-icons/md";
import { HiOutlineUsers } from "react-icons/hi";
import { GiBookshelf } from "react-icons/gi";
import { CgNotes } from "react-icons/cg";

import {
  blogs,
  blogList,
  dashboard,
  events,
  inbox,
  password,
  students,
  subjects,
  verification,
} from "../assests";

export const adminRoutes = [
  {
    id: 1,
    path: "/dashboard",
    name: "Dashboard",
    icon: dashboard,
  },
  {
    id: 3,
    path: "/verification",
    name: "Verification",
    icon: verification,
  },
  {
    id: 4,
    path: "/students",
    name: "Students",
    icon: students,
  },
  {
    id: 5,
    path: "/assessments",
    name: "Subjects",
    icon: subjects,
  },
  {
    id: 2,
    path: "/events",
    name: "Events",
    icon: events,
  },
  {
    id: 6,
    path: "/inbox",
    name: "Inbox",
    icon: inbox,
  },

  {
    id: 7,
    path: "/blog",
    name: "Blog & About us",
    icon: blogs,
  },
  {
    id: 8,
    path: "/blog/list",
    name: "Blog List",
    icon: blogList,
  },
  {
    id: 9,
    path: "/password-reset",
    name: "Password Reset",
    icon: password,
  },
];
