/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import { AiOutlineLogout } from "react-icons/ai";
import {
  BsBellFill,
  BsFillFileEarmarkFontFill,
  BsFillPatchQuestionFill,
} from "react-icons/bs";
import { FaTicketAlt } from "react-icons/fa";
import { ImBooks, ImQuill } from "react-icons/im";
import { IoGiftSharp, IoLockClosed } from "react-icons/io5";

import { CircleC, CircleP } from "assets/images";

function getAvatarMenu(cx, user, isLoggedIn) {
  return [
    [
      {
        path: isLoggedIn ? "/profile/update" : "/login",
        label: <span className={cx("user-name")}>{user.userName}</span>,
        icon: <img src={user.avatar} alt="User avatar" />,
      },
      {
        path: "/profile/coin/add",
        label: (
          <>
            <p className={cx("coin-label")}>Coin</p>
            <p className={cx("coin-balance")}>{user.coin}</p>
          </>
        ),
        icon: <CircleC className={cx(isLoggedIn ? "" : "gray")} />,
      },
      {
        path: "/profile/coin/add",
        label: (
          <>
            <p className={cx("point-label")}>Point</p>
            <p className={cx("point-balance")}>{user.point}</p>
          </>
        ),
        icon: <CircleP className={cx(isLoggedIn ? "" : "gray")} />,
      },
    ],
    [
      // {
      //   path: "/redeem",
      //   label: <span>Thẻ quà tặng</span>,
      //   icon: <IoGiftSharp className={cx(isLoggedIn ? "" : "gray")} />,
      // },
      {
        path: "/inventory",
        label: <span>Hộp vé</span>,
        icon: <FaTicketAlt className={cx(isLoggedIn ? "" : "gray")} />,
      },
      {
        path: "/bookshelf/follow",
        label: <span>Tủ sách</span>,
        icon: <ImBooks className={cx(isLoggedIn ? "" : "gray")} />,
      },
      {
        path: "/my-title",
        label: <span>Truyện của tôi</span>,
        icon: <ImQuill className={cx(isLoggedIn ? "" : "gray")} />,
      },
    ],
    [
      {
        path: "/notice-list",
        label: <span>Thông báo</span>,
        icon: <BsBellFill />,
      },
      // {
      //   path: "login",
      //   label: <span>FAQ</span>,
      //   icon: <BsFillPatchQuestionFill />,
      // },
      // {
      //   path: "/static/terms",
      //   label: <span>Điều khoản sử dụng</span>,
      //   icon: <BsFillFileEarmarkFontFill />,
      // },
      // {
      //   path: "/static/privacy-policy",
      //   label: <span>Điều khoản bảo mật</span>,
      //   icon: <IoLockClosed />,
      // },
    ],
    [
      {
        path: "",
        label: <span>Đăng xuất</span>,
        icon: <AiOutlineLogout className={cx("logout-icon")} />,
      },
    ],
  ];
}

getAvatarMenu.propTypes = {
  cx: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userName: PropTypes.string.isRequired,
    point: PropTypes.number.isRequired,
    coin: PropTypes.number.isRequired,
  }).isRequired,
};

export default getAvatarMenu;
