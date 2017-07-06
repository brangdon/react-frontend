
import React from 'react';
import ReactDOM from 'react-dom';
// import {Router, Route, IndexRoute, browserHistory} from 'react-router'

import {BrowserRouter, Route, Link} from 'react-router-dom'

// import * as firebase from 'firebase'


import App from './components/App.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Annoucements from './components/Annoucements.jsx';
import Home from './components/Home.jsx';
import Contact from './components/Contact.jsx';
import Comments from './components/Comments.jsx';
import Gallery from './components/Gallery.jsx';
import InfiniteList from './components/InfiniteList.jsx';
import Image from './components/Image.jsx';



ReactDOM.render((
        <BrowserRouter>
            <div>
                <Route exact path="/" />
                <Route path="/home" component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/Annoucements" component={Annoucements}/>
                <Route path="/contact" component={Contact}/>
                <Route path="/comments" component={Comments}/>
                <Route path="/gallery" component={Gallery}/>
                <Route path="/image/:id" component={Image}/>
            </div>

        </BrowserRouter>
    ),
    document.getElementById('app')
);


ReactDOM.render(<App/>, document.getElementById("acc-menu"));

ReactDOM.render(<InfiniteList/>, document.getElementById("posts"));
