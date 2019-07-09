import { CollapsibleSectionComponent } from "@justaddjam/strawberry";
import { ContentContainerComponent } from "@justaddjam/strawberry";
import { GalleryComponent } from "@justaddjam/strawberry";
import { ProgressBarComponent } from "@justaddjam/strawberry";
import { SearchComponent } from "@justaddjam/strawberry";
import { RangeComponent } from "@justaddjam/strawberry";
import { notify } from "@justaddjam/strawberry";
import { TabComponent } from "@justaddjam/strawberry";
import { ButtonComponent } from "@justaddjam/strawberry";
import { DropdownComponent } from "@justaddjam/strawberry";
import { TableComponent } from "@justaddjam/strawberry";
import { TableColumnComponent } from "@justaddjam/strawberry";
import { FlexFillRemainderComponent } from "@justaddjam/strawberry";
import { FlexContainer } from "@justaddjam/strawberry";
import { MultiSelectToggleButtonGroupComponent } from "@justaddjam/strawberry";
import { RadioButtonGroupComponent } from "@justaddjam/strawberry";
import { CheckboxComponent } from "@justaddjam/strawberry";
import { PopupComponent } from "@justaddjam/strawberry";
import { DisableOfflineComponent } from "@justaddjam/strawberry";
import { FormComponent } from "@justaddjam/strawberry";
import { FormInputComponent } from "@justaddjam/strawberry";
import { SliderComponent } from "@justaddjam/strawberry";
import { SwitchComponent } from "@justaddjam/strawberry";
import { ToggleButtonGroupComponent } from "@justaddjam/strawberry";
import * as React from "react";

function isValid(model: any) {
    return !!model.something;
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

export class Components extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);

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
                    <CheckboxComponent checked={false}>Split components into npm library</CheckboxComponent>
                    <CheckboxComponent checked={false}>Ensure good keyboard support</CheckboxComponent>
                    <CheckboxComponent checked={false}>Ensure good screen reader support</CheckboxComponent>
                    <CheckboxComponent checked={false}>Add redux form support</CheckboxComponent>
                    <CheckboxComponent checked={false}>Remove any in props / state</CheckboxComponent>
                    <CheckboxComponent checked={false}>Convert to stateless if possible</CheckboxComponent>
                    <CheckboxComponent checked={false}>Review style consistency</CheckboxComponent>
                    <CheckboxComponent checked={false}>Add 2 animations</CheckboxComponent>
                    <h2>Button</h2>
                    <ButtonComponent>Awesome</ButtonComponent>
                    <ButtonComponent disabled>Disabled</ButtonComponent>
                    <h2>Tabs</h2>
                    <TabComponent>
                        <div title="one">something</div>
                        <div title="two">something else</div>
                    </TabComponent>
                    <h2>Dropdown</h2>
                    <DropdownComponent placeholder="Placeholder">
                        <div title="one">something</div>
                        <div title="two">something else</div>
                    </DropdownComponent>
                    <h2>Checkbox</h2>
                    <CheckboxComponent checked={false}>
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
                        { label: "two", selected: false },
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
                    {/* TODO - allow inputs without forms
                    <FormInputComponent labelText="Something"
                                    name="something"
                                    model={dogs[0].name}
                    propertyName="givenName" />*/}
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
                    <FormComponent id="ID" onSubmit={submitForm}>
                        <FormInputComponent label="Something"
                                            name="something"
                                            model={(window as any).model}
                                            propertyName="test" />
                        <ButtonComponent type="submit">Submit</ButtonComponent>
                        <div className="response"></div>
                    </FormComponent>
                </ContentContainerComponent>;
    }
}

function submitForm(data: any) {
    const formResponseField = document.querySelector("form .response");
    isValid(data)
            ? formResponseField.innerHTML = `submitted: ${JSON.stringify(data)}`
            : formResponseField.innerHTML = "failed validation";
}
