import React, {Component} from 'react';
import '../styles.css'


class NumClasses extends Component {

  constructor(props){
    super();

    this.state = {
      value : 4
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});

  }

  componentWillMount()
  {
    this.props.getNum(this.state.value);
  }

  render()
  {
    const children = [];

    for (var i = 2; i < 9; i ++) {
     children.push(<option key={i}>{i}</option>);
   }

    return (
      <div className = "choose-num-subjects">
      <label className="label"> How many classes do you want to take? </label>
      <select name = "Choose how many classes you want to take" value={this.state.value} onChange = {
        (event)=> {
        this.handleChange(event);
        this.props.getNum(event.target.value);
      }}>
        {children}
      </select>
      </div>
    );
  }

}

export default NumClasses;
