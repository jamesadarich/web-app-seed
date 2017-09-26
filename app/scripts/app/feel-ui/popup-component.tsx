import * as React from "react";

export class PopupComponent extends React.Component<any, any> {
    public constructor(props: any) {
        super(props);

        this.state = {
            showPopup: false
        };
    }

    private _showPopup() {
        this.setState({
            showPopup: true
        });
    }
    
    private _hidePopup() {
        this.setState({
            showPopup: false
        });
    }
    
    private _togglePopup() {
        this.state.showPopup ? this._hidePopup() : this._showPopup();
    }

    public render() {

        const showPopup = this.props.showPopup !== false && this.state.showPopup;

        return  <div className="popup-container" onMouseEnter={() => this._showPopup()} onMouseLeave={() => this._hidePopup()} onFocus={() => this._showPopup()} onBlur={() => this._hidePopup()}>
                    {this.props.children}
                    {
                        showPopup && 
                        <div className="popup">{this.props.popupText}</div>
                    }
                </div>;
    }
}
