import * as React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Route } from "react-router";
import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { MenuComponent } from "./navigation/menu-component";

//import reducers from '<project-path>/reducers'

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    //...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

export class AppComponent extends React.Component<any, {}> {
    public render() {
        return <Provider store={store}>
                    { /* Tell the Router to use our enhanced history */ }
                    <ConnectedRouter history={history}>
                        <div>
                            <MenuComponent />
                            <Route path="/" exact component={Home}/>
                            <Route path="/test" component={Test}/>
                        </div>
                    </ConnectedRouter>
                </Provider>;
    }
}

class Home extends React.Component {
    public render() {
        return <h2>Home</h2>;
    }
}

class Test extends React.Component {
    public render() {
        return <h2>Test</h2>;
    }
}
