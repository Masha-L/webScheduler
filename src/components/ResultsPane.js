import React from 'react';
//num options, onGoBack (goBack), onAddOptions(add)
class ResultsPane extends React.Component {
  state = {};

  render() {
    const children = this.props.children;
    return (
      <div className = "results-pane">
      { //console.log(this.props.children)
      }
      {
        children.length === 0 ? <h1> No possible schedules were found, sorry! </h1> : <h1> Here you go! </h1>
      }
      <div id="children-pane">
        {children}
      </div>
      <div className="card calculator">
      <span>
      <button className = "button schedule-button major-button" onClick={this.props.goBack}> Go back </button>
      {(this.props.numOptions > children.length) ? <button className = "button schedule-button major-button" onClick = {this.props.addOptions}> Show more options </button>: null}
      </span>
      </div>
      </div>
    );
  }
}

export default ResultsPane;
