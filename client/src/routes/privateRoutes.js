import { BlankLayout, BookshelfLayout, HistoryLayout, MyTitleLayout } from "layouts";
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
  Withdraw,
} from "pages";
import Cancel from "pages/AddCoin/components/Cancel";
import Success from "pages/AddCoin/components/Success";

export const privateRoutes = [
  { path: "/profile/update", component: Profile },
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
  {
    path: "/paypal/success",
    component: Success,
    layout: BlankLayout,
  },
  {
    path: "/paypal/cancel",
    component: Cancel,
    layout: BlankLayout,
  },
];
