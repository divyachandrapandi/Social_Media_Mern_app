import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes"; 
import * as api from "../api/index.js";


///action creator - function that creates action
// Action an object that has type and payload
// payload is data where we store all posts
// With react-thunk we deal with async function, we use dispatch function as params
// since it takes some time to fetch posts IT IS ASYNCHRONOUS FUNCTION hence use thunk (async func)
export const getPosts = () => async(dispatch) => {

    try{
        const {data} = await api.fetchPosts(); //data(post) is response from axios.get method
        const action = {
            type: FETCH_ALL,
            payload: data //data where posts stored
        }
        dispatch(action);
    }
    catch(error) {
        console.log(error.message);
    }
   
}

//goto reducer/post.js

export const createPost = (post) => async (dispatch) => {
    try {
        const {data} = await api.createPost(post);
        dispatch ( {type : CREATE, payload: data})
    }
    catch (error){
        console.log(error.message);
    }
}

export const updatePost = (id, post) => async(dispatch) => {
    try {
        // response ={data}
        const { data } = await api.updatePost(id, post);

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