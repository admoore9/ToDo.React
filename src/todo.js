var Task = React.createClass({
    render: function() {
        ButtonToolbar = ReactBootstrap.ButtonToolbar
        ButtonGroup = ReactBootstrap.ButtonGroup
        Button = ReactBootstrap.Button;
        Panel = ReactBootstrap.Panel;
        Input = ReactBootstrap.Input;
        Glyphicon = ReactBootstrap.Glyphicon;
        ListGroup = ReactBootstrap.ListGroup;
        Row = ReactBootstrap.Row;
        Col = ReactBootstrap.Col;

        var taskStyle = {
            height: '50px'
        };

        return (
            <div>
            <Row>
            <hr/>
                <Col lg={1} md={2} sm={2}>
                    <ButtonGroup bsSize="small">
                        <Button bsStyle="danger"><Glyphicon glyph="remove" /></Button>
                        <Button bsStyle="success"><Glyphicon glyph="ok" /></Button>
                    </ButtonGroup>
                    <br/>
                </Col>
                <Col lg={9} md={8} sm={8}>
                    <Input type="text" value={this.props.text}></Input>
                </Col>
                <Col lg={2} md={2} sm={2}>
                    <Input type="date" value={this.props.dateDue}/>
                </Col>
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

var TaskListHeader = React.createClass({
    render: function() {
        ButtonGroup = ReactBootstrap.ButtonGroup;
        Button = ReactBootstrap.Button;
        Glyphicon = ReactBootstrap.Glyphicon;
        return (
            <Row>
                <Col lg={3} md={2} sm={2}>
                    <ButtonGroup>
                        <Button type="button" bsStyle="success"><Glyphicon glyph="ok" /> Complete all</Button>
                        <Button type="button" bsStyle="primary"><Glyphicon glyph="pencil" /> New task</Button>
                    </ButtonGroup>
                </Col>
                <Col lg={9} md={2} sm={2}>
                    <h1>My Todo List</h1>
                </Col>
            </Row>
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
        Row = ReactBootstrap.Row;
        Col = ReactBootstrap.Col;
        Panel = ReactBootstrap.Panel;
        return (
            <Row>
                <Col md={12}>
                    <Panel>
                        <TaskListHeader />
                        <TaskList tasks={this.props.tasks} />
                    </Panel>
                </Col>
            </Row>
        );
    }
});

React.render(<ToDoList tasks={TASKS} />, document.getElementById('content'));




