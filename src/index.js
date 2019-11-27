import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase/app';
import 'firebase/firestore';

import App from './App';
// import * as serviceWorker from './serviceWorker';

const firebaseConfig = {
    apiKey: "AIzaSyCfboXRc-hMgiYqYGqGwouQXIKgiU2WB2Y",
    authDomain: "project-ideas-9d0e4.firebaseapp.com",
    databaseURL: "https://project-ideas-9d0e4.firebaseio.com",
    projectId: "project-ideas-9d0e4",
    storageBucket: "project-ideas-9d0e4.appspot.com",
    messagingSenderId: "417951548004",
    appId: "1:417951548004:web:3815e85b56501b592e5571"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
