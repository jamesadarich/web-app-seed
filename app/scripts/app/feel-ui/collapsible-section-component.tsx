import * as React from "react";

export class CollapsibleSectionComponent extends React.Component<any, any> {
    public constructor() {
        super();

        this.state = {
            open: false
        };
    }

    public render() {
        return  <div className="collapsible-section-container">
                    <div className="collapsible-section-header" onClick={() => this.setState({ open: !this.state.open })}>                        
                        {this.props.children[0]}
                    </div>
                    {
                        this.state.open &&
                        <div className="collapsible-section">
                            {this.props.children[1]}
                        </div>
                    }
                </div>;
    }
}
