import { CircleC } from "assets/images";

export default function getAdminSideBarMenu() {
  return [
    {
      groupLabel: "Group 1",
      subMenu: [
        {
          to: "sanpham",
          icon: CircleC,
          label: "Sản phẩm",
          tab: "sanpham2",
        },
        {
          to: "sanpham",
          icon: CircleC,
          label: "Sản phẩm",
          tab: "sanpham",
        },
      ],
    },
    {
      groupLabel: "Group 1",
      subMenu: [
        {
          to: "nhapxuat",
          icon: CircleC,
          label: "Nhập xuất",
          tab: "nhapxuat",
        },
      ],
    },
    {
      groupLabel: "Group 1",
      subMenu: [
        {
          to: "taikhoan",
          icon: CircleC,
          label: "Tài khoản",
          tab: "taikhoan",
        },
      ],
    },
    {
      groupLabel: "Group 1",
      subMenu: [
        {
          to: "doitac",
          icon: CircleC,
          label: "Đối tác",
          tab: "doitac",
        },
      ],
    },
    {
      groupLabel: "Group 1",
      subMenu: [
        {
          to: "thongke",
          icon: CircleC,
          label: "Thống kê",
          tab: "thongke",
        },
      ],
    },
    {
      groupLabel: "Group 1",
      subMenu: [
        {
          to: "quyen",
          icon: CircleC,
          label: "Quyền",
          tab: "quyen",
        },
      ],
    },
  ];
}
