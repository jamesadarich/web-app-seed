import * as React from "react";

export class TabComponent extends React.Component<any, any> {
    public constructor() {
        super();

        this.state = {
            selectedItem: null
        };
    }

    private _getTabItemClassName(item: any) {
        if (this.state.selectedItem && this.state.selectedItem.props === item.props) {
            return "tab-list-item selected";
        }

        return "tab-list-item";
    }

    public render() {
        const children = React.Children.toArray(this.props.children);

        return  <div className="tab-container">
                    <div className="tab-list">
                        {children.map((child: any, index) => <div className={this._getTabItemClassName(child)} key={index} onClick={() => this.setState({ selectedItem: child })}>{child.props.title}</div>)}
                    </div>
                    <div className="tab-item">
                        {this.state.selectedItem}
                    </div>
                </div>;
    }
}
