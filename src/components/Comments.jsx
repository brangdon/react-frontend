import React from 'react';
var createReactClass = require('create-react-class');
var axios = require('axios');

class CommentRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.comment.CommentID}</td>
                <td>{this.props.comment.Info}</td>
            </tr>
        );
    }
}

class CommentTable extends React.Component {
    render() {
        var rows = [];
        // var lastCategory = null;
        this.props.comments.forEach((comment) => {
            // if (comment.CommentID == -1) {
            //     return;
            // }
            if (comment.Info.indexOf(this.props.filterText) === -1 ) {
                return;
            }

            rows.push(<CommentRow comment={comment} key={comment.key}/>);
            // lastCategory = comment.category;
        });
        return (
            <table>
                <thead>
                <tr>
                    <th>CommentID:</th>
                    <th>Comment:</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
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
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onFilterTextInput={this.handleFilterTextInput}
                    onInStockInput={this.handleInStockInput}
                />
                <CommentTable
                    comments={this.props.comments}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                />
            </div>
        );
    }
}


var Comments = createReactClass({

    getInitialState: function () {
        return {
            comments: [],
            value: ''
        };
    },

    componentDidMount: function () {

        var _this = this;
        this.serverRequest =
            axios
                .get("/comments")
                .then(function (result) {

                    if (result) {
                        _this.setState({
                            comments: result.data
                        });
                    }

                })
    },

    componentWillUnmount: function () {
        this.serverRequest.abort();
    },

    handleChange: function (event) {
        this.setState({value: event.target.value});
    },

    handleSubmit: function (event) {
        alert('A name was submitted: ' + this.state.value);

        fetch('/comments', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // firstParam: 'yourValue',
                // secondParam: 'yourOtherValue',
                comment: this.state.value
            })
        }).then((response) => response.json())

        event.preventDefault();
    },


    render() {

        var comments = [];
        for (var i = 0; i < this.state.comments.length; i++) {
            comments.push(<p className='indent' key={i}>{this.state.comments[i].Info}</p>);
        }

        return (
            <div className="App">
                <h2>Comments</h2>
                <FilterableCommentTable comments={this.state.comments}/>
                length: {this.state.comments.length}
                {/*comments: {comments}*/}
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Comment:
                        <textarea value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        );
    }

});

export default Comments;