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
        
        // TODO: send request to the server
        this.props.text = this.refs.textInput.getInputDOMNode().value;
        this.props.dateDue = this.refs.dateDueInput.getInputDOMNode().value;

        this.setState({isEditing: false});
        return;
    },
    handleCancelEditTask: function() {
        this.setState({isEditing: false});
        return;
    },
    onClickCompleteTask: function() {
        this.props.handleCompleteTask(this.props.id);
        return;
    },
    onClickDeleteTask: function() {
        this.props.handleDeleteTask(this.props.id);
        return;
    },
    render: function() {
        var taskStatus;

        ButtonGroup = ReactBootstrap.ButtonGroup
        Button = ReactBootstrap.Button;
        Glyphicon = ReactBootstrap.Glyphicon;
        Row = ReactBootstrap.Row;
        Col = ReactBootstrap.Col;

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
                    <span>{this.props.text}</span>
                </Col>
                <Col lg={2} md={2} sm={2}>
                    <span>{this.props.dateDue}</span>
                </Col>
            </div>
        }

        return (
            <div>
                <Row>
                    <hr/>
                    <Col lg={2} md={2} sm={2}>
                        <ButtonGroup bsSize="small">
                            <Button bsStyle="danger" onClick={this.onClickDeleteTask}><Glyphicon glyph="remove" /></Button>
                            <Button bsStyle="success" onClick={this.onClickCompleteTask}><Glyphicon glyph="ok" /></Button>
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
        tasks = []
        var _this = this;
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
        return (<div>{tasks}</div>);
    }
});

var TaskListHeader = React.createClass({
    onClickCompleteAll: function() {
        this.props.handleCompleteAll();
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
        Button = ReactBootstrap.Button;
        Glyphicon = ReactBootstrap.Glyphicon;

        return (
            <div>
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
    getInitialState: function() {
        return {
            tasks: [],
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
                    tasks={this.state.tasks}
                    handleCompleteAll={this.handleCompleteAll}
                />
                <TaskList
                    tasks={this.state.tasks}
                    handleCompleteTask={this.handleCompleteTask}
                    handleDeleteTask={this.handleDeleteTask}
                />
            </Panel>
        );
    }
});

React.render(<ToDoList url="tasks.json" pollInterval={5000} />, document.getElementById('content'));
