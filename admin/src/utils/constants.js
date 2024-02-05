import { AiFillDollarCircle, AiFillNotification } from "react-icons/ai";
import { BiCategoryAlt, BiSpreadsheet } from "react-icons/bi";
import { BsFilePost } from "react-icons/bs";
import { FaBell, FaEye, FaUsers } from "react-icons/fa";
import { MdAdminPanelSettings, MdPayment } from "react-icons/md";

export function getAdminSideBarMenu() {
  return [
    {
      groupLabel: "Management",
      subMenu: [
        {
          to: `/titles`,
          Icon: BsFilePost,
          label: "Titles",
        },
        {
          to: `/chapters`,
          Icon: BiSpreadsheet,
          label: "Chapters",
        },
        {
          to: `/genres`,
          Icon: BiCategoryAlt,
          label: "Genres",
        },
        {
          to: `/members`,
          Icon: FaUsers,
          label: "Members",
        },
        {
          to: `/administrators`,
          Icon: MdAdminPanelSettings,
          label: "Administrators",
        },
        {
          to: `/notifications`,
          Icon: AiFillNotification,
          label: "Notifications",
        },
        {
          to: `/personal-notifications`,
          Icon: FaBell,
          label: "Personal Notifications",
        },
        {
          to: `/payment-methods`,
          Icon: MdPayment,
          label: "Payment Methods",
        },
      ],
    },
    {
      groupLabel: "Statistic",
      subMenu: [
        {
          to: `/income`,
          Icon: AiFillDollarCircle,
          label: "Income",
        },
        {
          to: `/visit`,
          Icon: FaEye,
          label: "Visit",
        },
      ],
    },
  ];
}

export const getMonthArray = () => {
  return [
    { number: 1, standard: "Tháng 1", short: "T1", long: "Tháng một" },
    { number: 2, standard: "Tháng 2", short: "T2", long: "Tháng hai" },
    { number: 3, standard: "Tháng 3", short: "T3", long: "Tháng ba" },
    { number: 4, standard: "Tháng 4", short: "T4", long: "Tháng bốn" },
    { number: 5, standard: "Tháng 5", short: "T5", long: "Tháng năm" },
    { number: 6, standard: "Tháng 6", short: "T6", long: "Tháng sáu" },
    { number: 7, standard: "Tháng 7", short: "T7", long: "Tháng bảy" },
    { number: 8, standard: "Tháng 8", short: "T8", long: "Tháng tám" },
    { number: 9, standard: "Tháng 9", short: "T9", long: "Tháng chín" },
    { number: 10, standard: "Tháng 10", short: "T10", long: "Tháng mười" },
    { number: 11, standard: "Tháng 11", short: "T11", long: "Tháng mười một" },
    { number: 12, standard: "Tháng 12", short: "T12", long: "Tháng mười hai" },
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
