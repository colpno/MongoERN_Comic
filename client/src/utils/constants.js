import { BiCategoryAlt, BiSpreadsheet } from "react-icons/bi";
import { BsFilePost } from "react-icons/bs";
import { FaChartBar, FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings, MdPayment } from "react-icons/md";

export default function getAdminSideBarMenu() {
  const baseURL = "/admin";
  return [
    {
      groupLabel: "Management",
      subMenu: [
        {
          to: `${baseURL}/titles`,
          icon: BsFilePost,
          label: "Titles",
        },
        {
          to: `${baseURL}/chapters`,
          icon: BiSpreadsheet,
          label: "Chapters",
        },
        {
          to: `${baseURL}/genres`,
          icon: BiCategoryAlt,
          label: "Genres",
        },
        {
          to: `${baseURL}/members`,
          icon: FaUsers,
          label: "Members",
        },
        {
          to: `${baseURL}/administrators`,
          icon: MdAdminPanelSettings,
          label: "Administrators",
        },
        {
          to: `${baseURL}/payment-methods`,
          icon: MdPayment,
          label: "Payment Methods",
        },
      ],
    },
    {
      groupLabel: "Stats",
      subMenu: [
        {
          to: `${baseURL}/income`,
          icon: FaChartBar,
          label: "Income",
        },
        // {
        //   to: `${baseURL}/visit`,
        //   icon: CircleC,
        //   label: "Visits",
        // },
      ],
    },
  ];
}

export const getMonthArray = () => {
  return [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ];
};

export const getChartColors = () => {
  const backgroundColors = [
    "#DC3912",
    "#FF9900",
    "#0099C6",
    "#990099",
    "#109618",
    "#3366CC",
    "#3B3EAC",
    "#DD4477",
    "#66AA00",
    "#B82E2E",
    "#316395",
    "#994499",
    "#22AA99",
    "#AAAA11",
    "#6633CC",
    "#E67300",
    "#8B0707",
    "#329262",
    "#5574A6",
    "#651067",
  ];
  const borderColors = [
    "hsl(12, 85%, 57%, 0.5)",
    "hsl(36, 100%, 60%, 0.5)",
    "hsl(194, 100%, 49%, 0.5)",
    "hsl(300, 100%, 40%, 0.5)",
    "hsl(124, 81%, 43%, 0.5)",
    "hsl(220, 60%, 60%, 0.5)",
    "hsl(238, 49%, 55%, 0.5)",
    "hsl(340, 69%, 67%, 0.5)",
    "hsl(84, 100%, 43%, 0.5)",
    "hsl(0, 60%, 55%, 0.5)",
    "hsl(210, 51%, 49%, 0.5)",
    "hsl(300, 38%, 53%, 0.5)",
    "hsl(173, 67%, 50%, 0.5)",
    "hsl(60, 82%, 47%, 0.5)",
    "hsl(260, 60%, 60%, 0.5)",
    "hsl(30, 100%, 55%, 0.5)",
    "hsl(0, 90%, 39%, 0.5)",
    "hsl(150, 49%, 48%, 0.5)",
    "hsl(217, 32%, 59%, 0.5)",
    "hsl(299, 73%, 33%, 0.5)",
  ];
  return { backgroundColors, borderColors };
};
