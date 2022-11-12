import { DefaultLayout } from "layouts";
import { Fragment } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes, privateRoutes, publicRoutes } from "routes";

function App() {
  const userState = useSelector((state) => state.user);
  const { isLoggingIn, user } = userState;

  return (
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
      {privateRoutes.map((route, index) => {
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
      {adminRoutes.map((route, index) => {
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
              isLoggingIn && user.role === "admin" ? (
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
      <Route path="*" element={<Navigate to="/register" />} />
    </Routes>
  );
}

export default App;
