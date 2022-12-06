import { BookshelfLayout, HistoryLayout, MyTitleLayout } from "layouts";
import {
  AddCoin,
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
} from "pages";

export const privateRoutes = [
  { path: "/profile/update", component: Profile },
  { path: "/profile/coin/add", component: AddCoin, layout: HistoryLayout },
  {
    path: "/profile/history/coin",
    component: CoinHistory,
    layout: HistoryLayout,
  },
  {
    path: "/profile/history/point",
    component: PointHistory,
    layout: HistoryLayout,
  },
  {
    path: "/profile/history/ticket",
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
