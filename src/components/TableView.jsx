import React from 'react';

var createReactClass = require('create-react-class');
var axios = require('axios')

let FilterableTable = require('react-filterable-table');


var MyTable = createReactClass({
    getInitialState: function () {
        return {
            comments: []
        };
    },

    componentDidMount: function () {

        var _this = this;

        this.serverRequest = axios
            .get("/comments/")
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

        let fields = [
            { name: 'UserID', displayName: "User ID", inputFilterable: true, sortable: true },
            { name: 'CommentText', displayName: "Comment", inputFilterable: true, exactFilterable: true, sortable: true },
            { name: 'CommentID', displayName: "Comment ID", inputFilterable: true, exactFilterable: true, sortable: true }
        ];

        return (
            <div>
                <FilterableTable
                    namespace="People"
                    initialSort="UserID"
                    data={this.state.comments}
                    fields={fields}
                    noRecordsMessage="There are no people to display"
                    noFilteredRecordsMessage="No people match your filters!"
                />

            </div>
        )
    }
})

export default MyTable
