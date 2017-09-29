import * as React from "react";
import { ButtonComponent } from "./button-component";

export class ToggleButtonGroupComponent extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);

        this.state = {
            options: this.props.options
        };
    }

    private _handleChange(selectedOption: any) {

        const options = this.state.options.map((option: any) => {
            option === selectedOption ? option.selected = true : option.selected = false;
            return option;
        });

        this.setState({
            options: options
        });
    }

    public render() {
        return <div className="toggle-button-group">
                    {this.state.options.map((option: any, index: number) => <ButtonComponent key={index} className={`toggle-button${option.selected? " on" : ""}`} onClick={() => this._handleChange(option)}>{option.label}</ButtonComponent>)}
               </div>;
    }
}
