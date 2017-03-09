/**
 * Created by matteogatti on 09/03/17.
 */

console.clear();

const TodoForm = ({ addTodo }) => {
    let input;

    return React.createElement(
        "div",
        { className: "col col-md-4" },
        React.createElement(
            "div",
            { className: "form-group" },
            React.createElement("input", { className: "form-control", type: "text", placeholder: "Cosa vuoi ricordare?", ref: node => {
                    input = node;
                } }),
            React.createElement(
                "button",
                { className: "btn btn-link", onClick: () => {
                        addTodo(input.value);input.value = '';
                    } },
                React.createElement("i", { className: "fa fa-plus", "aria-hidden": "true" })
            )
        )
    );
};

const Todo = ({ todo, remove }) => {
    return React.createElement(
        "li",
        { className: "list-group-item", onClick: () => {
                remove(todo.id);
            } },
        todo.todo,
        React.createElement(
            "span",
            { className: "badge" },
            React.createElement("i", { className: "fa fa-times", "aria-hidden": "true" })
        )
    );
};

const TodoList = ({ todos, remove }) => {
    const todoNode = todos.map(todo => {
        return React.createElement(Todo, { todo: todo, key: todo.id, remove: remove });
    });
    return React.createElement(
        "div",
        { className: "col col-md-4" },
        React.createElement(
            "ul",
            { className: "list-group" },
            todoNode
        )
    );
};

class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: []
        };

        this.getTodoList();
    }

    getTodoList() {
        axios.get('/xhr/list').then(res => {
            this.state.data = res.data;
            this.setState({ data: this.state.data });
        });
    }

    addTodo(val) {
        axios({
            url: '/xhr/add',
            method: 'POST',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
            data: {
                todo: val
            }
        }).then(res => {
            if (res.data.status) {
                const todo = { todo: val, id: res.data.result.id };

                this.state.data.push(todo);
                this.setState({ data: this.state.data });
            }
        });
    }

    deleteTodo(id) {
        const remainder = this.state.data.filter(todo => {
            if (todo.id !== id) {
                return todo;
            }
        });

        axios({
            url: '/xhr/delete/' + id,
            method: 'DELETE',
            headers: { 'X-Requested-With': 'XMLHttpRequest' }
        }).then(res => {
            if (res.data.status) {
                this.setState({ data: remainder });
            }
        });
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(TodoForm, { addTodo: this.addTodo.bind(this) }),
            React.createElement(TodoList, { todos: this.state.data, remove: this.deleteTodo.bind(this) })
        );
    }
}

ReactDOM.render(React.createElement(TodoApp, null), document.getElementById('todo'));
//# sourceMappingURL=todolist.js.map