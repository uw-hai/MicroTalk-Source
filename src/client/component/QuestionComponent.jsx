var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var RadioButton = require('material-ui/lib/radio-button');
var RadioButtonGroup = require('material-ui/lib/radio-button-group');
var TextField = require('material-ui/lib/text-field');
var JQuery = require('jquery');

var Constants = require('../Constants');
var Logging = require('../Logging');
var Init = require('../Init');

var QuestionComponent = React.createClass({
    getInitialState : function() {
        return {
            startTime: (new Date()).getTime(),
            assessment: null,
            justification: '',
            didChange: '',
            counterarguments: [],
            collectReconsider: false,
            collectJustification: false,
            showErrorFlag: false,
            isContinueDisabled: true,
            presentCounterarguments: false,
            currentArgumentSource: Logging.EXPERIMENT
        };
    },

    getIndicesOf : function(searchStr, str, caseSensitive) {
        var startIndex = 0, searchStrLen = searchStr.length;
        var index, indices = [];
        if (!caseSensitive) {
            str = str.toLowerCase();
            searchStr = searchStr.toLowerCase();
        }

        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }

        return indices;
    },

    boldify : function(sentence, entities) {
        var firstOccurences = this.getIndicesOf(entities[0], sentence, false);
        var secondOccurences = this.getIndicesOf(entities[1], sentence, false);

        var occurences = firstOccurences.concat(secondOccurences).sort(function(a, b) { return a - b });
        var result = [];
        var endIndex = 0;
        var id = 0;
        for (var i = 0; i < occurences.length; i++) {
            var startIndex = occurences[i];
            // Add before this occurence
            result.push(<span key={id++}>{sentence.substring(endIndex, startIndex)}</span>);
            var entity = firstOccurences.indexOf(startIndex) >= 0 ? entities[0] : entities[1];
            endIndex = startIndex + entity.length;
            // Add the occurence
            if (firstOccurences.indexOf(startIndex) >= 0) {
                result.push(<span key={id++} className="important">{sentence.substring(startIndex, endIndex)}</span>);
            } else {
                result.push(<span title={Constants.ENTITY_TYPES[entity]} key={id++} className="important entity">{sentence.substring(startIndex, endIndex)}</span>);
            }
        }

        // Add the rest of the string
        result.push(<span key={id++}>{sentence.substring(endIndex, sentence.length)}</span>);
        return result;
    },

    logEvent : function() {
        this.setState({isContinueDisabled: true});
        var self = this;
        var justification = this.state.justification;

        if (Constants.FILTERING_QUESTION_IDS.indexOf(Constants.getQuestionID(this.props.questionIndex)) === -1 && Constants.SHOW_RANDOM_ARG) {
            justification = this.state.currentArgumentSource;
        }

        Logging.logEvent(
            Init.getID(),
            this.state.startTime,
            (new Date()).getTime(),
            Constants.getQuestionID(this.props.questionIndex),
            this.props.questionIndex,
            this.state.assessment,
            justification,
            this.state.didChange,
            function(m) {
                self.setState(self.getInitialState());
                self.props.advanceQuestion();
            }
        );

        var bonus = 0;
        if (this.state.collectJustification) {
            bonus += Constants.BONUS_AMOUNT;
        }

        if (this.state.collectReconsider) {
            bonus += Constants.BONUS_AMOUNT;
        }

        this.props.addBonus(bonus);
    },

    onAssesmentChange : function(event, value) {
        this.setState({
            assessment: value,
        });

        if (Constants.IS_BASELINE) {
            this.setState({
                isContinueDisabled: false,
                collectJustification: false,
                collectReconsider: false
            });

            return;
        }

        var questionId = Constants.getQuestionID(this.props.questionIndex);
        if (Constants.FILTERING_QUESTION_IDS.indexOf(questionId) >= 0)  {
            this.setState({
                collectJustification: true,
                isContinueDisabled: true
            });
            var self = this;
            setTimeout(function() { self.refs.justificationTextField.focus(); }, 500);
            return;
        }

        var experimentName = Logging.EXPERIMENT;
        if (Constants.SHOW_RANDOM_ARG) {
            var index = Constants.getRand(0, Constants.EXPERIMENTS.length);
            experimentName = Constants.EXPERIMENTS[index];
            this.setState({ currentArgumentSource: experimentName });
        }

        var data = {
            experiment: experimentName,
            question_id: Constants.getQuestionID(this.props.questionIndex),
            answer: value,
        };

        var self = this;
        JQuery.get(
            Constants.GET_NEXT_URL,
            data,
            function(m) {
                var response = JSON.parse(m);
                if (response.action === 'collectJustification') {
                    self.setState({
                        'collectJustification': true,
                        'collectReconsider': false
                    });
                    self.refs.justificationTextField.focus();
                } else if (response.action === 'collectReconsider') {
                    self.setState({
                        collectReconsider: true,
                        counterarguments: response.arguments,
                        presentCounterarguments: true,
                        collectJustification: false
                    });
                } else if (response.action === 'both') {
                    self.setState({
                        collectJustification: true,
                        collectReconsider: true,
                        counterarguments: response.arguments,
                        presentCounterarguments: false
                    });
                } else if (response.action === 'moveOn') {
                    self.setState({
                        isContinueDisabled: false,
                        collectJustification: false,
                        collectReconsider: false
                    });
                }
            }
        );
    },

    onJustificationChange : function(event) {
        var justification = event.target.value;
        this.setState({
            justification: justification,
            isContinueDisabled: false
        });
    },

    handleContinueClick : function() {
        if (Constants.IS_BASELINE) {
            this.logEvent();
            return;
        }

        if (this.state.collectJustification && this.state.justification.length < Constants.MIN_ARG_LENGTH) {
            this.setState({
                showErrorFlag: true
            });

            return;
        }

        if (this.state.collectReconsider && this.state.didChange === '') {
            this.setState({
                showErrorFlag: false,
                presentCounterarguments: true,
                isContinueDisabled: true
            });
        } else {
            // Done
            this.logEvent();
        }
    },

    onDidChangeAnswer : function(event, value) {
        this.setState({
            isContinueDisabled: false,
            didChange: value
        });
    },

    render : function() {
        var questionId = Constants.getQuestionID(this.props.questionIndex);
        var entities = Constants.getEntities(this.props.questionIndex);
        var sentence = Constants.getSentence(this.props.questionIndex);

        var formattedCounterarguments = [];
        for (var i = 0; i < this.state.counterarguments.length; i++) {
            var argument = this.state.counterarguments[i];
            formattedCounterarguments.push(<h3 key={(i + 1) * 10}>{'- ' + argument}</h3>);
        }

        return (
            <div>
                <div className="text-center">
                    <h2><span className="lighter">Claim:</span> <span className="black">{entities[0]}</span> "lived in" <span title={Constants.ENTITY_TYPES[entities[1]]} className="black">{entities[1]}</span></h2>
                    <h4 className="lighter typeLabel">{entities[1]} is a {Constants.ENTITY_TYPES[entities[1]]}.</h4>
                    <h2><span className="lighter">Sentence:</span> {this.boldify(sentence, entities)}</h2>
                </div>
                <RadioButtonGroup defaultSelected={null} valueSelected={this.state.assessment} className="radioButtons" onChange={this.onAssesmentChange} name="questionAnswer" defaultSelected="not_light">
                    <RadioButton
                        className="radioButton"
                        value="true"
                        label="True"
                    />
                    <RadioButton
                        className="radioButton"
                        value="false"
                        label="False"
                    />
                </RadioButtonGroup>

                {this.state.collectJustification &&
                <div className="justification center">
                    <br />
                    <h2 className='noMargin'>What is the reasoning behind your answer?</h2>
                    <TextField
                        ref="justificationTextField"
                        className="justificationText"
                        hintText="Justification"
                        onChange={this.onJustificationChange}
                        rows={1}
                        rowsMax={10}
                        multiLine={true}
                        errorText={
                            this.state.showErrorFlag ?
                            'Please enter a longer and more in depth argument.'
                            : ''
                        }
                    />
                </div>
                }

                {this.state.collectReconsider && this.state.presentCounterarguments &&
                <div className="center text-center">
                    <br />
                    <h2 className='noMargin'>Some workers answered {this.state.assessment === 'true' ? 'False' : 'True'} with the following reasons:</h2>
                    {formattedCounterarguments}
                    <h2>Would you like to change your answer to {this.state.assessment === 'true' ? 'False' : 'True'}?</h2>
                    <RadioButtonGroup className="radioButtons" onChange={this.onDidChangeAnswer} name="changedAnswer" defaultSelected="not_light">
                        <RadioButton
                            className="radioButton"
                            value="true"
                            label="Yes"
                        />
                        <RadioButton
                            className="radioButton"
                            value="false"
                            label="No"
                        />
                    </RadioButtonGroup>
                </div>
                }

                <div className="text-center margin">
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

module.exports = QuestionComponent;
