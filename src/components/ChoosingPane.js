import React from 'react';
import '../styles.css'


const ChoosingPane = props => (
  <div >
    <div className="choosingPane">
      {props.children}
    </div>

    <div id = "choose-buttons">
      <button className = "button" onClick={props.deleteChild}>-</button>
      <button className = "button" onClick={props.addChild}>+</button>
    </div>
  </div>
);




export default ChoosingPane;
