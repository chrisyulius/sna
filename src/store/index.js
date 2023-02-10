// import { createStore } from 'redux';
import reducer from './reducer';
import { configureStore } from '@reduxjs/toolkit';
// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({
    reducer
});
const persister = 'Free';

export { store, persister };
