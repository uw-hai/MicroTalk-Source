var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var Constants = require('../Constants');

var QuestionStartComponent = React.createClass({
    getInitialState : function() {
        return {};
    },

    handleContinueClick : function() {
        this.props.setScreen(Constants.QUESTIONS_SCREEN);
    },

    render : function() {
        return (
            <div className="instructionsScreen">
                <h1>Questions (0 / {Constants.NUM_QUESTIONS})</h1>
                <h3>You will have a total of {Constants.NUM_QUESTIONS} questions to answer.
                You must answer all of them to receive the Survey Code to be paid on Mechanical Turk.</h3>
                <div className="text-center">
                    <RaisedButton
                        label="Begin"
                        onClick={this.handleContinueClick}
                    />
                </div>
            </div>
        );
	}
});

module.exports = QuestionStartComponent;
