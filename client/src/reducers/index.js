import {combineReducers} from "redux";
import postsReducers from "./posts";
import authReducer from "./auth"
// the posts in combine reducers is being assigned to postsreducers from reducer/post.js
export default combineReducers({posts: postsReducers,auth: authReducer })

// postReducers are individual reducers

//  goto component/post/post.jsx