var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var FlatButton = require('material-ui/lib/flat-button');
var Dialog = require('material-ui/lib/Dialog');

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
var ModalInstructions = React.createClass({
  getInitialState : function() {
    return {open: false};
  },

  handleOpen : function() {
    this.setState({open: true});
  },

  handleClose : function() {
    console.log('close');
    this.setState({open: false});
  },

  render : function() {
    const actions = [
      <FlatButton
        label="Close"
        primary={true}
        onClick={this.handleClose}
      />
    ];

    return (
      <div>
        <div className="modalButton">
        <RaisedButton label="Instructions" onClick={this.handleOpen} />
        </div>
        <Dialog
          title="Instructions"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
<h2 className="text-center">Carefully read through the following simple rules so that you understand the task you will be completing.</h2>
                <h2 className="relationExplain">Claim: Lived In</h2>
                <h3>Means a person spent time in a place for more than a visit.
                Working in a location <span className="important">does not</span> imply that a person has a lived
                in relation except for the country of national officials.</h3>
                <h3>You may assume that someone who has held a national office
                or played for a national sports team has lived in <span className="black">the country </span>
                they serve or represent (<span className="black">not a city</span>). Ambassadors should be counted as
                national-level officials.</h3>
                <h4><span className="black">(Example)</span> Claim: Ian Khama <span className="black">"lived in"</span> Botswana</h4>
                <h5 className="lighter typeLabel">Botswana is a Country.</h5>
                <h4>Sentence: <span className="important">Botswana</span>'s President <span className="important">Ian Khama</span> is one of the few African
                leaders to openly criticize Mugabe.</h4>
                <h4>Ian Khama holds national office for Botswana, therefore it can be concluded
                that he also lives in Botswana. The answer to this question is <span className="black">True</span>.</h4>
                <br />
                <h2 className="relationExplain">Other Rules</h2>
                <h3>You should only select relations that can be inferred by reading the sentence,
                even if you know others are true. You also should not select the facts that are likely to be true,
                but you are not sure after reading the sentence.</h3>
        </Dialog>
      </div>
    );
  }
});

module.exports = ModalInstructions;
