import {combineReducers, createStore, compose, applyMiddleware} from 'redux';
import theme from './reducers/Theme/theme.reducer';
import auth from './reducers/Auth/auth.reducer';
import thunk from 'redux-thunk';

const reducer = () => 
    combineReducers({
        theme,
        auth,
    });

const configStore = () => 
        createStore(reducer(),
            compose(applyMiddleware(thunk))
        );

export default configStore;