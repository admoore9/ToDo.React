var ViewEnum = {
    TODO: 1, 
    COMPLETED: 2,
    DELETED: 3
}

var Task = React.createClass({
    getInitialState: function() {
        return {
            isEditing: false
        };
    },
    handleEditTask: function() {
        this.setState({isEditing: true});
        return;
    },
    handleSaveTask: function(e) {
        e.preventDefault();
        
        // TODO: send request to the server to update JSON
        this.props.text = this.refs.textInput.getInputDOMNode().value;
        this.props.dateDue = this.refs.dateDueInput.getInputDOMNode().value;

        this.setState({isEditing: false});
        return;
    },
    handleCancelEditTask: function() {
        this.setState({isEditing: false});
        return;
    },
    handleCompleteTask: function() {
        this.props.handleCompleteTask(this.props.id);
        return;
    },
    handleDeleteTask: function() {
        this.props.handleDeleteTask(this.props.id);
        return;
    },
    render: function() {
        Row = ReactBootstrap.Row;
        Col = ReactBootstrap.Col;
        ButtonGroup = ReactBootstrap.ButtonGroup
        Button = ReactBootstrap.Button;
        Glyphicon = ReactBootstrap.Glyphicon;

        var TaskView;

        if (this.state.isEditing) {
            TaskView = 
            <form className="taskForm" onSubmit={this.handleSaveTask} style={{cursor: "pointer"}}>
                <Col lg={8} md={8} sm={8}>
                    <Input
                        type="text"
                        ref="textInput"
                        required="required"
                        defaultValue={this.props.text}
                        placeholder="Enter a new task..."
                        max="100"
                        buttonBefore={<Button bsStyle="success" type="submit" value="Post"><Glyphicon glyph="pencil"/></Button>}
                        buttonAfter={<Button bsStyle="danger" onClick={this.handleCancelEditTask}><Glyphicon glyph="remove"/></Button>}
                    />
                </Col>
                <Col lg={2} md={2} sm={2}>
                    <Input
                        type="date"
                        ref="dateDueInput"
                        required="required"
                        defaultValue={this.props.dateDue}
                    />
                </Col>
            </form>
        } else {
            TaskView =
            <div style={{cursor: "pointer"}} onClick={this.handleEditTask}>
                <Col lg={8} md={8} sm={8}>
                    <p>{this.props.text}</p>
                </Col>
                <Col lg={2} md={2} sm={2}>
                    <p>{this.props.dateDue}</p>
                </Col>
            </div>
        }

        return (
            <div>
                <Row>
                    <hr/>
                    <Col lg={2} md={2} sm={2}>
                        <ButtonGroup bsSize="small">
                            <Button bsStyle="danger" onClick={this.handleDeleteTask}><Glyphicon glyph="trash" /></Button>
                            <Button bsStyle="success" onClick={this.handleCompleteTask}><Glyphicon glyph="ok" /></Button>
                        </ButtonGroup>
                    </Col>
                    {TaskView}
                </Row>
            </div>
        )
    }
});

var TaskList = React.createClass({
    handleCompleteTask: function(id) {
        this.props.handleCompleteTask(id);
    },
    handleDeleteTask: function(id) {
        this.props.handleDeleteTask(id);
    },
    render: function() {
        var tasks = [];
        var _this = this;

        // Add each task that is not completed and not deleted to the task list
        if (this.props.viewMode === 1) {
            this.props.tasks.forEach(function(task) {
                if (!task.isComplete && !task.isDeleted) {
                    tasks.push(
                        <Task
                            key={task.id}
                            id={task.id}
                            text={task.text}
                            isDeleted={task.isDeleted}
                            isComplete={task.isComplete}
                            dateDue={task.dateDue}
                            handleCompleteTask={_this.handleCompleteTask}
                            handleDeleteTask={_this.handleDeleteTask}
                        />
                    );
                }
            });
        } else if (this.props.viewMode === 2) {
            this.props.tasks.forEach(function(task) {
                if (task.isComplete && !task.isDeleted) {
                    tasks.push(
                        <Task
                            key={task.id}
                            id={task.id}
                            text={task.text}
                            isDeleted={task.isDeleted}
                            isComplete={task.isComplete}
                            dateDue={task.dateDue}
                            handleCompleteTask={_this.handleCompleteTask}
                            handleDeleteTask={_this.handleDeleteTask}
                        />
                    );
                }
            });
        } else {
            this.props.tasks.forEach(function(task) {
                if (task.isDeleted) {
                    tasks.push(
                        <Task
                            key={task.id}
                            id={task.id}
                            text={task.text}
                            isDeleted={task.isDeleted}
                            isComplete={task.isComplete}
                            dateDue={task.dateDue}
                            handleCompleteTask={_this.handleCompleteTask}
                            handleDeleteTask={_this.handleDeleteTask}
                        />
                    );
                }
            });
        }

        return (<div>{tasks}</div>);
    }
});

var task_id = 6;
var TaskListHeader = React.createClass({
    getDefaultProps: function() {
        return {
            handleSubmit: function() {},
            url: '',
            pollInterval: 100000,
            tasks: []
        };
    },
    handleChangeViewMode: function(e) {
    },
    onClickCompleteAll: function() {
        this.props.handleCompleteAll();
    },
    handleSubmit: function(e) {
        e.preventDefault();
        var text = this.refs.textInput.getInputDOMNode().value;
        var dateDue = this.refs.dateDueInput.getInputDOMNode().value;
        if (!text || !dateDue) { return; }
        task_id++;
        this.refs.textInput.getInputDOMNode().value = '';
        this.refs.dateDueInput.getInputDOMNode().value = '';
        this.props.handleSubmit(text, dateDue);
    },
    render: function() {
        var completeAllButton;
        
        // Check to see if there is more than 1 task that is not complete and not deleted in the list of tasks
        // If there is, add the complete all button to the TaskListHeader
        if (this.props.tasks.length > 0) {
            var count = 0;
            this.props.tasks.forEach( function(task) {
                if (!task.isComplete && !task.isDeleted) {
                    count++;
                }
            });

            if (count > 1) {
                Button = ReactBootstrap.Button;
                Glyphicon = ReactBootstrap.Glyphicon;

                completeAllButton = <Button type="button" bsStyle="success" onClick={this.onClickCompleteAll}><Glyphicon glyph="ok" /> All</Button>;
            }
        }

        Row = ReactBootstrap.Row;
        Col = ReactBootstrap.Col;
        Input = ReactBootstrap.Input;
        DropdownButton = ReactBootstrap.DropdownButton;
        MenuItem = ReactBootstrap.MenuItem;
        Button = ReactBootstrap.Button;
        Glyphicon = ReactBootstrap.Glyphicon;

        var viewMenu;
        if (this.props.viewMode == 1) {
            viewMenu =
                <DropdownButton title="Todo Items">
                    <MenuItem eventKey="2" value="2" ref="completed" onClick={this.handleChangeViewMode}>Completed</MenuItem>
                    <MenuItem eventKey="3" value="3" ref="deleted" onClick={this.handleChangeViewMode}>Deleted</MenuItem>
                </DropdownButton>
        } else if (this.props.viewMode == 2) {
            viewMenu =
                <DropdownButton title="Completed Items">
                    <MenuItem eventKey="1" value="1" ref="todo" onClick={this.handleChangeViewMode}>Todo List</MenuItem>
                    <MenuItem eventKey="3" value="3" ref="deleted" onClick={this.handleChangeViewMode}>Deleted</MenuItem>
                </DropdownButton>
        } else {
            viewMenu =
                <DropdownButton title="Deleted Items">
                    <MenuItem eventKey="1" value="1" ref="todo" onClick={this.handleChangeViewMode}>Todo List</MenuItem>
                    <MenuItem eventKey="2" value="2" ref="completed" onClick={this.handleChangeViewMode}>Completed</MenuItem>
                </DropdownButton>
        }

        return (
            <div>
                {viewMenu}
                <h1 style={{textAlign: "center"}}>My Todo List</h1>
                <br/>
                <Row>
                    <Col lg={2} md={2} sm={2}>
                        {completeAllButton}
                    </Col>
                     <form className="taskForm" onSubmit={this.handleSubmit}>
                        <Col lg={8} md={8} sm={8}>
                            <Input
                                type="text"
                                ref="textInput"
                                required="required"
                                defaultValue={this.props.text}
                                placeholder="Enter a new task..."
                                max="100"
                                buttonAfter={<Button bsStyle="success" type="submit" value="Post"><Glyphicon glyph="pencil"/></Button>}
                            />
                        </Col>
                        <Col lg={2} md={2} sm={2}>
                            <Input
                                type="date"
                                ref="dateDueInput"
                                required="required"
                                defaultValue={this.props.dateDue}
                            />
                        </Col>
                    </form>
                </Row>
            </div>
        );
    }
});

var ToDoList = React.createClass({
    loadTasksFromServer: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({tasks: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    handleAddTask: function(text, dateDue) {
        var _this = this;
        console.log('handleSubmit');
        
        var new_tasks = this.state.tasks;
        var task = {id: task_id, isComplete: false, isDeleted: false, text: text, dateDue: dateDue}
        new_tasks.push(task);
        $.ajax({
            url: _this.props.url,
            dataType: 'json',
            type: 'POST',
            data: task,
            success: function(tasks) {
                _this.setState({tasks: new_tasks});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(_this.props.url, status, err.toString());
            }
        });
    },
    getInitialState: function() {
        return {
            tasks: [],
            viewMode: 1,
        };
    },
    componentDidMount: function() {
        this.loadTasksFromServer();
        setInterval(this.loadTasksFromServer, this.props.pollInterval);
    },
    handleCompleteAll: function() {
        var tasks = this.state.tasks;
        tasks.forEach(function(task) {
            task.isComplete = true;
        });
        this.setState({tasks: tasks});
    },
    handleCompleteTask: function(taskId) {
        var tasks = this.state.tasks;
        tasks.forEach(function(task) {
            if (task.id === taskId) {
                task.isComplete = true;
            }
        });
        this.setState({tasks: tasks});
    },
    handleDeleteTask: function(taskId) {
        var tasks = this.state.tasks;
        tasks.forEach(function(task) {
            if (task.id === taskId) {
                task.isDeleted = true;
            }
        });
        this.setState({tasks: tasks});
    },
    render: function() {
        Panel = ReactBootstrap.Panel;

        return (
            <Panel style={{marginTop:"30px"}}>
                <TaskListHeader
                    handleSubmit={this.handleAddTask}
                    tasks={this.state.tasks}
                    url={this.props.url}
                    handleCompleteAll={this.handleCompleteAll}
                    viewMode={this.state.viewMode}
                />
                <TaskList
                    tasks={this.state.tasks}
                    url={this.props.url}
                    handleCompleteTask={this.handleCompleteTask}
                    handleDeleteTask={this.handleDeleteTask}
                    viewMode={this.state.viewMode}
                />
            </Panel>
        );
    }
});

React.render(<ToDoList url="tasks.json" pollInterval={999999} />, document.getElementById('content'));
