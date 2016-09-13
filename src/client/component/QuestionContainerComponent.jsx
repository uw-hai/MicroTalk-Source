var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var Constants = require('../Constants');
var QuestionComponent = require('./QuestionComponent.jsx');


var QuestionContainerComponent = React.createClass({
    getInitialState : function() {
        return {questionIndex : 0};
    },

    advanceQuestion : function() {
        if (this.state.questionIndex + 1 >= Constants.NUM_QUESTIONS) {
            this.props.setScreen(Constants.THANK_YOU_SCREEN);
            return;
        }

        this.setState({questionIndex: this.state.questionIndex + 1});
    },

    render : function() {
        return (
            <div className="instructionsScreen">
                <h1>Question: ({this.state.questionIndex + 1} / {Constants.NUM_QUESTIONS})</h1>
                <QuestionComponent advanceQuestion={this.advanceQuestion} questionIndex={this.state.questionIndex} addBonus={this.props.addBonus} />
            </div>
        );
	}
});

module.exports = QuestionContainerComponent;
