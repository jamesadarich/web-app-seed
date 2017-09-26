import * as React from "react";
import { FormFieldComponent } from "./form-field-component";

function validate(model: any, propertyName: string) {
    if (!model[propertyName]) {
        return [ { message: "must be set"} ];
    }

    return [];
}

export class InputComponent extends React.Component<any, any> {

    public constructor(props: any) {
        super(props);

        this.state = {
            errors: []
        };
    }

    private _handleChange(event: React.ChangeEvent<HTMLInputElement>) {        
        const { props } = this;

        props.model[props.propertyName] = event.target.value;

        this.setState({ errors: validate(props.model, props.propertyName) });

        console.log("CHANGE", props.form);
    }

    public render() {
        const { props } = this;

        const name = props.name || props.propertyName;

        return <FormFieldComponent labelText={props.labelText} name={name} errors={this.state.errors}>
                    <input type={props.type || "text"} disabled={props.disabled} name={name} id={name} onChange={(e) => this._handleChange(e)} />
               </FormFieldComponent>;
    }
}
