import * as React from "react";

export class ProgressBarComponent extends React.Component<any, any> {

    public render() {
        const progressBarWidth = this.props.progress / this.props.max * 100;

        return  <div className="progress-bar-container">
                    <div className="progress-bar" style={ { width: progressBarWidth + "%" } } />
                </div>;
    }
} 
