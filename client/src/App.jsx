import React from "react";
import {Container} from "@material-ui/core";
import {BrowserRouter , Routes, Route, Navigate} from "react-router-dom";



import Home from "./components/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Auth from "./components/Auth/Auth";
import PostDetails from "./components/PostDetails/PostDetails";


const App = () => {
    const user =JSON.parse(localStorage.getItem('Profile'));
     

    return (
        
        <BrowserRouter>
        <Container maxWidth="xl">
            <Navbar />
            <Routes>
                <Route  path="/" exact element={<Navigate  to="/posts" replace={true} />}/>
                <Route  path="/posts" exact element={<Home/>}/>
                <Route  path="/posts/search" exact element={<Home/>}/>
                <Route  path="/posts/:id" exact element={<PostDetails/>}/>
                {/* If no user, then cannot visit /auth path */}
                <Route  path="/auth" exact element={!user ? <Auth/> : <Navigate to= "/posts" replace={true} />}/>
                {/* <Route  path="/auth" exact element={<Auth/>}/> */}
            </Routes>
        </Container>
        </BrowserRouter>
    )
   
}

export default App;

