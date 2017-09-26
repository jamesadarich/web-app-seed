import * as React from "react";
import { TableColumnComponent } from "./table-column-component";

enum SortDirection {
    Ascending,
    Descending
}

export class TableComponent extends React.Component<any, any> {

    public constructor() {
        super();

        this.state = {
            sortColumn: null,
            sortDirection: null
        }
    }

    private _sortBy(column: TableColumnComponent) {

        let sortDirection = SortDirection.Ascending;

        if (this.state.sortColumn && this.state.sortColumn.props === column.props) {
            sortDirection = this.state.sortDirection === SortDirection.Ascending ? SortDirection.Descending : SortDirection.Ascending;
        }

        this.setState({
            sortColumn: column,
            sortDirection: sortDirection
        });
    }

    private _sortData<T>(data: Array<T>) {
        if (this.state.sortColumn === null) {
            return data;
        }

        const getValue = this.state.sortColumn.props.getValue

        return data.sort((a: T, b: T) => {
            const valueA = getValue(a);
            const valueB = getValue(b);

            const sortValue = valueA > valueB ? 1 : valueA === valueB ? 0 : -1;

            return this.state.sortDirection === SortDirection.Ascending ? sortValue : sortValue * -1;
        });
    }

    public render() {
        const sortedData = this._sortData(this.props.data);

        const columns = React.Children.toArray(this.props.children);

        return <table>
                    <thead>
                        <tr>
                            {columns.map((column: any, index) => <th key={index} onClick={() => this._sortBy(column)}>{column.props.title}</th>)}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedData.map((item: any, index) => <tr key={index}>
                                                                    {columns.map((column: any, index) => <td key={index}>{column.props.getValue(item)}</td>)}
                                                                </tr>)}
                    </tbody>
               </table>;
    }
}
