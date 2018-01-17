import * as React from "react";
import { RadioButtonComponent } from "./radio-button-component";

export class RadioButtonGroupComponent extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);

        this.state = {
            selectedItem: null
        };
    }
    private _handleSelect(selectedItem: any) {       

        this.setState({
            selectedIndex: this.props.items.indexOf(selectedItem)
        });
    }

    public render() {
        return  <div className="radio-button-group">
                    {this.props.items.map((item: any, index: number) => 
                        <RadioButtonComponent onSelect={() => this._handleSelect(item)} checked={index === this.state.selectedIndex} key={index} >
                            <span>{item.label}</span>
                        </RadioButtonComponent>)}
                </div>;
    }
}

                    