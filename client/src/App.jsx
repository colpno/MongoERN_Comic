import { DefaultLayout } from "layouts";
import { Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import { publicRoutes } from "routes";

function App() {
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
    </Routes>
  );
}

export default App;
