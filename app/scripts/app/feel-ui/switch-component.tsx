import * as React from "react";

export class SwitchComponent extends React.Component<any, any> {

    public constructor(props: any) {
        super(props);

        this.state = {
            value: props.value || false
        };
    }

    private _toggleSwitch() {
        this.setState({
            value: !this.state.value
        });
    }

    public render() {
        return <div className={`switch-container${this.state.value ? " on" : ""}`} onClick={() => this._toggleSwitch()}>
                    <div className="switch" />
               </div>;
    }
}
