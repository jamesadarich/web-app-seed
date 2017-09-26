import * as React from "react";
import { FlexContainer } from "./flex-container-component";
import { FlexFillRemainderComponent } from "./flex-fill-remainder-component";

export class RadioButtonComponent extends React.Component<any, any> {

    private _handleClick() {
        if (this.props.onSelect) {
            this.props.onSelect();
        }
    }

    public render() {
        return  <div className="radio-button" onClick={() => this._handleClick()}>
                    <FlexContainer>
                        <div className={`radio-button-outer ${this.props.checked && "checked"}`}>
                            <div className="radio-button-inner"></div>
                        </div>
                        <input type="radio" checked={this.props.checked} />
                        <FlexFillRemainderComponent>{this.props.children}</FlexFillRemainderComponent>
                    </FlexContainer>
                </div>;
    }
}
