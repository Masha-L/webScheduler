import React, {Component} from 'react';
import ChoosingPane from './ChoosingPane';
import ChoicePair from './ChoicePair';
import database from '../database'
import NumClasses from './NumClasses'
import ProccessForm from './logic/ProccessForm'
import DataAPI from './database/DataAPI'
import ScheduleOption from './ScheduleOption'
import Solver from './logic/Solver'
import ResultsPane from './ResultsPane'
import '../styles.css'


class AppComponent extends Component {
  //initialize state
  state : {};

  //set state right before rendering this component
  componentWillMount()
  {
    /*
    * numChildren - number of children (choice boxes)
    * choices - data from proccessing the form
    */
    this.setState(
      {

        numChildren: 4,
        choices: [],
        numClasses: 4,
        options: [],
        isProccessed: false,
        modal: null
      }
    );

    //сreate map
    this.dataTable = DataAPI.createMap(database.subject);

  }

  render(){

    //list of subjects (the database)
    const subjects = database.subject;
    // we don't want to parse it to much?
    const departments = DataAPI.findAllDepartments(subjects);

    //list of children nodes
    const children = [];
    this.setUpChildren(children, subjects, departments);

    if(!this.state.isProccessed)
    {  return (
        <div className = "mainFrame">
         {this.state.modal}
         <h1 className = "header">Hi! Let us know what subjects you are considering and we will have some great schedules ready for you right away!</h1>
           <ChoosingPane addChild = {this.onAddChild} deleteChild = {this.onDeleteChild}>
             {children}
           </ChoosingPane>
           <NumClasses getNum = {this.onGetNum} />
           <button className = "button" id = "submit-button" type = "submit" onClick = {(event) => {
               this.handleSubmit(event, children)}}>    Get my perfect schedule    </button>
       </div>
      );
    }
    else {
     return(
       <div className = "mainFrame">
         <ResultsPane addOptions = {this.onAddOptions} goBack = {this.onGoBack} numOptions = {this.state.options.length}>
           {children}
         </ResultsPane>
       </div>
     );
    }
  }



//логика при нажатии кнопочки
  handleSubmit(event) {
    //не отправляй на сервер! не перезагружай!
    event.preventDefault();
    //проверь мою форму!
   const isProccessed = ProccessForm.processForm(this.dataTable, this.state.choices, this.state.numClasses, this.onGetSubjectData, this.onGetModal);
   //if form was processed ok => send resulting array to logic
   if(isProccessed){
     const finalSchedulesGroup = Solver.findSchedules(this.subjectData, this.state.numClasses);

console.log(finalSchedulesGroup.length);
     if(finalSchedulesGroup.length < 3)
      this.setState({numChildren : finalSchedulesGroup.length});
    else
      this.setState({numChildren : 3});

    this.setState({options:finalSchedulesGroup, isProccessed: true});
  }

}


  setUpChildren = (children, subjects, departments) => {
    //set up children
    if(!this.state.isProccessed){
      for (var i = 0; i < this.state.numChildren; i ++) {
        children.push(<ChoicePair key={i} number={i} departments = {departments} subjects = {subjects} getChoice = {this.onGetChoice}/>);
      }}
    else
      for (i = 0; i < this.state.numChildren; i ++) {
        console.log(this.state.numChildren);
        children.push(<ScheduleOption key = {i} scheduleGroup = {this.state.options[i]}/>);
      };
  }

//когда пишем плюс - измени колво детей
  onAddChild = () => {
     if(this.state.numChildren <= 20)
    this.setState({
      numChildren: this.state.numChildren + 1
    });
  }

//когда пишем минус - измени колво детей
  onDeleteChild = () => {
    if(this.state.numChildren >= 3)
      this.setState({
        numChildren: this.state.numChildren - 1
      });
  }

  onGetChoice = (value, number) =>
  {
    const currentArr = this.state.choices;
    currentArr[number] = value;
    this.setState({choices : currentArr})
  }

   onGetNum = (value) => {
     this.setState({numClasses: value})
   }

    onGetSubjectData =  (rawData) => {
      this.subjectData = rawData;
    }

    onGetModal = (alert) => {
      this.setState({modal : alert});
    }

    onAddOptions = () => {
      if(this.state.options.length < (this.state.numChildren + 4)){
        this.setState({numChildren:this.state.options.length});
      }
      else {
        this.setState({numChildren: this.state.numChildren+4});
      }
    }

    onGoBack = () => {
      this.setState({
        numChildren: 4,
        choices: [],
        numClasses: 4,
        options: [],
        isProccessed: false,
        modal: null });
    }



}
export default AppComponent;
