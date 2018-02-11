import { combineReducers } from 'redux';
import todos from './todo';
import { StateTypes } from './todo';

interface StoreEnhancerState {}
export interface RootState extends StoreEnhancerState {
    todos: StateTypes;
}

const reducers = combineReducers<RootState>({
    todos
});

export default reducers;
