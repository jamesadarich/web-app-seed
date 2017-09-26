import * as React from "react";
import { Link } from "react-router-dom";

export class MenuItemComponent extends React.Component<any, any> {
    public render() {
        return  <Link to={this.props.link}>
                    <div className="menu-item">{this.props.children}</div>
                </Link>;
    }
} 