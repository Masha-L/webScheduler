import Modal from './Modal'
import React from 'react'

const ProcessForm =  {

  keepGoing: false,

  processForm(dataTable, choices, numSubj, onGetSubjectData, onGetModal)
  {
    //collects all values filled by user
    this.collectValidSubjects(choices);

    //if n>= k, proceed, else return false
    if(this.checkNumClasses(numSubj, onGetModal)){
      //go to check for crosslisted options/repeats; in case of success
      //- calls a callback function and passes resulting data array
      return this.createDataSet(dataTable, choices, onGetSubjectData, onGetModal);
    }
    return false;
    //check number of chosen subj vs how many user wants
    //create an array of chosen options
    //check if same or crosslisted
  },

  collectValidSubjects(choices)
  {
    this.validSubjects = [];
    for(var i = 0; i < choices.length; i++)
    {
      if(choices[i]!== undefined)
        this.validSubjects.push(choices[i]);
    }
  },

  checkNumClasses(numSubj, onGetModal)
  {
    this.keepGoing = -1;
      if(this.validSubjects.length < numSubj) {
        const text = "You want us to create schedule options with " + numSubj + " classes, but chose " + this.validSubjects.length + ". Please, go back and update your selection.";
        onGetModal(<Modal onGoBack = {(event) => {this.onGoBack(onGetModal)}} text = {text} canContinue = {false}/>);
        return false;
      }
      else return true;
  },

  createDataSet(dataTable, choices, onGetSubjectData, onGetModal){
    //add all of the subjects to a new map:
    //has item?
    //if yes - alert and break
    //no - check for crosslisted -> has item?

    const rawData = new Map();
    let subject = {};

    //if at least one returns false - oh well. It's all false
     const isEvery = choices.every((item, i)=>{
      if(rawData.has(item))
      {
        subject = dataTable.get(item);
        const text = "You chose '" + subject.name + "' more than once! Please, go back and update your selection.";
        onGetModal(<Modal onGoBack = {(event) => {this.onGoBack(onGetModal)}} text = {text} canContinue = {false}/>);

        return false;
      }
      else {
        subject = dataTable.get(item);
        rawData.set(item, subject);
      }

      if(subject.isCrosslisted)
      {
        for(i = 0; i<subject.crosslisted.length; i++)
        {
          if(rawData.has(subject.crosslisted[i]))
          {
            const text = "You chose the crosslisted subjects: " + subject.name + " (" + subject.id + " and " + subject.crosslisted[i]+ ").  They may seem different, but it's the same one!";
            onGetModal(<Modal onGoBack = {(event) => {this.onGoBack(onGetModal)}} text = {text} canContinue = {false}/>);
            return false;
          }
        }
      }

      return true;
    });

    let dataSet = [];
    //the array of values to go on with! YAY ME!
    if(isEvery)
    {
       dataSet = Array.from(rawData.values());
       rawData.clear();
       onGetSubjectData(dataSet);
       return true;
    }
    return false;

  },

  onGoBack(onGetModal){
    //close the window
    onGetModal(null);
  }

}

export default ProcessForm;
