import React, {Component} from 'react';
import SchedRender from './SchedRender';
import SubjectInfo from './SubjectInfo';

class ScheduleOption extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      //после этой строки нельзя ставить ;
      isOpen: false,
      scheduleNum: 0
    };
  }


  render(){

    const children = [];
    this.setUpChildren(children);

      if (this.props.scheduleGroup.length > 1)
      {
        this.scheduleClass = "card-stack-small";
        if (this.props.scheduleGroup.length > 2)
          this.scheduleClass = "card-stack";
      }
      else {
          this.scheduleClass = "schedule-option";
      }

      return (
        <div className = {this.scheduleClass}>
        {children}
        <p/>
        <div className = "schedule-table">
         {this.state.isOpen ? <SchedRender schedule = {this.props.scheduleGroup[this.state.scheduleNum]}/> : null}
         </div>
         <button className= "button schedule-button" onClick = {this.handleClick}> {this.state.isOpen ? 'Show less' :'Show more'}</button>
         <p/>
        {this.state.scheduleNum !== 0 ? <button className= "button schedule-button" onClick = {this.getPrev}> {"<< "} </button> : null}
        {this.state.scheduleNum !== this.props.scheduleGroup.length-1 ? <button className= "button schedule-button" onClick = {this.getNext}>  >> </button> : null}
        </div>

      );

  }

  setUpChildren = (children) => {
    //set up children
      for (var i = 0; i < this.props.scheduleGroup[this.state.scheduleNum].length; i ++) {
        children.push(<SubjectInfo key = {i} node = {this.props.scheduleGroup[this.state.scheduleNum][i]}/>);
      }}

  handleClick = () =>{
    this.setState({
      isOpen:!this.state.isOpen
    });
  }

  getPrev = () => {
    const currentNum = this.state.scheduleNum;

    this.setState({scheduleNum: currentNum - 1});
  }

  getNext = () => {
    const currentNum = this.state.scheduleNum;

    this.setState({scheduleNum: currentNum + 1});
  }
}
export default ScheduleOption;
