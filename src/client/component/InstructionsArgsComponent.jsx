var React = require('react');
var RaisedButton = require('material-ui/raised-button');

var Constants = require('../Constants');

var InstructionsArgsComponent = React.createClass({

    getInitialState : function() {
        var self = this;
        setTimeout(
            function() {
                self.setState({isContinueDisabled: false});
            },
            Constants.INSTRUCTIONS_TIME
        );

        return {isContinueDisabled: true};
    },

    handleContinueClick : function() {
        this.props.setScreen(Constants.QUESTION_START_SCREEN);
    },

    render : function() {
        return (
            <div className="instructionsScreen">
                <h1>Bonus Information</h1>
                <h2>After you reason a claim to be either True or False,
                you may be asked to present your reasoning for your answer.</h2>
                <h3>You may not have to provide a justification for every problem.</h3>
                <h3>The justifications you provide are important. You will receive
                a <span className="black">bonus</span> of {Constants.JUSTIFICATION_BONUS} for
                <span className="important"> every high quality argument you provide in this survey.</span></h3>
                <br />
                <h2>Once you have provided a reason, you could then be presented
                with a counterargument against your claim. After carefully
                reading the counterargument, make a decision as to whether
                you would like to change your answer from True to False or
                from False to True.</h2>
                <h3>The counterarguments <span className="important">may be wrong</span>.</h3>
                <h3>Think carefully about this section. Changing your response
                to the correct answer after seeing the counterargument
                will count as a correct response. Changing to the incorrect
                answer will count as an incorrect response. You will receive a
                <span className="black"> bonus of {Constants.CHANGE_BONUS}</span> if you have the correct response after having the option to switch.</h3>

                <div className="text-center">
                    <RaisedButton
                        label="Continue"
                        disabled={this.state.isContinueDisabled}
                        onClick={this.handleContinueClick}
                    />
                </div>
            </div>
        );
	}
});

module.exports = InstructionsArgsComponent;
