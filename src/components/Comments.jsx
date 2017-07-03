import React from 'react';
var createReactClass = require('create-react-class');

class CommentRow extends React.Component {
    render() {
        return (
            <tr>
                <td>{this.props.comment.info}</td>
                <td>{this.props.comment.userID}</td>
            </tr>
        );
    }
}

class CommentTable extends React.Component {
    render() {
        var rows = [];
        var lastCategory = null;
        console.log(this.props.inStockOnly)
        this.props.comments.forEach((comment) => {
            if (comment.info.indexOf(this.props.filterText) === -1 ) {
                return;
            }
            rows.push(<CommentRow comment={comment} key={comment.info} />);
            lastCategory = comment.category;
        });
        return (
            <table>
                <thead>
                <tr>
                    <th>Info</th>
                    <th>Price</th>
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


var PRODUCTS = [
    {userID: '1', info: 'adshah', comid: 3},
    {userID: '2', info: 'ad'},
    {userID: '3', info: 'adjhadjg'},
    {userID: '4', info: 'dh rtjuw'},
    {userID: '5', info: 'sdrky5'},
    {userID: '6', info: 'dsngd 7'}
];



var Comments= createReactClass( {

    // state = {comments: [], images: []}

    getInitialState: function () {
        return {comments: []};
    },

    componentDidMount:function() {
        // fetch('/comments')
        //     .then(res => res.json())
        //     .then(comments => this.setState({comments}));


        fetch('/comments').then(function (response) {
            return response.json();
        }).then(function (comments) {
            console.log('comments2: ' + comments.length)


            // this.setState({comments: myBlob}, function () {
            //     console.log('callback');
            // });


            // console.log(this.state.comments)


        }).catch(function(err) {
            // Error :(
        });




    },


    render() {
        return (
            <div className="App">
                <h2>Comments</h2>
                <p>fff {this.state.comments}</p>
                {/*<FilterableCommentTable comments={PRODUCTS} />*/}

            </div>
        );
    }

});

export default Comments;