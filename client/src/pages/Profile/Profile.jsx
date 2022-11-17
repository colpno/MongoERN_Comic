import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import FormWrapper from "components/FormWrapper/FormWrapper";
import { Popup, ProgressCircle } from "features";
import { useToast } from "hooks";
import { login } from "libs/redux/slices/userSlice";
import ProfileForm from "pages/Profile/components/ProfileForm";
import { getUserByID, updateUser } from "services/user";
import AvatarBox from "./components/AvatarBox";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [avatar, setAvatar] = useState(user.avatar);
  const [progress, setProgress] = useState(0);
  const { Toast, options, toastEmitter } = useToast();
  const { refetch } = getUserByID();
  const [popup, setPopup] = useState({
    trigger: false,
    isConfirm: false,
    title: "Hình dại diện",
    content: "",
  });

  const INITIAL_VALUE = {
    avatar: user.avatar,
    username: user.username,
    email: user.email,
    dateOfBirth: user.dateOfBirth
      ? moment(user.dateOfBirth, "DD/MM/YYYY").toString()
      : "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    values.avatar = avatar;
    const newData = {
      ...values,
      dateOfBirth: moment(values.dateOfBirth, "YYYY-MM-DD hh:mm:ss").toString(),
    };
    const valueKeys = Object.keys(newData);
    const changedValues = valueKeys.reduce((obj, key) => {
      if (JSON.stringify(values[key]) !== JSON.stringify(INITIAL_VALUE[key])) {
        return { ...obj, [key]: values[key] };
      }
      return obj;
    }, {});

    Object.keys(changedValues).length > 0 &&
      updateUser(user.guid, changedValues, setProgress)
        .then((response) => {
          if (response.affectedRows > 0) {
            refetch(user.guid).then(() => {
              dispatch(login({ ...user, ...changedValues }));
            });
            toastEmitter("Đổi thông tin cá nhân thành công", "success");
            setProgress(0);
          }
        })
        .catch((error) => {
          toastEmitter(error.data.error || error.data.message, "error");
          setProgress(0);
        });

    setSubmitting(false);
  };

  const handleChooseAvatar = (e) => {
    const val = e.target.value;
    setAvatar(val);
  };

  const handleOpenChooseAvatar = () => {
    setPopup((prev) => ({
      ...prev,
      trigger: true,
    }));
  };

  return (
    <>
      <FormWrapper title="Thông tin cá nhân">
        <ProfileForm
          avatar={avatar}
          INITIAL_VALUE={INITIAL_VALUE}
          handleSubmit={handleSubmit}
          handleOpenChooseAvatar={handleOpenChooseAvatar}
        />
      </FormWrapper>
      <Popup
        popup={{
          ...popup,
          content: (
            <AvatarBox value={avatar} handleOnChange={handleChooseAvatar} />
          ),
        }}
        setPopup={setPopup}
        height={350}
      />
      <Toast {...options} />
      <ProgressCircle percentage={progress} />
    </>
  );
}

export default Profile;
