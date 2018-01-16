import * as React from "react";
import { FlexContainer } from "./flex-container-component";
import { FlexFillRemainderComponent } from "./flex-fill-remainder-component";

export class CheckboxComponent extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);

        this.state = {
            checked: props.checked || false
        }
    }

    public render() {
        return  <div className="checkbox" onClick={() => this.setState({ checked: !this.state.checked })}>
                    <FlexContainer>
                        <svg className={this.state.checked && "checked"} width="20px" height="20px">
                            <rect x="1" y="1" width="16px" height="16px"></rect>
                            <path d="M 4 6 l 6 6 l 12 -12"></path>
                        </svg>
                        <input type="checkbox" checked={this.state.checked} />
                        <FlexFillRemainderComponent>{this.props.children}</FlexFillRemainderComponent>
                    </FlexContainer>
                </div>;
    }
}
