import PropTypes from "prop-types";
import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { DefaultLayout } from "layouts";
import { publicRoutes } from "./publicRoutes";
import { privateRoutes } from "./privateRoutes";

function RouteHandler({ isLoggingIn }) {
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

      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}
RouteHandler.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
};

export default RouteHandler;
