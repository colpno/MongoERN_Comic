import { useState } from "react";
import { useSelector } from "react-redux";

import { convertToDateString, formatTime } from "utils/convertTime";
import ProfileForm from "pages/Profile/components/ProfileForm";
import { Popup } from "features";
import AvatarBox from "./components/AvatarBox";

function Profile() {
  const user = useSelector((state) => state.user.user);
  const { day, month, year } = formatTime(user.dateOfBirth);
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "Hình dại diện",
    content: "",
  });

  const INITIAL_VALUE = {
    avatar: "",
    nickname: user.username,
    email: "",
    dateOfBirth: user.dateOfBirth ? convertToDateString(day, month, year) : "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  const handleOpenChooseAvatar = () => {
    setPopup((prev) => ({
      ...prev,
      trigger: true,
      content: <AvatarBox />,
    }));
  };

  return (
    <>
      <ProfileForm
        INITIAL_VALUE={INITIAL_VALUE}
        handleSubmit={handleSubmit}
        handleOpenChooseAvatar={handleOpenChooseAvatar}
      />
      <Popup popup={popup} setPopup={setPopup} yesno />
    </>
  );
}

export default Profile;
