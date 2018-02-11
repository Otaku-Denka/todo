import * as ACTIONS from '../actions/constants';

interface TodoTypes {
    todo: string;
    done: boolean;
    _id: string;
}

export interface StateTypes {
    todos: TodoTypes[];
    filter: string;
}

interface ActionTypes {
    type: string;
    todo: TodoTypes;
    id: string;
    filter: string;
}
const initialState: StateTypes = {
    todos: [
        {
            todo: 'test todo',
            done: false,
            _id: 'asdasdas'
        }
    ],
    filter: 'all'
};

export default (state = initialState, action: ActionTypes) => {
    switch (action.type) {
        case ACTIONS.ADD_NEW_TODO:
            return { ...state, todos: [...state.todos, action.todo] };
        case ACTIONS.EDIT_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos.map(item => {
                        if (item._id === action.todo._id) {
                            return action.todo;
                        }
                        return item;
                    })
                ]
            };
        case ACTIONS.TOGGLE_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos.map(item => {
                        if (item._id === action.id) {
                            let todo = { ...item };
                            todo.done = !item.done;
                            return todo;
                        }
                        return item;
                    })
                ]
            };
        case ACTIONS.REMOVE_TODO:
            return {
                ...state,
                todos: [...state.todos.filter(item => item._id !== action.id)]
            };
        case ACTIONS.SET_FILTER:
            return { ...state, filter: action.filter };
        default:
            return { ...state };
    }
};
