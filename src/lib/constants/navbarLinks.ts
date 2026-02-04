import {
  ArrowUpAZ,
  Bookmark,
  Contact,
  House,
  Info,
  LayoutGrid,
  LogIn,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

export const navbarLinks = [
  {
    id: 1,
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    id: 2,
    label: "About HIS",
    href: "/about-his",
    icon: Info,
  },
  {
    id: 3,
    label: "Editorial Board",
    href: "/editorial-board",
    icon: Users,
  },
  {
    id: 4,
    label: "Categories",
    href: "/categories",
    icon: ArrowUpAZ,
  },
  {
    id: 5,
    label: "Login",
    href: "/login",
    icon: LogIn,
  },
  {
    id: 6,
    label: "Sign up",
    href: "/sign-up",
    icon: LogIn,
  },
  {
    id: 7,
    label: "Profile",
    href: "/profile",
    icon: UserRound,
  },
  {
    id: 8,
    label: "Dashboard",
    href: "https://his.mc-apps.org/",
    icon: LayoutGrid,
  },
  {
    id: 9,
    label: "Favorites",
    href: "/favorites",
    icon: Bookmark,
  },
  {
    id: 10,
    label: "Guideline Publications",
    href: "/guideline-publications",
    icon: ShieldCheck,
  },
  {
    id: 11,
    label: "Contact Us",
    href: "/contact-us",
    icon: Contact,
  },
];
