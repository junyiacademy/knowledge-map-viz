import { combineReducers } from 'redux';
import { TEXT } from '../actions/actions';

function changeText(state = false, action = false) {
    switch(action.type){
        case TEXT:
            return !state;
        default:
            return state;
    }
}

export default combineReducers({
    text: changeText
});
