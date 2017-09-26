import * as React from "react";

export class TableColumnComponent extends React.Component<TableColumnProps> { }

interface TableColumnProps {
    getValue: (... args: Array<any>) => any;
    title: string;
}
