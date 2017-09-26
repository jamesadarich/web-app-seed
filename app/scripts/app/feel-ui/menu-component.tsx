import * as React from "react";
import { MenuItemComponent } from "./menu-item-component";
import { ContentContainerComponent } from "./content-container-component";

export class MenuComponent extends React.Component<any, any> {
    public render() {
        return  <nav>
                    <ContentContainerComponent>
                        <span className="title">{this.props.title}</span>
                        <div className="menu-item-list">
                            {this.props.children}
                        </div>
                    </ContentContainerComponent>
                </nav>;
    }
} 