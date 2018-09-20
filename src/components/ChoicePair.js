import React, {Component} from 'react';
import '../styles.css'
class ChoicePair extends Component {

  constructor(props){
    super();
    this.state = {
      depValue: '-1',
      subValue: '-1',
  }

    this.handleDepChange = this.handleDepChange.bind(this);
    this.handleSubChange = this.handleSubChange.bind(this);
  }

  handleDepChange(event) {
    this.setState({depValue: event.target.value,
    subValue: '-1'});
  }

  handleSubChange(event) {
    this.setState({subValue: event.target.value});
  }

  getDepartments(collection)
  {
    if(collection)
    return collection.map((item, i) => {
      return <option key = {item} value = {item}>{item}</option>
    });
  };

  getSubjects(collection)
  {
    if(collection)
    return collection.map((item, i) => {
      return <option key = {item.id} value = {item.id}>{item.name}</option>
    });
  }

  render() {
  //create filtered options constant


  const subjectList = this.props.subjects.filter((subjName) => {return subjName.department === this.state.depValue});

  return(
    <div>
      <select className = "select-class" name = "Select department" value={this.state.depValue} onChange = {this.handleDepChange}>

        <option value = '-1' disabled>Department</option>

        {this.getDepartments(this.props.departments)}

      </select>

      <select className = "select-class" name = "Select subject"  value={this.state.subValue} onChange = {(event) =>{
        this.handleSubChange(event);
        this.props.getChoice(event.target.value, this.props.number);
      }}>
        <option value = '-1' disabled>Subject</option>
        {this.getSubjects(subjectList)}
      </select>

    </div>
  )

  }

}

export default ChoicePair;
