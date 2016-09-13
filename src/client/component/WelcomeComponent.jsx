var React = require('react');
var TextField = require('material-ui/lib/text-field');
var RaisedButton = require('material-ui/lib/raised-button');

var Constants = require('../Constants');
var Logging = require('../Logging');
var Init = require('../Init');

var WelcomeComponent = React.createClass({
    getInitialState : function() {
        return {
            isContinueDisabled: true,
            mTurkID: null,
            showEmailFlag: false
        };
    },

    onMechanicalTurkChange : function(newMechanicalTurkId) {
        var mTurkID = newMechanicalTurkId.target.value;
        if (mTurkID) {
            if (this.isAEmail(this.state.mTurkID)) {
                this.setState({
                    mTurkID: mTurkID,
                    isContinueDisabled: true,
                    showEmailFlag: true
                });
            } else {
                this.setState({
                    mTurkID: mTurkID,
                    isContinueDisabled: false
                });
            }
        } else {
            this.setState({
                mTurkID: null,
                isContinueDisabled: true
            });
        }
    },

    isAEmail : function(id) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(id);
    },

    handleContinueClick : function() {
        if (this.state.isContinueDisabled) {
            return;
        }

        Logging.logUser(
            Init.getID(),
            (new Date()).getTime(),
            this.state.mTurkID
        );

        this.props.setMTurkID(this.state.mTurkID);
        this.props.setScreen(Constants.INSTRUCTIONS_SCREEN);
    },

    render : function() {
        return (
            <div className="welcomeScreen">
                <h1>Task Description</h1>
                <div className="welcomeInstructions">
                    <h2>
                        We are conducting an academic survey about relations between subjects in sentences.
                        Expect to take at least 10-20 minutes to complete this task.
                    </h2>
                    <br />
                    <h2>To get started, please provide us with your Amazon Mechanical Turk ID:</h2>
                </div>

                <div className="mTurkSubmit">
                    <TextField
                        hintText="Mechanical Turk ID"
                        onChange={this.onMechanicalTurkChange}
                        errorText={
                            this.state.showEmailFlag ?
                            'Your Mechanical Turk ID is not your email address.'
                            : ''
                        }
                    />
                </div>
                <br />
                <RaisedButton
                    label="Continue"
                    disabled={this.state.isContinueDisabled}
                    onClick={this.handleContinueClick}
                />
            </div>
        );
	}
});

module.exports = WelcomeComponent;
