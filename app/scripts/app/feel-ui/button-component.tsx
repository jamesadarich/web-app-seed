import * as React from "react";

export class ButtonComponent extends React.Component<any, any> {
    public render() {
        return <button type={this.props.type || "button"} disabled={this.props.disabled} {...this.props}>{this.props.children}</button>;
    }
}
