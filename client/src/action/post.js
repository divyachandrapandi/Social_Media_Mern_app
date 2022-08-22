import {START_LOADING, END_LOADING, FETCH_POST, FETCH_BY_SEARCH,FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes"; 
import * as api from "../api/index.js";


///action creator - function that creates action
// Action an object that has type and payload
// payload is data where we store all posts
// With react-thunk we deal with async function, we use dispatch function as params
// since it takes some time to fetch posts IT IS ASYNCHRONOUS FUNCTION hence use thunk (async func)

export const getPost = (id) => async(dispatch) => {

    try{
        dispatch({type: START_LOADING})
        const { data } = await api.fetchPost(id); //data(post) is response from axios.get method
        console.log(data)
        const action = {
            type: FETCH_POST,
            payload:  data,
        } 
        
        dispatch(action);
        dispatch({type: END_LOADING})
    }
    catch(error) {
        console.log(error.message);
    }
}
export const getPosts = (page) => async(dispatch) => {

    try{
        dispatch({type: START_LOADING})
        const {data : {data, currentPage, numberOfPages} } = await api.fetchPosts(page); //data(post) is response from axios.get method
        console.log(data)
        const action = {
            type: FETCH_ALL,
            payload:  {data, currentPage, numberOfPages},
        } //data where posts stored
        
        dispatch(action);
        dispatch({type: END_LOADING})
    }
    catch(error) {
        console.log(error.message);
    }
   
}

//goto reducer/post.js

export const getPostBySearch = (searchQuery) => async (dispatch) => {
    try { 
        dispatch({type: START_LOADING})
        const {data : {data}}=await api.fetchPostsBySearch(searchQuery); 
        console.log(data)
        dispatch({type: FETCH_BY_SEARCH, payload:data})
        
        dispatch({type: END_LOADING})

    } catch (error) {
        console.log(error)
    }
}

export const createPost = (post, navigate) => async (dispatch) => {
    try {
        dispatch({type: START_LOADING})
        const {data} = await api.createPost(post);
        navigate(`/posts/${data._id}`);
        dispatch ( {type : CREATE, payload: data})
        
        dispatch({type: END_LOADING})
    }
    catch (error){
        console.log(error.message);
    }
}

export const updatePost = (id, post, navigate) => async(dispatch) => {
    try {
        // response ={data}
        const { data } = await api.updatePost(id, post);
        navigate(`/posts/${data._id}`)

        dispatch({ type: UPDATE, payload: data });
    } 
    catch(error) {
        console.log(error);
    }
}


export const deletePost = (id) => async(dispatch) => {
    try {
        await api.deletePost(id);
        dispatch({ type: DELETE ,payload: id });

    } catch(error){
        console.log(error);
    }
}

export const likedPost = (id) => async(dispatch) => {
     try{
        const {data} = await api.likePost(id);
        await console.log("data in action", data)
        dispatch({ type:UPDATE, payload: data })

     } catch(error){
        console.log(error)
     }
}