import moment from "moment";
import { useState } from "react";
import { useSelector } from "react-redux";

import { FloatingForm } from "components";
import { useUpdateUser } from "hooks";
import ProfileForm from "pages/Bio/Profile/components/ProfileForm";
import AvatarBox from "./components/AvatarBox";

function Profile() {
  const user = useSelector((state) => state.user.user);
  const { updateUser } = useUpdateUser();
  const [initialValues, setInitialValues] = useState({
    avatar: user.avatar,
    username: user.username,
    email: user.email,
    paypalEmail: user.paypal_email,
    dateOfBirth: user?.dateOfBirth ? moment(user.dateOfBirth, "DD/MM/YYYY").toString() : "",
  });
  const [isAvatarBoxOpened, setIsAvatarBoxOpened] = useState(false);

  const handleSubmit = (values, { setSubmitting }) => {
    updateUser(values);
    setSubmitting(false);
  };

  const handleChooseAvatar = (e) => {
    const val = e.target.value;
    setInitialValues((prev) => ({ ...prev, avatar: val }));
  };

  const handleOpenChooseAvatar = () => {
    setIsAvatarBoxOpened(true);
  };

  return (
    <>
      {user.username ? (
        <FloatingForm title="Thông tin cá nhân">
          <ProfileForm
            initialValues={initialValues}
            handleSubmit={handleSubmit}
            handleOpenChooseAvatar={handleOpenChooseAvatar}
          />
        </FloatingForm>
      ) : null}
      {isAvatarBoxOpened && (
        <AvatarBox
          value={initialValues.avatar}
          handleOnChange={handleChooseAvatar}
          trigger={setIsAvatarBoxOpened}
        />
      )}
    </>
  );
}

export default Profile;
