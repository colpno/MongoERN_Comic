import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";

import { FormWrapper } from "components";
import { Popup } from "features";
import { usePopup, useToast, useUpdateUser } from "hooks";
import ProfileForm from "pages/Profile/components/ProfileForm";
import AvatarBox from "./components/AvatarBox";

function Profile() {
  const user = useSelector((state) => state.user.user);
  const { Toast, options } = useToast();
  const { popup, setPopup, triggerPopup } = usePopup();
  const { updateUser } = useUpdateUser();
  const [initialValues, setInitialValues] = useState({
    avatar: user.avatar,
    username: user.username,
    password: user.password,
    email: user.email,
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
      isShown: true,
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
      <Toast {...options} />
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} height={350} />}
    </>
  );
}

export default Profile;
