import * as React from "react";

export class ButtonComponent extends React.Component<any, any> {
    public render() {
        const { props } = this;
        const filteredProps: any = {};
        Object.keys(props).filter(key => key !== "form").map(key => filteredProps[key] = props[key]);

        return <button type={props.type || "button"} disabled={props.disabled} {...filteredProps}>{props.children}</button>;
    }
}
