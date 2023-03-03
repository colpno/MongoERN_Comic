import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { FormWrapper } from "components";
import { Popup, ProgressCircle } from "features";
import { usePopup, useToast } from "hooks";
import ProfileForm from "pages/Profile/components/ProfileForm";
import { userService } from "services";
import AvatarBox from "./components/AvatarBox";

function Profile() {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const [progress, setProgress] = useState(0);
  const { Toast, options, toastEmitter } = useToast();
  const { popup, setPopup, triggerPopup } = usePopup();

  const INITIAL_VALUE = user?.username && {
    avatar: user.avatar,
    username: user.username,
    password: user.password,
    email: user.email,
    dateOfBirth: user.dateOfBirth ? moment(user.dateOfBirth, "DD/MM/YYYY").toString() : "",
  };

  const fetchData = () => {
    userService
      .getOne()
      .then((response) => setUser(response.data))
      .catch((error) => console.error(error));
  };

  const handleUpdateUser = (data) => {
    userService
      .update(data, setProgress)
      .then((response) => {
        dispatch(setUser({ ...user, ...data, ...response.data }));
        toastEmitter("Đổi thông tin cá nhân thành công", "success");
        setProgress(0);
      })
      .catch((error) => {
        toastEmitter(error, "error");
        setProgress(0);
      });
  };

  const getChangedValues = (values) => {
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

    return changedValues;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    values.avatar = user.avatar;
    const changedValues = getChangedValues(values);

    Object.keys(changedValues).length > 0 && handleUpdateUser(changedValues);

    setSubmitting(false);
  };

  const handleChooseAvatar = (e) => {
    const val = e.target.value;
    setUser((prev) => ({ ...prev, avatar: val }));
  };

  const handleOpenChooseAvatar = () => {
    setPopup({
      isShown: true,
      title: "Hình dại diện",
      content: <AvatarBox value={user.avatar} handleOnChange={handleChooseAvatar} />,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {user.username ? (
        <FormWrapper title="Thông tin cá nhân">
          <ProfileForm
            avatar={user.avatar}
            INITIAL_VALUE={INITIAL_VALUE}
            handleSubmit={handleSubmit}
            handleOpenChooseAvatar={handleOpenChooseAvatar}
          />
        </FormWrapper>
      ) : null}
      <Toast {...options} />
      {popup.isShown && <Popup data={popup} setShow={triggerPopup} height={350} />}
      <ProgressCircle percentage={progress} />
    </>
  );
}

export default Profile;
