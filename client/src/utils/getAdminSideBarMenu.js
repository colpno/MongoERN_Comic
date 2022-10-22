import { CircleC } from "assets/images";

export default function getAdminSideBarMenu() {
  const baseURL = "/admin";
  return [
    {
      groupLabel: "Management",
      subMenu: [
        {
          to: `${baseURL}/titles`,
          icon: CircleC,
          label: "Titles",
        },
        {
          to: `${baseURL}/chapters`,
          icon: CircleC,
          label: "Chapters",
        },
        {
          to: `${baseURL}/members`,
          icon: CircleC,
          label: "Members",
        },
        {
          to: `${baseURL}/administrators`,
          icon: CircleC,
          label: "Administrators",
        },
      ],
    },
    {
      groupLabel: "Stats",
      subMenu: [
        {
          to: `${baseURL}/income`,
          icon: CircleC,
          label: "Income",
        },
        {
          to: `${baseURL}/visit`,
          icon: CircleC,
          label: "Visits",
        },
      ],
    },
    {
      groupLabel: "User",
      subMenu: [
        {
          to: `${baseURL}/profile`,
          icon: CircleC,
          label: "Profile",
        },
      ],
    },
  ];
}
