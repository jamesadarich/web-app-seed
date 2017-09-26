import * as React from "react";

export class FormFieldComponent extends React.Component<any, any> {

    public render() {
        const { props } = this;

        return  <div className="form-field">
                    <label htmlFor={props.name}>{props.labelText}</label>
                    {props.children}
                    <ul className="errors-list">
                        {props.errors.map((error: any, index: number) => <li key={index}>{error.message}</li>)}
                    </ul>
                </div>;
    }
}
