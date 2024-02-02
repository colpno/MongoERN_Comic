import { BioLayout, BookshelfLayout, HistoryLayout, MyTitleLayout } from "layouts";
import {
  AddCoin,
  ChangePassword,
  Chapters,
  CoinHistory,
  CreateChapter,
  CreateTitle,
  Follow,
  Inventory,
  MyNotice,
  MyTitle,
  PointHistory,
  Profile,
  ReadingHistory,
  Statistic,
  TicketHistory,
  TitleTransaction,
  UpdateChapter,
  UpdateTitle,
  Withdraw,
} from "pages";

export const privateRoutes = [
  { path: "/profile/update", component: Profile, layout: BioLayout },
  { path: "/profile/update/password", component: ChangePassword, layout: BioLayout },
  { path: "/coin/add", component: AddCoin, layout: HistoryLayout },
  { path: "/withdraw", component: Withdraw, layout: HistoryLayout },
  {
    path: "/history/coin",
    component: CoinHistory,
    layout: HistoryLayout,
  },
  {
    path: "/history/point",
    component: PointHistory,
    layout: HistoryLayout,
  },
  {
    path: "/history/ticket",
    component: TicketHistory,
    layout: HistoryLayout,
  },
  { path: "/inventory", component: Inventory },
  { path: "/bookshelf/follow", component: Follow, layout: BookshelfLayout },
  // TODO { path: "/bookshelf/free-charge", component: Home, layout: BookshelfLayout },
  {
    path: "/bookshelf/history",
    component: ReadingHistory,
    layout: BookshelfLayout,
  },
  {
    path: "/bookshelf/transaction",
    component: TitleTransaction,
    layout: BookshelfLayout,
  },
  {
    path: "/my-title",
    component: MyTitle,
    layout: MyTitleLayout,
  },
  {
    path: "/my-title/:titleId",
    component: Chapters,
  },
  {
    path: "/my-title/create",
    component: CreateTitle,
  },
  {
    path: "/my-title/:titleId/create",
    component: CreateChapter,
  },
  {
    path: "/my-title/update/:titleId",
    component: UpdateTitle,
  },
  {
    path: "/my-title/:titleId/update/:chapterId",
    component: UpdateChapter,
  },
  {
    path: "/my-title/statistic",
    component: Statistic,
    layout: MyTitleLayout,
  },
  {
    path: "/my-title/notice",
    component: MyNotice,
    layout: MyTitleLayout,
  },
];
