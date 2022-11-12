import { AdminLayout } from "layouts";
import {
  AdminManagement,
  ChapterManagement,
  GenreManagement,
  IncomeStatistic,
  MemberManagement,
  PaymentMethodManagement,
  TitleManagement,
  VisitStatistic,
} from "pages";

export const adminRoutes = [
  {
    path: "/admin/titles",
    component: TitleManagement,
    layout: AdminLayout,
  },
  {
    path: "/admin/chapters",
    component: ChapterManagement,
    layout: AdminLayout,
  },
  {
    path: "/admin/genres",
    component: GenreManagement,
    layout: AdminLayout,
  },
  {
    path: "/admin/members",
    component: MemberManagement,
    layout: AdminLayout,
  },
  {
    path: "/admin/administrators",
    component: AdminManagement,
    layout: AdminLayout,
  },
  {
    path: "/admin/payment-methods",
    component: PaymentMethodManagement,
    layout: AdminLayout,
  },
  {
    path: "/admin/income",
    component: IncomeStatistic,
    layout: AdminLayout,
  },
  {
    path: "/admin/visit",
    component: VisitStatistic,
    layout: AdminLayout,
  },
];
