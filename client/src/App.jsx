import { Popup } from "features";
import { DefaultLayout } from "layouts";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { privateRoutes, publicRoutes } from "routes";

const checkLoggedInCanAccessURL = (url) => {
  const array = ["login", "register", "reset-password", "forgot-password"];

  const haveAccessed = array.some((pathName) => url.includes(pathName));
  return haveAccessed;
};

function App() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState({
    trigger: false,
    title: "Thông báo",
    content: "",
    isClosed: false,
  });
  const userState = useSelector((state) => state.user);
  const { isLoggingIn } = userState;
  const url = useLocation().pathname;
  const haveAccessed = useMemo(() => checkLoggedInCanAccessURL(url), [url]);

  useEffect(() => {
    if (haveAccessed && isLoggingIn) {
      setPopup((prev) => ({
        ...prev,
        trigger: true,
        content: "Bạn đã đăng nhập nên không thể truy cập vào trang",
      }));
    }
  }, [url]);

  useEffect(() => {
    popup.isClosed && navigate("/");
  }, [popup.isClosed]);

  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const { path, layout } = route;
          const Component = route.component;
          let Layout = DefaultLayout;

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

        {isLoggingIn &&
          privateRoutes.map((route, index) => {
            const { path, layout } = route;
            const Component = route.component;
            let Layout = DefaultLayout;

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
                  isLoggingIn ? (
                    <Layout>
                      <Component />
                    </Layout>
                  ) : (
                    <Navigate to="/login" />
                  )
                }
              />
            );
          })}

        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
      <Popup popup={popup} setPopup={setPopup} />
    </>
  );
}

export default App;
