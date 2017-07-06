import React from 'react';
var createReactClass = require('create-react-class');
var axios = require('axios')


class CommentRow extends React.Component {
    render() {
        return (
            <div className="annoucement">
                <h3>{this.props.comment.Title}</h3>
                <p>{this.props.comment.Info}</p>
            </div>

        );
    }
}

class CommentTable extends React.Component {
    render() {
        var rows = [];
        this.props.comments.forEach((comment) => {
            if (comment.Info.indexOf(this.props.filterText) === -1) {
                return;
            }

            rows.push(<CommentRow comment={comment} key={comment.key}/>);
        });
        return (
            <div className="annoucements">
                {rows}
            </div>
        );
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
        this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
    }

    handleFilterTextInputChange(e) {
        this.props.onFilterTextInput(e.target.value);
        console.log(e.target.value)
    }

    handleInStockInputChange(e) {
        this.props.onInStockInput(e.target.checked);
    }

    render() {
        return (
            <form>
                <input
                    type="text"
                    placeholder="Szukaj..."
                    value={this.props.filterText}
                    onChange={this.handleFilterTextInputChange}
                />
            </form>
        );
    }
}


class FilterableCommentTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            filterText: '',
            inStockOnly: false
        };

        this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
        this.handleInStockInput = this.handleInStockInput.bind(this);
    }

    handleFilterTextInput(filterText) {
        this.setState({
            filterText: filterText
        });
    }

    handleInStockInput(inStockOnly) {
        this.setState({
            inStockOnly: inStockOnly
        })
    }

    render() {

        return (
            <div>

                <CommentTable
                    comments={this.props.comments}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}

var Annoucements = createReactClass({

    getInitialState: function () {
        return {
            annoucements: [],
            text: '',
            title: ''
        };
    },

    handleChange: function (event) {
        this.setState({text: event.target.value});
    },

    changeChangeTitle: function (event) {
        this.setState({title: event.target.value});
    },

    handleSubmit: function (event) {

        axios.post('/annoucements', {
            text: this.state.text,
            title: this.state.title
        })
            .then(function (response) {
                console.log('annoucements response')
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        event.preventDefault();
    },

    componentDidMount: function () {

        var _this = this;
        this.serverRequest =
            axios
                .get("/annoucements")
                .then(function (result) {

                    if (result) {

                        if (result.data.length > 0) {

                            _this.setState({
                                annoucements: result.data,
                            });
                        } else {

                            console.log('no annoucements')
                        }
                    }

                })


    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    render() {
        return (
            <div className="annoucements-container">
                <h2>Annoucements:</h2>
                <h3>Add annoucement:</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>Title:</label>
                    <input type="text" value={this.state.title} onChange={this.changeChangeTitle}/>
                    <label> Text:</label>
                    <textarea value={this.state.text} onChange={this.handleChange}/>

                    <input type="submit" value="Submit"/>
                </form>
                <FilterableCommentTable comments={this.state.annoucements}/>
            </div>
        )
    }
})

export default Annoucements;