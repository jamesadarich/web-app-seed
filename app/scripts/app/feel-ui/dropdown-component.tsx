import * as React from "react";

export class DropdownComponent extends React.Component<any, any> {
    public constructor() {
        super();

        this.state = {
            selectedItem: null,
            showList: false
        };
    }

    private _selectItem(item: React.ReactChild) {
        this.setState({ 
            selectedItem: item,
            showList: false
        });
    }

    private _showList() {
        this.setState({ 
            showList: true
        });
    }
    
    private _hideList() {
        this.setState({ 
            showList: false
        });
    }

    public render() {
        const children = React.Children.toArray(this.props.children);

        return  <div className="dropdown" tabIndex={0} onFocus={() => this._showList()} onBlur={() => this._hideList()}>
                    <div className="selected-item" onClick={() => this._showList()}>
                        {this.state.selectedItem ? this.state.selectedItem.props.children : this.props.placeholder}
                    </div>
                    {
                        this.state.showList && 
                        <div className="dropdown-list">
                            {children.map((child: any, index) => <div className="dropdown-list-item" key={index} onClick={() => this._selectItem(child)}>{child.props.children}</div>)}
                        </div>
                    }
                </div>;
    }
} 
