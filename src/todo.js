var TaskEdit = React.createClass({
    render: function() {
        Input = ReactBootstrap.Input;
        Glyphicon = ReactBootstrap.Glyphicon;
        return (
            <form>
                <Col lg={8} md={8} sm={8}>
                    <Input type="text" value={this.props.text} max="100" buttonAfter={<Button bsStyle="success"><Glyphicon glyph="pencil" /></Button>} />
                </Col>
                <Col lg={2} md={2} sm={2}>
                    <Input type="date" required="required" value={this.props.dateDue}/>
                </Col>
            </form>
        );
    }
});

var TaskRead = React.createClass({
    render: function() {
        return (
            <div style={{cursor: "pointer"}}>
                <Col lg={8} md={8} sm={8}>
                    <span>{this.props.text}</span>
                 </Col>
                <Col lg={2} md={2} sm={2}>
                    <span>{this.props.dateDue}</span>
                </Col>
            </div>
        );
    }
});

var TaskListHeader = React.createClass({
    render: function() {
        ButtonGroup = ReactBootstrap.ButtonGroup;
        Button = ReactBootstrap.Button;
        Glyphicon = ReactBootstrap.Glyphicon;
        Row = ReactBootstrap.Row;
        Col = ReactBootstrap.Col;
        return (
            <div>
                <h1 style={{textAlign: "center"}}>My Todo List</h1>
                <br/>
                <Row>
                    <Col lg={2} md={2} sm={2}>
                        <Button type="button" bsStyle="success"><Glyphicon glyph="ok" /> All</Button>
                    </Col>
                    <TaskEdit text={this.props.text} dateDue={this.props.dateDue} />
                </Row>
            </div>
        );
    }
});

var Task = React.createClass({
    render: function() {
        ButtonGroup = ReactBootstrap.ButtonGroup
        Button = ReactBootstrap.Button;
        Input = ReactBootstrap.Input;
        Glyphicon = ReactBootstrap.Glyphicon;
        Row = ReactBootstrap.Row;
        Col = ReactBootstrap.Col;

        var hiddenStyle = {
            display: 'none'
        };

        return (
            <div>
                <Row>
                    <hr/>
                    <Col lg={2} md={2} sm={2}>
                        <ButtonGroup bsSize="small">
                            <Button bsStyle="danger"><Glyphicon glyph="remove" /></Button>
                            <Button bsStyle="success"><Glyphicon glyph="ok" /></Button>
                        </ButtonGroup>
                    </Col>
                    <TaskRead text={this.props.text} dateDue={this.props.dateDue} />
                </Row>
            </div>
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
        return (<div>{rows}</div>);
    }
});

var TASKS = [
    {"id": 1, "isComplete": false, "isEditing": false, "isDeleted": false, "text": "Take out the the trash", "dateDue": "2014-12-10"},
    {"id": 2, "isComplete": true, "isEditing": false, "isDeleted": false, "text": "Walk the dog", "dateDue": "2014-12-15"},
    {"id": 3, "isComplete": false, "isEditing": true, "isDeleted": false, "text": "Finish term paper", "dateDue": "2014-12-20"},
    {"id": 4, "isComplete": false, "isEditing": false, "isDeleted": false, "text": "Watch Interstellar", "dateDue": "2014-12-26"},
    {"id": 5, "isComplete": true, "isEditing": false, "isDeleted": false, "text": "Get food for dinner", "dateDue": "2014-12-18"},
    {"id": 6, "isComplete": false, "isEditing": false, "isDeleted": false, "text": "Sleep", "dateDue": "2014-12-10"}
];

var ToDoList = React.createClass({
    render: function() {
        Panel = ReactBootstrap.Panel;

        return (
            <Panel style={{marginTop:"30px"}}>
                <TaskListHeader />
                <TaskList tasks={this.props.tasks} />
            </Panel>
        );
    }
});

React.render(<ToDoList tasks={TASKS} />, document.getElementById('content'));




