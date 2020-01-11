import { FooterComponent, MenuComponent, MenuItemComponent } from "@justaddjam/strawberry";
import { createBrowserHistory } from "history";
import * as React from "react";
import { Suspense } from "react";
import { Route, Router, Switch } from "react-router";
import "./app.scss";
import { Loading } from "./loading";

// Create a history of your choosing (we're using a browser history in this case)
const history = createBrowserHistory();

const HOME = React.lazy(() => import("../pages/home"));
const COMPONENTS =  React.lazy(() => import("../pages/components"));

export function AppComponent() {
    return <Router history={history}>
                <div className="app">
                    <MenuComponent title="web app seed">
                        <MenuItemComponent link="/">Home</MenuItemComponent>
                        <MenuItemComponent link="/components">Components</MenuItemComponent>
                    </MenuComponent>
                    <div className="app-contents">
                        <Suspense fallback={<Loading />}>
                            <Switch>
                                <Route exact path="/">
                                    <HOME />
                                </Route>
                                <Route exact path="/components">
                                    <COMPONENTS />
                                </Route>
                            </Switch>
                        </Suspense>
                    </div>
                    <FooterComponent>Some copyright</FooterComponent>
                </div>
            </Router>;
}
