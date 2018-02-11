import * as ACTIONS from './constants';

export interface TodoTypes {
    todo: string;
    done: boolean;
    _id?: string;
}

export function addTodo(todo: TodoTypes) {
    return {
        type: ACTIONS.ADD_NEW_TODO,
        todo
    };
}

export function editTodo(todo: TodoTypes) {
    return {
        type: ACTIONS.EDIT_TODO,
        todo
    };
}

export function remoteTodo(id: string) {
    return {
        type: ACTIONS.REMOVE_TODO,
        id
    };
}

export function toggleTodo(id: string) {
    return {
        type: ACTIONS.TOGGLE_TODO,
        id
    };
}

export function setFilter(filter: string) {
    return {
        type: ACTIONS.SET_FILTER,
        filter
    };
}
