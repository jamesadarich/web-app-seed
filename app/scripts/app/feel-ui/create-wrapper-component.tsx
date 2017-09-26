import * as React from "react";

export function createWrapperComponent(wrapperProps: { className: string }) {
    return ((props) => {
        return <div className={wrapperProps.className}>{props.children}</div>;
    }) as React.StatelessComponent;
}
