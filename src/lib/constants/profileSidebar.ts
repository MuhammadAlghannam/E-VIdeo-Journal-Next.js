import { Info, LockKeyhole, SquarePlay, Trash2, UserRound } from "lucide-react";

export const profileSidebarLinks = [
  {
    id: 1,
    label: "Profile Details",
    href: "/profile",
    icon: UserRound,
  },
  {
    id: 2,
    label: "Password",
    href: "/profile/password",
    icon: LockKeyhole,
  },
  {
    id: 3,
    label: "My Videos",
    href: "/profile/my-videos",
    icon: SquarePlay,
  },
  {
    id: 4,
    label: "Delete Account",
    href: "",
    type: "action",
    icon: Trash2,
  },
  {
    id: 5,
    label: "Help Center ",
    href: "/profile/help-center",
    icon: Info,
  },
];
