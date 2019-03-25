import React, {Component} from 'react';


class SubjectInfo extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      //после этой строки нельзя ставить ;
      isOpen: false
    };
  }

  handleClick = () =>
  {
    this.setState({
      isOpen:!this.state.isOpen
    });
  }

  render(){
    if(this.props.node.lecture) {
      this.lecChildren = this.getTimePeriods(this.props.node.lecture.timePeriods);
    }
    if(this.props.node.lab) {
      this.labChildren = this.getTimePeriods(this.props.node.lab.timePeriods);
    }


    return (
      <div className = "schedule-item">
        <button className = "schedule-item-button" onClick = {this.handleClick}> {this.state.isOpen ? '-' :'+'}</button>
        <label> {this.props.node.subject.name} </label>
        {
          (this.state.isOpen)?
              <div className = "schedule-item-info">
                <p />
                <label> Professor {this.props.node.lecture ? this.props.node.lecture.professor : this.props.node.lab.professor} </label>
                <p />
                <div className = "label-small">
                <label> {this.props.node.subject.id} </label>
                <label> {this.props.node.lecture ? this.props.node.lecture.name : null}</label>
                <div>
                  <table>
                    <tbody>
                      {this.lecChildren}
                    </tbody>
                  </table>
                </div>
                <p></p>
                <label> {this.props.node.lab ? this.props.node.lab.name : null}</label>
                <div>
                  <table>
                    <tbody>
                      {this.labChildren}
                    </tbody>
                  </table>
                </div>
                </div>
              </div>

             :
             null
          }
      </div>

    );
  }


  getTimePeriods(timePeriods){
    const children = [];
    for(var i = 0; i < timePeriods.length; i ++) {
      children.push(
        <tr key = {i}>
        <td>
        {this.getWeekDay(timePeriods[i])}
        </td>
        <td>
        {this.getTimes(timePeriods[i])}
        </td>
        </tr>
      );

    }
    return children;
  }

  getTimes(timePeriod){
    return (timePeriod.startTime + " - " + timePeriod.endTime);

  }

  getWeekDay(timePeriod){
    switch (timePeriod.weekDay) {
      case 1:
        return "Mon";
      case 2:
        return "Tue";
      case 3:
        return "Wed";
      case 4:
        return "Thu";
      case 5:
        return "Fri";
      case 6:
        return "Sat";
      case 7:
        return "Sun";
      default:
        return "TBD";
    }
  }


}

export default SubjectInfo;
