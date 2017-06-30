var Test = React.createClass({
     getInitialState: function() {
        return {value: null, name: null};
    },
    render: function() {
        return <div>
        </div>
    }
});

ReactDOM.render(
    <Test />,
    document.getElementById('results')
);