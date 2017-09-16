import * as React from "react";
import { Link } from "react-router-dom";

export class MenuComponent extends React.Component {
    public render() {
        return  <nav>
                    <Link to="/">Home</Link>
                    <Link to="/test">Test</Link>
                </nav>;
    }
} 