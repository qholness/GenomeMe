var EntryField = React.createClass({
    getInitialState: function() {
        return {value: null, name: null};
    },
    onChange: function(event) {
        this.setState({name : event.target.value});
    },
    render: function() {
        return (
            <div>
                <div>{this.state.name? this.state.name:"No name"}</div>
                <div>
                    <input type="text" name="name" value={this.state.value}
                    onChange={this.onChange.bind(this)}/>
                </div>
            </div>
        )
    }
});

class RenderMe extends React.Component {
    render () {
        return (
            <div>Hello World</div>
        )
    }
}

ReactDOM.render(
    <RenderMe />,
    document.getElementById("HelloWorld")
);

ReactDOM.render(
    <EntryField />,
    document.getElementById("entry")
);
