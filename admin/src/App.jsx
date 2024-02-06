import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { Fragment, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";

import { Loading, Popup, Toast } from "features";
import { usePopup } from "hooks";
import { AdminLayout } from "layouts";
import { adminRoutes } from "routes";
import { getTheme } from "utils/theme.js";

const checkLoggedInCanAccessURL = (url) => {
  const array = ["login", "verify"];

  const haveAccessed = array.some((pathName) => url.includes(pathName));
  return haveAccessed;
};

function App() {
  const navigate = useNavigate();
  const { popup, setPopup, triggerPopup } = usePopup();
  const { isLoggingIn } = useSelector((state) => state.user);
  const url = useLocation().pathname;
  const haveAccessed = useMemo(() => checkLoggedInCanAccessURL(url), [url]);
  const mode = useSelector((state) => state.common.theme);

  useEffect(() => {
    if (haveAccessed && isLoggingIn) {
      setPopup({
        isTriggered: true,
        title: "Thông báo",
        content: "Bạn đã đăng nhập nên không thể truy cập vào trang",
        onConfirm: () => navigate("/titles"),
      });
    }
  }, []);

  return (
    <ThemeProvider theme={getTheme(mode)}>
      <CssBaseline />
      <div data-theme={mode}>
        <Routes>
          {adminRoutes.map((route, index) => {
            const { path, layout } = route;
            const Component = route.component;
            let Layout = AdminLayout;

            if (layout) {
              Layout = layout;
            } else if (layout === null) {
              Layout = Fragment;
            }

            return (
              <Route
                path={path}
                key={index}
                element={
                  <Layout>
                    <Component />
                  </Layout>
                }
              />
            );
          })}
          <Route path="*" element={<Navigate to="/not-found" />} />
        </Routes>
        <Popup data={popup} setShow={triggerPopup} />
        <Toast />
        <Loading />
      </div>
    </ThemeProvider>
  );
}

export default App;
