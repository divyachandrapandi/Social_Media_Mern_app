import { FETCH_ALL, CREATE, UPDATE, DELETE } from "../constants/actionTypes"; 
// eslint-disable-next-line
export default (posts=[], action) => {
    switch (action.type){
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        case UPDATE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
        default:
            return posts;
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