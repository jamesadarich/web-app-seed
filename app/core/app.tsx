import { FooterComponent, MenuComponent, MenuItemComponent } from "@justaddjam/strawberry";
import createHistory from "history/createBrowserHistory";
import * as React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter, routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import "./app.scss";
import { Suspense } from "react";
import { Route } from "react-router";
import { Loading } from "./loading";

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

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

const Home = React.lazy(() => import("../pages/home"));
const Components =  React.lazy(() => import("../pages/components"));

export function AppComponent() {
    return <Provider store={store}>
                { /* Tell the Router to use our enhanced history */ }
                <ConnectedRouter store={store} history={history}>
                    <div className="app">
                        <MenuComponent title="web app seed">
                            <MenuItemComponent link="/">Home</MenuItemComponent>
                            <MenuItemComponent link="/components">Components</MenuItemComponent>
                        </MenuComponent>
                        <Suspense fallback={<Loading />}>
                            <div className="app-contents">
                                <Route exact path="/" component={Home} />
                                <Route exact path="/components" component={Components} />
                            </div>
                        </Suspense>
                        <FooterComponent>Some copyright</FooterComponent>
                    </div>
                </ConnectedRouter>
            </Provider>;
}
