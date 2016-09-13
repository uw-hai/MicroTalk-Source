var React = require('react');

var Init = require('../Init');
var Logging = require('../Logging');
var Constants = require('../Constants');

var WelcomeComponent = require('./WelcomeComponent.jsx');
var InstructionsComponent = require('./InstructionsComponent.jsx');
var InstructionsArgsComponent = require('./InstructionsArgsComponent.jsx');
var QuestionStartComponent = require('./QuestionStartComponent.jsx');
var QuestionContainerComponent = require('./QuestionContainerComponent.jsx');
var ThankYouComponent = require('./ThankYouComponent.jsx');
var ModalInstructions = require('./ModalInstructions.jsx');

var AppComponent = React.createClass({
    getInitialState : function() {
        return {
            screen: Constants.WELCOME_SCREEN,
            bonusAmount: 0.00,
            mTurkID: null
        };
    },

    setScreen : function(screenID) {
        this.setState({screen: screenID});
    },

    setMTurkID: function(mTurkID) {
        this.setState({mTurkID: mTurkID});
    },

    addBonus : function(bonus) {
        this.setState({bonusAmount: this.state.bonusAmount + bonus});
    },

    render : function() {
        var currentScreen;
        switch (this.state.screen) {
            case (Constants.WELCOME_SCREEN):
                currentScreen = <div className="screen"><WelcomeComponent setMTurkID={this.setMTurkID} setScreen={this.setScreen} /></div>;
                break;
            case (Constants.INSTRUCTIONS_SCREEN):
                currentScreen = <div className="screen"><InstructionsComponent setScreen={this.setScreen} /></div>;
                break;
            case (Constants.INSTRUCTIONS_SCREEN_ARGS):
                currentScreen = <div className="screen"><InstructionsArgsComponent setScreen={this.setScreen} /></div>;
                break;
            case (Constants.QUESTION_START_SCREEN):
                currentScreen = <div className="screen"><QuestionStartComponent setScreen={this.setScreen} /></div>;
                break;
            case (Constants.QUESTIONS_SCREEN):
                currentScreen = <div className="screen"><QuestionContainerComponent addBonus={this.addBonus} setScreen={this.setScreen} /></div>;
                break;
            case (Constants.THANK_YOU_SCREEN):
                currentScreen = <div className="screen"><ThankYouComponent mTurkID={this.state.mTurkID} bonusAmount={this.state.bonusAmount} /></div>;
                break;
            default:
                currentScreen = <div>Error.</div>;

        }
        return (
            <div id="app">
                {
                this.state.screen >= Constants.INSTRUCTIONS_SCREEN_ARGS &&
                <div>
                    <ModalInstructions />
                    {!Constants.IS_BASELINE &&
                    <div className="bonusContainer">
                        <h4>Possible Bonus: <span className="black">${this.state.bonusAmount.toFixed(2)}</span></h4>
                    </div>
                    }
                </div>
                }
                {currentScreen}
            </div>
        );
	}
});

module.exports = AppComponent;
