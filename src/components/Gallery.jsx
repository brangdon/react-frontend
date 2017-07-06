import React from 'react';
var createReactClass = require('create-react-class')
var axios = require('axios')


var Gallery = createReactClass({

    getInitialState: function () {
        return {
            name: ''
        };
    },

    changeChangeName: function (event) {
        this.setState({name: event.target.value});
    },

    handleSubmit: function (event) {

        axios.post('/images', {
            name: this.state.name
        })
            .then(function (response) {
                console.log('images response')
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });

        event.preventDefault();
    },

    render() {
        return (
            <div>
                <h2>Gallery</h2>
                <div className="adding-image">
                    <form onSubmit={this.handleSubmit}>
                        <label>Image name:</label>
                        <input type="text" value={this.state.name} onChange={this.changeChangeName}/>

                        <input type="submit" value="Submit"/>
                    </form>
                </div>


                <div id="posts">

                </div>
            </div>
        )
    }
})


export default Gallery;