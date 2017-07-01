var SearchField = React.createClass({
    getInitialState: function() {
        return {nsize : 100, 
                fields : null,
                endpoint : null,
                reqstring : null};
    },
    updateFields: function(event) {
        this.setState({fields : event.target.value});
    },
    updateNsize: function(event) {
        this.setState({nsize : event.target.value});
    },
    updateEndpoint: function(event) {
        this.setState({endpoint : event.target.value});
    },
    updateReqString: function(event) {
        this.setState({reqstring : event.target.value});
    },
    handleFetch: function() {
        
    },
    render: function() {
        return (
            <div>
                <h3>Build your request</h3>
                <div>URL: https://dcc.icgc.org/api/v1/projects/GBM-US/{this.state.endpoint? this.state.endpoint:"endpoint"}?{this.state.fields? this.state.fields:"{fields}"}&size={this.state.nsize? this.state.nsize:100}
                </div>
                <form action="/fetch" method="POST">
                    <input type="text" name="endpoint" value={this.state.endpoint}
                        placeholder={this.state.endpoint? this.state.endpoint:"Endpoint"}
                        onChange={this.updateEndpoint}  />
                    <br />
                    <input type="text" name="fields" value={this.state.fields}
                        placeholder={this.state.fields? this.state.fields:"Fields"}
                        onChange={this.updateFields}    />
                    <br />
                    <input type="number" name="nsize" value={this.state.nsize? this.state.nsize:"100"}
                        placeholder={this.state.nsize? this.state.nsize:"100"}
                        onChange={this.updateNsize} />
                    <br />
                    <input type='submit' value='submit'/>
                </form>

                <br />
                <br />
                <h3>Or submit a request string</h3>
                <div>Request String: {this.state.reqstring? this.state.reqstring : "Enter a request string"}</div>
                <form action="/fetch" method="POST">
                    <input type="text" name="reqstring" value={this.state.reqstring}
                        placeholder={this.state.reqstring? this.state.reqstring:"Endpoint"}
                        onChange={this.updateReqString}  />
                    <br />
                    <input type='submit' value='submit'/>
                </form>

            </div>
        )
    }
});

ReactDOM.render(
    <SearchField />,
    document.getElementById('search')
);