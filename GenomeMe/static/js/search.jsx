var SearchField = React.createClass({
    getInitialState: function() {
        return {value: null, name: null};
    },
    updateName: function(event) {
        this.setState({name : event.target.value});
    },
    handleFetch: function() {
        
    },
    render: function() {
        return (
            <div>
                <div>{this.state.name? this.state.name:"No name"}</div>
                <form action="/fetch" method="GET">
                    <input type="text" name="name" value={this.state.value}
                    onChange={this.updateName}/>
                    <input type='submit' value='submit'  />
                </form>
            </div>
        )
    }
});

ReactDOM.render(
    <SearchField />,
    document.getElementById('search')
);