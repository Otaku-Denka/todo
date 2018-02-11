import * as React from 'react';
import styled from 'styled-components';
import { Glyphicon, FormControl } from 'react-bootstrap';

interface PropsTypes {
    todo?: string;
    done?: boolean;
    _id?: string | number;
    addTodo(todo: any): () => void;
    editTodo(todo: any): () => void;
    remoteTodo(id?: any): () => void;
    toggleTodo(id?: any): () => void;
}
interface StateTypes {
    edit: boolean;
    todoValue?: string;
}

export default class TodoItem extends React.Component<PropsTypes, StateTypes> {
    static defaultProps = {
        todo: 'default',
        done: false,
        _id: ''
    };
    constructor(props: PropsTypes) {
        super(props);
        this.state = {
            edit: false,
            todoValue: ''
        };
    }
    componentDidMount() {
        this.setState({
            todoValue: this.props.todo
        });
    }

    handleTodoOnChange(e: any) {
        this.setState({
            todoValue: e.currentTarget.value
        });
    }
    toggleEdit() {
        this.setState({
            edit: !this.state.edit
        });
    }
    handleKeyDown(e: any) {
        if (e.keyCode === 13) {
            if (this.state.todoValue !== '') {
                const todo = {
                    todo: this.state.todoValue,
                    done: false,
                    _id: this.props._id
                };
                this.props.editTodo(todo);
                this.setState({
                    edit: false
                });
            }
        }
    }
    componentDidUpdate(prevProps: PropsTypes, prevState: StateTypes) {
        if (prevProps.todo !== this.props.todo) {
            this.setState({
                todoValue: this.props.todo
            });
        }
    }

    render() {
        return (
            <TodoItemContainer>
                <TodoContent
                    done={this.props.done}
                    onClick={() => {
                        this.props.toggleTodo(this.props._id);
                    }}
                >
                    {this.state.edit ? (
                        <FormControl
                            value={this.state.todoValue}
                            onChange={e => {
                                this.handleTodoOnChange(e);
                            }}
                            onKeyDown={e => {
                                this.handleKeyDown(e);
                            }}
                        />
                    ) : (
                        this.props.todo
                    )}
                </TodoContent>
                <BtnContainer>
                    <Icon>
                        <Glyphicon
                            glyph="glyphicon glyphicon-pencil"
                            onClick={() => {
                                this.toggleEdit();
                            }}
                        />
                    </Icon>
                    <Icon>
                        <Glyphicon
                            glyph="glyphicon glyphicon-remove"
                            onClick={() => {
                                this.props.remoteTodo(this.props._id);
                            }}
                        />
                    </Icon>
                </BtnContainer>
            </TodoItemContainer>
        );
    }
}

const TodoItemContainer = styled.div`
    font-size: 1.2em;
    margin-top: 10px;
    display: flex;
    padding: 10px;
    border-bottom: 1px solid rgb(187, 187, 187);
    justify-content: space-between;
`;

interface TodoBoxProps {
    done?: boolean;
    className?: string;
    onClick: () => void;
}

const TodoBox: React.StatelessComponent<TodoBoxProps> = props => (
    <div className={props.className} onClick={props.onClick}>
        {props.children}
    </div>
);
const TodoContent = styled(TodoBox)`
    display: flex;
    width: 70%;
    cursor: pointer;
    color: ${(props: any) => (!props.done ? '#000' : '#a9a9a9')};
    text-decoration: ${(props: any) => (!props.done ? 'none' : 'line-through')};
`;

const BtnContainer = styled.div`
    display: inline-flex;
    width: 30%;
    justify-content: flex-end;
`;

const Icon = styled.div`
    display: inline-block;

    padding: 5px;
    margin-right: 10px;
    border-radius: 5px;
    cursor: pointer;
    &:hover {
        background: #eceff1;
    }
`;
