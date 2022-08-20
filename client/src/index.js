//connect react to html 
import React from "react";
import ReactDOM ,{ createRoot } from "react-dom/client";
import {Provider} from "react-redux";
import {legacy_createStore as createStore, applyMiddleware, compose} from "redux";

import {GoogleOAuthProvider} from "@react-oauth/google";
import thunk from "redux-thunk";
import reducers from "./reducers";
import App from "./App";
import "./index.css";

// Provider going to keep track of the store which is that global state allows us to access the store
// from anywhere inside the app not neccessary to be in parent or child component to access that state

const  store = createStore(reducers, compose(applyMiddleware(thunk)))

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    
    <GoogleOAuthProvider clientId="166521513486-qpblvpf4314deljtj49260hpuduu2350.apps.googleusercontent.com">
            <Provider store={store}>
                <App/>
            </Provider>
            
       </GoogleOAuthProvider>);