import React from "react";
import {Container} from "@material-ui/core";
import {BrowserRouter , Routes, Route} from "react-router-dom";
// import {GoogleOAuthProvider} from "@react-oauth/google";
// import dotenv from "dotenv";


import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";

// dotenv.config();

const App = () => {
    
    return (
        
        // <GoogleOAuthProvider clientId={`${process.env.GOOGLE_CLIENT_ID}`}>
        <BrowserRouter>
        <Container maxWidth="lg">
            <Navbar />
            <Routes>
                <Route  path="/" exact element={<Home/>}/>
                <Route  path="/auth" exact element={<Auth/>}/>
            </Routes>
        </Container>
        </BrowserRouter>
        // </GoogleOAuthProvider>
    )
   
}

export default App;

