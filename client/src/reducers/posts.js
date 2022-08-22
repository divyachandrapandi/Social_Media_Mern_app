import { FETCH_BY_SEARCH, FETCH_ALL, CREATE, FETCH_POST, UPDATE, DELETE, START_LOADING, END_LOADING } from "../constants/actionTypes"; 
// eslint-disable-next-line
export default (state= {isLoading :true, posts: []}, action) => {
    switch (action.type){
        case START_LOADING:
            return {...state, isLoading: true}
        case END_LOADING:
            return {...state, isLoading: false}
        case FETCH_POST:
            return {...state, post:action.payload}   //see clearly single post {post without s}
        case FETCH_ALL:
            return {...state, 
                    posts: action.payload.data, 
                    currentPage:action.payload.currentPage, 
                    numberOfPages: action.payload.numberOfPages};
        case FETCH_BY_SEARCH:
            return {...state, posts: action.payload};
        case DELETE:
            return {...state,posts:state.posts.filter((post) => post._id !== action.payload)};
        case UPDATE:
            return {...state,posts:state.posts.map((post) => post._id === action.payload._id ? action.payload : post)};
        case CREATE:
            return {...state,posts:[...state.posts, action.payload]};
        default:
            return state;
    }
} 


// goto reducer/index.js

// ----BOILER PLATE---//
// const reducers =(state, action) => {
    
//     switch(action.type){
//         case
//     }
// }


// reducers is a function that accepts the state and action
//  Then based on action type, perform a logic and return action or state that is changed by action
// In reducers, state always be equal to something that why intialising with empty array