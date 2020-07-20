import React, { Suspense } from "react";
// import { log } from '../utils';

import omit from "lodash/omit";
import clone from "lodash/clone";

// import { Link } from '../ui';
import { Spin } from "antd";
import { Switch, Route } from "react-router";
export { Route, Switch };

function containerComponent(props) {
  console.log("[Switch Route]", props.path);
  return <props.component {...omit(props, "component")} />;
}

export const mapRoutes = (routes, match, props) => (
  <Suspense
    fallback={
      <Spin
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: "999",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    }
  >
    {routes.map((route, index) => {
      if (match) {
        route = clone(route);
        route.path = match.url + route.path;
      }
      return (
        <Route
          key={index}
          {...omit(route, "component", "routes")}
          render={(props2) => {
            const containerProps = {
              path: route.path,
              pathname: route.path,
              component: route.component,
              routes: route.routes,
              parentMatch: match,
              ...props,
              ...props2,
            };
            return containerComponent(containerProps);
          }}
        />
      );
    })}
  </Suspense>
);
