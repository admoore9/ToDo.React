var Task = React.createClass({
    render: function() {
        return (
            <tr hidden={this.props.isComplete}>
                <td><button type="button">Complete</button></td>
                <td><input type="text" placeholder="Enter your task" value={this.props.text}/></td>
                <td><input type="date" value={this.props.dateDue}/></td>
            </tr>
        )
    }
});

var TaskList = React.createClass({
    render: function() {
        var rows = [];
        this.props.tasks.forEach(function(task) {
            rows.push(
                <Task key={task.id} id={task.id} text={task.text} isComplete={task.isComplete} dateDue={task.dateDue} />
            );
        });
        return (
            <table>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var TaskListHeader = React.createClass({
    render: function() {
        return (
            <table>
                <thead>
                    <th>My To Do List</th>
                </thead>
                <tbody>
                    <tr>
                        <td><button type="button">Complete all</button></td>
                        <td><button type="button">New task</button></td>
                    </tr>
                </tbody>
            </table>
        );
    }
});

var TASKS = [
    {"id": 1, "isComplete": false, "text": "Take out the trash", "dateDue": "2014-12-10"},
    {"id": 2, "isComplete": false, "text": "Walk the dog", "dateDue": "2014-12-15"},
    {"id": 3, "isComplete": false, "text": "Finish term paper", "dateDue": "2014-12-20"},
    {"id": 4, "isComplete": false, "text": "Watch Interstellar", "dateDue": "2014-12-26"},
    {"id": 5, "isComplete": false, "text": "Get food for dinner", "dateDue": "2014-12-18"},
    {"id": 6, "isComplete": false, "text": "Sleep", "dateDue": "2014-12-10"}
];

var ToDoList = React.createClass({
    render: function() {
        return (
            <div>
                <TaskListHeader />
                <TaskList tasks={this.props.tasks} />
            </div>
        );
    }
});

React.render(<ToDoList tasks={TASKS} />, document.body);