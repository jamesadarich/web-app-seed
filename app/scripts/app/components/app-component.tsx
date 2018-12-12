import { FlexFillRemainderComponent } from "@justaddjam/strawberry";
import { GalleryComponent } from "@justaddjam/strawberry";
import { ProgressBarComponent } from "@justaddjam/strawberry";
import { SearchComponent } from "@justaddjam/strawberry";
import { RangeComponent } from "@justaddjam/strawberry";
import { notify } from "@justaddjam/strawberry";
import { MenuComponent } from "@justaddjam/strawberry";
import { MenuItemComponent } from "@justaddjam/strawberry";
import { ContentContainerComponent } from "@justaddjam/strawberry";
import { FooterComponent } from "@justaddjam/strawberry";
import { TabComponent } from "@justaddjam/strawberry";
import { ButtonComponent } from "@justaddjam/strawberry";
import { DropdownComponent } from "@justaddjam/strawberry";
import { TableComponent } from "@justaddjam/strawberry";
import { TableColumnComponent } from "@justaddjam/strawberry";
import { CollapsibleSectionComponent } from "@justaddjam/strawberry";
import { FlexContainer } from "@justaddjam/strawberry";
import { MultiSelectToggleButtonGroupComponent } from "@justaddjam/strawberry";
import { RadioButtonComponent } from "@justaddjam/strawberry";
import { RadioButtonGroupComponent } from "@justaddjam/strawberry";
import { CheckboxComponent } from "@justaddjam/strawberry";
import { PopupComponent } from "@justaddjam/strawberry";
import { DisableOfflineComponent } from "@justaddjam/strawberry";
import { FormComponent } from "@justaddjam/strawberry";
import { InputComponent } from "@justaddjam/strawberry";
import { SliderComponent } from "@justaddjam/strawberry";
import { SwitchComponent } from "@justaddjam/strawberry";
import { ToggleButtonGroupComponent } from "@justaddjam/strawberry";
import createHistory from "history/createBrowserHistory";
import * as React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router";
import { ConnectedRouter, routerMiddleware, routerReducer } from "react-router-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";

function isValid(model: any) {
    return !!model.test;
}

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

const dogs = [
    {
        avatar: "https://media.giphy.com/media/bOmXDVQAR7gaY/giphy.gif",
        name: {
            familyName: "Puppy",
            givenName: "Sleepy"
        }
    },
    {
        avatar: "https://media.giphy.com/media/12MY94aT1qTFjW/giphy.gif",
        name: {
            familyName: "Puppy",
            givenName: "Adventurous"
        }
    },
    {
        avatar: "https://media.giphy.com/media/tG6ZDOfW5Xeo/giphy.gif",
        name: {
            familyName: "Puppy",
            givenName: "Excited"
        }
    }
];

async function search(query: string) {

    const searchQuery = new RegExp(`(${query.replace(/\s+/, "|")})`, "i");

    return new Promise((resolve) => {
        setTimeout(() => {
            return resolve(dogs.filter(dog => {
                return dog.name.familyName.match(searchQuery) ||  dog.name.givenName.match(searchQuery);
            }));
        }, 500);
    });
}

class SearchResultComponent extends React.Component<any, any> {
    public render() {
        return <FlexContainer>
                    <img src={this.props.result.avatar}
                         style={ { width: "3rem", height: "3rem", borderRadius: "50%", margin: "0.5rem"}} />
                    <FlexFillRemainderComponent>
                        {this.props.result.name.familyName}, {this.props.result.name.givenName}
                    </FlexFillRemainderComponent>
               </FlexContainer>;
    }
}

class Components extends React.Component<any, any> {
    public constructor() {
        super();

        this.state = {
            progress: 0
        };
    }

    public componentDidMount() {

        setInterval(() => {

            if (this.state.progress === 100) {
                this.setState({
                    progress: 0
                });
            }
            else {
                this.setState({
                    progress: this.state.progress + 10
                });
            }
        }, 500);
    }

    public render() {
        return <ContentContainerComponent>
                    <CheckboxComponent>Split components into npm library</CheckboxComponent>
                    <CheckboxComponent>Ensure good keyboard support</CheckboxComponent>
                    <CheckboxComponent>Ensure good screen reader support</CheckboxComponent>
                    <CheckboxComponent>Add redux form support</CheckboxComponent>
                    <CheckboxComponent>Remove any in props / state</CheckboxComponent>
                    <CheckboxComponent>Convert to stateless if possible</CheckboxComponent>
                    <CheckboxComponent>Review style consistency</CheckboxComponent>
                    <CheckboxComponent>Add animations</CheckboxComponent>
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
                    <RadioButtonGroupComponent items={[
                        { label: "something" },
                        { label: "something else" },
                        { label: "another thing" }
                    ]} />
                    <h2>Toggle Buttons</h2>
                    <h3>Single select</h3>
                    <ToggleButtonGroupComponent options={[
                        { label: "one" },
                        { label: "two" },
                        { label: "three" }
                    ]}/>
                    <h3>Multi select</h3>
                    <MultiSelectToggleButtonGroupComponent options={[
                        { label: "one", selected: true },
                        { label: "two" },
                        { label: "three", selected: true }
                    ]} />
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
                    <InputComponent labelText="Something"
                                    name="something"
                                    model={dogs[0].name}
                                    propertyName="givenName" />
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
                    <ButtonComponent onClick={() => notify("You clicked the button!")}>Notify me</ButtonComponent>
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
                    <GalleryComponent imageUrls={dogs.map(dog => dog.avatar)} />
                    <h2>File Upload</h2>
                    <h2>Slider</h2>
                    <SliderComponent />
                    <SliderComponent min={1} max={5} value={2} />
                    <SliderComponent min={0} max={5} step={1} />
                    <h2>Range</h2>
                    <RangeComponent />
                    <RangeComponent min={0} max={10} step={1}/>
                    <h2>Autocomplete / search</h2>
                    <SearchComponent search={search} resultComponent={SearchResultComponent} />
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
                    <ProgressBarComponent progress={this.state.progress} max={100} />
                    <h2>When in viewport</h2>
                    <h2>Form</h2>
                    <FormComponent onSubmit={submitForm}>
                        <InputComponent labelText="Something"
                                        name="something"
                                        model={(window as any).model}
                                        propertyName="test" />
                        <ButtonComponent type="submit">Submit</ButtonComponent>
                        <div className="response"></div>
                    </FormComponent>
                </ContentContainerComponent>;
    }
}

function submitForm(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formResponseField = event.currentTarget.querySelector(".response");
    isValid((window as any).model)
            ? formResponseField.innerHTML = `submitted: ${JSON.stringify((window as any).model)}`
            : formResponseField.innerHTML = "failed validation";
}
