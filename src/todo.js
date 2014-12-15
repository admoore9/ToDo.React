var ViewEnum = {
    TODO: "Todo List", 
    COMPLETED: "Completed Tasks",
    DELETED: "Deleted Tasks"
}

// TODO: Don't set what starting id is in the JS
var task_id = 6;

var Task = React.createClass({
    getInitialState: function() {
        return {
            isEditing: false
        };
    },

    // Handles showing the view for editing a task
    handleEditTask: function() {
        this.setState({isEditing: true});
        return;
    },

    // Handles saving an edited task
    handleSaveEdit: function(e) {
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
    handleSendToTodoList: function() {
        this.props.handleSendToTodoList(this.props.id);
        return;
    },
    render: function() {
        Row = ReactBootstrap.Row;
        Col = ReactBootstrap.Col;
        ButtonGroup = ReactBootstrap.ButtonGroup
        Button = ReactBootstrap.Button;
        Glyphicon = ReactBootstrap.Glyphicon;
        OverlayTrigger = ReactBootstrap.OverlayTrigger;
        Tooltip = ReactBootstrap.Tooltip;

        var taskView;
        var taskModifiers;

        if (this.state.isEditing) {
            taskView = 
                <form className="taskForm" onSubmit={this.handleSaveEdit} style={{cursor: "pointer"}}>
                    <Col lg={8} md={8} sm={8}>
                        <Input
                            type="text"
                            ref="textInput"
                            required="required"
                            defaultValue={this.props.text}
                            placeholder="Enter a new task..."
                            max="100"
                            buttonBefore={<Button bsStyle="danger" onClick={this.handleCancelEditTask}><Glyphicon glyph="remove"/></Button>}
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
        } else if (!this.props.isComplete && !this.props.isDeleted) {
            taskView =
                <div style={{cursor: "pointer"}} onClick={this.handleEditTask}>
                    <Col lg={8} md={8} sm={8}>
                        <p>{this.props.text}</p>
                    </Col>
                    <Col lg={2} md={2} sm={2}>
                        <p>{this.props.dateDue}</p>
                    </Col>
                </div>
        } else {
            taskView =
                <div>
                    <Col lg={8} md={8} sm={8}>
                        <p>{this.props.text}</p>
                    </Col>
                    <Col lg={2} md={2} sm={2}>
                        <p>{this.props.dateDue}</p>
                    </Col>
                </div>
        }

        if (!this.props.isComplete && !this.props.isDeleted) {
            taskModifiers =
                <ButtonGroup bSize="small">
                    <Button bsStyle="danger" onClick={this.handleDeleteTask}><Glyphicon glyph="trash" /></Button>
                    <Button bsStyle="success" onClick={this.handleCompleteTask}><Glyphicon glyph="ok" /></Button>
                </ButtonGroup>
        } else if (this.props.isComplete && !this.props.isDeleted) {
            taskModifiers =
                <ButtonGroup bSize="small">
                    <OverlayTrigger placement="top" overlay={<Tooltip>Send to todo list</Tooltip>}>
                        <Button bsStyle="primary" onClick={this.handleSendToTodoList}><Glyphicon glyph="share-alt"/></Button>
                    </OverlayTrigger>
                    <Button bsStyle="danger" onClick={this.handleDeleteTask}><Glyphicon glyph="trash" /></Button>
                </ButtonGroup>
        } else if (this.props.isDeleted) {
            taskModifiers =
                <ButtonGroup bSize="small">
                    <OverlayTrigger placement="top" overlay={<Tooltip>Send to todo list</Tooltip>}>
                        <Button bsStyle="primary" onClick={this.handleSendToTodoList}><Glyphicon glyph="share-alt"/></Button>
                    </OverlayTrigger>
                </ButtonGroup>
        }

        return (
            <div>
                <Row>
                    <hr/>
                    <Col lg={2} md={2} sm={2}>
                        {taskModifiers}
                    </Col>
                    {taskView}
                </Row>
            </div>
        )
    }
});

var TaskList = React.createClass({
    handleCompleteTask: function(id) {
        this.props.handleCompleteTask(id);
        return;
    },
    handleDeleteTask: function(id) {
        this.props.handleDeleteTask(id);
        return;
    },
    handleSendToTodoList: function(id) {
        this.props.handleSendToTodoList(id);
        return;
    },
    render: function() {
        var tasks = [];
        var _this = this;

        // Add each task that is not completed and not deleted to the task list
        if (this.props.view === ViewEnum.TODO) {
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
                            view={_this.props.view}
                        />
                    );
                }
            });
        } else if (this.props.view === ViewEnum.COMPLETED) {
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
                            handleSendToTodoList={_this.handleSendToTodoList}
                            view={_this.props.view}
                        />
                    );
                }
            });
        } else if (this.props.view === ViewEnum.DELETED) {
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
                            handleSendToTodoList={_this.handleSendToTodoList}
                            view={_this.props.view}
                        />
                    );
                }
            });
        }

        return (<div>{tasks}</div>);
    }
});

var TaskListHeader = React.createClass({
    getDefaultProps: function() {
        return {
            handleAddTask: function() {},
            url: '',
            pollInterval: 100000,
            tasks: []
        };
    },
    handleChangeView: function(e) {
        this.props.handleChangeView(e);
    },
    onClickCompleteAll: function() {
        this.props.handleCompleteAll();
    },

    // Handles submission of a task to the todo list
    handleAddTask: function(e) {
        e.preventDefault();
        var text = this.refs.textInput.getInputDOMNode().value;
        var dateDue = this.refs.dateDueInput.getInputDOMNode().value;
        if (!text) { return; }
        if (!dateDue) {
            dateDue = new Date().toISOString().split('T')[0];
        }
        task_id++;
        this.refs.textInput.getInputDOMNode().value = '';
        this.refs.dateDueInput.getInputDOMNode().value = '';
        this.props.handleAddTask(text, dateDue);
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
        if (this.props.view === ViewEnum.TODO) {
            viewMenu =
                <DropdownButton title="Todo List">
                    <MenuItem eventKey={ViewEnum.COMPLETED} onSelect={this.handleChangeView}><Glyphicon glyph="ok" /> Archive</MenuItem>
                    <MenuItem eventKey={ViewEnum.DELETED} onSelect={this.handleChangeView}><Glyphicon glyph="trash" /> Trash</MenuItem>
                </DropdownButton>

            newTask =
                <form className="taskForm" onSubmit={this.handleAddTask}>
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
                            defaultValue={this.props.dateDue}
                        />
                    </Col>
                </form>
        } else if (this.props.view === ViewEnum.COMPLETED) {
            completeAllButton = null;
            newTask = null;
            viewMenu =
                <DropdownButton title="Archive">
                    <MenuItem eventKey={ViewEnum.TODO} onSelect={this.handleChangeView}><Glyphicon glyph="pencil"/> Todo List</MenuItem>
                    <MenuItem eventKey={ViewEnum.DELETED} onSelect={this.handleChangeView}><Glyphicon glyph="trash" /> Trash</MenuItem>
                </DropdownButton>
        } else if (this.props.view === ViewEnum.DELETED) {
            completeAllButton = null;
            newTask = null;
            viewMenu =
                <DropdownButton title="Trash">
                    <MenuItem eventKey={ViewEnum.TODO} onSelect={this.handleChangeView}><Glyphicon glyph="pencil"/> Todo List</MenuItem>
                    <MenuItem eventKey={ViewEnum.COMPLETED} onSelect={this.handleChangeView}><Glyphicon glyph="ok" /> Archive</MenuItem>
                </DropdownButton>
        }

        return (
            <div>
                {viewMenu}
                <h1 style={{textAlign: "center"}}>{this.props.view}</h1>
                <br/>
                <Row>
                    <Col lg={2} md={2} sm={2}>
                        {completeAllButton}
                    </Col>
                    {newTask}
                </Row>
            </div>
        );
    }
});

var TodoApp = React.createClass({
    getInitialState: function() {
        return {
            tasks: [],
            view: ViewEnum.TODO,
        };
    },
    componentDidMount: function() {
        this.loadTasksFromServer();
        setInterval(this.loadTasksFromServer, this.props.pollInterval);
    },

    // Handles changing to a different view (todo, completed, deleted)
    handleChangeView: function(view) {
        this.setState({view: view});
    },

    // Handles loading tasks from the server
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

    // Handles submitting a task to the todo list
    handleAddTask: function(text, dateDue) {
        var _this = this;
        var new_tasks = this.state.tasks;
        var task = {id: task_id, isComplete: false, isDeleted: false, text: text, dateDue: dateDue}
        new_tasks.push(task);
        $.ajax({
            url: '/addTask',
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

    // Handles completion of all tasks
    handleCompleteAll: function() {
        var _this = this;

        var updated_tasks = this.state.tasks;
        updated_tasks.forEach(function(task) {
            task.isComplete = true;
        });
        $.ajax({
            url: _this.props.url,
            dataType: 'json',
            type: 'PUT',
            data: updated_tasks,
            success: function(tasks) {
                _this.setState({tasks: updated_tasks});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(_this.props.url, status, err.toString());
            }
        });
    },

    // Handles completion of a single task
    handleCompleteTask: function(taskId) {
        var _this = this;

        var updated_tasks = this.state.tasks;
        updated_tasks.forEach(function(task) {
            if (task.id === taskId) {
                task.isComplete = true;
            }
        });
        $.ajax({
            url: _this.props.url,
            dataType: 'json',
            type: 'PUT',
            data: updated_tasks,
            success: function(tasks) {
                _this.setState({tasks: updated_tasks});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(_this.props.url, status, err.toString());
            }
        });
    },

    // Handles deletion of a task
    handleDeleteTask: function(taskId) {
        var _this = this;

        var updated_tasks = this.state.tasks;
        updated_tasks.forEach(function(task) {
            if (task.id === taskId) {
                task.isDeleted = true;
            }
        });
        $.ajax({
            url: _this.props.url,
            dataType: 'json',
            type: 'DELETE',
            data: updated_tasks,
            success: function(tasks) {
                _this.setState({tasks: updated_tasks});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(_this.props.url, status, err.toString());
            }
        });
    },

    // Handles sending a task from deleted or completed list to the todo list
    handleSendToTodoList: function(taskId) {
        var _this = this;

        var updated_tasks = this.state.tasks;
        updated_tasks.forEach(function(task) {
            if (task.id === taskId) {
                task.isComplete = false;
                task.isDeleted = false;
            }
        });
        $.ajax({
            url: _this.props.url,
            dataType: 'json',
            type: 'PUT',
            data: updated_tasks,
            success: function(tasks) {
                _this.setState({tasks: updated_tasks});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(_this.props.url, status, err.toString());
            }
        });
    },
    render: function() {
        Panel = ReactBootstrap.Panel;

        return (
            <Panel style={{marginTop:"30px"}}>
                <TaskListHeader
                    handleAddTask={this.handleAddTask}
                    tasks={this.state.tasks}
                    url={this.props.url}
                    handleCompleteAll={this.handleCompleteAll}
                    view={this.state.view}
                    handleChangeView={this.handleChangeView}
                />
                <TaskList
                    tasks={this.state.tasks}
                    url={this.props.url}
                    handleCompleteTask={this.handleCompleteTask}
                    handleDeleteTask={this.handleDeleteTask}
                    handleSendToTodoList={this.handleSendToTodoList}
                    view={this.state.view}
                />
            </Panel>
        );
    }
});

React.render(<TodoApp url="tasks.json" pollInterval={999999} />, document.getElementById('content'));
