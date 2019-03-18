import React from 'react';

class Modal extends React.Component {
  render() {

    return (

        <div className ="modal-background">
          <div className ="modal-window">
          <div className ="modal-content">
              <div>
              <label id="modal-content"> {this.props.text} </label>
              </div>
              <p/>
              <button className = "button" onClick = {this.props.onGoBack}>
                Go back
              </button>
          </div>
          </div>
        </div>

    );
  }
}

export default Modal;
