import { AdminLayout } from "layouts";
import { Fragment } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { adminRoutes } from "routes";

function App() {
  return (
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
  );
}

export default App;
