import { FooterComponent, MenuComponent, MenuItemComponent } from "@justaddjam/strawberry";
import { createBrowserHistory } from "history";
import * as React from "react";
import { Suspense } from "react";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter, routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import "./app.scss";
import { Loading } from "./loading";

// Create a history of your choosing (we're using a browser history in this case)
const history = createBrowserHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
    combineReducers({
        router: routerReducer
    }),
    applyMiddleware(middleware)
);

const HOME = React.lazy(() => import("../pages/home"));
const COMPONENTS =  React.lazy(() => import("../pages/components"));

export function AppComponent() {
    return <Provider store={store}>
                { /* Tell the Router to use our enhanced history */ }
                <ConnectedRouter store={store} history={history}>
                    <div className="app">
                        <MenuComponent title="web app seed">
                            <MenuItemComponent link="/">Home</MenuItemComponent>
                            <MenuItemComponent link="/components">Components</MenuItemComponent>
                        </MenuComponent>
                        <div className="app-contents">
                            <Suspense fallback={<Loading />}>
                                <Route exact path="/" component={HOME} />
                                <Route exact path="/components" component={COMPONENTS} />
                            </Suspense>
                        </div>
                        <FooterComponent>Some copyright</FooterComponent>
                    </div>
                </ConnectedRouter>
            </Provider>;
}
