import React from 'react';
import isString from 'lodash/isString';

// const TestPage = React.lazy(() => import("@Pages/test"));

function loadComponent(component) {
    return import(`@Pages/${component}`);
}

function buildRoutes(routes) {
    if (routes == null || !(routes instanceof Array)) {
        routes = [];
    }

    routes = routes.map((route) => {
        if (route.routes instanceof Array && route.routes.length > 0) {
            route.routes = buildRoutes(route.routes);
        }

        if (isString(route.component)) {
            route.url = route.component;
            route.component = React.lazy(() => loadComponent(route.url));
        }

        return route;
    });

    return routes;
}

const routes = [
    {
        path: '/',
        component: 'test',
        routes: [],
    },
];

const allRoutes = buildRoutes(routes);

export default allRoutes;

export * from './base';
