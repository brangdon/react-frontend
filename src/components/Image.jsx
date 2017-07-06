import React from 'react';
var axios = require('axios');
var createReactClass = require('create-react-class');


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


    constructor(props) {
        super(props);

        console.log('props')
        console.log(props)
    }

    render() {
        var rows = [];
        // var lastCategory = null;
        this.props.comments.forEach((comment) => {
            // if (comment.CommentID == -1) {
            //     return;
            // }
            if (comment.Info.indexOf(this.props.filterText) === -1) {
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


var Image = createReactClass({

    getInitialState: function () {
        return {
            image: '',
            name: '',
            comments: []
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
                            // console.log('success')
                            // console.log(result.data[0])

                            _this.setState({
                                image: result.data[0].ImageName,
                                name: '5.jpg'
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

    render() {
        console.log(this.state.image)
        var name = '1.jpg'// this.state.image
        var name2 = this.props.match.params.id + '.jpg'

        // console.log('name state: ' + this.state.name)
        console.log('comments:')
        console.log(this.state.comments)
        return (
            <div>
                <h2>Image comments</h2>
                {/*<h2>{this.props.match.params.id}</h2>*/}
                {/*<h2>{this.state.name}</h2>*/}
                <FilterableCommentTable comments={this.state.comments}/>

            </div>
        )
    }
})

export default Image;