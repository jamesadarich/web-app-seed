import * as React from "react";
import { ContentContainerComponent } from "./content-container-component";

export class FormComponent extends React.Component<any, any> {
    public render() {
        const { props } = this;

        const children = React.Children.toArray(props.children)
                                       .map(child => typeof child === "string" ||  typeof child === "number" ? child : React.cloneElement(child, { form: this }));

        return  <form onSubmit={this.props.onSubmit}>
                    {children}
                </form>;
    }
} 
