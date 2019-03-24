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

/*
 * Renders the main component for the choose page.
 */
class AppComponent extends Component {
  // Initialize state
  state : {};

  // Set state right before rendering this component
  componentWillMount()
  {
    /*
    * numChildren - number of children (choice boxes)
    * choices - data from proccessing the form
    * numClasses - the preset number of classes for the schedule
    * options - potential schedules
    * isProcessed - switches between two modes
    * modal - warning window
    */
    this.setState(
      {
        numChildren: 4,
        choices: [],
        numClasses: 4,
        options: [],
        isProcessed: false,
        modal: null
      }
    );

    // Create map of all classes
    this.dataTable = DataAPI.createMap(database.subject);

  }

  /*
  * Shows the elements
  */
  render(){

    // List of subjects (the database)
    const subjects = database.subject;
    // The list of the departments
    const departments = DataAPI.findAllDepartments(subjects);

    // List of children nodes
    const children = [];
    this.setUpChildren(children, subjects, departments);

    //if the form hasn't been processed - show the choice panel
    if(!this.state.isProcessed)
    { return (
        <div className = "mainFrame">
         {this.state.modal}
         <div className = "formLink"> The schedule for <br/><b>Fall 2019</b><br/> is now available!<br/> Let the scheduling gods be with you! <p/> You can support us by buying us a coffee (if only you cannot buy us some good night sleep)<p/><a href="https://ko-fi.com/programmers_and_proud">buy us a coffee</a> </div>
         <div className = "choosingPanel">
         <h1 className = "header">Hi! Let us know what subjects you are considering and we will have some great schedules ready for you right away!</h1>
           <ChoosingPane addChild = {this.onAddChild} deleteChild = {this.onDeleteChild}>
             {children}
           </ChoosingPane>
           <NumClasses getNum = {this.onGetNum} />
           <button className = "button" id = "submit-button" type = "submit" onClick = {(event) => {
               this.handleSubmit(event, children)}}>    Get my perfect schedule    </button>
          </div>
       </div>
      );
    }
    else {
     return(
       <div className = "mainFrame">
       <div className = "formLink"> The schedule for <br/><b>Fall 2019</b><br/> is now available!<br/> Let the scheduling gods be with you! <p/> You can support us by buying us a coffee (if only you cannot buy us some good night sleep)<p/><a href="https://ko-fi.com/programmers_and_proud">buy us a coffee</a> </div>
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
    const isProcessed = ProccessForm.processForm(this.dataTable, this.state.choices, this.state.numClasses, this.onGetSubjectData, this.onGetModal);
    //if form was processed ok => send resulting array to logic
    if (isProcessed) {
      // var helluvaClasses = database.subject;
      // let start = performance.now();
      const finalSchedulesGroup = Solver.findSchedules(this.subjectData, this.state.numClasses);
      //const finalSchedulesGroup = Solver.findSchedules(helluvaClasses, this.state.numClasses, start);

      if (finalSchedulesGroup.length < 3)
        this.setState({numChildren : finalSchedulesGroup.length});
      else
        this.setState({numChildren : 3});

    this.setState({options:finalSchedulesGroup, isProcessed: true});
   }
 }

  setUpChildren = (children, subjects, departments) => {
    //set up children
    if (!this.state.isProcessed) {
      for (var i = 0; i < this.state.numChildren; i ++) {
        children.push(<ChoicePair key = {i} number = {i}
          departments = {departments} subjects = {subjects} getChoice = {this.onGetChoice}/>);
      }}
    else
      for (i = 0; i < this.state.numChildren; i++) {
        children.push(<ScheduleOption key = {i} scheduleGroup = {this.state.options[i]}/>);
      };
  }

// Change the number of children, if "+" was clicked
  onAddChild = () => {
    if (this.state.numChildren <= 20)
      this.setState({
        numChildren: this.state.numChildren + 1
      });
  }

// Change the number of children, if "-" was clicked
  onDeleteChild = () => {
    if(this.state.numChildren > 3)
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
        this.setState({numChildren: this.state.numChildren + 4});
      }
    }

    onGoBack = () => {
      this.setState({
        numChildren: 4,
        choices: [],
        numClasses: 4,
        options: [],
        isProcessed: false,
        modal: null });
    }
}
export default AppComponent;
