/**
 * Created by matteogatti on 09/03/17.
 */

console.clear();

const TodoForm = ({addTodo}) => {
    let input;

    return (
        <div className="col col-md-4">
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Cosa vuoi ricordare?" ref={ node => { input = node; } } />
                <button className="btn btn-link" onClick={ () => { addTodo(input.value); input.value = ''; } }>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
};

const Todo = ({todo, remove}) => {
    return (
        <li className="list-group-item" onClick={() => {remove(todo.id)}}>
            {todo.todo}
            <span className="badge">
                <i className="fa fa-times" aria-hidden="true"></i>
            </span>
        </li>
    );
};

const TodoList = ({todos, remove}) => {
    const todoNode = todos.map((todo) => {
        return (<Todo todo={todo} key={todo.id} remove={remove}/>)
    });
    return (
        <div className="col col-md-4">
            <ul className="list-group">{todoNode}</ul>
        </div>
    );
};

class TodoApp extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            data: []
        };

        this.getTodoList();
    }

    getTodoList() {
        axios.get('/xhr/list').then((res) => {
            this.state.data = res.data;
            this.setState({ data: this.state.data });
        })
    }

    addTodo(val) {
        axios({
            url: '/xhr/add',
            method: 'POST',
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            data: {
                todo: val
            }
        }).then((res) => {
            if (res.data.status) {
                const todo = { todo: val, id: res.data.result.id };

                this.state.data.push(todo);
                this.setState({ data: this.state.data });
            }
        })
    }

    deleteTodo(id) {
        const remainder = this.state.data.filter((todo) => {
            if(todo.id !== id) {
                return todo;
            }
        });

        axios({
            url: '/xhr/delete/' + id,
            method: 'DELETE',
            headers: {'X-Requested-With': 'XMLHttpRequest'}
        }).then((res) => {
            if (res.data.status) {
                this.setState({ data: remainder });
            }
        })
    }

    render() {
        return (
            <div>
                <TodoForm addTodo={this.addTodo.bind(this)} />
                <TodoList todos={this.state.data} remove={this.deleteTodo.bind(this)} />
            </div>
        );
    }
}

ReactDOM.render(<TodoApp />, document.getElementById('todo'));
