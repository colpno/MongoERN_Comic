import { FormWrapper } from "components/index.jsx";
import { Popup } from "features/index.jsx";
import { usePopup, useUpdateUser } from "hooks/index.jsx";
import { useSelector } from "react-redux";
import { hash } from "utils/hash.js";
import ChangePasswordForm from "./components/ChangePasswordForm.jsx";

function ChangePassword() {
  const user = useSelector((state) => state.user.user);
  const { popup, triggerPopup } = usePopup();
  const { update: updateUser } = useUpdateUser();
  const initialValues = {
    password: "",
    rePassword: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    const { password, rePassword } = values;

    if (password === rePassword) {
      const hashedPassword = hash(password);
      updateUser({ password: hashedPassword });
    }
  };

  return (
    <>
      {user.username ? (
        <FormWrapper title="Thay đổi mật khẩu">
          <ChangePasswordForm initialValues={initialValues} handleSubmit={handleSubmit} />
        </FormWrapper>
      ) : null}
      <Popup data={popup} trigger={triggerPopup} sx={{ height: "350px" }} />
    </>
  );
}

export default ChangePassword;
