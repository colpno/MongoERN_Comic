import ProfileForm from "components/ProfileForm";
import { useSelector } from "react-redux";
import { convertToDateString, formatTime } from "utils/convertTime";

function Profile() {
  const user = useSelector((state) => state.user.user);
  const { day, month, year } = formatTime(user.dateOfBirth);

  const INITIAL_VALUE = {
    nickname: user.userName,
    phone: "",
    dateOfBirth: convertToDateString(day, month, year),
  };

  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <ProfileForm INITIAL_VALUE={INITIAL_VALUE} handleSubmit={handleSubmit} />
  );
}

export default Profile;
