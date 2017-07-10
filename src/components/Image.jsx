import React from 'react';
var axios = require('axios');
var createReactClass = require('create-react-class');
var FilterableTable = require('react-filterable-table');



class CommentRow extends React.Component {
    render() {
        return (
            <p>
                {this.props.comment.CommentText}
            </p>
        );
    }
}

class CommentTable extends React.Component {


    constructor(props) {
        super(props);

        console.log('props')
        console.log(props)
    }

    render() {
        var rows = [];
        this.props.comments.forEach((comment) => {

            if (comment.CommentText.indexOf(this.props.filterText) === -1) {
                return;
            }

            rows.push(<CommentRow comment={comment} key={comment.key}/>);
        });
        return (
            <div className="comments">
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
                    placeholder="Search comments..."
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


var Image = createReactClass({

    getInitialState: function () {
        return {
            image: '',
            name: '',
            comments: [],
            comment: ''
        };
    },

    componentDidMount: function () {

        var _this = this;
        this.serverRequest =
            axios
                .get("/images/" + this.props.match.params.id)
                .then(function (result) {

                    if (result) {

                        if (result.data.length > 0) {

                            _this.setState({
                                image: result.data[0].ImageName,
                            });
                        } else {

                            console.log('no image')
                        }
                    }

                })


        this.serverRequest = axios
            .get("/comments/" + this.props.match.params.id)
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
        this.setState({comment: event.target.value});
    },

    handleSubmit: function (event) {

        axios.post('/comments', {
            comment: this.state.comment,
            userID: 1,
            imageID: this.props.match.params.id
        })
            .then(function (response) {
                console.log('login response')
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        event.preventDefault();
    },

    render() {
        console.log('comments:')
        console.log(this.state.comments)

        console.log(this.state.image)
        // var name = '1.jpg'// this.state.image
        // var name2 = this.props.match.params.id + '.jpg'


        let fields = [
            { name: 'Login', displayName: "User", inputFilterable: true, sortable: true },
            { name: 'CommentText', displayName: "Comment", inputFilterable: true, exactFilterable: true, sortable: true }
        ];


        return (
            <div>
                <h2>Image comments</h2>
                {/*<FilterableCommentTable comments={this.state.comments}/>*/}
                <FilterableTable
                    namespace="People"
                    initialSort="UserID"
                    data={this.state.comments}
                    fields={fields}
                    noRecordsMessage="There are no people to display"
                    noFilteredRecordsMessage="No people match your filters!"
                />

                <h3>Make a comment on image:</h3>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Comment:
                        <textarea value={this.state.comment} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
})

export default Image;