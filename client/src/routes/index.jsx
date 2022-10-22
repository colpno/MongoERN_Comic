import {
  AdminLayout,
  BookshelfLayout,
  ComicLayout,
  HistoryLayout,
  LoginLayout,
  MyTitleLayout,
  ReadingLayout,
} from "layouts";
import {
  AddCoin,
  Chapters,
  CoinHistory,
  Complete,
  ContentList,
  CreateChapter,
  CreateTitle,
  Follow,
  Home,
  Inventory,
  MyNotice,
  MyTitle,
  Notice,
  NoticeList,
  PointHistory,
  Profile,
  Ranking,
  Reading,
  ReadingHistory,
  Statistic,
  TicketHistory,
  Title,
  TitleTransaction,
  UpdateChapter,
  UpdateTitle,
  Weekly,
  Login,
  Register,
  ForgotPassword,
  TitleManagement,
  ChapterManagement,
  AdminManagement,
  MemberManagement,
} from "pages";

export const publicRoutes = [
  { path: "/", component: Home },
  {
    path: "/login",
    component: Login,
    layout: LoginLayout,
  },
  {
    path: "/register",
    component: Register,
    layout: LoginLayout,
  },
  {
    path: "/forgot-password",
    component: ForgotPassword,
  },
  {
    path: "/comic/weekly",
    component: Weekly,
    layout: ComicLayout,
  },
  {
    path: "/comic/ranking",
    component: Ranking,
    layout: ComicLayout,
  },
  {
    path: "/comic/complete",
    component: Complete,
    layout: ComicLayout,
  },
  {
    path: "/comic/title/:titleId",
    component: Title,
  },
  {
    path: "/comic/title/:titleId/:chapterId",
    component: Reading,
    layout: ReadingLayout,
  },
  {
    path: "/content-list/:genreId",
    component: ContentList,
  },
  {
    path: "/notice-list",
    component: NoticeList,
  },
  {
    path: "/notice/:noticeId",
    component: Notice,
  },
  // { path: "/static/term", component: Home },
  // { path: "/static/privacy-policy", component: Home },

  /* 
    INFO: Private routes (Move to private func later)
   */
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
  // { path: "/bookshelf/free-charge", component: Home, layout: BookshelfLayout },
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
    path: "/my-title/create", // INFO: REST: create
    component: CreateTitle,
  },
  {
    path: "/my-title/:titleId/create", // INFO: REST: create
    component: CreateChapter,
  },
  {
    path: "/my-title/update/:titleId", // INFO: REST: udpate
    component: UpdateTitle,
  },
  {
    path: "/my-title/:titleId/update/:chapterId", // INFO: REST: update
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
    path: "/admin/members",
    component: MemberManagement,
    layout: AdminLayout,
  },
  {
    path: "/admin/administrators",
    component: AdminManagement,
    layout: AdminLayout,
  },
];

export const privateRotes = [];
