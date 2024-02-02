import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";

import { FormWrapper } from "components";
import { Popup } from "features";
import { usePopup, useUpdateUser } from "hooks";
import ProfileForm from "pages/Profile/components/ProfileForm";
import AvatarBox from "./components/AvatarBox";

function Profile() {
  const user = useSelector((state) => state.user.user);
  const { popup, setPopup, triggerPopup } = usePopup();
  const { updateUser } = useUpdateUser();
  const [initialValues, setInitialValues] = useState({
    avatar: user.avatar,
    username: user.username,
    email: user.email,
    paypalEmail: user.paypal_email,
    dateOfBirth: user?.dateOfBirth ? moment(user.dateOfBirth, "DD/MM/YYYY").toString() : "",
  });

  const handleSubmit = (values, { setSubmitting }) => {
    updateUser(values);
    setSubmitting(false);
  };

  const handleChooseAvatar = (e) => {
    const val = e.target.value;
    setInitialValues((prev) => ({ ...prev, avatar: val }));
  };

  const handleOpenChooseAvatar = () => {
    setPopup({
      isTriggered: true,
      title: "Hình dại diện",
      content: <AvatarBox value={initialValues.avatar} handleOnChange={handleChooseAvatar} />,
    });
  };

  return (
    <>
      {user.username ? (
        <FormWrapper title="Thông tin cá nhân">
          <ProfileForm
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            handleOpenChooseAvatar={handleOpenChooseAvatar}
          />
        </FormWrapper>
      ) : null}
      <Popup data={popup} trigger={triggerPopup} sx={{ height: "350px" }} />
    </>
  );
}

export default Profile;
