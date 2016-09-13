var React = require('react');
var Constants = require('../Constants');

var Constants = require('../Constants');
var Logging = require('../Logging');
var Init = require('../Init');

var ThankYouComponent = React.createClass({
    getInitialState : function() {
        return {};
    },

    componentDidMount : function() {
        Logging.logUserBonus(
            Init.getID(),
            (new Date()).getTime(),
            this.props.mTurkID,
            this.props.bonusAmount
        );
    },

    render : function() {
        return (
            <div className="instructionsScreen text-center">
                {Constants.IS_BASELINE &&
                <h1>Thank you for taking our survey! You will also be paid {Constants.BASE_PAY + ' '}
                once you copy the following survey code back to Mechanical Turk and complete the HIT.</h1>
                }
                {!Constants.IS_BASELINE &&
                <h1>Thank you for taking our survey! Your possible bonus
                (${this.props.bonusAmount.toFixed(2)}) will be paid in the
                next couple of days after we verify all the information you
                have provided us and calculate your correct answers (the actual amount could be
                lower if some of your answers are incorrect. You will also be paid {Constants.BASE_PAY + ' '}
                once you copy the following survey code back to Mechanical Turk and complete the HIT.</h1>
                }
                <h1><span className="lighter">Survey Code: </span><span className="black">{Constants.SURVEY_CODE}</span></h1>
            </div>
        );
	}
});

module.exports = ThankYouComponent;
