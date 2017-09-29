import * as React from "react";

export class SearchComponent extends React.Component<any, any> {

    public constructor(props: any) {
        super(props);

        this.state = {
            results: []
        };
    }

    private async _handleChange(event: React.ChangeEvent<HTMLInputElement>) {        
        const { props } = this;
        const query = event.target.value;

        const results = await props.search(query);

        this.setState({ 
            results,
            query
         });
    }

    public render() {
        const { props } = this;

        return <div className="search-box">
                    <input type="search" disabled={props.disabled} onChange={(e) => this._handleChange(e)} />
                    {
                        this.state.results.map((result: any, index: number) => <props.resultComponent key={index} result={result} query={this.state.query} />)
                    }
               </div>;
    }
}
