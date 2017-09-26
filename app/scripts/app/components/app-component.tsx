import * as React from "react";
import { Provider } from "react-redux";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Route } from "react-router";
import { ConnectedRouter, routerReducer, routerMiddleware } from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import { MenuComponent } from "../feel-ui/menu-component";
import { MenuItemComponent } from "../feel-ui/menu-item-component";
import { ContentContainerComponent } from "../feel-ui/content-container-component";
import { FooterComponent } from "../feel-ui/footer-component";
import { TabComponent } from "../feel-ui/tab-component";
import { ButtonComponent }  from "../feel-ui/button-component";
import { DropdownComponent }  from "../feel-ui/dropdown-component";
import { TableComponent } from "../feel-ui/table-component";
import { TableColumnComponent } from "../feel-ui/table-column-component";
import { CollapsibleSectionComponent } from "../feel-ui/collapsible-section-component";
import { FlexContainer } from "../feel-ui/flex-container-component";
import { FlexFillRemainderComponent } from "../feel-ui/flex-fill-remainder-component";
import { RadioButtonComponent } from "../feel-ui/radio-button-component";
import { RadioButtonGroupComponent } from "../feel-ui/radio-button-group-component";
import { CheckboxComponent } from "../feel-ui/check-box-component";
import { PopupComponent } from "../feel-ui/popup-component";
import { DisableOfflineComponent } from "../feel-ui/disable-offline-component";
import { FormComponent } from "../feel-ui/form-component";
import { InputComponent } from "../feel-ui/input-component";
import { SliderComponent } from "../feel-ui/slider-component";
import { SwitchComponent } from "../feel-ui/switch-component";
function isValid(model: any) {
    return !!model.test;
}

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
                        <div className="app">
                            <MenuComponent title="web app seed">                                
                                <MenuItemComponent link="/">Home</MenuItemComponent>
                                <MenuItemComponent link="/components">Components</MenuItemComponent>
                            </MenuComponent>
                            <div className="app-contents">
                                <Route path="/" exact component={Home}/>
                                <Route path="/components" component={Components}/>
                            </div>
                            <FooterComponent>Some copyright</FooterComponent>
                        </div>
                    </ConnectedRouter>
                </Provider>;
    }
}

class Home extends React.Component {
    public render() {
        return <ContentContainerComponent>
                    <h2>Home</h2>
                </ContentContainerComponent>;
    }
}

(window as any).model = {};

class Components extends React.Component {
    public render() {
        return <ContentContainerComponent>
                    <CheckboxComponent>Split components into npm library</CheckboxComponent>
                    <CheckboxComponent>Ensure good keyboard support</CheckboxComponent>
                    <CheckboxComponent>Ensure good screen reader support</CheckboxComponent>
                    <CheckboxComponent>Add redux form support</CheckboxComponent>
                    <CheckboxComponent>Remove any in props / state</CheckboxComponent>
                    <CheckboxComponent>Convert to stateless if possible</CheckboxComponent>
                    <CheckboxComponent>Review style consistency</CheckboxComponent>
                    <h2>Button</h2>
                    <ButtonComponent>Awesome</ButtonComponent>
                    <ButtonComponent disabled>Disabled</ButtonComponent>
                    <h2>Tabs</h2>
                    <TabComponent>
                        <div title="one">something</div>
                        <div title="two">something else</div>
                    </TabComponent>
                    <h2>Dropdown</h2>
                    <DropdownComponent>
                        <div title="one">something</div>
                        <div title="two">something else</div>
                    </DropdownComponent>
                    <h2>Checkbox</h2>
                    <CheckboxComponent>
                        <p>Awesome Checkbox</p>
                    </CheckboxComponent>
                    <h2>Radio</h2>
                    <RadioButtonGroupComponent items={[{ label: "something" }, { label: "something else" }, { label: "another thing" }]} />
                    <h2>Toggle Buttons</h2>
                    <h2>Table</h2>
                    <TableComponent data={[ { name: "someone", age: 19 },
                                            { name: "someone else", age: 22 },
                                            { name: "newone", age: 1 },
                                            { name: "zach", age: 10 } ]}>
                        <TableColumnComponent title="Name" getValue={(item) => item.name} />
                        <TableColumnComponent title="Age" getValue={(item) => item.age} />
                    </TableComponent>
                    <h2>Graphs</h2>
                    <h2>Input</h2>
                    <InputComponent labelText="Something" name="something" model={(window as any).model} propertyName="test" />
                    <h2>Date Picker</h2>
                    <h2>Reorder List</h2>
                    <h2>Flex Container</h2>
                    <FlexContainer>
                        <h2>1</h2>
                        <FlexFillRemainderComponent><h2>2</h2></FlexFillRemainderComponent>
                        <h2>3</h2>
                        <FlexFillRemainderComponent><h2>4</h2></FlexFillRemainderComponent>
                        <h2>5</h2>
                    </FlexContainer>
                    <h2>Modal</h2>
                    <h2>Notification</h2>
                    <h2>Offline</h2>
                    <DisableOfflineComponent>
                        <ButtonComponent>Online only</ButtonComponent>
                    </DisableOfflineComponent>
                    <h2>Popup</h2>
                    <PopupComponent popupText="Awesome popup!">
                        <div>Hover / click me</div>
                    </PopupComponent>
                    <h2>Stylable Icons</h2>
                    <h2>Gallery</h2>
                    <h2>File Upload</h2>
                    <h2>Slider</h2>
                    <SliderComponent />
                    <SliderComponent min={1} max={5} value={2} />
                    <SliderComponent min={0} max={5} step={1} />
                    <h2>Range</h2>
                    <h2>Autocomplete / search</h2>
                    <h2>Toggle switch</h2>
                    <SwitchComponent />
                    <h2>Single Accordion</h2>
                    <CollapsibleSectionComponent>
                        <h1>Section</h1>
                        <ul>
                            <li>Item One</li>
                            <li>Item Two</li>
                            <li>Item Three</li>
                        </ul>
                    </CollapsibleSectionComponent>
                    <h2>Progress</h2>
                    <h2>When in viewport</h2>
                    <h2>Form</h2>
                    <FormComponent onSubmit={(e: any) => { e.preventDefault(); isValid((window as any).model) ? console.log("submitted", (window as any).model) : console.log("failed validation")}}>
                        <InputComponent labelText="Something" name="something" model={(window as any).model} propertyName="test" />
                        <ButtonComponent type="submit">Submit</ButtonComponent>
                    </FormComponent>
                </ContentContainerComponent>;
    }
}
