import * as React from 'react';
import styled from 'styled-components';
import { FormControl, Nav, NavItem } from 'react-bootstrap';
import TodoItem from './todoItem';
import { connect } from 'react-redux';
import { RootState } from '../reducers/index';
import {
    addTodo,
    TodoTypes,
    editTodo,
    remoteTodo,
    toggleTodo,
    setFilter
} from '../actions/todo';
import { StateTypes as TodosState } from '../reducers/todo';

import * as uuid from 'uuid/v4';

interface PropsTypes {
    todos: TodosState;
    filteredTodos: TodoTypes[];
    addTodo(todo: TodoTypes): () => void;
    editTodo(todo: TodoTypes): () => void;
    remoteTodo(id: string): () => void;
    toggleTodo(id: string): () => void;
    setFilter(filter: string): () => void;
}

class TodoContainer extends React.Component<PropsTypes, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            value: ''
        };
    }
    handleOnChange(e: any) {
        this.setState({
            value: e.target.value
        });
    }
    handleKeyDown(e: any) {
        if (e.keyCode === 13) {
            if (this.state.value !== '') {
                const todo = {
                    todo: this.state.value,
                    done: false,
                    _id: uuid()
                };
                this.props.addTodo(todo);
                this.setState({
                    value: ''
                });
            }
        }
    }
    handleSelect(key: any) {
        this.props.setFilter(key);
    }
    render() {
        const renderItems = this.props.filteredTodos.map(
            (item: TodoTypes, i: number) => {
                return (
                    <TodoItem
                        key={item._id}
                        todo={item.todo}
                        done={item.done}
                        addTodo={this.props.addTodo}
                        _id={item._id}
                        editTodo={this.props.editTodo}
                        remoteTodo={this.props.remoteTodo}
                        toggleTodo={this.props.toggleTodo}
                    />
                );
            }
        );
        return (
            <BackgroundComponent>
                <TodoWrap>
                    <FormContainer>
                        <FormControl
                            type="text"
                            placeholder="Enter new todo"
                            value={this.state.value}
                            onChange={e => {
                                this.handleOnChange(e);
                            }}
                            onKeyDown={e => {
                                this.handleKeyDown(e);
                            }}
                        />
                    </FormContainer>
                    <div>
                        <Nav
                            bsStyle="pills"
                            activeKey={this.props.todos.filter}
                            onSelect={key => {
                                this.handleSelect(key);
                            }}
                        >
                            <NavItem eventKey={'all'}>All</NavItem>
                            <NavItem eventKey={'todos'}>Todos</NavItem>
                            <NavItem eventKey={'done'}>Done</NavItem>
                        </Nav>
                    </div>
                    <Title>To Do:</Title>
                    {renderItems}
                </TodoWrap>
            </BackgroundComponent>
        );
    }
}
const mapStateToProps = (state: RootState, ownState: any) => {
    const filteredTodos =
        state.todos.filter === 'done'
            ? state.todos.todos.filter(todo => todo.done)
            : state.todos.todos.filter(todo => !todo.done);
    return {
        todos: state.todos,
        filteredTodos:
            state.todos.filter === 'all' ? state.todos.todos : filteredTodos
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: any) => {
    return {
        addTodo: (todo: TodoTypes) => {
            dispatch(addTodo(todo));
        },
        editTodo: (todo: TodoTypes) => {
            dispatch(editTodo(todo));
        },
        remoteTodo: (id: string) => {
            dispatch(remoteTodo(id));
        },
        toggleTodo: (id: string) => {
            dispatch(toggleTodo(id));
        },
        setFilter: (filter: string) => {
            dispatch(setFilter(filter));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoContainer);

const TodoWrap = styled.div`
    margin: 50px auto;
    background: #fff;
    min-height: 500px;
    width: 600px;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.09);
    padding: 15px;
    border-radius: 10px;
`;

const BackgroundComponent = styled.div`
    background: #eceff1;
    width: 100%;
    margin: 0;
    padding: 0;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
`;

const FormContainer = styled.div`
    margin: 10px;
`;

const Title = styled.div`
    font-size: 2em;
`;
