import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import networkReducer from './networkReducer';

// ==============================|| COMBINE REDUCER ||============================== //
// Initial app state
export const initialState = {
    authentication: {
        isInitialized: false,
        isUserSignedOn: false,
        realmAccessRoles: []
    },
    currentUser: {
        name: '',
        email: ''
    }
};

const reducer = combineReducers({
    network: networkReducer,
    customization: customizationReducer
});

export default reducer;
