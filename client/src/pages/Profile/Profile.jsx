import ProfileForm from "components/ProfileForm";
import { INITIAL_VALUE } from "./const";

function Profile() {
  const handleSubmit = (values, { setSubmitting }) => {
    console.log(values);
    setSubmitting(false);
  };

  return (
    <ProfileForm INITIAL_VALUE={INITIAL_VALUE} handleSubmit={handleSubmit} />
  );
}

export default Profile;
